import React from 'react';

function WalletDashboard() {
  // Example public key, replace with actual logic
  const publicKey = 'your-public-key-here';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
        Your Wallet
      </h2>
      <p className="text-xl mb-8 drop-shadow-lg">
        Here are your wallet details.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-lg mb-4 font-semibold">Public Key:</p>
        <pre className="bg-gray-700 p-4 rounded-lg overflow-x-auto text-gray-300">{publicKey}</pre>
      </div>
    </div>
  );
}

export default WalletDashboard;
