{/*
  Hero (very top of page) component for homepage
*/}
import react from "react";


export function Hero() {
  return (
    <div id="About" className="flex flex-col md:flex-row items-stretch gap-8 md:gap-16 px-4 md:px-8 pt-8 md:pt-16 min-h-[80vh] relative bg-background">
      {/* Left Column - Text Content (60% width) */}
      <div className="flex flex-col justify-center bg-background px-6 md:px-12 xl:pl-20 py-12 md:py-24 w-full md:w-[60%]">
        <h1 className="text-text text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wider mb-8 leading-tight">
          Automate your Options Trading
        </h1>
        <p className="text-text text-lg md:text-xl mb-10 max-w-3xl">
          Our advanced algorithm analyzes market conditions and executes trades based on your predefined parameters, helping you maximize profits and minimize risks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-primary-dark text-text-secondary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-primary-dark text-text px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark hover:text-text-secondary transition-colors">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Column - Dashboard Placeholder (40% width) */}
      <div className="bg-background-secondary w-full md:w-[40%] flex items-center justify-center p-6 md:p-10">
        <div className="w-full h-full max-w-xl min-h-[520px] bg-surface rounded-xl p-4 md:p-6 shadow-lg">
          {/* Dashboard Placeholder Card */}
          <div className="space-y-4 h-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex gap-2">
                <span className="text-text text-sm font-semibold">Dashboard</span>
              </div>
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <div className="w-4 h-4 rounded-full bg-primary-dark"></div>
              </div>
            </div>

            {/* Grid of Widgets */}
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Widget 1 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="h-16 bg-primary-dark opacity-20 rounded mb-2"></div>
                <div className="h-12 bg-primary opacity-20 rounded"></div>
              </div>

              {/* Widget 2 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="h-20 bg-primary-dark opacity-20 rounded"></div>
              </div>

              {/* Widget 3 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="flex gap-1 mb-2">
                  <div className="h-8 bg-primary-dark opacity-20 rounded flex-1"></div>
                  <div className="h-12 bg-primary-dark opacity-20 rounded flex-1"></div>
                  <div className="h-6 bg-primary-dark opacity-20 rounded flex-1"></div>
                </div>
              </div>

              {/* Widget 4 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="flex gap-1 mb-2">
                  <div className="h-10 bg-primary-dark opacity-20 rounded flex-1"></div>
                  <div className="h-14 bg-primary-dark opacity-20 rounded flex-1"></div>
                  <div className="h-8 bg-primary-dark opacity-20 rounded flex-1"></div>
                </div>
              </div>

              {/* Widget 5 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="h-16 bg-primary-dark opacity-20 rounded mb-2"></div>
                <div className="space-y-1">
                  <div className="h-2 bg-primary opacity-20 rounded"></div>
                  <div className="h-2 bg-primary opacity-20 rounded"></div>
                  <div className="h-2 bg-primary opacity-20 rounded w-3/4"></div>
                </div>
              </div>

              {/* Widget 6 */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <div className="h-12 bg-primary-dark opacity-20 rounded mb-2"></div>
                <div className="h-8 bg-primary opacity-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
