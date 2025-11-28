import asyncio
import os
from threading import Thread

from dotenv import load_dotenv
from ib_async import IB, Stock, Option, Order

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

    if ib.isConnected():
        return

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
        print(f"--- API connection failed: Type: {type(e)}, Error: {repr(e)} ---")


def disconnect_from_ib():
    if ib.isConnected():
        ib.disconnect()

    if background_loop and background_loop.is_running():
        background_loop.call_soon_threadsafe(background_loop.stop)


# Helper function
async def _get_account_summary_async():
    return await ib.accountSummaryAsync()


def get_account_summary():
    if not ib.isConnected() or not background_loop:
        raise ConnectionError("IBKR not connected")

    future = asyncio.run_coroutine_threadsafe(
        _get_account_summary_async(), background_loop
    )
    return future.result(timeout=10)


# Helper function
async def _get_portfolio_async():
    return await ib.portfolioAsync()


def get_portfolio():
    if not ib.isConnected() or not background_loop:
        raise ConnectionError("IBKR not connected")

    future = asyncio.run_coroutine_threadsafe(_get_portfolio_async(), background_loop)
    return future.result(timeout=10)


# Helper function
async def _fetch_historic_market_data(symbol):
    contract = Stock(symbol.upper(), "SMART", "USD")
    await ib.qualifyContractsAsync(contract)

    bars = await ib.reqHistoricalDataAsync(
        contract,
        endDateTime="",
        durationStr="30 D",
        barSizeSetting="1 hour",
        whatToShow="TRADES",
        useRTH=True,
    )

    print("--- Finished fetching data from IBKR ---")
    processed_bars = [
        {
            "Date": str(bar.date),
            # "Open": bar.open,
            # "High": bar.high,
            # "Low": bar.low,
            "Close": bar.close,
            # "Volume": bar.volume,
            # "barCount": bar.barCount,
        }
        for bar in bars
    ]
    return processed_bars


def get_historic_market_data(symbol):
    if not background_loop:
        raise ConnectionError("IB event loop is not running")
    future = asyncio.run_coroutine_threadsafe(
        _fetch_historic_market_data(symbol), background_loop
    )

    try:
        processed_data = future.result(timeout=30)
        return {"data": processed_data}

    except asyncio.TimeoutError:
        print("--- Task Timed Out ---")
        return {"error": "Request to IBKR timed out."}

    except Exception as e:
        print(f"--- An error occured in the IBKR task: {e} ---")
        return {"error": f"An error occured: {str(e)}"}


# Helper function
async def _order_contract(
    symbol, expiration_date, strike, right, action, quantity, order_type, price=None
):
    contract = Option(symbol, expiration_date, strike, right, "SMART", "100", "USD")
    await ib.qualifyContractsAsync(contract)

    order = Order()
    order.action = action
    order.totalQuantity = quantity
    order.orderType = order_type
    if price:
        order.lmtPrice = price
    trade = ib.placeOrder(contract, order)
    return trade


# (string, string(YYYYMMDD), float, string, string, float,   string,    float)
# (symbol, expiration_date, strike, right, action, quantity, order_type, price)
def order_contract(
    symbol,
    expiration_date,
    strike,
    right,
    action,
    quantity,
    order_type="MKT",
    price=None,
):
    if not background_loop:
        raise ConnectionError("IB event loop is not running")

    future = asyncio.tasks.run_coroutine_threadsafe(
        _order_contract(
            symbol, expiration_date, strike, right, action, quantity, order_type, price
        ),
        background_loop,
    )

    try:
        return future.result(timeout=10)
    except asyncio.TimeoutError:
        raise TimeoutError("Order placement timed out.")
