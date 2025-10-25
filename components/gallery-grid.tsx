"use client"

import { useState, useEffect } from "react"
import { NFTCard } from "./nft-card"

interface NFT {
  id: string
  name: string
  image: string
  chain: string
  chainName: string
  rarity: string
  owner: string
}

interface GalleryGridProps {
  selectedChain: string
  searchQuery: string
}

export function GalleryGrid({ selectedChain, searchQuery }: GalleryGridProps) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading NFTs
    const timer = setTimeout(() => {
      const mockNFTs: NFT[] = [
        {
          id: "1",
          name: "Cosmic Voyager",
          image: "/cosmic-space-nft.jpg",
          chain: "1",
          chainName: "Ethereum",
          rarity: "Rare",
          owner: "0x1234...5678",
        },
        {
          id: "2",
          name: "Digital Dreams",
          image: "/digital-art-nft.png",
          chain: "8453",
          chainName: "Base",
          rarity: "Epic",
          owner: "0x1234...5678",
        },
        {
          id: "3",
          name: "Quantum Realm",
          image: "/quantum-abstract-nft.jpg",
          chain: "7000",
          chainName: "ZetaChain",
          rarity: "Legendary",
          owner: "0x1234...5678",
        },
        {
          id: "4",
          name: "Neon Nights",
          image: "/neon-cyberpunk-nft.jpg",
          chain: "1",
          chainName: "Ethereum",
          rarity: "Rare",
          owner: "0x1234...5678",
        },
        {
          id: "5",
          name: "Aurora Borealis",
          image: "/aurora-lights-nft.jpg",
          chain: "8453",
          chainName: "Base",
          rarity: "Uncommon",
          owner: "0x1234...5678",
        },
        {
          id: "6",
          name: "Ethereal Essence",
          image: "/ethereal-mystical-nft.jpg",
          chain: "7000",
          chainName: "ZetaChain",
          rarity: "Rare",
          owner: "0x1234...5678",
        },
      ]

      setNfts(mockNFTs)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredNFTs = nfts.filter((nft) => {
    const matchesChain = selectedChain === "all" || nft.chain === selectedChain
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesChain && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 rounded-lg bg-slate-800/50 border border-slate-700 animate-pulse" />
        ))}
      </div>
    )
  }

  if (filteredNFTs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">No NFTs found</p>
        <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredNFTs.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  )
}
