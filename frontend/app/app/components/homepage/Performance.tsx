import React, { useState, useEffect } from "react";

interface StrategyData {
  name: string;
  totalTrades: number;
  totalCollateral: number;
  avgCollateral: number;
  totalPremiumCollected: number;
  roi: number;
  sharpe: number;
  avgSpread?: number;
  avgPremiumCollected?: number;
  avgWeeklyPremium?: number;
}

interface GeneralAverages {
  avgSpreads: number;
  avgPremiumCollected: number;
  avgWeeklyPremium: number;
}

export function Performance() {
  // TODO: Replace with actual API call when backend endpoint is ready
  const [singlePositions, setSinglePositions] = useState<StrategyData>({
    name: "Single Positions",
    totalTrades: 111,
    totalCollateral: 53047,
    avgCollateral: 476,
    totalPremiumCollected: 2453,
    roi: 4.62,
    sharpe: 0.17,
  });

  const [variablePosition, setVariablePosition] = useState<StrategyData>({
    name: "Variable Position",
    totalTrades: 820,
    totalCollateral: 391206,
    avgCollateral: 2443,
    totalPremiumCollected: 18794,
    roi: 4.80,
    sharpe: 0.69,
    avgSpread: 7,
    avgPremiumCollected: 1.69,
    avgWeeklyPremium: 8.47,
  });

  const [generalAverages, setGeneralAverages] = useState<GeneralAverages>({
    avgSpreads: 7,
    avgPremiumCollected: 0.24,
    avgWeeklyPremium: 1.18,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <section id="Performance" className="bg-background px-4 md:px-8 py-16 md:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-text text-3xl md:text-4xl font-extrabold">Performance</h2>
          <p className="text-text mt-3 md:mt-4 max-w-2xl mx-auto">
            Comprehensive performance metrics for our credit spread trading strategies across various market conditions.
          </p>
        </div>

        {/* General Averages Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-background-secondary/40 rounded-xl p-6 border border-border">
            <div className="text-text/60 text-sm mb-1">Average Spreads</div>
            <div className="text-text text-3xl font-bold">{generalAverages.avgSpreads}</div>
          </div>
          <div className="bg-background-secondary/40 rounded-xl p-6 border border-border">
            <div className="text-text/60 text-sm mb-1">Avg. Premium Collected</div>
            <div className="text-text text-3xl font-bold">${formatNumber(generalAverages.avgPremiumCollected)}</div>
          </div>
          <div className="bg-background-secondary/40 rounded-xl p-6 border border-border">
            <div className="text-text/60 text-sm mb-1">Avg. Weekly Premium</div>
            <div className="text-text text-3xl font-bold">${formatNumber(generalAverages.avgWeeklyPremium)}</div>
          </div>
        </div>

        {/* Strategy Performance Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Single Positions Strategy */}
          <div className="bg-background-secondary/40 rounded-xl overflow-hidden border border-border">
            <div className="bg-background-secondary px-4 py-3">
              <h3 className="text-text font-semibold text-lg">Single Positions</h3>
            </div>
            <div className="p-4">
              <table className="min-w-full text-left">
                <tbody className="text-text">
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Trades</td>
                    <td className="px-2 py-2 font-medium text-right">{singlePositions.totalTrades}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Collateral</td>
                    <td className="px-2 py-2 font-medium text-right">{formatCurrency(singlePositions.totalCollateral)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Avg. Collateral Deployed</td>
                    <td className="px-2 py-2 font-medium text-right">{formatCurrency(singlePositions.avgCollateral)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Premium Collected</td>
                    <td className="px-2 py-2 font-medium text-right text-emerald-400">{formatCurrency(singlePositions.totalPremiumCollected)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">ROI</td>
                    <td className="px-2 py-2 font-medium text-right text-emerald-400">{formatPercent(singlePositions.roi)}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-text/80">Sharpe Ratio</td>
                    <td className="px-2 py-2 font-medium text-right">{formatNumber(singlePositions.sharpe)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Variable Position Strategy */}
          <div className="bg-background-secondary/40 rounded-xl overflow-hidden border border-border">
            <div className="bg-background-secondary px-4 py-3">
              <h3 className="text-text font-semibold text-lg">Variable Positions</h3>
            </div>
            <div className="p-4">
              <table className="min-w-full text-left">
                <tbody className="text-text">
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Trades</td>
                    <td className="px-2 py-2 font-medium text-right">{variablePosition.totalTrades}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Collateral</td>
                    <td className="px-2 py-2 font-medium text-right">{formatCurrency(variablePosition.totalCollateral)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Avg. Collateral Deployed</td>
                    <td className="px-2 py-2 font-medium text-right">{formatCurrency(variablePosition.avgCollateral)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">Total Premium Collected</td>
                    <td className="px-2 py-2 font-medium text-right text-emerald-400">{formatCurrency(variablePosition.totalPremiumCollected)}</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="px-2 py-2 text-text/80">ROI</td>
                    <td className="px-2 py-2 font-medium text-right text-emerald-400">{formatPercent(variablePosition.roi)}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-text/80">Sharpe Ratio</td>
                    <td className="px-2 py-2 font-medium text-right">{formatNumber(variablePosition.sharpe)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Metrics Placeholder */}
        {/* <div className="bg-background-secondary/40 rounded-xl overflow-hidden border border-border">
          <div className="bg-background-secondary px-4 py-3">
            <h3 className="text-text font-semibold">Additional Performance Metrics</h3>
            <p className="text-text/60 text-sm mt-1">Enhanced metrics to be calculated and displayed</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Win Rate</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Profit Factor</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Max Drawdown</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Sortino Ratio</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Avg. Win / Avg. Loss</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Max Consecutive Wins/Losses</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Avg. Holding Period</div>
                <div className="text-text/40">Coming soon</div>
              </div>
              <div className="text-text/60">
                <div className="font-medium text-text mb-1">Risk-Adjusted Return</div>
                <div className="text-text/40">Coming soon</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

