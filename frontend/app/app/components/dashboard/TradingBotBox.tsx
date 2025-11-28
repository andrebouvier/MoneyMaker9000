import React from 'react';

const TradingBotBox: React.FC = () => {
  const handleCreateBot = () => {
    alert('Creating a new trading bot');
  };

  return (
    <div className='bg-surface rounded-xl shadow-md p-4 text-center mt-5'>
      {/* Collapsed State */}
      <h1 className='text-xl font-bold text-text group-hover:hidden flex justify-center items-center'>
        TB
      </h1>
      {/* Expanded State */}
      <div className='hidden group-hover:block'>
        <h1 className='text-xl font-bold text-text mb-2'>
          Trading Bot
        </h1>
        <p className='text-text-secondary mb-4'>
          Create and manage your automated trading bots.
        </p>
        <button
          onClick={handleCreateBot}
          className='bg-primary hover:bg-primary-dark text-text font-bold py-2 px-4 rounded'>
          Create New Tradding Bot
        </button>
      </div>
    </div>
  );
};

export default TradingBotBox;
