export interface NFT {
    id: string;
    metadataURI: string;
    owner: string;
    createdAt: Date;
}

export interface TransactionStatus {
    pending: boolean;
    success: boolean;
    error?: string;
}

export interface WalletConnection {
    address: string | null;
    isConnected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}