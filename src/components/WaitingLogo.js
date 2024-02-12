import React from 'react';

const WaitingLogo = ({ alt }) => {
  return (
    <img
      src="https://clipground.com/images/waiting-png-9.png"
      alt={alt || 'Waiting for delivery'}
      style={{ width: '50px', height: '50px' }} // Adjust size as needed
    />
  );
};

export default WaitingLogo;
