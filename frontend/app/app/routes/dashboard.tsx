import React from 'react';
import Navbar from '../components/layout/Navbar';
import WatchlistBox from '../components/dashboard/WatchlistBox';
import TradingBotBox from '../components/dashboard/TradingBotBox';
import PortfolioValue from '../components/dashboard/PortfolioValue';
import AvailableBalanceBox from '../components/dashboard/AvailableBalanceBox';
import ActivePositionBox from '../components/dashboard/ActivePositionsBox';
import Chart from '../components/dashboard/Chart';
import StrategyLogBox from '~/components/dashboard/StrategyLogBox';

const NewDashboard: React.FC = () => {
  return (
    <div className='flex h-screen bg-background'>
      {/* Navbar */}
      <Navbar />
      {/* Left Sidebar */}
      <div className='group fixed left-0 h-[calc(100vh-106px)] w-20 
        hover:w-64 bg-background-secondary transition-all duration-300 
        ease-in-out z-10 shadow-lg rounded-xl'
        style={{ top: '90px' }}
      >
        <div className='flex flex-col h-full justify-between'>
          <div className='p-4 space-y-4'>
            <PortfolioValue availableBalance={0} />
            <AvailableBalanceBox />
            <ActivePositionBox />
            <TradingBotBox />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col ml-20 main-content-container'>
        <main className='flex-1 p-4 overflow-y-auto'>
          <div className='w-full h-full bg-background-secondary rounded-xl shadow-md'>
            {/* Chart */}
            <Chart />
          </div>
          {/* Strategy Log Box */}
          <StrategyLogBox />
        </main>
      </div>
    </div>
  );
};

export default NewDashboard
