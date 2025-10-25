"use client"

import { useState } from "react"

interface NFTCardProps {
  nft: {
    id: string
    name: string
    image: string
    chain: string
    chainName: string
    rarity: string
    owner: string
  }
}

export function NFTCard({ nft }: NFTCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const rarityColors: Record<string, string> = {
    Common: "bg-slate-600",
    Uncommon: "bg-green-600",
    Rare: "bg-blue-600",
    Epic: "bg-purple-600",
    Legendary: "bg-yellow-600",
  }

  return (
    <div className="group rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="relative overflow-hidden h-64 bg-slate-700">
        <img
          src={nft.image || "/placeholder.svg"}
          alt={nft.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${rarityColors[nft.rarity] || rarityColors.Common}`}
        >
          {nft.rarity}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 truncate">{nft.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Chain</span>
            <span className="text-white font-medium">{nft.chainName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Owner</span>
            <span className="text-white font-mono text-xs">{nft.owner}</span>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 hover:from-purple-600/30 hover:to-cyan-600/30 transition-all text-sm font-medium"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 text-sm">
            <div>
              <p className="text-slate-400 mb-1">Token ID</p>
              <p className="text-white font-mono text-xs break-all">0x{nft.id.padStart(64, "0")}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Contract</p>
              <p className="text-white font-mono text-xs">0x{nft.chain}...contract</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
