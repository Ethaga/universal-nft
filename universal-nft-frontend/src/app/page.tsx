import React from 'react';
import { WalletProvider } from './wallet/WalletProvider';
import Navbar from './components/Navbar';
import NFTList from './components/NFTList';
import MintForm from './components/MintForm';
import BridgeForm from './components/BridgeForm';

const HomePage = () => {
  return (
    <WalletProvider>
      <div className="flex flex-col items-center">
        <Navbar />
        <h1 className="text-3xl font-bold my-4">Universal NFT Marketplace</h1>
        <MintForm />
        <NFTList />
        <BridgeForm />
      </div>
    </WalletProvider>
  );
};

export default HomePage;