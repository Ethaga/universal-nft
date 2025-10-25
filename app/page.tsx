"use client"
import Link from "next/link"
import { useAccount } from "wagmi"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <main className="pt-20">
        <HeroSection isConnected={isConnected} />
        <FeaturesGrid />
        <StatsSection />
      </main>

      <footer className="border-t border-slate-700 bg-slate-900/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Mint NFTs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Bridge Assets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Chains</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Ethereum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Base
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    ZetaChain
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 Universal NFT dApp. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-400 hover:text-white transition">
                Twitter
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                Discord
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
