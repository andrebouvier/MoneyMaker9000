from ib_insync import *
import pandas as pd
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()


class IBService:
    def __init__(self):
        self.ib = IB()
        self.connected = False

    def connect(self):
        try:
            if not self.connected:
                self.ib.connect(
                    host=os.getenv("IB_HOST", "127.0.0.1"),
                    port=int(os.getenv("IB_PORT", 4002)),
                    clientId=int(os.getenv("IB_CLIENT_ID", 1)),
                )
                self.connected = True
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def disconnect(self):
        if self.connected:
            self.ib.disconnect()
            self.connected = False

    def get_market_data(self, symbol):
        if not self.connected:
            self.connect()

        contract = Stock(symbol, "SMART", "USD")
        self.ib.qualifyContracts(contract)

        # Request historical data
        bars = self.ib.reqHistoricalData(
            contract,
            endDateTime="",
            durationStr="5 D",
            barSizeSetting="15 mins",
            whatToShow="TRADES",
            useRTH=True,
        )

        # Convert to pandas DataFrame
        df = util.df(bars)
        return df.to_dict(orient="records")

    def place_order(self, symbol, action, quantity, order_type="MKT"):
        if not self.connected:
            self.connect()

        contract = Stock(symbol, "SMART", "USD")
        self.ib.qualifyContracts(contract)

        if order_type == "MKT":
            order = MarketOrder(action, quantity)
        else:
            raise ValueError(f"Order type {order_type} not supported")

        trade = self.ib.placeOrder(contract, order)
        return trade.order.orderId
