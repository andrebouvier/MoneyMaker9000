import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { portfolioService, type PortfolioHistoryResponse } from '~/services/portfolioService';

interface PortfolioOverviewChartProps {
  onError?: (error: string) => void;
}

const PortfolioOverviewChart: React.FC<PortfolioOverviewChartProps> = ({ onError }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistoryResponse | null>(null);

  const periods = [
    { label: '7D', days: 7 },
    { label: '30D', days: 30 },
    { label: '90D', days: 90 },
    { label: '1Y', days: 365 }
  ];

  const fetchPortfolioHistory = async (days: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await portfolioService.getPortfolioHistory(days);
      setPortfolioHistory(data);
      
      // Transform data for the chart
      const formattedData = data.history.map(item => ({
        date: new Date(item.date).getTime(),
        value: item.value,
        formattedDate: new Date(item.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      }));
      
      setChartData(formattedData);
      
      if (onError) {
        onError('');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch portfolio history';
      setError(errorMessage);
      setChartData([]);
      
      if (onError) {
        onError(errorMessage);
      }
      console.error('Error fetching portfolio history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioHistory(selectedPeriod);
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchPortfolioHistory(selectedPeriod);
    }, 300000);
    
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };

  const formatTooltipLabel = (label: number) => {
    return new Date(label).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getChartColor = () => {
    if (chartData.length < 2) return '#000000';
    
    const firstValue = chartData[0].value;
    const lastValue = chartData[chartData.length - 1].value;
    
    return lastValue >= firstValue ? '#10b981' : '#ef4444'; // green for gains, red for losses
  };

  const calculatePerformance = () => {
    if (chartData.length < 2) return { change: 0, percentage: 0 };
    
    const firstValue = chartData[0].value;
    const lastValue = chartData[chartData.length - 1].value;
    
    const change = lastValue - firstValue;
    const percentage = firstValue > 0 ? (change / firstValue) * 100 : 0;
    
    return { change, percentage };
  };

  const performance = calculatePerformance();

  if (loading) {
    return (
      <div className="bg-primary rounded-xl shadow-md p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Portfolio Overview
          </h1>
        </div>
        
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary rounded-xl shadow-md p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Portfolio Overview
          </h1>
        </div>
        
        <div className="text-center py-8">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button 
            onClick={() => fetchPortfolioHistory(selectedPeriod)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary rounded-xl shadow-md p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Portfolio Overview
          </h1>
          {portfolioHistory && (
            <div className="mt-2 flex items-center space-x-4 text-sm">
              <span className="text-gray-600">
                Current Value: <span className="font-semibold">{formatCurrency(portfolioHistory.current_value)}</span>
              </span>
              <span className={`font-semibold ${performance.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {performance.change >= 0 ? '+' : ''}{formatCurrency(performance.change)} ({performance.percentage.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
        
        {/* Period selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.days}
              onClick={() => setSelectedPeriod(period.days)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedPeriod === period.days 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container relative w-full h-80 md:h-96">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                type="number"
                scale="time"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => {
                  const date = new Date(tick);
                  return selectedPeriod <= 7 
                    ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
                interval={selectedPeriod <= 7 ? 0 : 'preserveStart'}
                stroke="#666"
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                stroke="#666"
              />
              <Tooltip 
                labelFormatter={(label) => formatTooltipLabel(label)}
                formatter={(value: number) => [formatTooltipValue(value), 'Portfolio Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getChartColor()}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: getChartColor() }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>

      {/* Additional info */}
      {portfolioHistory?.note && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> {portfolioHistory.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioOverviewChart;

