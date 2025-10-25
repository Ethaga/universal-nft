"use client"

import { useState, useEffect } from "react"

interface BridgeTransaction {
  id: string
  nftName: string
  fromChain: string
  toChain: string
  status: "pending" | "completed" | "failed"
  timestamp: string
}

export function BridgeHistory() {
  const [history, setHistory] = useState<BridgeTransaction[]>([])

  useEffect(() => {
    // Simulate loading bridge history
    const mockHistory: BridgeTransaction[] = [
      {
        id: "1",
        nftName: "Cosmic Voyager",
        fromChain: "Ethereum",
        toChain: "Base",
        status: "completed",
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        nftName: "Digital Dreams",
        fromChain: "Base",
        toChain: "ZetaChain",
        status: "pending",
        timestamp: "30 minutes ago",
      },
      {
        id: "3",
        nftName: "Quantum Realm",
        fromChain: "ZetaChain",
        toChain: "Ethereum",
        status: "completed",
        timestamp: "1 day ago",
      },
    ]
    setHistory(mockHistory)
  }, [])

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    completed: "bg-green-500/10 text-green-400 border-green-500/30",
    failed: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  return (
    <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">Bridge History</h3>
      {history.length === 0 ? (
        <p className="text-slate-400 text-sm">No bridge transactions yet</p>
      ) : (
        <div className="space-y-3">
          {history.map((tx) => (
            <div key={tx.id} className="p-3 rounded bg-slate-700/50 border border-slate-600">
              <div className="flex justify-between items-start mb-2">
                <p className="text-white text-sm font-medium truncate">{tx.nftName}</p>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[tx.status]}`}>
                  {tx.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                {tx.fromChain} → {tx.toChain}
              </p>
              <p className="text-slate-500 text-xs mt-1">{tx.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
