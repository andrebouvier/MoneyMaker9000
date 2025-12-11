import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import asyncio
import atexit

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


# Imports made after db is initialized
from models.user import User
from routes import trading_routes, auth_routes
from routes import conversation_routes
from services import ib_service

# Register blueprints
app.register_blueprint(trading_routes.bp)
app.register_blueprint(auth_routes.bp)
app.register_blueprint(conversation_routes.bp)


# Test endpoint for database
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
async def root():
    return jsonify(
        {
            "message": "Welcome to the API",
            "endpoints": {
                "test": "/api/test",
                "auth": "/api/auth",
                "trading": "/api/trading",
            },
        }
    )


# Initialize IBKR connection at start up
print("=== Server starting. Establishing IBKR connection ===")
ib_service.startup_ib_connection()
app.ib_connected = ib_service.ib.isConnected()
if app.ib_connected:
    print("=== Successfully connected to IBKR ===")
else:
    print("=== Failed to connect to IBKR ===")

# Discconect from IBKR API when server shutdown process begins
atexit.register(ib_service.disconnect_from_ib)


if __name__ == "__main__":
    app.run()
