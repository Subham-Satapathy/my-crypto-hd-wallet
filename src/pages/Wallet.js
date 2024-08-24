import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing
import PasswordForm from './PasswordForm';
import MnemonicDisplay from './MnemonicDisplay';
import WalletDashboard from './WalletDashboard';

function Wallet() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [strength, setStrength] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [view, setView] = useState('passwordForm');

  // Handler for password change
  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword);
    setError('');
    assessPasswordStrength(newPassword);
  };

  // Handler for confirm password change
  const handleConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
    setError('');
  };

  // Assess password strength
  const assessPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && upperCaseCriteria && numberCriteria && specialCharCriteria) {
      setStrength('Strong');
    } else if (lengthCriteria && (upperCaseCriteria || numberCriteria)) {
      setStrength('Moderate');
    } else {
      setStrength('Weak');
    }
  };

  // Handler for wallet creation
  const handleCreateWallet = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isPasswordLengthValid = password.length >= 8;
    const isPasswordMatch = password === confirmPassword;

    let errorMessage = '';

    if (!isPasswordLengthValid) {
      errorMessage = 'Password must be at least 8 characters long';
    } else if (!isPasswordMatch) {
      errorMessage = 'Passwords do not match';
    }

    if (errorMessage) {
      setError(errorMessage);
      setSuccess('');
    } else {
      setSuccess('Wallet created successfully!');
      setError('');

      // Generate mnemonic and reset form
      const mnemonic = generateMnemonic();
      setMnemonic(mnemonic);

      // Hash password and store in localStorage
      const hashedPassword = await bcrypt.hash(password, 10);
      localStorage.setItem('userPasswordHash', hashedPassword);

      setPassword('');
      setConfirmPassword('');
      setStrength('');
      setFormSubmitted(false);
      setView('mnemonic'); // Navigate to MnemonicDisplay view
    }
  };

  // Handler for viewing the wallet
  const handleViewWallet = () => {
    setView('dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 animate-fade-in">
      {view === 'passwordForm' && (
        <PasswordForm
          password={password}
          confirmPassword={confirmPassword}
          error={error}
          success={success}
          strength={strength}
          formSubmitted={formSubmitted}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onCreateWallet={handleCreateWallet}
        />
      )}
      {view === 'mnemonic' && (
        <MnemonicDisplay mnemonic={mnemonic} onViewWallet={handleViewWallet} />
      )}
      {view === 'dashboard' && <WalletDashboard />}
    </div>
  );
}

export default Wallet;
