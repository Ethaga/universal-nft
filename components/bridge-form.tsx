"use client"

import type React from "react"

import { useState } from "react"
import { useAccount } from "wagmi"

export function BridgeForm() {
  const { address } = useAccount()
  const [formData, setFormData] = useState({
    nftAddress: "",
    tokenId: "",
    fromChain: "1",
    toChain: "8453",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const chains = [
    { id: "1", name: "Ethereum Mainnet" },
    { id: "8453", name: "Base" },
    { id: "7000", name: "ZetaChain" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwapChains = () => {
    setFormData((prev) => ({
      ...prev,
      fromChain: prev.toChain,
      toChain: prev.fromChain,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (formData.fromChain === formData.toChain) {
        throw new Error("Source and destination chains must be different")
      }

      // Simulate bridging process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      console.log("[v0] Bridging NFT:", {
        ...formData,
        address,
      })

      setSuccess(true)
      setFormData({
        nftAddress: "",
        tokenId: "",
        fromChain: "1",
        toChain: "8453",
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bridge failed")
      console.error("[v0] Bridge error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-8 rounded-lg bg-slate-800/50 border border-slate-700">
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm">
            NFT bridge initiated! Your asset will arrive on the destination chain shortly.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">{error}</div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">NFT Contract Address</label>
            <input
              type="text"
              name="nftAddress"
              value={formData.nftAddress}
              onChange={handleChange}
              placeholder="0x..."
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Token ID</label>
            <input
              type="text"
              name="tokenId"
              value={formData.tokenId}
              onChange={handleChange}
              placeholder="Enter token ID"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">From Chain</label>
              <select
                name="fromChain"
                value={formData.fromChain}
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

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapChains}
                className="p-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 hover:text-white hover:border-purple-500 transition"
                title="Swap chains"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">To Chain</label>
              <select
                name="toChain"
                value={formData.toChain}
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
          </div>

          <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Estimated Bridge Fee</span>
              <span className="text-white font-semibold">0.05 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Estimated Time</span>
              <span className="text-white font-semibold">5-10 minutes</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Bridging..." : "Bridge NFT"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default BridgeForm
