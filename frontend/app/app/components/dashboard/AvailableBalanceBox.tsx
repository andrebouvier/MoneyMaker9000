import React from 'react';

const AvailableBalanceBox: React.FC = () => {
  return (
    <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-2">
          Available Balance
        </h1>
      </div>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
          ${(Math.random() * 5000).toFixed(2)}
        </h2>
      </div>
    </div >
  );
};

export default AvailableBalanceBox;
