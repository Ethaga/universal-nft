"use client"

import { useState } from "react"
import type { ethers } from "ethers"
import WalletConnect from "@/components/wallet-connect"
import MintForm from "@/components/mint-form"
import BridgeForm from "@/components/bridge-form"
import TransactionLog from "@/components/transaction-log"

export default function Home() {
  const [account, setAccount] = useState<string>("")
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<"mint" | "bridge">("mint")

  const handleWalletConnect = async (addr: string, prov: ethers.BrowserProvider) => {
    setAccount(addr)
    setProvider(prov)
  }

  const addTransaction = (tx: any) => {
    setTransactions([tx, ...transactions])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mint Once, Launch Everywhere</h1>
          <p className="text-slate-300">Universal NFT dApp powered by ZetaChain</p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect onConnect={handleWalletConnect} />
        </div>

        {account && provider ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("mint")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === "mint" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Mint NFT
                </button>
                <button
                  onClick={() => setActiveTab("bridge")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === "bridge" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Bridge NFT
                </button>
              </div>

              {/* Forms */}
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                {activeTab === "mint" ? (
                  <MintForm account={account} provider={provider} onTransaction={addTransaction} />
                ) : (
                  <BridgeForm account={account} provider={provider} onTransaction={addTransaction} />
                )}
              </div>
            </div>

            {/* Transaction Log */}
            <div className="lg:col-span-1">
              <TransactionLog transactions={transactions} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Connect your wallet to get started</p>
          </div>
        )}
      </div>
    </main>
  )
}
