"use client"

export function StatsSection() {
  const stats = [
    { label: "NFTs Minted", value: "12,543" },
    { label: "Active Users", value: "3,847" },
    { label: "Chains Supported", value: "3" },
    { label: "Total Volume", value: "$2.4M" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
