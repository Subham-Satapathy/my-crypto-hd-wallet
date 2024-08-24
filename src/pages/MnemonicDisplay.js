import React, { useState, useEffect } from 'react';
import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import { Wallet, HDNodeWallet } from 'ethers';
import WalletDashboard from './WalletDashboard';

function MnemonicDisplay({ mnemonic }) {
  const mnemonicWords = mnemonic.split(' ');
  const [isChecked, setIsChecked] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [view, setView] = useState('form');
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard'); // Add state for copy status
  const [warning, setWarning] = useState(''); // Add state for warning message

  useEffect(() => {
    // Retrieve stored public keys from localStorage when the component mounts
    const storedWallets = JSON.parse(localStorage.getItem('wallets')) || [];
    setWallets(storedWallets);
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = async () => {
    if (isChecked) {
      await generateInitialWallet();
      setView('wallet');
      setWarning(''); // Clear any existing warnings
    } else {
      setWarning('Please check the box before continuing.');
    }
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic)
      .then(() => {
        setCopyStatus('Mnemonic copied!');
        // Reset the button text back to original after 1 second
        setTimeout(() => {
          setCopyStatus('Copy to Clipboard');
        }, 1000);
      })
      .catch((err) => console.error('Failed to copy mnemonic:', err));
  };

  const generateInitialWallet = async () => {
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const ethPath = `m/44'/60'/${0}'/0'`;
      const solPath = `m/44'/501'/${0}'/0'`;

      // ETH Key Generation
      const hdNode = HDNodeWallet.fromSeed(seed);
      const childEth = hdNode.derivePath(ethPath);
      const wallet = new Wallet(childEth.privateKey);

      // SOL Key Generation
      const derivedSeed = derivePath(solPath, seed.toString('hex')).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      // Set initial wallet and store in localStorage
      const initialWallet = [{ sol: keypair.publicKey.toBase58(), eth: wallet.address }];
      setWallets(initialWallet);
      localStorage.setItem('wallets', JSON.stringify(initialWallet));
    } catch (err) {
      console.error('Failed to generate initial wallet:', err);
    }
  };

  const addNewWallet = async () => {
    try {
      const seed = await mnemonicToSeed(mnemonic);

      // Solana Key Generation
      const solPath = `m/44'/501'/${wallets.length}'/0'`;
      const derivedSeedSol = derivePath(solPath, seed.toString('hex')).key;
      const secretSol = nacl.sign.keyPair.fromSeed(derivedSeedSol).secretKey;
      const keypair = Keypair.fromSecretKey(secretSol);

      // Ethereum Key Generation
      const ethPath = `m/44'/60'/${wallets.length}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const childEth = hdNode.derivePath(ethPath);
      const wallet = new Wallet(childEth.privateKey);

      // Add new wallet
      const newWallets = [...wallets, { sol: keypair.publicKey.toBase58(), eth: wallet.address }];
      setWallets(newWallets);
      localStorage.setItem('wallets', JSON.stringify(newWallets));
    } catch (err) {
      console.error('Failed to generate new wallet:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 text-white mb-16">
        {view === 'form' && (
          <>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-lg text-center">
              Secret Recovery Phrase
            </h2>
            <p className="text-lg sm:text-xl mb-6 drop-shadow-lg text-center">
              This is your Secret Recovery Phrase. Write it down and keep it safe.
            </p>

            <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mnemonicWords.map((word, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-20 text-white p-2 sm:p-3 rounded-lg text-center font-semibold shadow-md"
                  >
                    {index + 1}. {word}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col items-center">
              <button
                onClick={handleCopyMnemonic}
                className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                {copyStatus}
              </button>

              {warning && (
                <div className="mt-4 text-yellow-500 text-center">{warning}</div>
              )}

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="savePhrase"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="savePhrase" className="text-white">
                  I have saved my secret recovery phrase safely
                </label>
              </div>

              <button
                onClick={handleContinue}
                className="mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 hover:from-purple-600 hover:via-pink-700 hover:to-red-600"
              >
                View my wallet
              </button>
            </div>
          </>
        )}

        {view === 'wallet' && (
          <WalletDashboard
            wallets={wallets}
            onAddWallet={addNewWallet}
          />
        )}
      </main>
      <footer className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-4 px-6 sm:px-8 lg:px-12 text-center animate-fade-in animate-slide-up transition-colors duration-1000">
        <p className="text-xs sm:text-sm md:text-base">
          &copy; 2024 NovaCrypt. All rights reserved.<br />
          Made with ❤️ from India
        </p>
      </footer>
    </div>
  );
}

export default MnemonicDisplay;
