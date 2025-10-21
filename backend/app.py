from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
import nest_asyncio

# Enable asynic functions
nest_asyncio.apply()


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
# CORS(
# app,
# resources={
#     r"/api/*": {
#         "origins": ["http://localhost:5173"],  # React development server
#             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#             "allow_headers": ["Content-Type", "Authorization"],
#         }
#     },
# )
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "sqlite:///trading_bot.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models after db initialization
from models.user import User

# Import routes after app initialization to avoid circular imports
from routes import trading_routes, auth_routes

# Register blueprints
app.register_blueprint(trading_routes.bp)
app.register_blueprint(auth_routes.bp)


# Test endpoint
@app.route("/api/test", methods=["GET"])
def test_endpoint():
    response = {
        "status": "success",
        "message": "Backend is working!",
        "database_connected": bool(db.engine),
    }
    return jsonify(response)



# Root endpoint
@app.route("/", methods=["GET"])
def root():
    return jsonify(
        {
            "message": "Welcome to the API",
            "endpoints": {
                "test": "/api/test",
                "auth": "/api/auth",
                "trading": {
                    "connect": "/api/trading/connect",
                    "market_data": "/api/trading/market-data/<symbol>",
                    "predict": "/api/trading/predict",
                    "portfolio": {
                        "positions": "/api/trading/portfolio/positions",
                        "account": "/api/trading/portfolio/account", 
                        "performance": "/api/trading/portfolio/performance",
                        "history": "/api/trading/portfolio/history",
                        "dashboard": "/api/trading/portfolio/dashboard"
                    }
                },
            },
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
