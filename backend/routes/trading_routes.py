from flask import Blueprint, json, jsonify, request
import services.ib_service as ib_service
import services.strategy_log_service as strategy_log_service

from ib_async import PortfolioItem, Stock

bp = Blueprint("trading", __name__, url_prefix="/api/trading")


# Getting account smmary for the dashboard
@bp.route("/account-summary", methods=["GET"])
def get_account_summary():
    try:
        summary = ib_service.get_account_summary()
        print("=== RAW ACCOUNT SUMMARY FROM IBKR ===")
        print(summary)
        print("=====================================")
        summary_dict = {item.tag: (item.value, item.currency) for item in summary}
        return jsonify(summary_dict)

    except ConnectionError as e:
        return jsonify({"error": str(e)}), 503
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Getting portfolio information
@bp.route("/portfolio", methods=["GET"])
def get_portfolio():
    try:
        portfolio = ib_service.get_portfolio()
        portfolio_list = [
            {
                "symbol": item.contract.symbol,
                "secType": item.contract.secType,
                "exchange": item.contract.exchange,
                "position": item.position,
                "marketPrice": item.marketPrice,
                "marketValue": item.marketValue,
                "averageCost": item.averageCost,
                "unrealizedPNL": item.unrealizedPNL,
                "realizedPNL": item.realizedPNL,
            }
            for item in portfolio
        ]
        return jsonify(portfolio_list)
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 503
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Getting historic data for a stock symbol
@bp.route("/historic-data/<string:symbol>", methods=["GET"])
def get_historic_data(symbol):
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    try:
        data = ib_service.get_historic_market_data(symbol)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get latest strategy log
@bp.route("/strategy-log", methods=["GET"])
def get_strategy_log():
    try:
        log_data = strategy_log_service.get_latest_strategy_log()
        if log_data:
            return jsonify(log_data)
        return jsonify({"message": "No strategy log found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Place a stock option order
@bp.route("/place-order", methods=["POST"])
def place_order():
    data = request.get_json()
    required_fields = [
        "symbol",
        "expirationDate",
        "strike",
        "right",
        "action",
        "quantity",
    ]

    if not data or not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        symbol = data["symbol"]
        expiration_date = data["expirationDate"]
        strike = float(data["strike"])
        right = data["right"]
        action = data["action"]
        quantity = float(data["quantity"])
        order_type = data.get("orderType", "MKT")
        price = float(data["price"]) if data.get("price") else None

        trade = ib_service.order_contract(
            symbol, expiration_date, strike, right, action, quantity, order_type, price
        )

        return jsonify(
            {
                "message": "Order placed successfully.",
                "status": trade.orderStatus.status,
                "orderId": trade.order.orderId,
                "filled": trade.orderStatus.filled,
                "remaining": trade.orderStatus.remaining,
            }
        )

    except TimeoutError:
        return jsonify({"error": "Order placement timed out"}), 504
    except Exception as e:
        return jsonify({"error": str(e)}), 500
