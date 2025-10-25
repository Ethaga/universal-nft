"use client"

import { useAccount } from "wagmi"
import { Navigation } from "@/components/navigation"
import { MintForm } from "@/components/mint-form"
import { MintHistory } from "@/components/mint-history"
import Link from "next/link"

export default function MintPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
            <p className="text-slate-400 mb-8">You need to connect your wallet to mint NFTs</p>
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mint Your NFT</h1>
            <p className="text-slate-400 text-lg">Create a unique NFT and mint it to your chosen blockchain</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MintForm />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
                  <h3 className="text-white font-semibold mb-4">Minting Info</h3>
                  <div className="space-y-3 text-sm text-slate-400">
                    <div>
                      <p className="text-slate-300 font-medium mb-1">Supported Chains</p>
                      <p>Ethereum, Base, ZetaChain</p>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium mb-1">Gas Fees</p>
                      <p>Varies by network and congestion</p>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium mb-1">Metadata</p>
                      <p>Stored on-chain for permanence</p>
                    </div>
                  </div>
                </div>

                <MintHistory />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
