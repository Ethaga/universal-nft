"use client"

import type React from "react"

import { useState } from "react"
import { useAccount, useChainId } from "wagmi"

export function MintForm() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    chain: "1",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const chains = [
    { id: "1", name: "Ethereum Mainnet" },
    { id: "8453", name: "Base" },
    { id: "7000", name: "ZetaChain" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate minting process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Minting NFT:", {
        ...formData,
        address,
        chainId,
      })

      setSuccess(true)
      setFormData({ name: "", description: "", imageUrl: "", chain: "1" })

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error("[v0] Minting error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700">
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm">
            NFT minted successfully! Check your wallet for the new asset.
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">NFT Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter NFT name"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your NFT"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
            />
            {formData.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-slate-600 h-48">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="NFT Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/nft-preview.jpg"
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Blockchain</label>
            <select
              name="chain"
              value={formData.chain}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-purple-500 transition"
            >
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Minting..." : "Mint NFT"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default MintForm
