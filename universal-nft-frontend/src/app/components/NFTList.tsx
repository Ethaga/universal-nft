import React from 'react';
import { useNFTs } from '../../hooks/useNFTs';
import NFTCard from './NFTCard';

const NFTList: React.FC = () => {
    const { nfts, loading, error } = useNFTs();

    if (loading) {
        return <div>Loading NFTs...</div>;
    }

    if (error) {
        return <div>Error fetching NFTs: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
            ))}
        </div>
    );
};

export default NFTList;