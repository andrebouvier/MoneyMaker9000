{/*
  This is the dashboard page for the app that the user will see after logging in.

  TODO:
  -Create dashboard layout
  -Find component that will display stock data and that will display portfolio data
*/}
import type { Route } from "./+types/app";
import Navbar from "../components/layout/Navbar";

import React, { useState, useEffect } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SymbolSearch from "~/components/dashboard/SymbolSearch";
import PortfolioValueBox from "~/components/dashboard/PortfolioValue";
import ActivePositionBox from "~/components/dashboard/ActivePositionsBox";
import AvailableBalanceBox from "~/components/dashboard/AvailableBalanceBox";
import TradingBotBox from "~/components/dashboard/TradingBotBox";
import WatchlistBox from "~/components/dashboard/WatchlistBox";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];
}


export default function dashboard() {
  const [symbolData, setSymbolData] = useState([]);
  const [error, setError] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    setAvailableBalance(Math.random() * 5000);
  }, []);

  return (
    <div className="h-screen bg-background">
      <Navbar />

      <div className="flex flex-col md:flex-row items-stretch md:items-start justify-center p-4 pt-25 md:space-x-5 max-w-7xl mx-auto">
        <div className="flex flex-col w-full md:w-1/3">
          {/* Account Balance Box */}
          <PortfolioValueBox availableBalance={availableBalance} />

          {/* Available Balance Box */}
          <AvailableBalanceBox />

          {/* Active Positions Box */}
          <ActivePositionBox />
        </div>

        {/* Main Graph Box */}
        <div className="bg-primary rounded-xl shadow-md p-6 w-full md:w-2/3">
          <div className="mb-6 flex justify-between items-center">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ">
              Portfolio Overview
            </h1>
            <SymbolSearch onDataFetched={setSymbolData} onError={setError} />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Graph */}
          <div className="chart-container relatice w-full h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={symbolData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })} interval={"preserveStart"} />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
                <Line type="monotone" dataKey="close" stroke="#000000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-start justify-center p-4 pt-25 md:space-x-5 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          {/* Trading Bot Box */}
          <TradingBotBox />
        </div>
        <div className="w-full md:w-1/2">
          {/* Watchlist Box */}
          <WatchlistBox />
        </div>
      </div>
    </div>
  );
}
