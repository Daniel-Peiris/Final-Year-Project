from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model from the pickle file located in the same directory.
with open("random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Expects JSON input with a key "features" that holds a list of feature values.
    Example:
    {
        "features": [0, 1, 0, 1500]
    }
    Make sure the features are ordered the same way as they were during training.
    """
    data = request.get_json(force=True)
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features)[0]
    return jsonify({"prediction": float(prediction)})

if __name__ == '__main__':
    # Run the Flask app on port 5000.
    app.run(host="0.0.0.0", port=5000, debug=True)
