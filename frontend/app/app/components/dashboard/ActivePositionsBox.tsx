import React from 'react';

const ActivePositionBox: React.FC = () => {
  return (
    <div className='bg-primary-dark rounded-xl shadow-md p-6'>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl md:text-3xl font-bold text-text-secondary'>
          Active Positions
        </h1>
      </div>
      <div className='text-center'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-text-secondary'>
          {(Math.floor(Math.random() * 25) + 1).toLocaleString()}
        </h2>
      </div>
    </div>

  );
};

export default ActivePositionBox;
