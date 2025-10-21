import React, { useState, useEffect } from 'react';
import { portfolioService, type PositionsResponse, type Position } from '~/services/portfolioService';

const PortfolioPositionsTable: React.FC = () => {
  const [positions, setPositions] = useState<PositionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'options' | 'stocks'>('all');

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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getDisplayPositions = (): Position[] => {
    if (!positions) return [];
    
    switch (activeTab) {
      case 'options':
        return positions.options_positions;
      case 'stocks':
        return positions.other_positions;
      default:
        return positions.positions;
    }
  };

  const renderPositionRow = (position: Position, index: number) => (
    <tr key={`${position.symbol}-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        {position.symbol}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {position.sec_type}
      </td>
      {position.sec_type === 'OPT' && (
        <>
          <td className="px-4 py-3 text-sm text-gray-500">
            {position.option_type}
          </td>
          <td className="px-4 py-3 text-sm text-gray-500">
            ${position.strike}
          </td>
          <td className="px-4 py-3 text-sm text-gray-500">
            {position.expiry}
          </td>
        </>
      )}
      <td className="px-4 py-3 text-sm text-gray-500">
        {position.position}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatCurrency(position.average_cost)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {formatCurrency(position.market_value)}
      </td>
      <td className={`px-4 py-3 text-sm font-medium ${
        position.unrealized_pnl >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {formatCurrency(position.unrealized_pnl)}
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="bg-primary rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Portfolio Positions</h2>
        <div className="text-center">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayPositions = getDisplayPositions();

  return (
    <div className="bg-primary rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Portfolio Positions</h2>
        
        {/* Tab navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'all' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({positions?.summary.total_positions || 0})
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'options' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Options ({positions?.summary.options_count || 0})
          </button>
          <button
            onClick={() => setActiveTab('stocks')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeTab === 'stocks' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Stocks ({positions?.summary.stocks_count || 0})
          </button>
        </div>
      </div>

      {displayPositions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No {activeTab === 'all' ? '' : activeTab} positions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                {activeTab !== 'stocks' && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Option Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Strike
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
                    </th>
                  </>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unrealized P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayPositions.map((position, index) => renderPositionRow(position, index))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary footer */}
      {positions && positions.summary.total_positions > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(positions.summary.total_market_value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Unrealized P&L</p>
              <p className={`text-lg font-semibold ${
                positions.summary.total_unrealized_pnl >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(positions.summary.total_unrealized_pnl)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">P&L %</p>
              <p className={`text-lg font-semibold ${
                positions.summary.pnl_percentage >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {positions.summary.pnl_percentage.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Positions</p>
              <p className="text-lg font-semibold text-gray-900">
                {positions.summary.total_positions}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPositionsTable;

