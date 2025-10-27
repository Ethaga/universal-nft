import React, { useContext } from 'react';
import { WalletContext } from '../../contexts/WalletContext';

const ConnectButton: React.FC = () => {
    const { connectWallet, disconnectWallet, walletAddress } = useContext(WalletContext);

    return (
        <button
            onClick={walletAddress ? disconnectWallet : connectWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
            {walletAddress ? 'Disconnect Wallet' : 'Connect Wallet'}
        </button>
    );
};

export default ConnectButton;