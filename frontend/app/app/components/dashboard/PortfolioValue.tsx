import React from 'react'

interface PortfolioValueBoxProps {
  availableBalance: number;
}

const PortfolioValueBox: React.FC<PortfolioValueBoxProps> = ({ availableBalance }) => {
  return (
    <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-2">
          Total Portfolio Value
        </h1>
      </div>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
          ${availableBalance.toLocaleString()}
        </h2>
        <p className="mt-2 text-text-secondary font-semibold flex justify-center items-center">
          +5.2% since last month
        </p>
      </div>
    </div>
  )
};

export default PortfolioValueBox;
