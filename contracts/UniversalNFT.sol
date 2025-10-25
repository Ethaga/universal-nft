// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@zetachain/standard-contracts/contracts/interfaces/IUniversalNFT.sol";
import "@zetachain/standard-contracts/contracts/interfaces/IGateway.sol";

/**
 * @title UniversalNFT
 * @dev ERC721 token with ZetaChain Universal NFT support
 * Allows minting and cross-chain transfers via ZetaChain Gateway
 */
contract UniversalNFT is ERC721, Ownable, IUniversalNFT {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    IGateway public gateway;
    address public universalNFTBridge;
    
    // Mapping to store NFT metadata URIs
    mapping(uint256 => string) public tokenURIs;
    
    // Mapping to track which chains have this NFT
    mapping(uint256 => mapping(uint16 => bool)) public tokenOnChain;
    
    // Chain ID to connected contract address
    mapping(uint16 => address) public connectedContracts;

    event NFTMinted(uint256 indexed tokenId, address indexed to, string metadataURI);
    event NFTBridged(uint256 indexed tokenId, uint16 indexed destinationChain, address indexed recipient);
    event ConnectedContractSet(uint16 indexed chainId, address indexed contractAddress);

    constructor(address _gateway) ERC721("Mint Once NFT", "MONFT") {
        gateway = IGateway(_gateway);
    }

    /**
     * @dev Set the Universal NFT Bridge contract address
     */
    function setUniversalNFTBridge(address _bridge) external onlyOwner {
        universalNFTBridge = _bridge;
    }

    /**
     * @dev Register a connected contract on another chain
     */
    function setConnected(uint16 chainId, address contractAddress) external onlyOwner {
        connectedContracts[chainId] = contractAddress;
        emit ConnectedContractSet(chainId, contractAddress);
    }

    /**
     * @dev Mint a new NFT with metadata URI
     */
    function mint(address to, string memory metadataURI) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        tokenURIs[tokenId] = metadataURI;
        tokenOnChain[tokenId][0] = true; // Mark as on origin chain (0 = ZetaChain)
        
        emit NFTMinted(tokenId, to, metadataURI);
        return tokenId;
    }

    /**
     * @dev Bridge NFT to another chain via Universal NFT Bridge
     */
    function bridgeNFT(
        uint256 tokenId,
        uint16 destinationChain,
        address recipient,
        bytes calldata message
    ) external payable {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(connectedContracts[destinationChain] != address(0), "Chain not connected");
        
        // Burn the NFT on this chain
        _burn(tokenId);
        tokenOnChain[tokenId][0] = false;
        
        // Call the bridge contract to initiate cross-chain transfer
        (bool success, ) = universalNFTBridge.call{value: msg.value}(
            abi.encodeWithSignature(
                "bridgeNFT(uint256,uint16,address,bytes)",
                tokenId,
                destinationChain,
                recipient,
                message
            )
        );
        require(success, "Bridge call failed");
        
        emit NFTBridged(tokenId, destinationChain, recipient);
    }

    /**
     * @dev Receive minted NFT from another chain (called by bridge)
     */
    function receiveMintedNFT(
        uint256 tokenId,
        address recipient,
        string memory metadataURI
    ) external {
        require(msg.sender == universalNFTBridge, "Only bridge can call");
        
        _safeMint(recipient, tokenId);
        tokenURIs[tokenId] = metadataURI;
        
        emit NFTMinted(tokenId, recipient, metadataURI);
    }

    /**
     * @dev Get token URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenURIs[tokenId];
    }

    /**
     * @dev Check if token exists on a specific chain
     */
    function isTokenOnChain(uint256 tokenId, uint16 chainId) external view returns (bool) {
        return tokenOnChain[tokenId][chainId];
    }
}
