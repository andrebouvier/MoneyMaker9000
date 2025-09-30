import React from 'react';

const TradingBotBox: React.FC = () => {
  const handleCreateBot = () => {
    alert('Creating a new trading bot');
  };

  return (
    <div className='bg-primary-dark rounded-xl shadow-md p-6 mt-5'>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl md:text-3xl font-bold text-text-secondary'>
          Trading Bot
        </h1>
      </div>
      <div className='text-center'>
        <p className='text-text-secondary mb-4'>
          Create and manage your automated trading bots.
        </p>
        <button
          onClick={handleCreateBot}
          className='bg-accent hover:bg-primary-dark text-white font-bold py-2 px-4 rounded'>
          Create New Tradding Bot
        </button>
      </div>
    </div>
  );
};

export default TradingBotBox;
