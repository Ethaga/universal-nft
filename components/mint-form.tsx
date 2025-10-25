"use client"

import type React from "react"

import { useState } from "react"
import { ethers } from "ethers"

interface MintFormProps {
  account: string
  provider: ethers.BrowserProvider
  onTransaction: (tx: any) => void
}

const NFT_ABI = ["function mint(address to, string memory metadataURI) external returns (uint256)"]

export default function MintForm({ account, provider, onTransaction }: MintFormProps) {
  const [metadataURI, setMetadataURI] = useState("")
  const [isMinting, setIsMinting] = useState(false)
  const [error, setError] = useState("")

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsMinting(true)

    try {
      if (!metadataURI.trim()) {
        throw new Error("Please enter a metadata URI")
      }

      const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS
      if (!nftAddress) {
        throw new Error("NFT contract address not configured")
      }

      const signer = await provider.getSigner()
      const nft = new ethers.Contract(nftAddress, NFT_ABI, signer)

      const tx = await nft.mint(account, metadataURI)

      onTransaction({
        type: "mint",
        hash: tx.hash,
        status: "pending",
        timestamp: new Date().toISOString(),
        details: { metadataURI },
      })

      const receipt = await tx.wait()

      onTransaction({
        type: "mint",
        hash: tx.hash,
        status: "success",
        timestamp: new Date().toISOString(),
        details: { metadataURI, blockNumber: receipt?.blockNumber },
      })

      setMetadataURI("")
    } catch (err: any) {
      const errorMsg = err.message || "Failed to mint NFT"
      setError(errorMsg)
      onTransaction({
        type: "mint",
        status: "error",
        timestamp: new Date().toISOString(),
        details: { error: errorMsg },
      })
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <form onSubmit={handleMint} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Metadata URI (IPFS or HTTP)</label>
        <input
          type="text"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
          placeholder="ipfs://QmExample/metadata.json"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {error && <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isMinting}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
      >
        {isMinting ? "Minting..." : "Mint NFT"}
      </button>
    </form>
  )
}
