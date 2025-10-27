import { useEffect, useState } from 'react';
import { fetchNFTsFromZetaChain, fetchNFTsFromSepolia } from '../lib/zeta/zetaClient'; // Adjust the import based on your actual function names

const useNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                setLoading(true);
                const zetaNFTs = await fetchNFTsFromZetaChain();
                const sepoliaNFTs = await fetchNFTsFromSepolia();
                setNfts([...zetaNFTs, ...sepoliaNFTs]);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, []);

    return { nfts, loading, error };
};

export default useNFTs;