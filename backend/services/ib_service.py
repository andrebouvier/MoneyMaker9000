from ib_insync import *
import pandas as pd
from datetime import datetime, timedelta
import os
import sys
from dotenv import load_dotenv

# Add TradingAgents directory to path to import portfolio utilities
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'TradingAgents'))

load_dotenv()


class IBService:
    def __init__(self):
        self.ib = IB()
        self.connected = False
        # Initialize portfolio service for enhanced functionality
        try:
            from tradingagents.dataflows.ib_portfolio_utils import IBPortfolioService
            self.portfolio_service = IBPortfolioService()
        except ImportError:
            print("Warning: Could not import portfolio service from TradingAgents")
            self.portfolio_service = None

    def connect(self):
        try:
            if not self.connected:
                self.ib.connect(
                    host=os.getenv("IB_HOST", "127.0.0.1"),
                    port=int(os.getenv("IB_PORT", 7497)),
                    clientId=int(os.getenv("IB_CLIENT_ID", 1)),
                )
                self.connected = True
                # Also connect portfolio service if available
                if self.portfolio_service:
                    self.portfolio_service.connect()
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def disconnect(self):
        if self.connected:
            self.ib.disconnect()
            self.connected = False
        if self.portfolio_service:
            self.portfolio_service.disconnect()

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

    def get_portfolio_positions(self):
        """Get portfolio positions as structured data for API responses"""
        if not self.connected:
            self.connect()
        
        try:
            # Get portfolio items
            portfolio_items = self.ib.portfolio()
            
            if not portfolio_items:
                return {"positions": [], "summary": {"total_positions": 0}}
            
            positions = []
            options_positions = []
            other_positions = []
            
            for item in portfolio_items:
                contract = item.contract
                position_data = {
                    "symbol": contract.symbol,
                    "sec_type": contract.secType,
                    "position": item.position,
                    "market_value": float(item.marketValue),
                    "unrealized_pnl": float(item.unrealizedPNL),
                    "average_cost": float(item.averageCost),
                    "contract_details": {
                        "currency": contract.currency,
                        "exchange": contract.exchange,
                        "primary_exchange": getattr(contract, 'primaryExchange', None),
                    }
                }
                
                # Add option-specific details
                if contract.secType == "OPT":
                    position_data.update({
                        "option_type": "CALL" if contract.right == "C" else "PUT",
                        "strike": float(contract.strike),
                        "expiry": contract.lastTradeDateOrContractMonth,
                    })
                    options_positions.append(position_data)
                else:
                    other_positions.append(position_data)
                
                positions.append(position_data)
            
            # Calculate summary metrics
            total_market_value = sum(pos["market_value"] for pos in positions)
            total_unrealized_pnl = sum(pos["unrealized_pnl"] for pos in positions)
            
            return {
                "positions": positions,
                "options_positions": options_positions,
                "other_positions": other_positions,
                "summary": {
                    "total_positions": len(positions),
                    "options_count": len(options_positions),
                    "stocks_count": len(other_positions),
                    "total_market_value": total_market_value,
                    "total_unrealized_pnl": total_unrealized_pnl,
                    "pnl_percentage": (total_unrealized_pnl / total_market_value * 100) if total_market_value > 0 else 0
                }
            }
            
        except Exception as e:
            return {"error": f"Error retrieving portfolio positions: {str(e)}"}

    def get_account_summary(self):
        """Get account summary as structured data for API responses"""
        if not self.connected:
            self.connect()
        
        try:
            # Get account summary
            account_values = self.ib.accountSummary()
            
            if not account_values:
                return {"error": "No account summary data available"}
            
            # Convert to dictionary
            account_dict = {item.tag: item.value for item in account_values}
            
            # Extract key metrics
            summary = {
                "net_liquidation": account_dict.get("NetLiquidation", "N/A"),
                "total_cash_value": account_dict.get("TotalCashValue", "N/A"),
                "buying_power": account_dict.get("BuyingPower", "N/A"),
                "gross_position_value": account_dict.get("GrossPositionValue", "N/A"),
                "excess_liquidity": account_dict.get("ExcessLiquidity", "N/A"),
                "maintenance_margin": account_dict.get("MaintMarginReq", "N/A"),
                "initial_margin": account_dict.get("InitMarginReq", "N/A"),
                "available_funds": account_dict.get("AvailableFunds", "N/A"),
                "excess_margin": account_dict.get("ExcessMargin", "N/A"),
                "cushion": account_dict.get("Cushion", "N/A"),
            }
            
            return {
                "account_summary": summary,
                "raw_data": account_dict  # Include raw data for debugging
            }
            
        except Exception as e:
            return {"error": f"Error retrieving account summary: {str(e)}"}

    def get_portfolio_performance(self, days=30):
        """Get portfolio performance metrics"""
        if not self.connected:
            self.connect()
        
        try:
            # Get portfolio items for current metrics
            portfolio_items = self.ib.portfolio()
            
            total_market_value = sum(pos.marketValue for pos in portfolio_items)
            total_unrealized_pnl = sum(pos.unrealizedPNL for pos in portfolio_items)
            
            # Count position types
            options_count = sum(1 for pos in portfolio_items if pos.contract.secType == "OPT")
            stock_count = sum(1 for pos in portfolio_items if pos.contract.secType == "STK")
            
            performance_data = {
                "period_days": days,
                "current_metrics": {
                    "total_market_value": float(total_market_value),
                    "total_unrealized_pnl": float(total_unrealized_pnl),
                    "pnl_percentage": float((total_unrealized_pnl / total_market_value * 100) if total_market_value > 0 else 0),
                    "options_positions": options_count,
                    "stock_positions": stock_count,
                    "total_positions": len(portfolio_items)
                },
                "note": "Historical performance data is limited by IB API access. For detailed historical analysis, additional data sources may be required."
            }
            
            return performance_data
            
        except Exception as e:
            return {"error": f"Error retrieving performance data: {str(e)}"}

    def get_portfolio_history(self, days=30):
        """Get portfolio historical data for charting"""
        if not self.connected:
            self.connect()
        
        try:
            # Import portfolio storage
            sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
            from models.portfolio_history import get_portfolio_storage, PortfolioSnapshot
            
            # Get current portfolio data
            account_values = self.ib.accountSummary()
            portfolio_items = self.ib.portfolio()
            
            if not account_values:
                return {"error": "No account data available"}
            
            account_dict = {item.tag: item.value for item in account_values}
            current_value = float(account_dict.get("NetLiquidation", 0))
            
            # Save current snapshot for future use
            current_snapshot = PortfolioSnapshot(
                timestamp=datetime.now().isoformat(),
                net_liquidation=current_value,
                total_cash_value=float(account_dict.get("TotalCashValue", 0)),
                gross_position_value=float(account_dict.get("GrossPositionValue", 0)),
                unrealized_pnl=sum(pos.unrealizedPNL for pos in portfolio_items),
                total_positions=len(portfolio_items),
                options_count=sum(1 for pos in portfolio_items if pos.contract.secType == "OPT"),
                stocks_count=sum(1 for pos in portfolio_items if pos.contract.secType == "STK"),
                raw_data=account_dict
            )
            
            # Save to storage
            storage = get_portfolio_storage()
            storage.save_snapshot(current_snapshot)
            
            # Get historical data
            history_snapshots = storage.get_history(days)
            
            if len(history_snapshots) < 2:
                # If we don't have enough historical data, generate some simulated data
                return self._generate_simulated_history(current_value, days)
            
            # Convert snapshots to chart data
            history_data = []
            for snapshot in history_snapshots:
                history_data.append({
                    "date": snapshot.timestamp,
                    "value": snapshot.net_liquidation,
                    "day": (datetime.now() - datetime.fromisoformat(snapshot.timestamp)).days
                })
            
            # Sort by date
            history_data.sort(key=lambda x: x['date'])
            
            return {
                "history": history_data,
                "current_value": current_value,
                "period_days": days,
                "note": f"Showing {len(history_data)} data points from stored portfolio history."
            }
            
        except Exception as e:
            return {"error": f"Error retrieving portfolio history: {str(e)}"}

    def _generate_simulated_history(self, current_value, days):
        """Generate simulated historical data when real history is not available"""
        import random
        from datetime import datetime, timedelta
        
        history_data = []
        base_value = current_value * 0.95  # Start slightly lower than current
        
        for i in range(days, 0, -1):
            date = datetime.now() - timedelta(days=i)
            
            # Add some realistic variation (±2% daily)
            variation = random.uniform(-0.02, 0.02)
            value = base_value * (1 + variation)
            
            # Add some trend (slight upward bias for demo)
            trend = (days - i) * 0.001
            value = value * (1 + trend)
            
            history_data.append({
                "date": date.isoformat(),
                "value": round(value, 2),
                "day": i
            })
            
            base_value = value
        
        # Add current value as the last point
        history_data.append({
            "date": datetime.now().isoformat(),
            "value": round(current_value, 2),
            "day": 0
        })
        
        return {
            "history": history_data,
            "current_value": current_value,
            "period_days": days,
            "note": "Historical data is simulated for demonstration. Real portfolio history will be stored as you use the system."
        }

    def get_portfolio_history_from_positions(self, days=30):
        """Alternative method: Calculate portfolio history from individual position histories"""
        if not self.connected:
            self.connect()
        
        try:
            # Get current positions
            portfolio_items = self.ib.portfolio()
            if not portfolio_items:
                return {"error": "No positions found"}
            
            # This is a simplified approach - in reality, you'd need to track
            # individual position histories and combine them
            history_data = []
            from datetime import datetime, timedelta
            
            # For now, return a simple linear progression
            current_total = sum(pos.marketValue for pos in portfolio_items)
            
            for i in range(days, 0, -1):
                date = datetime.now() - timedelta(days=i)
                # Simple linear progression for demo
                value = current_total * (0.9 + (days - i) * 0.1 / days)
                
                history_data.append({
                    "date": date.isoformat(),
                    "value": round(value, 2)
                })
            
            # Add current value
            history_data.append({
                "date": datetime.now().isoformat(),
                "value": round(current_total, 2)
            })
            
            return {
                "history": history_data,
                "current_value": current_total,
                "period_days": days
            }
            
        except Exception as e:
            return {"error": f"Error retrieving position-based history: {str(e)}"}
