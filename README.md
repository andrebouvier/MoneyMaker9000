# Automated Options Trading Bot

This project implements an automated options trading bot using Interactive Brokers API with a web interface for testing and monitoring.

## Project Structure

```
├── backend/
│   ├── __init__.py
│   ├── ib_connector.py      # Interactive Brokers connection handling
│   ├── trading_strategy.py  # Trading strategy implementation
│   └── database.py         # Database models and operations
├── frontend/
│   ├── static/            # CSS, JS, and other static files
│   ├── templates/         # HTML templates
│   └── app.py            # Flask application
├── config/
│   └── config.py         # Configuration settings
├── tests/                # Test files
├── requirements.txt      # Project dependencies
└── README.md            # This file
```

## Setup Instructions

1. Install Interactive Brokers TWS or IB Gateway
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure your Interactive Brokers credentials in `.env` file
5. Run the application:
   ```bash
   python frontend/app.py
   ```

## Features

- Real-time options data streaming
- Automated trading strategies
- Web interface for monitoring and testing
- Historical performance tracking
- Risk management tools

## Security Note

Never commit your Interactive Brokers credentials or API keys to version control. Use environment variables or a secure configuration management system. 