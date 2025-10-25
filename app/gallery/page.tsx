"use client"

import { useAccount } from "wagmi"
import { Navigation } from "@/components/navigation"
import { GalleryGrid } from "@/components/gallery-grid"
import { GalleryFilters } from "@/components/gallery-filters"
import { useState } from "react"
import Link from "next/link"

export default function GalleryPage() {
  const { isConnected } = useAccount()
  const [selectedChain, setSelectedChain] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">View Your Collection</h1>
            <p className="text-slate-400 mb-8">Connect your wallet to see your NFTs</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your NFT Gallery</h1>
            <p className="text-slate-400 text-lg">Manage and showcase your NFT collection across all chains</p>
          </div>

          <GalleryFilters
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <GalleryGrid selectedChain={selectedChain} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  )
}
