import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer'; // Import Buffer from the buffer package
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import Footer from './components/Layout/Footer';
import MouseEffect from './components/MouseEffect/MouseEffect';
import MnemonicDisplay from './pages/MnemonicDisplay';
import WalletDashboard from './pages/WalletDashboard';
import './styles/App.css';

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

function App() {
  const [currentView, setCurrentView] = useState('home'); // State to manage current view
  const [mnemonic, setMnemonic] = useState(''); // State for mnemonic

  useEffect(() => {
    // Check if a hashed password is present in localStorage and navigate accordingly
    const userPasswordHash = localStorage.getItem('userPasswordHash');
    console.log(`userPasswordHash: ${userPasswordHash}`); // Debug log
    
    // if (userPasswordHash) {
    //   setCurrentView('dashboard'); // Redirect to WalletDashboard if hash exists
    // }
  }, []); // Empty dependency array to run only once on mount

  const handleCreateWallet = () => {
    setCurrentView('wallet'); // Navigate to Wallet view
  };

  const handleImportWallet = () => {
    alert('Import existing wallet feature is not implemented.');
  };

  const handleGenerateMnemonic = (mnemonic) => {
    setMnemonic(mnemonic);
    setCurrentView('mnemonic'); // Navigate to mnemonic view
  };

  const handleViewWallet = () => {
    setCurrentView('dashboard'); // Navigate to WalletDashboard view
  };

  return (
    <div className="App">
      <main>
        {currentView === 'home' && (
          <Home
            onCreateWallet={handleCreateWallet}
            onImportWallet={handleImportWallet}
          />
        )}
        {currentView === 'wallet' && <Wallet onMnemonicGenerated={handleGenerateMnemonic} />}
        {currentView === 'transactions' && <Transactions />}
        {currentView === 'mnemonic' && (
          <MnemonicDisplay mnemonic={mnemonic} onViewWallet={handleViewWallet} />
        )}
        {currentView === 'dashboard' && <WalletDashboard />}
      </main>
      <Footer />
      <MouseEffect />
    </div>
  );
}

export default App;
