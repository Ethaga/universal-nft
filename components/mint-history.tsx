"use client"

import { useState, useEffect } from "react"

interface MintedNFT {
  id: string
  name: string
  chain: string
  timestamp: string
}

export function MintHistory() {
  const [history, setHistory] = useState<MintedNFT[]>([])

  useEffect(() => {
    // Simulate loading mint history from localStorage
    const stored = localStorage.getItem("mintHistory")
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">Recent Mints</h3>
      {history.length === 0 ? (
        <p className="text-slate-400 text-sm">No NFTs minted yet</p>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 5).map((nft) => (
            <div key={nft.id} className="p-3 rounded bg-slate-700/50 border border-slate-600">
              <p className="text-white text-sm font-medium truncate">{nft.name}</p>
              <p className="text-slate-400 text-xs">{nft.chain}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
