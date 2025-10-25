"use client"

import Link from "next/link"

interface HeroSectionProps {
  isConnected: boolean
}

export function HeroSection({ isConnected }: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Create & Bridge NFTs
          <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Across Chains
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Mint unique NFTs and seamlessly bridge them across multiple blockchain networks. Experience the future of
          cross-chain digital assets.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          {isConnected ? (
            <>
              <Link
                href="/mint"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-200"
              >
                Start Minting
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-3 rounded-lg border border-slate-600 text-white font-semibold hover:bg-slate-800 transition-all duration-200"
              >
                View Gallery
              </Link>
            </>
          ) : (
            <p className="text-slate-400">Connect your wallet to get started</p>
          )}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-white font-semibold mb-2">Create</h3>
          <p className="text-slate-400 text-sm">Mint beautiful NFTs with custom metadata and properties</p>
        </div>
        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition">
          <div className="text-3xl mb-3">🌉</div>
          <h3 className="text-white font-semibold mb-2">Bridge</h3>
          <p className="text-slate-400 text-sm">Transfer your NFTs across multiple blockchain networks</p>
        </div>
        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-green-500/50 transition">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="text-white font-semibold mb-2">Collect</h3>
          <p className="text-slate-400 text-sm">Manage and showcase your NFT collection in one place</p>
        </div>
      </div>
    </section>
  )
}
