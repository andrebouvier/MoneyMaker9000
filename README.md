# Automated Options Trading Bot

This project implements an automated options trading bot using Interactive Brokers API with a web interface for testing and monitoring.

## Project Structure

```
├── backend/
│   ├── __init__.py
│   ├── app.py              # Flask application
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── services/          # Business logic services
├── frontend/
│   ├── app/              # React application
│   └── public/           # Static files
├── config/               # Configuration files
├── tests/               # Test files
├── requirements.txt     # Python dependencies
├── environment.yml     # Conda environment
└── README.md          # This file
```

## Setup Instructions

### Prerequisites
- Python 3.10 or higher
- Node.js and npm
- Interactive Brokers TWS or IB Gateway
- Git

### Backend Setup

1. Create and activate Conda environment:
   ```bash
   # Create environment from environment.yml
   conda env create -f environment.yml
   
   # Activate the environment
   conda activate ENGR697
   ```

2. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your Interactive Brokers credentials and other configuration

3. Run the Flask backend:
   ```bash
   # Set Flask environment variable
   set FLASK_APP=backend/app.py  # For Windows
   # OR
   export FLASK_APP=backend/app.py  # For Unix/MacOS
   
   # Run the development server
   flask run
   ```
   The backend will be available at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Testing the Setup

1. Backend API Test:
   - Open http://localhost:5000/api/test in your browser
   - You should see a JSON response indicating the backend is working

2. Frontend Test:
   - Open http://localhost:3000 in your browser
   - The React application should load

## Development

- Backend API endpoints are prefixed with `/api/`
- Frontend development server supports hot reloading
- Use Chrome DevTools (F12) to monitor API requests and responses

## Security Note

Never commit your Interactive Brokers credentials or API keys to version control. Use environment variables or a secure configuration management system.

## Troubleshooting

1. If you encounter database issues:
   - Check if the SQLite database file exists in the backend/instance directory
   - Ensure all migrations are applied

2. If the frontend can't connect to the backend:
   - Verify both servers are running
   - Check CORS settings in backend/app.py
   - Ensure the correct ports are being used

3. If you get module not found errors:
   - Verify you're in the correct Conda environment
   - Check if all dependencies are installed
   - Try running `conda env update -f environment.yml`

## Features

- Real-time options data streaming
- Automated trading strategies
- Web interface for monitoring and testing
- Historical performance tracking
- Risk management tools 