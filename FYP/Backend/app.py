import os
import random
import math 
import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging to see error messages in the terminal.
logging.basicConfig(level=logging.INFO)

# ------------------------
# Load Models from File: prediction_models.pkl
# ------------------------
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "prediction_models.pkl")

try:
    with open(model_path, "rb") as f:
        models = pickle.load(f)
    price_models = models.get("price_models", {})
    demand_models = models.get("demand_models", {})
    app.logger.info("Models loaded successfully.")
except Exception as e:
    app.logger.error(f"Error loading models: {e}")
    price_models = {}
    demand_models = {}

# ------------------------
# Endpoints
# ------------------------

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    crop = data.get("crop")
    province = data.get("province")
    district = data.get("district")
    landscape = data.get("landscape")
    size_sqm = data.get("size_sqm")
    
    # A simple yield simulation function (for demonstration)
    base_rate = {
        "Tomatoes": 1.0,
        "Chili": 0.9,
        "Cabbage": 1.2,
        "Bitter_Gourd": 1.1,
        "Long_Beans": 0.8,
        "Pumpkin": 1.3,
        "Eggplant": 1.0,
        "Cucumber": 1.0,
        "Drumstick": 0.95
    }
    crop_rate = base_rate.get(crop, 1.0)
    noise = random.uniform(0.95, 1.05)
    pred = size_sqm * crop_rate * noise
    return jsonify({"prediction": round(pred, 2)})

@app.route('/predict_price', methods=['POST'])
def predict_price():
    data = request.get_json(force=True)
    crop = data.get("crop")
    date_str = data.get("date")  # Expected format: "YYYY-MM-DD"
    last_price = data.get("last_price", 100)
    
    if not crop or not date_str:
        return jsonify({"error": "Missing required parameters: crop and date"}), 400
    
    try:
        date = pd.to_datetime(date_str)
    except Exception:
        return jsonify({"error": "Invalid date format"}), 400

    input_features = pd.DataFrame({
        'Price_lag_1': [last_price],
        'Price_lag_3': [last_price],
        'Price_lag_6': [last_price],
        'Price_lag_12': [last_price],
        'Month': [date.month],
        'Year': [date.year],
        'Rolling_avg_3': [last_price],
        'Rolling_avg_12': [last_price]
    })
    model = price_models.get(crop)
    if model is None:
        return jsonify({"error": f"Price model for {crop} not found"}), 404
    try:
        predicted_price = model.predict(input_features)[0]
    except Exception as e:
        app.logger.error(f"Error predicting price for {crop} on {date_str}: {e}")
        return jsonify({"error": "Error during price prediction"}), 500
    return jsonify({"predicted_price": predicted_price})

@app.route('/predict_demand', methods=['POST'])
def predict_demand():
    data = request.get_json(force=True)
    crop = data.get("crop")
    # Here we ignore any exogenous feature and use the model's forecast method
    if not crop:
        return jsonify({"error": "Missing required parameter: crop"}), 400
    model = demand_models.get(crop)
    if model is None:
        return jsonify({"error": f"Demand model for {crop} not found"}), 404
    try:
        # Forecast one period ahead using get_forecast
        forecast_obj = model.get_forecast(steps=1)
        predicted_demand = forecast_obj.predicted_mean.iloc[0]
    except Exception as e:
        app.logger.error(f"Error predicting demand for {crop}: {e}")
        return jsonify({"error": "Error during demand prediction"}), 500
    return jsonify({"predicted_demand": predicted_demand})

@app.route('/get_chart_data', methods=['POST'])
def get_chart_data():
    data = request.get_json(force=True)
    crop = data.get("crop")
    date_str = data.get("date")  # Expected format: "YYYY-MM-DD"
    last_price = data.get("last_price", 100)
    
    if not crop or not date_str:
        return jsonify({"error": "Missing required parameters: crop and date"}), 400
    try:
        base_date = pd.to_datetime(date_str)
    except Exception:
        return jsonify({"error": "Invalid date format"}), 400

    price_model = price_models.get(crop)
    demand_model = demand_models.get(crop)
    if price_model is None:
        return jsonify({"error": f"Price model for {crop} not found"}), 404
    if demand_model is None:
        return jsonify({"error": f"Demand model for {crop} not found"}), 404

    labels = []
    price_forecast = []
    try:
        # Generate price forecast for the next 6 months
        for i in range(6):
            forecast_date = base_date + pd.DateOffset(months=i)
            labels.append(forecast_date.strftime('%Y-%m'))
            input_features = pd.DataFrame({
                'Price_lag_1': [last_price],
                'Price_lag_3': [last_price],
                'Price_lag_6': [last_price],
                'Price_lag_12': [last_price],
                'Month': [forecast_date.month],
                'Year': [forecast_date.year],
                'Rolling_avg_3': [last_price],
                'Rolling_avg_12': [last_price]
            })
            predicted_price = price_model.predict(input_features)[0]
            price_forecast.append(predicted_price)
            
        # For demand forecast, use get_forecast to predict the next 6 periods
        forecast_horizon = 6
        demand_forecast_series = demand_model.get_forecast(steps=forecast_horizon).predicted_mean
        demand_forecast = list(demand_forecast_series)
    except Exception as e:
        app.logger.error(f"Error generating forecast for {crop}: {e}")
        return jsonify({"error": "Error generating forecast"}), 500

    result = {
        "predicted_price": price_forecast[0] if price_forecast else None,
        "priceChart": {
            "labels": labels,
            "data": price_forecast
        },
        "demandChart": {
            "labels": labels,
            "data": demand_forecast
        }
    }
    return jsonify(result)

from flask import Flask, request, jsonify

# Allow requests from your React app (update origin if needed)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
logging.basicConfig(level=logging.INFO)

def safe_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0

@app.route('/calculate', methods=['POST'])
def calculate():
    """
    Expected JSON payload:
    {
      "expected_harvest": 1000,
      "market_price": 50,
      "production_cost": 20000,
      "labor_cost": 5000,
      "transport_cost": 3000
    }
    """
    data = request.get_json(force=True)

    expected_harvest = safe_float(data.get("expected_harvest"))
    market_price = safe_float(data.get("market_price"))
    production_cost = safe_float(data.get("production_cost"))
    labor_cost = safe_float(data.get("labor_cost"))
    transport_cost = safe_float(data.get("transport_cost"))

    revenue = expected_harvest * market_price
    total_cost = production_cost + labor_cost + transport_cost
    profit = revenue - total_cost
    roi = (profit / total_cost * 100) if total_cost != 0 else 0
    profit_margin = (profit / revenue * 100) if revenue != 0 else 0

    result = {
        "revenue": revenue,
        "totalCost": total_cost,       
        "profit": profit,
        "roi": roi,
        "profitMargin": profit_margin
    }
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
