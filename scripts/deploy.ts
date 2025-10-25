import { ethers } from "hardhat"

async function main() {
  console.log("Deploying Universal NFT dApp to ZetaChain Testnet...")

  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)

  // Gateway address on ZetaChain testnet
  const GATEWAY_ADDRESS = "0x9a2c3e7b4A9C04f1Df4B24C7A68e4e7dFf0bFB39" // Replace with actual gateway

  // Deploy UniversalNFT
  console.log("\n1. Deploying UniversalNFT...")
  const UniversalNFT = await ethers.getContractFactory("UniversalNFT")
  const nft = await UniversalNFT.deploy(GATEWAY_ADDRESS)
  await nft.waitForDeployment()
  const nftAddress = await nft.getAddress()
  console.log("UniversalNFT deployed to:", nftAddress)

  // Deploy UniversalNFTBridge
  console.log("\n2. Deploying UniversalNFTBridge...")
  const UniversalNFTBridge = await ethers.getContractFactory("UniversalNFTBridge")
  const bridge = await UniversalNFTBridge.deploy(GATEWAY_ADDRESS, nftAddress)
  await bridge.waitForDeployment()
  const bridgeAddress = await bridge.getAddress()
  console.log("UniversalNFTBridge deployed to:", bridgeAddress)

  // Set bridge address in NFT contract
  console.log("\n3. Setting bridge address in NFT contract...")
  const setTx = await nft.setUniversalNFTBridge(bridgeAddress)
  await setTx.wait()
  console.log("Bridge address set")

  // Register connected chains
  console.log("\n4. Registering connected chains...")
  // Chain IDs: Goerli = 5, Base = 84531, ZetaChain = 7001
  const chains = [
    { id: 5, name: "Goerli", address: "0x0000000000000000000000000000000000000000" },
    { id: 84531, name: "Base Testnet", address: "0x0000000000000000000000000000000000000000" },
  ]

  for (const chain of chains) {
    const registerTx = await nft.setConnected(chain.id, chain.address)
    await registerTx.wait()
    console.log(`Registered ${chain.name} (Chain ID: ${chain.id})`)
  }

  console.log("\n✅ Deployment complete!")
  console.log("UniversalNFT:", nftAddress)
  console.log("UniversalNFTBridge:", bridgeAddress)

  // Save deployment addresses
  const deploymentInfo = {
    network: "zetachain-testnet",
    timestamp: new Date().toISOString(),
    nft: nftAddress,
    bridge: bridgeAddress,
    gateway: GATEWAY_ADDRESS,
  }

  console.log("\nDeployment Info:", JSON.stringify(deploymentInfo, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
