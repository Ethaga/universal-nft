import React from 'react';
import Link from 'next/link';
import { useWallet } from '../../hooks/useWallet';

const Navbar: React.FC = () => {
    const { account, connect, disconnect } = useWallet();

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold">
                <Link href="/">UniversalNFT</Link>
            </div>
            <div className="flex items-center">
                <Link href="/nfts" className="mr-4">NFTs</Link>
                <Link href="/mint" className="mr-4">Mint</Link>
                <Link href="/bridge" className="mr-4">Bridge</Link>
                {account ? (
                    <div className="flex items-center">
                        <span className="mr-2">{account}</span>
                        <button onClick={disconnect} className="bg-red-500 px-3 py-1 rounded">Disconnect</button>
                    </div>
                ) : (
                    <button onClick={connect} className="bg-blue-500 px-3 py-1 rounded">Connect Wallet</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;