import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { WalletConnectProvider } from '@walletconnect/web3-provider';
import { InjectedConnector } from '@web3-react/injected-connector';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [connector, setConnector] = useState(null);

    useEffect(() => {
        const initProvider = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        };

        if (window.ethereum) {
            initProvider();
        }
    }, []);

    const connectWallet = async () => {
        if (connector) {
            const accounts = await connector.enable();
            setAccount(accounts[0]);
        } else {
            const connector = new WalletConnectProvider({
                infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            });
            await connector.enable();
            const accounts = await connector.getAccounts();
            setAccount(accounts[0]);
            setConnector(connector);
        }
    };

    const disconnectWallet = async () => {
        if (connector) {
            await connector.killSession();
            setAccount(null);
            setConnector(null);
        } else {
            console.log("No wallet connected");
        }
    };

    return (
        <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};