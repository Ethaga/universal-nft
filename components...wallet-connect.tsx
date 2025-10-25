"use client"

import { useState } from "react"
import { ethers } from "ethers"

interface WalletConnectProps {
  onConnect: (address: string, provider: ethers.BrowserProvider) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const addr = accounts[0]

      setAddress(addr)
      setConnected(true)
      onConnect(addr, provider)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress("")
  }

  return (
    <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div>
        <p className="text-slate-400 text-sm">Connected Wallet</p>
        <p className="text-white font-mono text-sm">
          {connected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
        </p>
      </div>
      <button
        onClick={connected ? disconnectWallet : connectWallet}
        disabled={isConnecting}
        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
          connected
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        }`}
      >
        {isConnecting ? "Connecting..." : connected ? "Disconnect" : "Connect Wallet"}
      </button>
    </div>
  )
}
