"use client"

import type React from "react"

import { useState } from "react"
import { ethers } from "ethers"

interface BridgeFormProps {
  account: string
  provider: ethers.BrowserProvider
  onTransaction: (tx: any) => void
}

const BRIDGE_ABI = [
  "function bridgeNFT(uint256 tokenId, uint16 destinationChain, address recipient, bytes calldata message) external payable",
]

const CHAINS = [
  { id: 5, name: "Goerli" },
  { id: 84531, name: "Base Testnet" },
  { id: 7001, name: "ZetaChain Testnet" },
]

export default function BridgeForm({ account, provider, onTransaction }: BridgeFormProps) {
  const [tokenId, setTokenId] = useState("")
  const [destinationChain, setDestinationChain] = useState("5")
  const [recipient, setRecipient] = useState(account)
  const [isBridging, setIsBridging] = useState(false)
  const [error, setError] = useState("")

  const handleBridge = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsBridging(true)

    try {
      if (!tokenId.trim()) {
        throw new Error("Please enter a token ID")
      }

      const bridgeAddress = process.env.NEXT_PUBLIC_BRIDGE_ADDRESS
      if (!bridgeAddress) {
        throw new Error("Bridge contract address not configured")
      }

      const signer = await provider.getSigner()
      const bridge = new ethers.Contract(bridgeAddress, BRIDGE_ABI, signer)

      const chainId = Number.parseInt(destinationChain)
      const message = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint8", "uint256", "address", "string"],
        [1, tokenId, recipient, "ipfs://metadata"],
      )

      const tx = await bridge.bridgeNFT(tokenId, chainId, recipient, message, {
        value: ethers.parseEther("0.1"),
      })

      onTransaction({
        type: "bridge",
        hash: tx.hash,
        status: "pending",
        timestamp: new Date().toISOString(),
        details: { tokenId, destinationChain, recipient },
      })

      const receipt = await tx.wait()

      onTransaction({
        type: "bridge",
        hash: tx.hash,
        status: "success",
        timestamp: new Date().toISOString(),
        details: { tokenId, destinationChain, recipient, blockNumber: receipt?.blockNumber },
      })

      setTokenId("")
    } catch (err: any) {
      const errorMsg = err.message || "Failed to bridge NFT"
      setError(errorMsg)
      onTransaction({
        type: "bridge",
        status: "error",
        timestamp: new Date().toISOString(),
        details: { error: errorMsg },
      })
    } finally {
      setIsBridging(false)
    }
  }

  return (
    <form onSubmit={handleBridge} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Token ID</label>
        <input
          type="number"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="0"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Destination Chain</label>
        <select
          value={destinationChain}
          onChange={(e) => setDestinationChain(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          {CHAINS.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {error && <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isBridging}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
      >
        {isBridging ? "Bridging..." : "Bridge NFT"}
      </button>
    </form>
  )
}
