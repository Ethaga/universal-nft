// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@zetachain/standard-contracts/contracts/interfaces/IGateway.sol";
import "@zetachain/standard-contracts/contracts/interfaces/IUniversalApp.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UniversalNFT.sol";

/**
 * @title UniversalNFTBridge
 * @dev Handles cross-chain NFT transfers with Universal App lifecycle functions
 * Implements onCall, onRevert, and onAbort for robust cross-chain messaging
 */
contract UniversalNFTBridge is IUniversalApp, Ownable {
    IGateway public gateway;
    UniversalNFT public nft;

    // Message types
    uint8 constant MESSAGE_TYPE_BRIDGE = 1;
    uint8 constant MESSAGE_TYPE_MINT = 2;

    // Track pending transfers
    struct PendingTransfer {
        uint256 tokenId;
        address recipient;
        uint16 destinationChain;
        string metadataURI;
        bool completed;
    }

    mapping(bytes32 => PendingTransfer) public pendingTransfers;
    mapping(bytes32 => bool) public failedTransfers;

    event BridgeInitiated(
        bytes32 indexed messageHash,
        uint256 indexed tokenId,
        uint16 indexed destinationChain,
        address recipient
    );
    event BridgeCompleted(bytes32 indexed messageHash, uint256 indexed tokenId);
    event BridgeReverted(bytes32 indexed messageHash, uint256 indexed tokenId);
    event BridgeAborted(bytes32 indexed messageHash, uint256 indexed tokenId);

    constructor(address _gateway, address _nft) {
        gateway = IGateway(_gateway);
        nft = UniversalNFT(_nft);
    }

    /**
     * @dev Initiate cross-chain NFT bridge
     */
    function bridgeNFT(
        uint256 tokenId,
        uint16 destinationChain,
        address recipient,
        bytes calldata message
    ) external payable {
        require(nft.ownerOf(tokenId) == msg.sender, "Not token owner");

        string memory metadataURI = nft.tokenURI(tokenId);
        
        // Create message for cross-chain call
        bytes memory payload = abi.encode(
            MESSAGE_TYPE_BRIDGE,
            tokenId,
            recipient,
            metadataURI
        );

        // Get the ZRC-20 gas token for destination chain
        address zrc20 = gateway.getGasCoinZRC20(destinationChain);
        require(zrc20 != address(0), "Invalid destination chain");

        // Create message hash for tracking
        bytes32 messageHash = keccak256(abi.encodePacked(tokenId, destinationChain, recipient, block.timestamp));
        
        // Store pending transfer
        pendingTransfers[messageHash] = PendingTransfer({
            tokenId: tokenId,
            recipient: recipient,
            destinationChain: destinationChain,
            metadataURI: metadataURI,
            completed: false
        });

        // Burn NFT on source chain
        nft.bridgeNFT(tokenId, destinationChain, recipient, payload);

        emit BridgeInitiated(messageHash, tokenId, destinationChain, recipient);
    }

    /**
     * @dev Universal App lifecycle: onCall
     * Called when a cross-chain message arrives from another chain
     */
    function onCall(
        bytes calldata message,
        uint16 originChain,
        address originSender,
        bytes calldata
    ) external override {
        require(msg.sender == address(gateway), "Only gateway can call");

        (uint8 messageType, uint256 tokenId, address recipient, string memory metadataURI) = 
            abi.decode(message, (uint8, uint256, address, string));

        if (messageType == MESSAGE_TYPE_BRIDGE) {
            // Mint the NFT on destination chain
            nft.receiveMintedNFT(tokenId, recipient, metadataURI);
            
            bytes32 messageHash = keccak256(abi.encodePacked(tokenId, originChain, recipient, block.timestamp));
            if (pendingTransfers[messageHash].tokenId == tokenId) {
                pendingTransfers[messageHash].completed = true;
            }
            
            emit BridgeCompleted(messageHash, tokenId);
        }
    }

    /**
     * @dev Universal App lifecycle: onRevert
     * Called when a cross-chain call fails and needs to be reverted
     * Restores the NFT to the original owner
     */
    function onRevert(RevertContext calldata ctx) external override {
        require(msg.sender == address(gateway), "Only gateway can call");

        bytes memory message = ctx.message;
        (uint8 messageType, uint256 tokenId, address recipient, string memory metadataURI) = 
            abi.decode(message, (uint8, uint256, address, string));

        if (messageType == MESSAGE_TYPE_BRIDGE) {
            // Restore NFT to original owner
            address originalOwner = ctx.sender;
            nft.receiveMintedNFT(tokenId, originalOwner, metadataURI);
            
            bytes32 messageHash = keccak256(abi.encodePacked(tokenId, ctx.chainID, recipient, block.timestamp));
            failedTransfers[messageHash] = true;
            
            emit BridgeReverted(messageHash, tokenId);
        }
    }

    /**
     * @dev Universal App lifecycle: onAbort
     * Called when a cross-chain call cannot be reverted (insufficient funds)
     * Sends tokens to abort address to prevent asset loss
     */
    function onAbort(AbortContext calldata ctx) external override {
        require(msg.sender == address(gateway), "Only gateway can call");

        bytes memory message = ctx.message;
        (uint8 messageType, uint256 tokenId, address recipient, string memory metadataURI) = 
            abi.decode(message, (uint8, uint256, address, string));

        if (messageType == MESSAGE_TYPE_BRIDGE) {
            // Restore NFT to abort address (usually the original sender)
            address abortAddress = ctx.abortAddress;
            nft.receiveMintedNFT(tokenId, abortAddress, metadataURI);
            
            bytes32 messageHash = keccak256(abi.encodePacked(tokenId, ctx.chainID, recipient, block.timestamp));
            failedTransfers[messageHash] = true;
            
            emit BridgeAborted(messageHash, tokenId);
        }
    }

    /**
     * @dev Get pending transfer status
     */
    function getPendingTransfer(bytes32 messageHash) 
        external 
        view 
        returns (PendingTransfer memory) 
    {
        return pendingTransfers[messageHash];
    }

    /**
     * @dev Check if transfer failed
     */
    function isTransferFailed(bytes32 messageHash) external view returns (bool) {
        return failedTransfers[messageHash];
    }
}
