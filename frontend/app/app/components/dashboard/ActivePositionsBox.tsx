import React, { useEffect, useState } from 'react';

interface PortfolioItem {
  secType: string;
  position: number;
}

const ActivePositionBox: React.FC = () => {
  const [optionContracts, setOptionContracts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/trading/portfolio');
        if (response.ok) {
          const data: PortfolioItem[] = await response.json();
          const count = data
            .filter((item) => item.secType === 'OPT')
            .reduce((acc, item) => acc + Math.abs(item.position), 0);
          setOptionContracts(count);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);
  return (
    <div className='bg-surface rounded-xl shadow-md p-4 text-center'>
      {/* Collapsed State */}
      <h1 className='text-xl font-bold text-text group-hover:hidden flex justify-center items-center'>
        AO
      </h1>

      {/* Expanded State */}
      <div className='hidden group-hover:block'>
        <h1 className='text-xl font-bold text-text mb-2'>
          Active Options
        </h1>
        <h2 className='text-4xl md:text-5xl font-extrabold text-primary'>
          {loading ? '...' : optionContracts.toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default ActivePositionBox;
