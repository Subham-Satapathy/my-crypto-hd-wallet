import React, { useState } from 'react';

function MnemonicDisplay({ mnemonic, onViewWallet }) {
  const mnemonicWords = mnemonic.split(' ');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleContinue = () => {
    if (isChecked) {
      if (typeof onViewWallet === 'function') {
        console.log('handleViewWallet function called'); // Debug log
        onViewWallet(); // Call the function passed as prop
      } else {
        console.error('onViewWallet is not a function');
        alert('Error: onViewWallet is not a function');
      }
    } else {
      alert('Please check the box before continuing.');
    }
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic)
      .then(() => alert('Mnemonic copied to clipboard!'))
      .catch((err) => console.error('Failed to copy mnemonic:', err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
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
          Continue
        </button>
      </div>
    </div>
  );
}

export default MnemonicDisplay;
