import asyncio
import os
from asyncio.tasks import run_coroutine_threadsafe
from threading import Thread

from dotenv import load_dotenv
from ib_async import IB, Stock

load_dotenv()

background_loop = None

ib = IB()


def _run_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()


def startup_ib_connection():
    global background_loop
    if background_loop is None:
        background_loop = asyncio.new_event_loop()
        t = Thread(target=_run_loop, args=(background_loop,), daemon=True)
        t.start()

    future = asyncio.run_coroutine_threadsafe(
        ib.connectAsync(
            host=os.getenv("IB_HOST"),
            port=int(os.getenv("IB_PORT")),
            clientId=int(os.getenv("IB_CLIENT_ID")),
            timeout=10,
        ),
        background_loop,
    )

    try:
        future.result(timeout=10)
    except Exception as e:
        print(f"--- Failed to connect to IBKR during startup. Error: {e} ---")


def disconnect_from_ib():
    if ib.isConnected():
        ib.disconnect()

    if background_loop and background_loop.is_running():
        background_loop.call_soon_threadsafe(background_loop.stop)


# # Helper function
# async def _fetch_historic_market_data(symbol:
#     contract = Stock(symbol.upper(), "SMART", "USD")
#     await ib.qualifyContractsAsync(contract)

#     bars = await ib.reqHistoricalDataAsync(
#         contract,
#         endDateTime="",
#         durationStr="30 D",
#         barSizeSetting="1 hour",
#         whatToShow="TRADES",
#         useRTH=True,
#     )

#     print("--- Finished fetching data from IBKR ---")
#     processed_bars = []
#     for bar in bars:
#         processed_bars.appened({
#             "Date": str(bar.date),
#             "Open": bar.open,
#             "High": bar.high,
#             "Low": bar.low,
#             "Close": bar.close,
#             "Volume": bar.volume,
#             "barCount": bar.barCount,
#         })

#     return processed_bars

# # This will call an async function
# @bp.route("/async-data/<string:symbol>", methods=("GET", "POST"))
# def get_historic_market_data(symbol):
#     if not background_loop:
#         return jsonify({"error": "IB event loop is not running"})

#         future = asyncio.run_coroutine_threadsafe(_fetch_historic_market_data(symbol), background_loop)

#         try:
#             processed_data = future.result(timeout=30)
#             return jsonify({"data": processed_data})

#         except asyncio.TimeoutError:
#             print("--- Task Timeouted Out ---")
#             return jsonify({"error": "Request to IBKR timed out."})

#         except Exception as e:
#             print(f"--- An error occured in the IBKR task: {s} ---")
#             return jsonify({"error": f"An error occured: {str(e)}"})
