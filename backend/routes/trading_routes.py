from flask import Blueprint, jsonify, request
from services.ib_service import IBService
from services.ml_service import MLService

bp = Blueprint('trading', __name__, url_prefix='/api/trading')
ib_service = IBService()
ml_service = MLService()

@bp.route('/connect', methods=['POST'])
def connect_ib():
    try:
        success = ib_service.connect()
        return jsonify({'status': 'success' if success else 'failed'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/market-data', methods=['GET'])
def get_market_data():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({'error': 'Symbol is required'}), 400
    
    try:
        data = ib_service.get_market_data(symbol)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'symbol' not in data:
        return jsonify({'error': 'Symbol is required'}), 400
    
    try:
        prediction = ml_service.predict(data['symbol'])
        return jsonify(prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 500 