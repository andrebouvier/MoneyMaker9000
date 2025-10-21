"""
Portfolio History Model

This module provides functionality to store and retrieve historical portfolio data.
In a production environment, you would want to store this data in a database
to track actual portfolio performance over time.
"""

from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import json
import os
from dataclasses import dataclass, asdict


@dataclass
class PortfolioSnapshot:
    """Represents a snapshot of portfolio data at a specific time"""
    timestamp: str
    net_liquidation: float
    total_cash_value: float
    gross_position_value: float
    unrealized_pnl: float
    total_positions: int
    options_count: int
    stocks_count: int
    raw_data: Dict[str, Any]


class PortfolioHistoryStorage:
    """Simple file-based storage for portfolio history data"""
    
    def __init__(self, storage_file: str = "portfolio_history.json"):
        self.storage_file = storage_file
        self.ensure_storage_exists()
    
    def ensure_storage_exists(self):
        """Create storage file if it doesn't exist"""
        if not os.path.exists(self.storage_file):
            with open(self.storage_file, 'w') as f:
                json.dump([], f)
    
    def save_snapshot(self, snapshot: PortfolioSnapshot):
        """Save a portfolio snapshot to storage"""
        try:
            # Load existing data
            with open(self.storage_file, 'r') as f:
                data = json.load(f)
            
            # Add new snapshot
            data.append(asdict(snapshot))
            
            # Keep only last 365 days of data
            cutoff_date = datetime.now() - timedelta(days=365)
            data = [
                item for item in data 
                if datetime.fromisoformat(item['timestamp']) > cutoff_date
            ]
            
            # Save back to file
            with open(self.storage_file, 'w') as f:
                json.dump(data, f, indent=2)
                
        except Exception as e:
            print(f"Error saving portfolio snapshot: {e}")
    
    def get_history(self, days: int = 30) -> List[PortfolioSnapshot]:
        """Get portfolio history for the specified number of days"""
        try:
            with open(self.storage_file, 'r') as f:
                data = json.load(f)
            
            # Filter by date range
            cutoff_date = datetime.now() - timedelta(days=days)
            filtered_data = [
                item for item in data 
                if datetime.fromisoformat(item['timestamp']) > cutoff_date
            ]
            
            # Convert back to PortfolioSnapshot objects
            return [PortfolioSnapshot(**item) for item in filtered_data]
            
        except Exception as e:
            print(f"Error retrieving portfolio history: {e}")
            return []
    
    def get_latest_snapshot(self) -> Optional[PortfolioSnapshot]:
        """Get the most recent portfolio snapshot"""
        history = self.get_history(1)
        return history[-1] if history else None
    
    def cleanup_old_data(self, days_to_keep: int = 365):
        """Remove data older than specified days"""
        try:
            with open(self.storage_file, 'r') as f:
                data = json.load(f)
            
            cutoff_date = datetime.now() - timedelta(days=days_to_keep)
            filtered_data = [
                item for item in data 
                if datetime.fromisoformat(item['timestamp']) > cutoff_date
            ]
            
            with open(self.storage_file, 'w') as f:
                json.dump(filtered_data, f, indent=2)
                
        except Exception as e:
            print(f"Error cleaning up old data: {e}")


# Global instance
_portfolio_storage = None

def get_portfolio_storage() -> PortfolioHistoryStorage:
    """Get or create a global portfolio storage instance"""
    global _portfolio_storage
    if _portfolio_storage is None:
        _portfolio_storage = PortfolioHistoryStorage()
    return _portfolio_storage

