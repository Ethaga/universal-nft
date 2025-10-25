# Mint Once, Launch Everywhere - Universal NFT dApp

A cross-chain NFT dApp built on ZetaChain that enables users to mint NFTs once and transfer them across multiple blockchain networks seamlessly.

## Features

- **Universal NFT Minting**: Mint AI NFTs with IPFS metadata storage
- **Cross-Chain Transfers**: Send NFTs between connected chains (Goerli, Base, ZetaChain)
- **Universal App Lifecycle**: Implements `onCall`, `onRevert`, and `onAbort` for robust cross-chain messaging
- **Automatic Mirroring**: NFTs maintain the same tokenId and metadata across chains
- **Transaction Tracking**: Real-time transaction status and logging

## Architecture

### Smart Contracts

- **UniversalNFT.sol**: ERC721 token with ZetaChain Universal NFT support
- **UniversalNFTBridge.sol**: Handles cross-chain transfers with lifecycle functions
- **IUniversalApp.sol**: Interface for Universal App lifecycle functions

### Frontend

- React 18 with TypeScript
- Ethers.js v6 for blockchain interactions
- Web3Modal for wallet connection
- Tailwind CSS for styling

## Setup Instructions

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- ZetaChain testnet funds (get from [faucet](https://faucet.zetachain.com))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repo-url>
   cd zetachain-universal-nft
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your values
   \`\`\`

4. **Compile smart contracts**
   \`\`\`bash
   npm run compile
   \`\`\`

### Deployment

1. **Deploy to ZetaChain Testnet**
   \`\`\`bash
   npm run deploy:testnet
   \`\`\`

2. **Update environment variables**
   - Copy the deployed contract addresses to `.env.local`
   - Set `NEXT_PUBLIC_NFT_ADDRESS` and `NEXT_PUBLIC_BRIDGE_ADDRESS`

3. **Start the frontend**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Minting an NFT

1. Connect your wallet
2. Go to the "Mint NFT" tab
3. Enter a metadata URI (IPFS or HTTP)
4. Click "Mint NFT"
5. Confirm the transaction in MetaMask

### Bridging an NFT

1. Connect your wallet
2. Go to the "Bridge NFT" tab
3. Enter the token ID of the NFT to bridge
4. Select the destination chain
5. Enter the recipient address
6. Click "Bridge NFT"
7. Confirm the transaction

## Network Configuration

### Supported Networks

| Network | Chain ID | RPC |
|---------|----------|-----|
| ZetaChain Testnet | 7001 | https://zetachain-testnet.g.alchemy.com/v2/demo |
| Goerli | 5 | https://goerli.infura.io/v3/YOUR_KEY |
| Base Testnet | 84531 | https://base-testnet.g.alchemy.com/v2/demo |

### Add to MetaMask

**ZetaChain Testnet:**
- Network Name: ZetaChain Testnet
- RPC URL: https://zetachain-testnet.g.alchemy.com/v2/demo
- Chain ID: 7001
- Currency Symbol: ZETA
- Block Explorer: https://zetachain-testnet.blockscout.com

## Testing

### Run Tests
\`\`\`bash
npm run test
\`\`\`

### Manual Testing Checklist

- [ ] Connect wallet successfully
- [ ] Mint NFT with valid metadata URI
- [ ] View minted NFT in transaction log
- [ ] Bridge NFT to another chain
- [ ] Verify NFT appears on destination chain
- [ ] Test error handling with invalid inputs
- [ ] Check transaction status updates

## Lifecycle Functions

### onCall
Triggered when a cross-chain message arrives from another chain. Mints the NFT on the destination chain.

### onRevert
Triggered when a cross-chain call fails. Restores the NFT to the original owner on the source chain.

### onAbort
Triggered when a cross-chain call cannot be reverted (insufficient funds). Sends the NFT to the abort address to prevent asset loss.

## Troubleshooting

### "Contract address not configured"
- Ensure you've deployed the contracts
- Update `.env.local` with the correct contract addresses

### "Failed to connect wallet"
- Install MetaMask extension
- Ensure you're on a supported network

### Transaction fails with "Chain not connected"
- Verify the destination chain is registered in the UniversalNFT contract
- Check that the connected contract address is correct

### IPFS metadata not loading
- Verify the IPFS URI is correct and accessible
- Use a public IPFS gateway if needed

## Resources

- [ZetaChain Documentation](https://www.zetachain.com/docs)
- [Universal Apps Guide](https://www.zetachain.com/docs/start/app/)
- [Universal NFT Standard](https://www.zetachain.com/docs/developers/standards/nft)
- [ZetaChain Faucet](https://faucet.zetachain.com)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)

## License

MIT

## Support

For issues and questions:
1. Check the [ZetaChain Discord](https://discord.gg/zetachain)
2. Review the [troubleshooting section](#troubleshooting)
3. Open an issue on GitHub
