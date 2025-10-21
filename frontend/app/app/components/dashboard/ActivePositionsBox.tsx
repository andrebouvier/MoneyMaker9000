import React, { useState, useEffect } from 'react';
import { portfolioService, type PositionsResponse } from '~/services/portfolioService';

const ActivePositionBox: React.FC = () => {
  const [positions, setPositions] = useState<PositionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getPortfolioPositions();
        setPositions(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch positions');
        console.error('Error fetching positions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
    
    // Refresh positions every 30 seconds
    const interval = setInterval(fetchPositions, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className='bg-primary-dark rounded-xl shadow-md p-6'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl md:text-3xl font-bold text-text-secondary'>
            Active Positions
          </h1>
        </div>
        <div className='text-center'>
          <div className='animate-pulse'>
            <div className='h-12 bg-gray-300 rounded mb-2'></div>
            <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-primary-dark rounded-xl shadow-md p-6'>
        <div className='mb-6 text-center'>
          <h1 className='text-2xl md:text-3xl font-bold text-text-secondary'>
            Active Positions
          </h1>
        </div>
        <div className='text-center'>
          <p className='text-red-500 text-sm'>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalPositions = positions?.summary.total_positions || 0;
  const totalMarketValue = positions?.summary.total_market_value || 0;
  const totalPnL = positions?.summary.total_unrealized_pnl || 0;
  const pnlPercentage = positions?.summary.pnl_percentage || 0;

  return (
    <div className='bg-primary-dark rounded-xl shadow-md p-6'>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl md:text-3xl font-bold text-text-secondary'>
          Active Positions
        </h1>
      </div>
      <div className='text-center space-y-2'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-text-secondary'>
          {totalPositions}
        </h2>
        <p className='text-text-secondary text-sm'>
          Total Value: {formatCurrency(totalMarketValue)}
        </p>
        <p className={`text-sm font-semibold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          P&L: {formatCurrency(totalPnL)} ({pnlPercentage.toFixed(2)}%)
        </p>
      </div>
      
      {/* Position breakdown */}
      {positions && positions.summary.total_positions > 0 && (
        <div className='mt-4 pt-4 border-t border-gray-300'>
          <div className='grid grid-cols-2 gap-4 text-center text-sm'>
            <div>
              <p className='text-text-secondary font-semibold'>Stocks</p>
              <p className='text-text-secondary'>{positions.summary.stocks_count}</p>
            </div>
            <div>
              <p className='text-text-secondary font-semibold'>Options</p>
              <p className='text-text-secondary'>{positions.summary.options_count}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivePositionBox;
