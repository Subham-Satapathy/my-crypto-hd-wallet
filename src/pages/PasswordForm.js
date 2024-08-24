import React from 'react';

function PasswordForm({
  password,
  confirmPassword,
  error,
  success,
  strength,
  formSubmitted,
  onPasswordChange,
  onConfirmPasswordChange,
  onCreateWallet
}) {
  const isFormValid = password === confirmPassword && password.length >= 8;

  // Correctly handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onCreateWallet(event); // Call the function passed via props with the event object
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
        Create a password
      </h2>
      <p className="text-xl text-gray-100 text-center animate-fade-in-up mb-6">
        You will use this password to unlock your wallet.
      </p>
      <form
        onSubmit={handleSubmit} // Ensure this is handling the submit event
        className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-800 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-white text-gray-800 placeholder-gray-500"
            placeholder="Password"
          />
          {strength && (
            <p className={`mt-2 text-sm ${
              strength === 'Strong' ? 'text-green-500' : strength === 'Moderate' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              Password Strength: {strength}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-800 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
            className="border border-gray-300 rounded-lg w-full py-2 px-3 bg-white text-gray-800 placeholder-gray-500"
            placeholder="Confirm Password"
          />
          {password !== confirmPassword && confirmPassword && (
            <p className="text-red-500 text-sm mt-2">Passwords don't match</p>
          )}
          {formSubmitted && error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm mt-2">{success}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transition-colors duration-300 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isFormValid} // Disable the button if form is not valid
        >
          Create Wallet
        </button>
      </form>
    </div>
  );
}

export default PasswordForm;
