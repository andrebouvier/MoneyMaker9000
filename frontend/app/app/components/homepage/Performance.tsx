import react from "react";

export function Performance() {
  return (
    <section className="bg-background px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-text text-3xl md:text-4xl font-extrabold">Performance</h2>
          <p className="text-text mt-3 md:mt-4 max-w-2xl mx-auto">
            Our Options Trading Bot has consistently delivered impressive results across various market conditions.
          </p>
        </div>

        {/* Strategy Performance Table */}
        <div className="bg-background-secondary/40 rounded-xl overflow-hidden border border-border mb-10">
          <div className="bg-background-secondary px-4 py-3">
            <h3 className="text-text font-semibold">Strategy Performance (Last 12 Months)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-text/80">
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3">Strategy</th>
                  <th className="px-4 py-3">Win Rate</th>
                  <th className="px-4 py-3">Avg. Return</th>
                  <th className="px-4 py-3">Max Drawdown</th>
                  <th className="px-4 py-3">Sharpe Ratio</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {[
                  { name: "Momentum Options", win: "76.2%", avg: "+18.7%", dd: "8.3%", sharpe: "1.92" },
                  { name: "Volatility Arbitrage", win: "68.5%", avg: "+22.4%", dd: "12.1%", sharpe: "1.78" },
                  { name: "Income Generator", win: "82.3%", avg: "+14.2%", dd: "5.7%", sharpe: "2.14" },
                  { name: "Trend Following", win: "71.9%", avg: "+19.8%", dd: "9.6%", sharpe: "1.85" },
                ].map((row, idx) => (
                  <tr key={row.name} className={"border-b border-border/30 " + (idx % 2 === 0 ? "bg-background/40" : "bg-background/20") }>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{row.win}</td>
                    <td className="px-4 py-3 text-emerald-400">{row.avg}</td>
                    <td className="px-4 py-3">{row.dd}</td>
                    <td className="px-4 py-3">{row.sharpe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Returns Table */}
        <div className="bg-background-secondary/40 rounded-xl overflow-hidden border border-border">
          <div className="bg-background-secondary px-4 py-3">
            <h3 className="text-text font-semibold">Monthly Returns (2023)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="text-text/80">
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3">Month</th>
                  <th className="px-4 py-3">Momentum</th>
                  <th className="px-4 py-3">Volatility</th>
                  <th className="px-4 py-3">Income</th>
                  <th className="px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody className="text-text">
                {[
                  { month: "January", m: "+2.4%", v: "+1.8%", i: "+1.2%", t: "+2.1%" },
                  { month: "February", m: "+1.7%", v: "-0.5%", i: "+1.4%", t: "+1.9%" },
                  { month: "March", m: "+2.2%", v: "+1.8%", i: "+1.1%", t: "-0.8%" },
                  { month: "April", m: "-0.3%", v: "+2.7%", i: "+1.5%", t: "+2.4%" },
                ].map((row, idx) => (
                  <tr key={row.month} className={"border-b border-border/30 " + (idx % 2 === 0 ? "bg-background/40" : "bg-background/20") }>
                    <td className="px-4 py-3 font-medium">{row.month}</td>
                    <td className="px-4 py-3">{row.m}</td>
                    <td className="px-4 py-3">{row.v}</td>
                    <td className="px-4 py-3">{row.i}</td>
                    <td className="px-4 py-3">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}


