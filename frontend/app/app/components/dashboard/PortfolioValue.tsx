import React, { useState, useEffect } from 'react';
import { portfolioService, type AccountResponse, type PerformanceResponse } from '~/services/portfolioService';

interface PortfolioValueBoxProps {
  availableBalance?: number; // Keep for backward compatibility
}

const PortfolioValueBox: React.FC<PortfolioValueBoxProps> = ({ availableBalance: fallbackBalance }) => {
  const [accountData, setAccountData] = useState<AccountResponse | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both account summary and performance data
        const [account, performance] = await Promise.all([
          portfolioService.getAccountSummary(),
          portfolioService.getPortfolioPerformance(30)
        ]);
        
        setAccountData(account);
        setPerformanceData(performance);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return 'N/A';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const getPortfolioValue = () => {
    if (accountData?.account_summary.net_liquidation && accountData.account_summary.net_liquidation !== 'N/A') {
      return parseFloat(accountData.account_summary.net_liquidation);
    }
    return fallbackBalance || 0;
  };

  const getPerformancePercentage = () => {
    if (performanceData?.current_metrics.pnl_percentage !== undefined) {
      return performanceData.current_metrics.pnl_percentage;
    }
    return 5.2; // Fallback value
  };

  if (loading) {
    return (
      <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-2">
            Total Portfolio Value
          </h1>
        </div>
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-2">
            Total Portfolio Value
          </h1>
        </div>
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const portfolioValue = getPortfolioValue();
  const performancePercentage = getPerformancePercentage();
  const isPositive = performancePercentage >= 0;

  return (
    <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-text-secondary mb-2">
          Total Portfolio Value
        </h1>
      </div>
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
          {formatCurrency(portfolioValue)}
        </h2>
        <p className={`mt-2 text-text-secondary font-semibold flex justify-center items-center ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? '+' : ''}{performancePercentage.toFixed(2)}% since last month
        </p>
        
        {/* Additional account info */}
        {accountData && (
          <div className="mt-4 pt-4 border-t border-gray-300 text-xs text-text-secondary space-y-1">
            <div className="flex justify-between">
              <span>Cash:</span>
              <span>{formatCurrency(accountData.account_summary.total_cash_value)}</span>
            </div>
            <div className="flex justify-between">
              <span>Buying Power:</span>
              <span>{formatCurrency(accountData.account_summary.buying_power)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioValueBox;
