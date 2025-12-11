import React, { useEffect, useState } from 'react';

interface StrategyLogData {
  date: string;
  data: {
    market_report: string;
    sentiment_report: string;
    news_report: string;
    fundamentals_report: string;
    investment_debate_state: any;
    trader_investment_decision: string;
    risk_debate_state: any;
    investment_plan: string;
    final_trade_decision: string;
    [key: string]: any;
  };
}

const StrategyLogBox: React.FC = () => {
  const [logData, setLogData] = useState<StrategyLogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('final_trade_decision');

  useEffect(() => {
    const fetchStrategyLog = async () => {
      try {
        const response = await fetch('/api/trading/strategy-log');
        if (response.ok) {
          const data = await response.json();
          setLogData(data);
        } else {
          setError('Failed to fetch strategy logs');
        }
      } catch (err) {
        setError('Failed to fetch strategy logs');
      } finally {
        setLoading(false);
      }
    };
    fetchStrategyLog();
  }, []);

  if (loading) return <div className='p-4 bg-surface rounded-xl shadow-md text-text'>Loading Strategy Logs...</div>;
  if (error) return <div className='p-4 bg-surface rounded-xl shadow-md text-red-500'>{error}</div>;
  if (!logData) return <div className='p-4 bg-surface rounded-xl shadow-md text-text'>No Strategy Logs Available</div>;

  const sections = [
    { key: 'final_trade_decision', label: 'Final Decision' },
    { key: 'market_report', label: 'Market Report' },
    { key: 'sentiment_report', label: 'Sentiment' },
    { key: 'news_report', label: 'News' },
    { key: 'investment_plan', label: 'Investment Plan' },
  ];

  return (
    <div className='bg-surface rounded-xl shadow-md p-6 mt-4 w-full h-[500px] flex flex-col min-w-0 overflow-hidden'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-text'>Strategy Log ({logData.date})</h2>
        <div className='space-x-2'>
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setExpandedSection(section.key)}
              className={`px-3 py-1 rounded-xl text-sm transition-colors 
                ${expandedSection === section.key
                  ? 'bg-primary text-white'
                  : 'bg-background text-text hover:bg-gray-700'}`}
            >{section.label}</button>
          ))}
        </div>
      </div>

      <div className='flex-1 overflow-auto bg-background p-4 rounded-xl border border-gray-700 font-mono text-sm text-text whitespace-pre-wrap break-words w-full'>
        {expandedSection && logData.data[expandedSection]
          ? typeof logData.data[expandedSection] === 'string'
            ? logData.data[expandedSection]
            : JSON.stringify(logData.data[expandedSection], null, 2)
          : 'Select a section to view details.'}
      </div>
    </div>
  );
};

export default StrategyLogBox;
