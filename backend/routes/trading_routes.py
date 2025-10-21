from flask import Blueprint, jsonify, request
from services.ib_service import IBService
from services.ml_service import MLService
from datetime import datetime

bp = Blueprint("trading", __name__, url_prefix="/api/trading")
ib_service = IBService()
ml_service = MLService()


@bp.route("/connect", methods=["POST"])
def connect_ib():
    try:
        success = ib_service.connect()
        return jsonify({"status": "success" if success else "failed"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/market-data/<string:symbol>", methods=["GET"])
def get_market_data(symbol):
    # symbol = request.args.get("symbol")
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    try:
        data = ib_service.get_market_data(symbol)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "symbol" not in data:
        return jsonify({"error": "Symbol is required"}), 400

    try:
        prediction = ml_service.predict(data["symbol"])
        return jsonify(prediction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/portfolio/positions", methods=["GET"])
def get_portfolio_positions():
    """Get current portfolio positions"""
    try:
        data = ib_service.get_portfolio_positions()
        if "error" in data:
            return jsonify(data), 500
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/portfolio/account", methods=["GET"])
def get_account_summary():
    """Get account summary information"""
    try:
        data = ib_service.get_account_summary()
        if "error" in data:
            return jsonify(data), 500
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/portfolio/performance", methods=["GET"])
def get_portfolio_performance():
    """Get portfolio performance metrics"""
    try:
        # Get days parameter from query string, default to 30
        days = request.args.get("days", 30, type=int)
        data = ib_service.get_portfolio_performance(days)
        if "error" in data:
            return jsonify(data), 500
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/portfolio/dashboard", methods=["GET"])
def get_portfolio_dashboard():
    """Get comprehensive portfolio data for dashboard"""
    try:
        # Get all portfolio data in one request
        positions_data = ib_service.get_portfolio_positions()
        account_data = ib_service.get_account_summary()
        performance_data = ib_service.get_portfolio_performance(30)
        
        # Combine all data
        dashboard_data = {
            "positions": positions_data,
            "account": account_data,
            "performance": performance_data,
            "timestamp": datetime.now().isoformat()
        }
        
        # Check for any errors
        errors = []
        if "error" in positions_data:
            errors.append(f"Positions: {positions_data['error']}")
        if "error" in account_data:
            errors.append(f"Account: {account_data['error']}")
        if "error" in performance_data:
            errors.append(f"Performance: {performance_data['error']}")
        
        if errors:
            dashboard_data["errors"] = errors
        
        return jsonify(dashboard_data)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/portfolio/history", methods=["GET"])
def get_portfolio_history():
    """Get portfolio historical data for charting"""
    try:
        # Get days parameter from query string, default to 30
        days = request.args.get("days", 30, type=int)
        data = ib_service.get_portfolio_history(days)
        if "error" in data:
            return jsonify(data), 500
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


