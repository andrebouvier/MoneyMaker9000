{/*
  Technologies page component that explains the technologies and libraries used in this project
*/}

export function Technologies() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
            Technologies & Libraries
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            This project, built by Andre and Aaron, leverages modern web technologies and machine learning libraries 
            to create an automated trading platform referencing real market data and AI-driven insights. 
            The platform uses real market data from Interactive Brokers API and has been backtested using real market data from CBOE DataShop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Technologies */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">⚛️</span>
              Frontend
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">React 18 with TypeScript</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">React Router v7</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Tailwind CSS</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Vite Build Tool</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Recharts for Data Visualization</span>
              </li>
            </ul>
          </div>

          {/* Backend Technologies */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">🐍</span>
              Backend
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Python 3.11+</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Flask Web Framework</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Firebase Authentication</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Interactive Brokers API</span>
              </li>
            </ul>
          </div>

          {/* Machine Learning & AI */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">🤖</span>
              AI & ML
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">LangChain Framework</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">OpenAI GPT Models</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Pandas for Data Analysis</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">NumPy for Numerical Computing</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Custom Trading Agents</span>
              </li>
            </ul>
          </div>

          {/* Data & Analytics */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">📊</span>
              Data & Analytics
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Real Market Data from CBOE DataShop</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Python Backtesting Scripts</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Real-time Market Data</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Technical Analysis Indicators</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Portfolio Performance Tracking</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Risk Management Algorithms</span>
              </li>
            </ul>
          </div>

          {/* Trading Libraries & Tools */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">📈</span>
              Trading Libraries & Tools
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">yfinance for Market Data</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Stockstats for Technical Indicators</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">LangGraph for Agent Workflows</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Finnhub for Financial Data</span>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="bg-background-secondary/40 rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
              <span className="text-primary mr-3">🏗️</span>
              Architecture
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">RESTful API Design</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Real-time WebSocket Connections</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                <span className="text-text">Responsive Web Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
          <h2 className="text-3xl font-bold text-text mb-6 text-center">
            Project Overview
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-text-secondary mb-6">
              MoneyMaker 9000 is an intuitive trading platform that combines modern web technologies 
              with advanced machine learning algorithms to provide intelligent trading insights and automated portfolio management.
            </p>
            <p className="text-lg text-text-secondary mb-6">
              The platform features a React-based frontend with real-time data visualization, a Python Flask backend 
              for API services, and sophisticated AI agents that analyze market data to provide trading recommendations.
            </p>
            <p className="text-lg text-text-secondary">
              Built as part of the Engineering 696/697 capstone project at San Francisco State University, 
              this project demonstrates the integration of web development, machine learning, and financial technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
