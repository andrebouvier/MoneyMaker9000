import React, { useEffect, useState } from 'react';

interface PastTrade {
  run_timestamp_utc: string;
  symbol: string;
  prediction_for_trade_date: string;
  direction: string;
  spread_type: string;
  short_strike: number;
  long_strike: number;
  width: number;
  confidence: number;
}

const PastTradesBox: React.FC = () => {
  const [trades, setTrades] = useState<PastTrade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPastTrades = async () => {
      try {
        const response = await fetch('/api/trading/past-trades');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTrades(data);
      } catch (e: any) {
        setError(`Failed to fetch past trades: ${e.message}`);
        console.error('Error fetching past trades:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPastTrades();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'BUY' ? 'text-green-500' : 'text-red-500';
  };

  if (loading) {
    return (
      <div className='bg-background-secondary rounded-xl shadow-md p-6 mt-4'>
        <h2 className='text-2xl font-bold text-text mb-4'>Past Trades</h2>
        <p className='text-text-secondary'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-background-secondary rounded-xl shadow-md p-6 mt-4'>
        <h2 className='text-2xl font-bold text-text mb-4'>Past Trades</h2>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='bg-background-secondary rounded-xl shadow-md p-6 mt-4'>
      <h2 className='text-2xl font-bold text-text mb-4'>Past Trades</h2>
      {trades.length === 0 ? (
        <p className='text-text-secondary'>No past trades found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Date</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Symbol</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Direction</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Type</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Strikes</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Width</th>
                <th className='text-left py-2 px-3 text-text font-semibold text-sm'>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {trades.slice(0, 20).map((trade, index) => (
                <tr
                  key={index}
                  className='border-b border-border hover:bg-surface transition-colors'
                >
                  <td className='py-2 px-3 text-text-secondary text-sm'>
                    {formatDate(trade.prediction_for_trade_date)}
                  </td>
                  <td className='py-2 px-3 text-text font-medium text-sm'>{trade.symbol}</td>
                  <td className={`py-2 px-3 font-semibold text-sm ${getDirectionColor(trade.direction)}`}>
                    {trade.direction}
                  </td>
                  <td className='py-2 px-3 text-text-secondary text-sm'>
                    {trade.spread_type.replace(/_/g, ' ')}
                  </td>
                  <td className='py-2 px-3 text-text-secondary text-sm'>
                    {trade.short_strike} / {trade.long_strike}
                  </td>
                  <td className='py-2 px-3 text-text-secondary text-sm'>{trade.width}</td>
                  <td className='py-2 px-3 text-text-secondary text-sm'>{trade.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {trades.length > 20 && (
            <p className='text-text-secondary text-sm mt-4 text-center'>
              Showing 20 of {trades.length} trades
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PastTradesBox;

