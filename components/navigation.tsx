"use client"

import Link from "next/link"
import { WalletButton } from "./wallet-button"

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NFT</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">Universal NFT</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/mint" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Mint
            </Link>
            <Link href="/gallery" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Gallery
            </Link>
            <Link href="/bridge" className="text-slate-300 hover:text-white transition text-sm font-medium">
              Bridge
            </Link>
          </div>

          <WalletButton />
        </div>
      </div>
    </nav>
  )
}
