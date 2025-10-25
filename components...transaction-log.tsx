"use client"

interface Transaction {
  type: "mint" | "bridge"
  hash?: string
  status: "pending" | "success" | "error"
  timestamp: string
  details: any
}

interface TransactionLogProps {
  transactions: Transaction[]
}

export default function TransactionLog({ transactions }: TransactionLogProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-900 text-green-200 border-green-700"
      case "error":
        return "bg-red-900 text-red-200 border-red-700"
      case "pending":
        return "bg-yellow-900 text-yellow-200 border-yellow-700"
      default:
        return "bg-slate-700 text-slate-200 border-slate-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✓"
      case "error":
        return "✕"
      case "pending":
        return "⏳"
      default:
        return "•"
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h2 className="text-lg font-semibold text-white mb-4">Transaction Log</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-sm">No transactions yet</p>
        ) : (
          transactions.map((tx, idx) => (
            <div key={idx} className={`p-3 rounded-lg border text-sm ${getStatusColor(tx.status)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getStatusIcon(tx.status)}</span>
                  <span className="font-semibold capitalize">{tx.type}</span>
                </div>
                <span className="text-xs opacity-75">{new Date(tx.timestamp).toLocaleTimeString()}</span>
              </div>

              {tx.hash && (
                <div className="text-xs font-mono opacity-75 truncate">
                  {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                </div>
              )}

              {tx.details.error && <div className="text-xs mt-1">{tx.details.error}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
