# UniversalNFT Frontend

## Overview
The UniversalNFT frontend is a Next.js application designed to interact with the UniversalNFT smart contract on both the ZetaChain Testnet and Sepolia Testnet. This application allows users to connect their wallets, list NFTs, mint new NFTs, and bridge NFTs between chains, all while providing a responsive design.

## Features
- **Wallet Connection**: Users can connect their wallets using WalletConnect or MetaMask.
- **NFT Listing**: Displays a list of minted NFTs with their metadata and ownership details.
- **Minting**: Users can mint new NFTs by providing a metadata URI.
- **Bridging**: Users can bridge NFTs to another blockchain.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.

## Project Structure
```
universal-nft-frontend
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── wallet
│   │   │   ├── WalletProvider.tsx
│   │   │   └── ConnectButton.tsx
│   │   ├── components
│   │   │   ├── Navbar.tsx
│   │   │   ├── NFTList.tsx
│   │   │   ├── NFTCard.tsx
│   │   │   ├── MintForm.tsx
│   │   │   └── BridgeForm.tsx
│   │   └── styles
│   │       └── tailwind.css
│   ├── lib
│   │   ├── zeta
│   │   │   └── zetaClient.ts
│   │   ├── sepolia
│   │   │   └── sepoliaClient.ts
│   │   └── web3
│   │       └── provider.ts
│   ├── hooks
│   │   ├── useWallet.ts
│   │   └── useNFTs.ts
│   ├── contexts
│   │   └── WalletContext.tsx
│   └── types
│       └── index.ts
├── public
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd universal-nft-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env` and update the necessary variables, including RPC endpoints and contract addresses for ZetaChain and Sepolia.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage
- Connect your wallet using the Connect button in the Navbar.
- View the list of NFTs and their details.
- Use the Mint form to create new NFTs.
- Bridge NFTs to another chain using the Bridge form.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.