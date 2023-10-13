from flask import Flask, request, jsonify
import pandas as pd
from xgboost import XGBClassifier
from sklearn.metrics import f1_score

app = Flask(__name__)

# Load your pre-trained XGBoost model
model = XGBClassifier(random_state=42, n_estimators=100, max_depth=3)  # Update with your model parameters

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        data = request.json  # Assuming data is sent as JSON

        # Perform any necessary data preprocessing here, if needed
        # Assuming the data you receive is in the same format as 'X_test'

        # Make predictions using the loaded model
        predictions = model.predict(data)

        # Return the predictions as JSON
        response = {'predictions': predictions.tolist()}
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main':
    app.run(debug=True)
