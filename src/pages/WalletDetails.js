import React, { useState } from 'react';
import { ArrowLeftIcon, ClipboardIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

function WalletDetails({ wallet, onBack, walletNumber }) {
  const [copyMessages, setCopyMessages] = useState({ sol: '', eth: '' });

  const copyToClipboard = (text, type) => {
    console.log(`Copying ${type} address: ${text}`); // Debugging line
    navigator.clipboard.writeText(text.trim())
      .then(() => {
        navigator.clipboard.readText().then(clipboardText => {
          console.log(`Clipboard content for ${type}: ${clipboardText}`); // Debugging line
        });
        setCopyMessages(prevMessages => ({
          ...prevMessages,
          [type]: 'Copied!'
        }));
      })
      .catch(() => setCopyMessages(prevMessages => ({
        ...prevMessages,
        [type]: 'Failed to copy'
      })));
    setTimeout(() => setCopyMessages(prevMessages => ({
      ...prevMessages,
      [type]: ''
    })), 2000);
  };

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
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium mr-10">SOL: {wallet.sol.trim()}</p>
            <div className="flex items-center">
              <ClipboardIcon
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={() => copyToClipboard(wallet.sol, 'sol')}
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium mr-10">ETH: {wallet.eth.trim()}</p>
            <div className="flex items-center">
              <ClipboardIcon
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={() => copyToClipboard(wallet.eth, 'eth')}
              />
            </div>
          </div>

          {/* Add Send button below the wallet details box */}
          <div className="mt-6 flex justify-center">
            <button className="flex items-center py-2 px-4 rounded-lg text-white bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600">
              <PaperAirplaneIcon className="h-6 w-6 mr-2" style={{ transform: 'rotate(0deg)' }} />
              Send
            </button>
          </div>
        </div>

        {/* Copied message display */}
        <div className="mt-4">
          {copyMessages.sol && (
            <p className="text-green-400">{copyMessages.sol}</p>
          )}
          {copyMessages.eth && (
            <p className="text-green-400">{copyMessages.eth}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletDetails;
