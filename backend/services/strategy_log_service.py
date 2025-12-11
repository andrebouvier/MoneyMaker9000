import os
import json
import glob

# Get the directory where this script is located (backend/services)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# Navigate up to the project root (backend/services -> backend -> root)
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, '..', '..'))
LOG_DIR = os.path.join(PROJECT_ROOT, 'TradingAgents', 'eval_results', 'SPY', 'TradingAgentsStrategy_logs')

def get_latest_strategy_log():
    try:
        # specific pattern for the files
        pattern = os.path.join(LOG_DIR, 'full_states_log_*.json')
        
        files = glob.glob(pattern)

        if not files:
            return None

        # Sort files by name (which contains the date) in descending order to get the latest
        latest_file = max(files, key=os.path.getctime)
        
        with open(latest_file, 'r') as f:
            data = json.load(f)
            
        # The JSON structure has a top-level key which is the date. 
        # We usually want the content of that key.
        # Assuming one key per file based on the sample "2025-05-09": {...}
        if data:
            key = list(data.keys())[0]
            return {
                "date": key,
                "data": data[key]
            }
        return None

    except Exception as e:
        print(f"Error reading strategy log: {e}")
        raise e
