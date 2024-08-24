import React from 'react';

function Modal({ message, onClose }) {
  console.log(message);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h3 className="text-xl font-semibold text-black text-center mb-4">{message}</h3> {/* Ensure this line displays the message */}
        <button
          className="bg-gradient-to-r from-purple-500 via-pink-600 to-red-500 text-white py-2 px-4 rounded-lg w-full hover:from-purple-600 hover:via-pink-700 hover:to-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
