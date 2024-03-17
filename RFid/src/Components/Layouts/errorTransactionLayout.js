import React from 'react';

const ErrorTransactionLayout = ({ amount, description }) => {
  return (
    <div className="transaction">
      <h2> Transaction Error</h2>
      <div className="transaction-amount">Transaction Amount: {amount}</div>
      <div className="transaction-description">Description: {description}</div>
    </div>
  );
};

export default ErrorTransactionLayout;
