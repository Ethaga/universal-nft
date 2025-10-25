// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/* Minimal Gateway Interface */
interface IGateway {
    function send(
        address destinationAddress,
        uint256 destinationChainId,
        bytes calldata message,
        uint256 zetaValueAndGas,
        uint256 gasLimit
    ) external payable;
}

/* Minimal UniversalNFT Interface */
interface IUniversalNFT {
    function receiveMintedNFT(
        uint256 tokenId,
        address recipient,
        string calldata metadataURI
    ) external;
}

/**
 * @title UniversalNFTBridge
 * @notice Handles cross-chain NFT minting and bridging via ZetaChain Gateway.
 */
contract UniversalNFTBridge {
    IGateway public gateway;
    address public universalNFT;

    event CrossChainSend(
        uint256 indexed tokenId,
        uint16 indexed destinationChain,
        address indexed recipient,
        string metadataURI
    );
    event CrossChainReceived(uint256 indexed tokenId, address indexed recipient);
    event BridgeError(string reason);

    constructor(address _gateway, address _universalNFT) {
        gateway = IGateway(_gateway);
        universalNFT = _universalNFT;
    }

    /* 
       Called by UniversalNFT to send NFT to another chain
    */
    function bridgeNFT(
        uint256 tokenId,
        uint16 destinationChain,
        address recipient,
        bytes calldata message
    ) external payable {
        require(msg.sender == universalNFT, "Only NFT contract can call");
        gateway.send{value: msg.value}(
            universalNFT,
            destinationChain,
            message,
            msg.value,
            500000
        );
        emit CrossChainSend(tokenId, destinationChain, recipient, string(message));
    }

    /* ============ Gateway callbacks ============ */

    function onCall(
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external {
        (uint256 tokenId, address recipient, string memory metadataURI) =
            abi.decode(message, (uint256, address, string));
        IUniversalNFT(universalNFT).receiveMintedNFT(tokenId, recipient, metadataURI);
        emit CrossChainReceived(tokenId, recipient);
    }

    function onRevert(
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external {
        emit BridgeError("Cross-chain message reverted");
    }

    function onAbort(
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external {
        emit BridgeError("Cross-chain transaction aborted");
    }
}
