import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { bridgeNFT } from '../../lib/zeta/zetaClient'; // Assuming this function exists in zetaClient

const BridgeForm = () => {
    const { walletAddress } = useWallet();
    const [nftId, setNftId] = useState('');
    const [destinationChain, setDestinationChain] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBridge = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await bridgeNFT(nftId, destinationChain, walletAddress);
            alert('NFT bridged successfully!');
        } catch (err) {
            setError('Failed to bridge NFT: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleBridge} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="NFT ID"
                value={nftId}
                onChange={(e) => setNftId(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Destination Chain"
                value={destinationChain}
                onChange={(e) => setDestinationChain(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className={`p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                {loading ? 'Bridging...' : 'Bridge NFT'}
            </button>
        </form>
    );
};

export default BridgeForm;