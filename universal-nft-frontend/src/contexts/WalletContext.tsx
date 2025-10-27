import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const { connect, disconnect, account, provider } = useWallet();
    const [walletConnected, setWalletConnected] = useState(false);

    useEffect(() => {
        if (account) {
            setWalletConnected(true);
        } else {
            setWalletConnected(false);
        }
    }, [account]);

    return (
        <WalletContext.Provider value={{ walletConnected, connect, disconnect, account, provider }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => {
    return useContext(WalletContext);
};