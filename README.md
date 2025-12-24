# MoneyMaker 9000 - Automated Options Trading Bot

This project implements an automated options trading bot using Interactive Brokers API with a web interface for testing and monitoring. It features advanced machine learning strategies for executing credit spreads.

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   └── user.py                # Database models
│   ├── routes/
│   │   ├── auth_routes.py         # Authentication endpoints
│   │   ├── conversation_routes.py # Chat/LLM interaction endpoints
│   │   └── trading_routes.py      # Trading control endpoints
│   ├── services/
│   │   ├── ib_service.py          # Interactive Brokers connection & logic
│   │   ├── ml_service.py          # LSTM Model & ML logic
│   │   └── strategy_log_service.py# Logging for trading strategies
│   └── app.py                     # Main Flask application entry point
├── frontend/app/
│   ├── app/
│   │   ├── components/            # Reusable UI components
│   │   ├── Home/                  # Home page components
│   │   ├── routes/                # Page route definitions
│   │   ├── services/              # Frontend API services
│   │   ├── root.tsx               # Root layout
│   │   └── routes.ts              # Route configuration
│   ├── public/                    # Static assets
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite build configuration
│   └── ...
├── TradingAgents/
│   ├── backtestResults/           # Results from strategy backtests
│   ├── eval_results/              # Evaluation metrics for models
│   ├── Historical-Data/           # Daily EOD Options Quotes (CSVs)
│   └── credit_spread_decisions.csv # Log of strategy decisions
├── environment.yml                # Conda environment setup
├── package.json                   # Root dependencies (e.g. Firebase)
├── requirements.txt               # Python pip dependencies
└── README.md                      # Project documentation
```

## Technologies & Features

This project leverages a modern full-stack architecture to deliver a robust algorithmic trading platform.

### Core Technologies

**Backend:**
*   **Python & Flask:** The backend is built with Python using the Flask web framework. Flask provides a lightweight yet powerful foundation for the RESTful API, handling request routing, middleware, and serving as the primary interface between the frontend, machine learning services, and the Interactive Brokers API.
*   **Interactive Brokers API (`ib_async`):** This asynchronous library is crucial for real-time, non-blocking communication with the Interactive Brokers TWS (Trader Workstation) or Gateway. It enables seamless streaming of market data, placement and management of complex orders (like options spreads), and retrieval of account and portfolio information.
*   **Machine Learning (PyTorch & Scikit-learn):** The `ml_service.py` component integrates an **LSTM (Long Short-Term Memory)** neural network, built with **PyTorch**, for advanced time-series forecasting. This model analyzes historical market data to predict future price movements or volatility, which in turn informs the trading strategy's decision-making process. **Scikit-learn** is used for data preprocessing tasks like scaling.
*   **Data Processing (Pandas & NumPy):** These libraries are fundamental for efficient manipulation and analysis of large financial datasets, including historical options data and trade logs, enabling robust data-driven strategy development.
*   **Database (SQLite with SQLAlchemy & Flask-Migrate):** User authentication data, strategy parameters, and potentially trade logs are persisted using SQLite as the database. **SQLAlchemy** serves as the Object-Relational Mapper (ORM), providing a Pythonic way to interact with the database, while **Flask-Migrate** manages database schema changes and version control.
*   **CORS (Flask-CORS):** Manages Cross-Origin Resource Sharing, ensuring secure and permitted communication between the frontend (running on a different origin) and the Flask API.

**Frontend:**
*   **React 19:** The user interface is developed using the latest version of React, a declarative and component-based JavaScript library. This allows for the creation of a dynamic, interactive, and modular user experience for monitoring trades and managing the bot.
*   **React Router v7:** Facilitates client-side routing within the single-page application, enabling smooth navigation between different views (e.g., dashboard, portfolio, settings) without full page reloads.
*   **Vite:** A next-generation frontend tooling that provides an extremely fast development server with Hot Module Replacement (HMR) and an optimized build process for production deployments, significantly enhancing developer experience and application performance.
*   **Tailwind CSS v4:** A utility-first CSS framework used for rapidly building custom designs directly in JSX. Its highly customizable nature allows for consistent and responsive styling across the application.
*   **Recharts:** A composable charting library built with React and D3, utilized for creating clear and interactive visualizations of financial data, such as portfolio performance, historical price charts, and strategy backtest results.
*   **TypeScript:** The entire frontend codebase is written in TypeScript, providing static type-checking to catch errors early, improve code maintainability, and enhance developer productivity through better autocompletion and code understanding.

### Key Features & Accomplishments

*   **Automated Trading Engine:** A fully autonomous system capable of executing complex **Credit Spread** strategies based on real-time market conditions.
*   **ML-Driven Predictions:** Uses a custom trained LSTM model to predict market direction and volatility, optimizing entry and exit points.
*   **Real-Time Data Streaming:** Live integration with Interactive Brokers to stream quotes and update portfolio status in real-time.
*   **Comprehensive Backtesting:** A dedicated module (`TradingAgents`) for validating strategies against historical data (`Historical-Data/`) before live deployment.
*   **Modern Web Dashboard:** A user-friendly interface that allows users to monitor active trades, view historical performance, and control bot parameters with ease.
*   **Conversational Interface:** Integrated endpoints for conversational AI features, allowing for natural language interaction with the system.

## Glossary

Key terms related to options trading and the technical implementation of this project:

### Trading Terms

*   **Bull Put Spread:** A bullish options strategy where you sell a put option at a higher strike price and buy a put option at a lower strike price with the same expiration date. The goal is to profit from time decay (theta) and a neutral-to-rising stock price.
*   **Credit Spread:** An options strategy that involves buying and selling options of the same class (puts or calls) with the same expiration date but different strike prices, resulting in a net credit (cash received) to your account.
*   **Strike Price:** The set price at which a derivative contract can be bought or sold when it is exercised.
*   **Expiration Date:** The date on which an options contract expires and becomes void.
*   **Theta (Time Decay):** A measure of the rate of decline in the value of an option due to the passage of time. Credit spreads benefit from positive theta.
*   **Slippage:** The difference between the expected price of a trade and the price at which the trade is executed.

### Technical Terms

*   **Interactive Brokers (IBKR):** A major electronic trading platform. This project uses its API for market data and order execution.
*   **LSTM (Long Short-Term Memory):** A type of recurrent neural network (RNN) capable of learning order dependence in sequence prediction problems. Used here for predicting market trends based on historical data.
*   **Paper Trading:** A simulated trading process where you practice buying and selling assets without risking real money. Highly recommended for testing bots.
*   **Backtesting:** The process of testing a trading strategy on relevant historical data to ensure its viability before actual trading.

## Trading Strategy & ML

The core trading logic revolves around **Credit Spreads**, designed to generate income from time decay (theta) while managing risk.

![Trading Logic Diagram](https://automated-options-app.com/diagramfinal.png)

### Multi-Agent System
Inspired by the [TradingAgents](https://github.com/TauricResearch/TradingAgents) project, our system employs five distinct AI agents to collaborate on trading decisions:
1.  **Valuation Agent:** Analyzes fundamental data to determine the intrinsic value of the underlying asset.
2.  **Sentiment Agent:** Processes news and market sentiment to gauge the overall mood of the market.
3.  **Risk Manager:** Evaluates the potential downside and ensures portfolio risk stays within defined limits.
4.  **Technical Analyst:** Uses technical indicators to identify trend direction and momentum.
5.  **Execution Agent:** Optimizes trade entry and exit timing to minimize slippage and transaction costs.

*   **Strategy Type:** Credit Spread (selling a put at a higher strike and buying a put at a lower strike).
*   **Execution:** The `ib_service.py` handles the precise execution of multi-leg option orders via Interactive Brokers.
*   **Logging:** All decisions are logged in CSV format (e.g., `credit_spread_decisions.csv`) for audit and analysis.

## API Documentation

The backend exposes a RESTful API for the frontend and external integrations.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/trading/account-summary` | Retrieves current account balance, buying power, and P&L. |
| **GET** | `/api/trading/portfolio` | Returns a list of all open positions and their market values. |
| **GET** | `/api/trading/historic-data/<symbol>` | Fetches historical candle data for a specific symbol. |
| **POST** | `/api/trading/place-order` | Places an options order. Requires JSON payload with `symbol`, `strike`, `action`, etc. |
| **GET** | `/api/trading/past-trades` | Returns a history of executed trades and strategy decisions from logs. |
| **POST** | `/api/conversation/chat` | Endpoint for the conversational agent interface. |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10 or higher** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+ and npm** - [Download Node.js](https://nodejs.org/)
- **Conda** (Miniconda or Anaconda) - [Download Conda](https://docs.conda.io/en/latest/miniconda.html)
- **Interactive Brokers TWS or IB Gateway** - Required for trading functionality
  - Download from [Interactive Brokers](https://www.interactivebrokers.com/en/index.php?f=16042)
  - Make sure TWS/Gateway is running before starting the backend
- **Git** - For cloning the repository

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Step 1: Clone the Repository

```bash
git clone https://github.com/andrebouvier/MoneyMaker9000.git
cd MoneyMaker9000
```

### Step 2: Backend Setup

#### 2.1 Create Conda Environment

The project uses Conda to manage Python dependencies. Create the environment from the provided `environment.yml` file:

```bash
# Create the Conda environment (this may take a few minutes)
conda env create -f environment.yml

# Activate the environment
conda activate ENGR697
```

**Note for Windows users:** Use `conda activate ENGR697` in Command Prompt or PowerShell. For Git Bash, you may need to use `source activate ENGR697`.

#### 2.2 Install Additional Python Dependencies (Optional)

If you prefer using pip or need additional packages:

```bash
# Make sure you're in the activated Conda environment
pip install -r requirements.txt
```

#### 2.3 Configure Environment Variables

Create a `.env` file in the `backend/` directory with your configuration.

**Environment Variables Reference:**

| Variable | Description | Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | SQLAlchemy connection string for the database. | `sqlite:///trading_bot.db` |
| `IB_HOST` | Host IP address for connecting to Interactive Brokers TWS or Gateway. | `127.0.0.1` |
| `IB_PORT` | Port for connecting to TWS/Gateway. Use `7497` for paper trading and `7496` for live trading. | `7497` |
| `IB_CLIENT_ID` | A unique integer Client ID for the API connection. | `1` |
| `FLASK_ENV` | Sets the Flask environment mode, e.g., `development` or `production`. | `development` |
| `FLASK_DEBUG` | If set to `True`, enables debug mode for Flask, including auto-reloader. | `True` |
| `SECRET_KEY` | A strong, random secret key used for session management and security features. | `your-secret-key-here` |

Example `.env` content:

```env
DATABASE_URL=sqlite:///trading_bot.db
IB_HOST=127.0.0.1
IB_PORT=7497
IB_CLIENT_ID=1
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
```

**Important Security Note:** Never commit your `.env` file or Interactive Brokers credentials to version control. The `.env` file should already be in `.gitignore`.

#### 2.4 Initialize the Database

```bash
# Make sure you're in the project root directory
# With the Conda environment activated
cd backend
flask db init  # Only needed the first time
flask db migrate -m "Initial migration"
flask db upgrade
```

#### 2.5 Start the Backend Server

```bash
# From the project root directory
# Make sure you're in the activated Conda environment

# Set Flask app environment variable
# Windows (Command Prompt or PowerShell):
set FLASK_APP=backend/app.py

# Windows (Git Bash):
export FLASK_APP=backend/app.py

# Unix/MacOS:
export FLASK_APP=backend/app.py

# Run the Flask development server
flask run

# OR use Python directly:
python -m flask run

# OR with auto-reload:
flask run --reload
```

The backend server will start on **http://localhost:5000**

**Important:** Make sure Interactive Brokers TWS or IB Gateway is running before starting the backend, as the application needs to connect to it.

### Step 3: Frontend Setup

#### 3.1 Navigate to Frontend Directory

Open a **new terminal window** (keep the backend running in the first terminal):

```bash
# From the project root directory
cd frontend/app
```

#### 3.2 Install Dependencies

```bash
# Install all npm packages
npm install
```

This will install all required dependencies including React, React Router, Tailwind CSS, and other frontend libraries.

#### 3.3 Start the Frontend Development Server

```bash
# Start the development server
npm run dev
```

The frontend will be available at **http://localhost:5173** (Vite default port)

The development server supports hot module replacement (HMR), so changes to your code will automatically refresh in the browser.

### Step 4: Verify the Setup

1. **Test Backend API:**
   - Open your browser and navigate to: http://localhost:5000/api/test
   - You should see a JSON response like:
     ```json
     {
       "status": "success",
       "message": "Backend is working!",
       "database_connected": true
     }
     ```

2. **Test Frontend:**
   - Open your browser and navigate to: http://localhost:5173
   - The React application homepage should load
   - You should see the MoneyMaker 9000 interface

3. **Test Connection:**
   - Open browser DevTools (F12)
   - Check the Network tab to see if API requests to the backend are successful
   - Look for any CORS errors in the Console tab

## Running the Application

To run the full application:

1. **Start Interactive Brokers TWS or IB Gateway**
   - Make sure it's running and connected
   - Note the port (default is 7497 for paper trading)

2. **Start the Backend** (Terminal 1):
   ```bash
   conda activate ENGR697
   set FLASK_APP=backend/app.py  # Windows
   # OR
   export FLASK_APP=backend/app.py  # Unix/MacOS
   flask run
   ```

3. **Start the Frontend** (Terminal 2):
   ```bash
   cd frontend/app
   npm run dev
   ```

4. **Access the Application:**
   - Open http://localhost:5173 in your browser
   - The frontend will communicate with the backend at http://localhost:5000

## Development

### Backend Development

- **API Endpoints:** All backend API endpoints are prefixed with `/api/`
- **Database Migrations:** Use Flask-Migrate for database changes:
  ```bash
  flask db migrate -m "Description of changes"
  flask db upgrade
  ```
- **Testing:** Run tests with pytest:
  ```bash
  pytest
  ```

### Frontend Development

- **Hot Reloading:** The frontend development server automatically reloads when you make changes
- **API Calls:** Frontend makes requests to `http://localhost:5000/api/*`
- **Build for Production:**
  ```bash
  npm run build
  ```

## Troubleshooting

### Backend Issues

**Problem: Module not found errors**
- **Solution:** Make sure you've activated the Conda environment (`conda activate ENGR697`)
- Verify all dependencies are installed: `conda env update -f environment.yml`

**Problem: Database connection errors**
- **Solution:** 
  - Check if the SQLite database file exists in `backend/instance/trading_bot.db`
  - Run database migrations: `flask db upgrade`
  - Verify `DATABASE_URL` in your `.env` file

**Problem: Cannot connect to Interactive Brokers**
- **Solution:**
  - Ensure TWS or IB Gateway is running
  - Check the port number matches your `.env` configuration (7497 for paper, 7496 for live)
  - Verify "Enable ActiveX and Socket Clients" is enabled in TWS settings (Configure → API → Settings)
  - Check firewall settings

**Problem: Port 5000 already in use**
- **Solution:** 
  - Change the port: `flask run --port 5001`
  - Or stop the process using port 5000

### Frontend Issues

**Problem: Frontend can't connect to backend**
- **Solution:**
  - Verify the backend is running on http://localhost:5000
  - Check CORS settings in `backend/app.py`
  - Look for errors in browser DevTools Console
  - Verify the backend URL in frontend API calls

**Problem: npm install fails**
- **Solution:**
  - Clear npm cache: `npm cache clean --force`
  - Delete `node_modules` and `package-lock.json`, then run `npm install` again
  - Make sure you're using Node.js 18 or higher

**Problem: Port 5173 already in use**
- **Solution:** Vite will automatically try the next available port, or specify one:
  ```bash
  npm run dev -- --port 3000
  ```

### General Issues

**Problem: Changes not reflecting**
- **Solution:**
  - Backend: Restart the Flask server
  - Frontend: The dev server should auto-reload, but try refreshing the browser
  - Clear browser cache if needed

**Problem: Environment variables not loading**
- **Solution:**
  - Ensure `.env` file is in the `backend/` directory
  - Verify you're using `python-dotenv` (included in requirements)
  - Check for typos in variable names

## Security Notes

⚠️ **Important Security Reminders:**

- Never commit `.env` files or credentials to version control
- Use environment variables for all sensitive configuration
- Keep your Interactive Brokers credentials secure
- Use paper trading accounts for testing
- Review and understand the risks before using with real money

## Additional Resources

- [Interactive Brokers API Documentation](https://interactivebrokers.github.io/tws-api/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/andrebouvier/MoneyMaker9000/issues)
- Review the troubleshooting section above
- Contact: abouvier@sfsu.edu or acastellanos3@sfsu.edu

## License

This project is for educational purposes as part of ENGR696/697 at SFSU.

---

**Disclaimer:** This application is not to be used as financial advice and is a test. Trading involves substantial risk of loss. Only trade with money you can afford to lose.
