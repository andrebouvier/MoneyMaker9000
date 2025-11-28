import React from 'react';

const WatchlistBox: React.FC = () => {
  return (
    <div className='bg-surface rounded-xl shadow-md p-4 text-center'>
      <h1 className='text-xl font-bold text-text flex justify-center items-center'>
        <span className='hidden group-hover:inline'>Watchlist</span>
        <span className='group-hover:hidden'>W</span>
      </h1>
    </div>
  );
};

export default WatchlistBox;
