# MoneyMaker 9000 - Automated Options Trading Bot

This project implements an automated options trading bot using Interactive Brokers API with a web interface for testing and monitoring.

## Project Structure

```
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── models/            # Database models (User, etc.)
│   ├── routes/            # API route handlers
│   │   ├── auth_routes.py
│   │   ├── trading_routes.py
│   │   └── conversation_routes.py
│   └── services/          # Business logic services
│       ├── ib_service.py  # Interactive Brokers integration
│       └── ml_service.py  # Machine learning services
├── frontend/
│   └── app/              # React Router application
│       ├── app/          # React components and routes
│       └── public/       # Static assets
├── environment.yml       # Conda environment configuration
├── requirements.txt     # Python pip dependencies
└── README.md           # This file
```

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

Create a `.env` file in the `backend/` directory with your configuration:

```bash
# Navigate to backend directory
cd backend

# Create .env file (Windows)
type nul > .env

# OR create .env file (Unix/MacOS)
touch .env
```

Add the following to your `.env` file:

```env
# Database Configuration
DATABASE_URL=sqlite:///trading_bot.db

# Interactive Brokers Configuration
IB_HOST=127.0.0.1
IB_PORT=7497  # Use 7497 for paper trading, 7496 for live trading
IB_CLIENT_ID=1

# Flask Configuration
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

## Project Features

- **Real-time Options Data Streaming** - Live market data from Interactive Brokers
- **Automated Trading Strategies** - Execute trades based on predefined parameters
- **Web Interface** - Modern React-based dashboard for monitoring and testing
- **Historical Performance Tracking** - View past trades and performance metrics
- **Risk Management Tools** - Built-in risk controls and position management
- **Machine Learning Integration** - ML services for trade analysis and predictions

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
