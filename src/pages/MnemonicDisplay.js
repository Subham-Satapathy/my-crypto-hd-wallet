import React, { useState } from 'react';
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = async () => {
    if (isChecked) {
      await generateInitialWallet();
      setView('wallet');
    } else {
      alert('Please check the box before continuing.');
    }
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic)
      .then(() => alert('Mnemonic copied to clipboard!'))
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

      // Set initial wallet
      setWallets([{ sol: keypair.publicKey.toBase58(), eth: wallet.address }]);
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
      setWallets([...wallets, { sol: keypair.publicKey.toBase58(), eth: wallet.address }]);
    } catch (err) {
      console.error('Failed to generate new wallet:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      {view === 'form' && (
        <>
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
            Secret Recovery Phrase
          </h2>
          <p className="text-xl mb-6 drop-shadow-lg">
            This is your Secret Recovery Phrase. Write it down and keep it safe.
          </p>

          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-w-2xl">
            <div className="grid grid-cols-3 gap-4">
              {mnemonicWords.map((word, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 text-white p-3 rounded-lg text-center font-semibold shadow-md"
                >
                  {index + 1}. {word}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleCopyMnemonic}
              className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Copy to Clipboard
            </button>

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
              className="mt-6 py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600"
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
    </div>
  );
}

export default MnemonicDisplay;
