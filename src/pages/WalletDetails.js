import React, { useState } from 'react';
import { ArrowLeftIcon, ClipboardIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Modal from './Modal'; // Import the Modal component

function WalletDetails({ wallet, onBack, walletNumber }) {
  const [copyMessages, setCopyMessages] = useState({ sol: '', eth: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleSendClick = () => {
    setIsModalVisible(true); // Show the modal when Send button is clicked
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
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

      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg text-center sm:text-left">
          Wallet {walletNumber}
        </h2>

        <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md text-white">
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <p className="text-lg flex items-center mb-4 sm:mb-0 sm:mr-10">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-2">SOL</span>
              <span className="break-words">{wallet.sol.trim() || 'No SOL address available'}</span>
            </p>
            <div className="flex items-center">
              <ClipboardIcon
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={() => copyToClipboard(wallet.sol, 'sol')}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <p className="text-lg flex items-center mb-4 sm:mb-0 sm:mr-10">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium mr-2">ETH</span>
              <span className="break-words">{wallet.eth.trim() || 'No ETH address available'}</span>
            </p>
            <div className="flex items-center">
              <ClipboardIcon
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={() => copyToClipboard(wallet.eth, 'eth')}
              />
            </div>
          </div>

          {/* Add Send button below the wallet details box */}
          <div className="mt-6 flex justify-center">
            <button
              className="flex items-center py-2 px-4 rounded-lg text-white bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600"
              onClick={handleSendClick} // Handle click event
            >
              <PaperAirplaneIcon className="h-6 w-6 mr-2" style={{ transform: 'rotate(0deg)' }} />
              Send
            </button>
          </div>
        </div>

        {/* Copied message display */}
        <div className="mt-4 text-center">
          {copyMessages.sol && (
            <p className="text-green-400">{copyMessages.sol}</p>
          )}
          {copyMessages.eth && (
            <p className="text-green-400">{copyMessages.eth}</p>
          )}
        </div>
      </div>

      {/* Modal for warning message */}
      {isModalVisible && (
        <Modal
          message="Feature coming soon, stay tuned!"
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default WalletDetails;
