from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app)

def simulate_yield(crop, province, district, landscape, size_sqm):
    # Base yield multipliers for each crop.
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
    # Add random noise and small modifiers to simulate real-world variation.
    noise = random.uniform(0.95, 1.05)
    prov_modifier = random.uniform(0.98, 1.02)
    district_modifier = random.uniform(0.98, 1.02)
    landscape_modifier = random.uniform(0.98, 1.02)
    combined_modifier = prov_modifier * district_modifier * landscape_modifier
    predicted_yield = size_sqm * crop_rate * noise * combined_modifier
    return predicted_yield

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    crop = data.get("crop")
    province = data.get("province")
    district = data.get("district")
    landscape = data.get("landscape")
    size_sqm = data.get("size_sqm")
    
    prediction = simulate_yield(crop, province, district, landscape, size_sqm)
    # Round to 2 decimal places.
    return jsonify({"prediction": round(prediction, 2)})

if __name__ == '__main__':
    # Run the Flask app on port 5000.
    app.run(host="0.0.0.0", port=5000, debug=True)
