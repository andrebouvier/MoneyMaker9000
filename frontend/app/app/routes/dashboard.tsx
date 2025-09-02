{/*
  This is the dashboard page for the app that the user will see after logging in.

  TODO:
  -Create dashboard layout
  -Find component that will display stock data and that will display portfolio data
*/}
import type { Route } from "./+types/app";
import Navbar from "../components/layout/Navbar";

import React, { useState, useEffect } from 'react';

// Used for the mock data and corresponding graph
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];
}


// Helper function for mock data
const generateMockData = () => {
  const data = [];
  let startValue = 10000;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: "numeric" });
    const value = startValue + Math.floor(Math.random() * 2000) - 1000;

    data.push({
      date: formattedDate,
      balance: Math.max(0, value),
    });
    startValue = value;
  }
  return data;
}


export default function dashboard() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);

  const refreshData = () => {
    const newData = generateMockData();
    setData(newData);
    if (newData.length > 0) {
      setBalance(newData[newData.length - 1].balance);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="h-screen bg-background">
      <Navbar />

      <div className="flex flex-col md:flex-row items-stretch md:items-start justify-center p-4 pt-25 md:space-x-5 max-w-7xl mx-auto">
        <div className="flex flex-col w-full md:w-1/3">
          {/* Account Balance Box */}
          <div className="bg-primary rounded-xl shadow-md p-6 mb-4">
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
                Total Portfolio Value
              </h1>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
                ${balance.toLocaleString()}
              </h2>
              <p className="mt-2 text-text font-semibold flex justify-center items-center">
                +5.2% since last month
              </p>
            </div>
          </div>

          {/* Available Balance Box */}
          <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-4">
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Available Balance
              </h1>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
                ${(Math.random() * 5000).toFixed(2)}
              </h2>
            </div>
          </div>

          {/* Active Positions Box */}
          <div className="bg-primary-dark rounded-xl shadow-md p-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Active Positions
              </h1>
            </div>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-secondary">
                {(Math.floor(Math.random() * 25) + 1).toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Main Graph Box */}
        <div className="bg-primary rounded-xl shadow-md p-6 w-full md:w-2/3">
          <div className="mb-6 flex justify-between items-center">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ">
              Portfolio Overview
            </h1>
            <p className="text-gray-500">
              Visual Sample
            </p>
          </div>

          {/* Graph showing mock data */}
          <div className="chart-container relatice w-full h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#000000" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Refresh button */}
          <div className="mt-8 flex justify-center">
            <button
              onclick={() => setData()}
              className="bg-surface hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
