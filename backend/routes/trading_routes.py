from flask import Blueprint, jsonify, request
import services.ib_service as ib_service
import asyncio
from ib_async import Stock

bp = Blueprint("trading", __name__, url_prefix="/api/trading")


# @bp.route("/market-data/<string:symbol>", methods=["GET"])
# def get_market_data(symbol):
#     if not symbol:
#         return jsonify({"error": "Symbol is required"}), 400

#     try:
#         data = ib_service.get_historic_data_async(symbol)
#         return jsonify(data)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


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


# Helper function
async def _fetch_historic_market_data(symbol):
    contract = Stock(symbol.upper(), "SMART", "USD")
    await ib_service.ib.qualifyContractsAsync(contract)

    bars = await ib_service.ib.reqHistoricalDataAsync(
        contract,
        endDateTime="",
        durationStr="30 D",
        barSizeSetting="1 hour",
        whatToShow="TRADES",
        useRTH=True,
    )

    print("--- Finished fetching data from IBKR ---")
    processed_bars = []
    for bar in bars:
        processed_bars.append(
            {
                "Date": str(bar.date),
                "Open": bar.open,
                "High": bar.high,
                "Low": bar.low,
                "Close": bar.close,
                "Volume": bar.volume,
                "barCount": bar.barCount,
            }
        )

    return processed_bars


# This will call an async function
@bp.route("/market-data/<string:symbol>", methods=("GET", "POST"))
def get_historic_market_data(symbol):
    if not ib_service.background_loop:
        return jsonify({"error": "IB event loop is not running"})

    ib_service.future = asyncio.run_coroutine_threadsafe(
        _fetch_historic_market_data(symbol), ib_service.background_loop
    )

    try:
        processed_data = ib_service.future.result(timeout=30)
        return jsonify({"data": processed_data})

    except asyncio.TimeoutError:
        print("--- Task Timeouted Out ---")
        return jsonify({"error": "Request to IBKR timed out."})

    except Exception as e:
        print(f"--- An error occured in the IBKR task: {e} ---")
        return jsonify({"error": f"An error occured: {str(e)}"})
