import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

function Home({ onCreateWallet, onImportWallet }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleImportWalletClick = () => {
    // Show the modal when Import Wallet button is clicked
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700'
          : 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
        }`}
      >
        {isDarkMode ? '🌙 Light Mode' : '🌑 Dark Mode'}
      </button>
      <h2 className="text-4xl font-extrabold mb-4 animate-slide-in drop-shadow-lg text-white">
        Welcome to Your Crypto HD Wallet
      </h2>
      <p className="text-xl text-gray-100 text-center animate-fade-in-up mb-6">
        Manage your digital assets securely with cutting-edge HD wallet technology.
        <br /> Generate, store, and protect your crypto keys with ease.
      </p>
      <p className="text-lg text-white text-center animate-fade-in-up mb-6">
        "Your financial future is in your hands. Take control, stay decentralized."
      </p>
      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={onCreateWallet}
          className={`py-3 px-6 rounded-lg shadow-lg text-white transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-1000'
              : 'bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600'
          }`}
        >
          Create a new wallet
        </button>
        <button
          onClick={handleImportWalletClick} // Show the warning modal
          className={`py-3 px-6 rounded-lg shadow-lg text-white transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-1000'
              : 'bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600'
          }`}
        >
          Import existing wallet
        </button>
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

export default Home;
