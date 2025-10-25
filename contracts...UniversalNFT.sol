// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/* -------- Minimal Interfaces -------- */
interface IGateway {
    function send(
        address destinationAddress,
        uint256 destinationChainId,
        bytes calldata message,
        uint256 zetaValueAndGas,
        uint256 gasLimit
    ) external payable;
}

interface IUniversalNFT {
    function receiveMintedNFT(
        uint256 tokenId,
        address recipient,
        string calldata metadataURI
    ) external;
}

/* -------- Minimal OpenZeppelin-Like Contracts -------- */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

abstract contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() Context() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/* -------- Minimal ERC721 Implementation -------- */
contract ERC721 is Context {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    string public name;
    string public symbol;
    mapping(uint256 => address) internal _owners;
    mapping(address => uint256) internal _balances;

    constructor(string memory _name, string memory _symbol) Context() {
        name = _name;
        symbol = _symbol;
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Zero address");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Not minted");
        return owner;
    }

    function _safeMint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "Zero address");
        require(_owners[tokenId] == address(0), "Already minted");
        _balances[to] += 1;
        _owners[tokenId] = to;
        emit Transfer(address(0), to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual {
        address owner = ownerOf(tokenId);
        _balances[owner] -= 1;
        delete _owners[tokenId];
        emit Transfer(owner, address(0), tokenId);
    }

    function _ownerOf(uint256 tokenId) internal view returns (address) {
        return _owners[tokenId];
    }
}

/* -------- Counter Utility -------- */
library Counters {
    struct Counter {
        uint256 _value;
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1;
    }
}

/* -------- UniversalNFT Contract -------- */
contract UniversalNFT is ERC721, Ownable, IUniversalNFT {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    IGateway public gateway;
    address public universalNFTBridge;

    mapping(uint256 => string) public tokenURIs;
    mapping(uint256 => mapping(uint16 => bool)) public tokenOnChain;
    mapping(uint16 => address) public connectedContracts;

    event NFTMinted(uint256 indexed tokenId, address indexed to, string metadataURI);
    event NFTBridged(uint256 indexed tokenId, uint16 indexed destinationChain, address indexed recipient);
    event ConnectedContractSet(uint16 indexed chainId, address indexed contractAddress);

    constructor(address _gateway)
        ERC721("Mint Once NFT", "MONFT")
        Ownable()
    {
        gateway = IGateway(_gateway);
    }

function setUniversalNFTBridge(address _bridge) external onlyOwner {
    universalNFTBridge = _bridge;
}

    function setConnected(uint16 chainId, address contractAddress) external onlyOwner {
        connectedContracts[chainId] = contractAddress;
        emit ConnectedContractSet(chainId, contractAddress);
    }

    function mint(address to, string memory metadataURI) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        tokenURIs[tokenId] = metadataURI;
        tokenOnChain[tokenId][0] = true;
        emit NFTMinted(tokenId, to, metadataURI);
        return tokenId;
    }

    function bridgeNFT(
        uint256 tokenId,
        uint16 destinationChain,
        address recipient,
        bytes calldata message
    ) external payable {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(connectedContracts[destinationChain] != address(0), "Chain not connected");

        _burn(tokenId);
        tokenOnChain[tokenId][0] = false;

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

    function receiveMintedNFT(
        uint256 tokenId,
        address recipient,
        string memory metadataURI
    ) external override {
        require(msg.sender == universalNFTBridge, "Only bridge can call");
        _safeMint(recipient, tokenId);
        tokenURIs[tokenId] = metadataURI;
        emit NFTMinted(tokenId, recipient, metadataURI);
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenURIs[tokenId];
    }

    function isTokenOnChain(uint256 tokenId, uint16 chainId) external view returns (bool) {
        return tokenOnChain[tokenId][chainId];
    }
}
