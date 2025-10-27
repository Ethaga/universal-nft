import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { mintNFT } from '../../lib/zeta/zetaClient'; // Assuming mintNFT is a function in zetaClient
import { mintNFT as mintNFTSepolia } from '../../lib/sepolia/sepoliaClient'; // Assuming mintNFT is a function in sepoliaClient

const MintForm = () => {
    const { walletAddress, connected } = useWallet();
    const [metadataURI, setMetadataURI] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMint = async (e) => {
        e.preventDefault();
        if (!metadataURI) {
            setError('Metadata URI is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Choose the appropriate minting function based on the network
            const isZetaChain = true; // Replace with actual logic to determine the network
            if (isZetaChain) {
                await mintNFT(walletAddress, metadataURI);
            } else {
                await mintNFTSepolia(walletAddress, metadataURI);
            }
            alert('NFT minted successfully!');
        } catch (err) {
            setError('Minting failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleMint} className="mint-form">
            <h2 className="text-lg font-bold">Mint a New NFT</h2>
            <input
                type="text"
                placeholder="Enter Metadata URI"
                value={metadataURI}
                onChange={(e) => setMetadataURI(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={!connected || loading}
                className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50' : ''}`}
            >
                {loading ? 'Minting...' : 'Mint NFT'}
            </button>
        </form>
    );
};

export default MintForm;