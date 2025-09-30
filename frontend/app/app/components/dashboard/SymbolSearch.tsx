import React, { useState } from 'react';

interface SymbolSearchProps {
  onDataFetched: (data: any) => void;
  onError: (error: string) => void;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({ onDataFetched, onError }) => {
  const [symbol, setSymbol] = useState('');

  const handleSearch = async () => {
    if (!symbol) {
      onError('Please enter a valid symbol.');
      return;
    }

    // Clearing data for a new search.
    onDataFetched([]);
    onError('');

    console.log(`Searching for symbol: ${symbol}`);
    try {
      const response = await fetch(`/api/trading/market-data/${symbol}`);
      console.log("Response from server:", response);

      if (!response.ok) {
        throw new Error("Symbol not found or an error occurred. Please try again.");
      }

      const data = await response.json();
      console.log("Data from server:", data);
      onDataFetched(data);
      onError('');
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
        onError(error.message);
      } else {
        onError('An unknown error occurred.');
      }
      onDataFetched([]);
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='text'
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder='Enter Symbol (e.g., AAPL)'
        className='p-2 border rounded'
      />
      <button
        onClick={handleSearch}
        className='bg-primary-dark text-white font-bold py-2 px-4 rounded'
      >
        Search
      </button>
    </div>
  );
};

export default SymbolSearch;
