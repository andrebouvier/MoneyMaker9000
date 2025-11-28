import React, { useEffect, useState } from 'react';

const AvailableBalanceBox: React.FC = () => {
  const [availableFunds, setAvailableFunds] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const response = await fetch('/api/trading/account-summary');
        if (!response.ok) {
          throw new Error('HTTP error! Status: ${response.status}');
        }
        const data = await response.json();

        if (data && data.AvailableFunds && data.AvailableFunds.length > 0) {
          setAvailableFunds(parseFloat(data.AvailableFunds[0]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumSignificantDigits: 2 }));
        } else {
          setError("AvailableFunds data not found.");
        }
      } catch (e: any) {
        setError(`Failed to fetch available balance: ${e.message}`);
        console.error("Error fetching account summary.", e);
      };
    };
    fetchAccountSummary();
  }, []);

  const getFontSizeClasses = (text: string | null): string => {
    if (!text) {
      return 'text-4xl md:text-5xl';
    }
    const len = text.length;
    if (len > 12) {
      return 'text-3xl md:text-4xl';
    }
    if (len > 9) {
      return 'text-4xl md:text-4xl';
    }
    return 'text-4xl md:text-5xl';
  };

  if (error) {
    return (
      <div className='bg-surface rounded-xl shadow-md p-4 text-center mb-4'>
        <h1 className='text-xl font-bold text-red-500'>Error</h1>
        <p className='text-text-secondary'>{error}</p>
      </div>
    );
  }

  if (availableFunds == null) {
    return (
      <div className='bg-surface rounded-xl shadow-md p-4 text-center mb-4'>
        <h1 className='text-xl font-bold text-text'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl shadow-md p-4 text-center mb-4">
      {/* Collapsed State */}
      <h1 className="text-xl font-bold text-text group-hover:hidden flex justify-center items-center">
        AB
      </h1>
      {/* Expanded State */}
      <div className='hidden group-hover:block'>
        <h1 className='text-xl font-bold text-text mb-2'>
          Available Balance
        </h1>
        <h2 className="${getFontSizeClasses(availableFunds)} font-extrabold text-primary">
          ${availableFunds}
        </h2>
      </div>
    </div>
  );
};

export default AvailableBalanceBox;
