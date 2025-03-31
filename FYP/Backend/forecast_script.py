#!/usr/bin/env python
import argparse
import requests
import matplotlib.pyplot as plt

def get_chart_data(crop: str, date: str, last_price: float = 100) -> dict:
    """
    Connects to the backend and retrieves chart data.
    Expects the backend to be running at http://localhost:5000/get_chart_data.
    """
    url = 'http://localhost:5000/get_chart_data'
    payload = {"crop": crop, "date": date, "last_price": last_price}
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raises an HTTPError for 4xx or 5xx responses
    except requests.RequestException as e:
        raise Exception(f"Error connecting to backend: {e}")
    
    try:
        return response.json()
    except Exception:
        raise Exception(f"Error parsing JSON response: {response.text}")

def plot_forecasts(data: dict, crop: str):
    """
    Plots two charts: one for the price forecast and one for the demand forecast.
    Expects `data` to include keys: predicted_price, priceChart, and demandChart.
    """
    predicted_price = data.get("predicted_price", 0)
    price_chart = data.get("priceChart", {})
    demand_chart = data.get("demandChart", {})

    labels = price_chart.get("labels", [])
    price_forecast = price_chart.get("data", [])
    demand_forecast = demand_chart.get("data", [])

    # Plot Price Forecast
    plt.figure(figsize=(10, 5))
    plt.plot(labels, price_forecast, linestyle='--', marker='o', color='#2ecc71', label='Forecasted Price')
    plt.title(f'Price Forecast for {crop}\nPredicted Price: Rs {predicted_price:.2f} per kg')
    plt.xlabel('Date')
    plt.ylabel('Price per Kg')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

    # Plot Demand Forecast
    plt.figure(figsize=(10, 5))
    plt.plot(labels, demand_forecast, linestyle='--', marker='o', color='#ff9933', label='Forecasted Demand')
    plt.title(f'Demand Forecast for {crop}')
    plt.xlabel('Date')
    plt.ylabel('Sales in Kg')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

def main():
    parser = argparse.ArgumentParser(description="Forecast Script Connecting to Backend")
    parser.add_argument('--crop', type=str, required=True, help="Name of the crop (e.g., 'Chili')")
    parser.add_argument('--date', type=str, required=True, help="Date for forecast in YYYY-MM-DD format")
    parser.add_argument('--last_price', type=float, default=100, help="Last observed price (default: 100)")
    args = parser.parse_args()

    try:
        data = get_chart_data(args.crop, args.date, args.last_price)
        print("Received Forecast Data:")
        print(data)
        plot_forecasts(data, args.crop)
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    main()
