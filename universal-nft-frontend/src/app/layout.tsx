import React from 'react';
import { WalletProvider } from './wallet/WalletProvider';
import '../styles/tailwind.css';

const Layout = ({ children }) => {
    return (
        <WalletProvider>
            <div className="min-h-screen flex flex-col">
                <header>
                    {/* Navbar component can be included here */}
                </header>
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="py-4 text-center">
                    <p>UniversalNFT © {new Date().getFullYear()}</p>
                </footer>
            </div>
        </WalletProvider>
    );
};

export default Layout;