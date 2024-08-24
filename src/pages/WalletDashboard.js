import React, { useState } from 'react';
import WalletDetails from './WalletDetails'; // Import the new component

function WalletDashboard({ wallets, onAddWallet }) {
  // Debugging: Log the wallets data
  console.log('Wallets:', wallets);

  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletNumber, setWalletNumber] = useState(null);

  const handleWalletClick = (wallet, index) => {
    console.log(`wallet : ${wallet.sol}`);
    console.log(index);
    
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
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg text-center md:text-left">Choose a wallet</h2>
  
      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-6">
          {wallets.length > 0 ? (
            <ul className="space-y-4">
              {wallets.map((wallet, index) => (
                <li
                  key={index}
                  onClick={() => handleWalletClick(wallet, index)}
                  className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md text-white cursor-pointer hover:bg-opacity-30 transition-colors duration-300"
                >
                  <p className="text-sm font-medium">Wallet {index + 1}:</p>
                  <div className="mt-2">
                    <p className="text-lg flex items-center flex-wrap">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-2">SOL</span>
                      <span className="break-words">{wallet.sol.trim() || 'No SOL address available'}</span>
                    </p>
                    <p className="text-lg flex items-center mt-1 flex-wrap">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-2">ETH</span>
                      <span className="break-words">{wallet.eth.trim() || 'No ETH address available'}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center">No wallets available.</p>
          )}
        </div>
  
        <button
          onClick={onAddWallet}
          className="py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600 transition-colors duration-300"
        >
          Add New Wallet
        </button>
      </div>
    </div>
  );
}

export default WalletDashboard;
