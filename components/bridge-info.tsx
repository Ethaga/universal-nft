"use client"

export function BridgeInfo() {
  return (
    <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
      <h3 className="text-white font-semibold mb-4">How Bridging Works</h3>
      <div className="space-y-4 text-sm text-slate-400">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-semibold text-xs">
            1
          </div>
          <div>
            <p className="text-white font-medium mb-1">Lock NFT</p>
            <p>Your NFT is locked in the source chain contract</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-semibold text-xs">
            2
          </div>
          <div>
            <p className="text-white font-medium mb-1">Verify</p>
            <p>Cross-chain validators verify the transaction</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-semibold text-xs">
            3
          </div>
          <div>
            <p className="text-white font-medium mb-1">Mint</p>
            <p>NFT is minted on the destination chain</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-semibold text-xs">
            4
          </div>
          <div>
            <p className="text-white font-medium mb-1">Complete</p>
            <p>You receive your NFT on the new chain</p>
          </div>
        </div>
      </div>
    </div>
  )
}
