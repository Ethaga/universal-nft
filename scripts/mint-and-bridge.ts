import { ethers } from "hardhat"

async function main() {
  const [signer] = await ethers.getSigners()

  // Contract addresses (replace with your deployed addresses)
  const NFT_ADDRESS = process.env.NFT_ADDRESS || ""
  const BRIDGE_ADDRESS = process.env.BRIDGE_ADDRESS || ""

  if (!NFT_ADDRESS || !BRIDGE_ADDRESS) {
    throw new Error("Please set NFT_ADDRESS and BRIDGE_ADDRESS environment variables")
  }

  const nftAbi = [
    "function mint(address to, string memory metadataURI) external returns (uint256)",
    "function ownerOf(uint256 tokenId) external view returns (address)",
    "function tokenURI(uint256 tokenId) external view returns (string memory)",
  ]

  const bridgeAbi = [
    "function bridgeNFT(uint256 tokenId, uint16 destinationChain, address recipient, bytes calldata message) external payable",
  ]

  const nft = new ethers.Contract(NFT_ADDRESS, nftAbi, signer)
  const bridge = new ethers.Contract(BRIDGE_ADDRESS, bridgeAbi, signer)

  // Mint an NFT
  console.log("Minting NFT...")
  const metadataURI = "ipfs://QmExample/metadata.json" // Replace with actual IPFS URI
  const mintTx = await nft.mint(signer.address, metadataURI)
  const mintReceipt = await mintTx.wait()

  // Extract token ID from events
  const tokenId = 0 // In production, extract from event logs
  console.log("NFT minted with token ID:", tokenId)

  // Bridge to another chain (e.g., Goerli = chain ID 5)
  console.log("Bridging NFT to Goerli...")
  const destinationChain = 5
  const recipient = signer.address
  const message = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint8", "uint256", "address", "string"],
    [1, tokenId, recipient, metadataURI],
  )

  const bridgeTx = await bridge.bridgeNFT(tokenId, destinationChain, recipient, message, {
    value: ethers.parseEther("0.1"), // Adjust gas fee as needed
  })

  const bridgeReceipt = await bridgeTx.wait()
  console.log("Bridge transaction hash:", bridgeReceipt?.hash)
  console.log("✅ NFT bridged successfully!")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
