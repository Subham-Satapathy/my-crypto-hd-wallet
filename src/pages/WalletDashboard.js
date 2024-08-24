import React from 'react';

function WalletDashboard({ wallets }) {
  // Example wallets data, replace with actual logic
  const walletData = wallets || [
    { publicKey: 'your-public-key-1' },
    { publicKey: 'your-public-key-2' },
    { publicKey: 'your-public-key-3' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <h2 className="text-5xl font-extrabold mb-8 drop-shadow-lg text-center">
        Your Wallets
      </h2>
      <p className="text-xl mb-10 drop-shadow-lg text-center max-w-lg">
        Here are your wallet details. Keep them safe!
      </p>
      
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {walletData.map((wallet, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 text-white p-6 rounded-lg text-center font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              <p className="mb-4 text-lg font-bold">Wallet {index + 1}</p>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono break-all">
                {wallet.publicKey}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(wallet.publicKey).then(() => alert('Public Key copied to clipboard!'))}
                className="mt-4 py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md"
              >
                Copy Public Key
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WalletDashboard;
