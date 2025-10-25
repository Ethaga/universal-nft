"use client"

export function FeaturesGrid() {
  const features = [
    {
      title: "Multi-Chain Support",
      description: "Mint and manage NFTs on Ethereum, Base, and ZetaChain",
      icon: "⛓️",
    },
    {
      title: "Instant Bridging",
      description: "Transfer NFTs between chains in seconds with minimal fees",
      icon: "⚡",
    },
    {
      title: "Secure & Decentralized",
      description: "Your assets are always under your control with smart contracts",
      icon: "🔒",
    },
    {
      title: "Gas Optimized",
      description: "Efficient transactions with optimized gas consumption",
      icon: "💰",
    },
    {
      title: "Easy Gallery",
      description: "View and manage all your NFTs in a beautiful interface",
      icon: "🖼️",
    },
    {
      title: "Web3 Native",
      description: "Built with wagmi and ethers for seamless Web3 integration",
      icon: "🚀",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Powerful Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
