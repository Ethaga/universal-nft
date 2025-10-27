import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const useWallet = () => {
    const { connect, disconnect, account, provider } = useContext(WalletContext);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (account) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, [account]);

    return {
        connect,
        disconnect,
        isConnected,
        account,
        provider,
    };
};

export default useWallet;