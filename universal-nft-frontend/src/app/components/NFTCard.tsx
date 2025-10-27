import React from 'react';

interface NFTCardProps {
  title: string;
  imageUrl: string;
  description: string;
  onMint: () => void;
  onBridge: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ title, imageUrl, description, onMint, onBridge }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-700 mt-1">{description}</p>
      <div className="mt-4 flex justify-between">
        <button onClick={onMint} className="bg-blue-500 text-white py-2 px-4 rounded">
          Mint
        </button>
        <button onClick={onBridge} className="bg-green-500 text-white py-2 px-4 rounded">
          Bridge
        </button>
      </div>
    </div>
  );
};

export default NFTCard;