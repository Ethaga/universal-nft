"use client"

import { ConnectKitButton } from "connectkit"

export function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, truncatedAddress }) => (
        <button
          onClick={show}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-700 hover:to-cyan-700 transition-all duration-200"
        >
          {isConnecting ? "Connecting..." : isConnected ? truncatedAddress : "Connect Wallet"}
        </button>
      )}
    </ConnectKitButton.Custom>
  )
}
