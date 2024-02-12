
import React from 'react';

const PaymentScreen = () => {
  const handlePayment = () => {
    const options = {
      key: 'PjSR3cu4rXRCGR6WGTxMkW5y',

      amount: 100, // 100 paise = ₹1
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Payment',
      image: 'https://example.com/your-logo.png', // URL of your company logo
      handler: function (response) {
        console.log('Payment successful:', response);
        alert('Payment successful');
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button onClick={handlePayment}>Pay ₹1</button>
  );
};

export default PaymentScreen;
