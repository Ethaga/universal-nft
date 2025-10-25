"use client"

import { useAccount } from "wagmi"
import { Navigation } from "@/components/navigation"
import { BridgeForm } from "@/components/bridge-form"
import { BridgeInfo } from "@/components/bridge-info"
import { BridgeHistory } from "@/components/bridge-history"
import Link from "next/link"

export default function BridgePage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">Bridge Your NFTs</h1>
            <p className="text-slate-400 mb-8">Connect your wallet to bridge NFTs across chains</p>
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bridge NFTs Across Chains</h1>
            <p className="text-slate-400 text-lg">Transfer your NFTs seamlessly between different blockchains</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BridgeForm />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <BridgeInfo />
                <BridgeHistory />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
