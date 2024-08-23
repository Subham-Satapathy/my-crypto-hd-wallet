import React from 'react';
import './Emoji.css'; // Import CSS for animation

function Emoji() {
  return (
    <div className="emoji-container animate-bounce">
      <span role="img" aria-label="sparkles" className="emoji">
        ✨
      </span>
    </div>
  );
}

export default Emoji;
