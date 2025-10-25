"use client"

interface GalleryFiltersProps {
  selectedChain: string
  onChainChange: (chain: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function GalleryFilters({ selectedChain, onChainChange, searchQuery, onSearchChange }: GalleryFiltersProps) {
  const chains = [
    { id: "all", name: "All Chains" },
    { id: "1", name: "Ethereum" },
    { id: "8453", name: "Base" },
    { id: "7000", name: "ZetaChain" },
  ]

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search NFTs by name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => onChainChange(chain.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedChain === chain.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                  : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
