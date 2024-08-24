import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import the arrow icon from Heroicons

function WalletDetails({ wallet, onBack, walletNumber }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <button
        onClick={onBack}
        className="flex items-center mb-4 py-2 px-4 rounded-lg text-white bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600"
      >
        <ArrowLeftIcon className="h-6 w-6 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Wallet {walletNumber}</h2>

        <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md text-white">
          <p className="text-lg font-medium">SOL: {wallet.sol}</p>
          <p className="text-lg font-medium">ETH: {wallet.eth}</p>

          <div className="mt-6 space-y-4">
            <button className="py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600">
              Send
            </button>
            <button className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
              Receive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletDetails;
