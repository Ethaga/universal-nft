module.exports = {
  reactStrictMode: true,
  env: {
    ZETACHAIN_RPC: process.env.ZETACHAIN_RPC,
    SEPOLIA_RPC: process.env.SEPOLIA_RPC,
    NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};