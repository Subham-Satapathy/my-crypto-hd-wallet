import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import the arrow icon from Heroicons
import WalletDetails from './WalletDetails'; // Import the new component

function WalletDashboard({ wallets, onAddWallet }) {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletNumber, setWalletNumber] = useState(null);

  const handleWalletClick = (wallet, index) => {
    setSelectedWallet(wallet);
    setWalletNumber(index + 1); // Set wallet number (1-based index)
  };

  const handleBackToDashboard = () => {
    setSelectedWallet(null);
    setWalletNumber(null);
  };

  if (selectedWallet) {
    return (
      <WalletDetails 
        wallet={selectedWallet} 
        onBack={handleBackToDashboard} 
        walletNumber={walletNumber} 
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Choose a wallet</h2>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="mb-6">
          {wallets.length > 0 ? (
            <ul className="space-y-4">
              {wallets.map((wallet, index) => (
                <li
                  key={index}
                  onClick={() => handleWalletClick(wallet, index)}
                  className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md text-white cursor-pointer hover:bg-opacity-30"
                >
                  <p className="text-sm font-medium">Wallet {index + 1}:</p>
                  <p className="text-lg">SOL: {wallet.sol}</p>
                  <p className="text-lg">ETH: {wallet.eth}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No wallets available.</p>
          )}
        </div>

        <button
          onClick={onAddWallet}
          className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600"
        >
          Add New Wallet
        </button>
      </div>
    </div>
  );
}

export default WalletDashboard;
