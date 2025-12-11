import React, { useEffect, useState } from 'react'

const PortfolioValueBox: React.FC = () => {
  const [netLiquidation, setNetLiquidation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const response = await fetch('/api/trading/account-summary');
        if (!response.ok) {
          throw new Error('HTTP error! Status: ${response.status}');
        }
        const data = await response.json();

        if (data && data.NetLiquidation && data.NetLiquidation.length > 0) {
          setNetLiquidation(parseFloat(data.NetLiquidation[0]).toLocaleString());
        } else {
          setError("NetLiquidation data not found.");
        }
      } catch (e: any) {
        setError(`Failed to fetch portfolio value: ${e.message}`);
        console.error("Error fetching account summary.", e);
      }
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

  if (netLiquidation === null) {
    return (
      <div className='bg-surface rounded-xl shadow-md p-4 text-center mb-4'>
        <h1 className='text-xl font-bold text-text'>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='bg-surface rounded-xl shadow-md p-4 text-center mb-4'>
      <h1 className='text-xl font-bold text-text flex justify-center items-center h-6'>
        <span className="group-hover:hidden">PV</span>
        <span className="hidden group-hover:block">Portfolio Value</span>
      </h1>
      <div className='hidden group-hover:block'>
        <h2 className='${getFontSizeClasses(netLiquidation)} font-extrabold text-primary'>
          ${netLiquidation}
        </h2>
      </div>
    </div>
  )
}

export default PortfolioValueBox;
