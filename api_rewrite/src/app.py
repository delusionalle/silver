import json

import joblib
import pandas as pd
import xgboost
from flask import Flask, request, jsonify
import warnings

import parsers
import model


warnings.filterwarnings('ignore')

api = Flask(__name__)

clf = model.load_model()
if not clf:
    clf = model.make_model()
    model.save_model(clf)

is_trained = False


@api.route('/')
def homepage():
    return "Welcome to the model API server"


@api.post('/train')
def run_training():
    global is_trained
    x, y = model.make_training_data()
    clf.fit(x, y)
    is_trained = True
    return "Model retrained.", 200


@api.get('/predict')
def make_prediction():
    global is_trained

    if not is_trained:
        x, y = model.make_training_data()
        clf.fit(x, y)
        is_trained = True

    df = parsers.from_json(request.json)
    df = parsers.process(df)
    if not df:
        return "Malformed data", 400

    preds = clf.predict(df)
    preds_df = pd.DataFrame({
        'id': range(len(preds)),
        'value': preds
    })

    return preds_df.to_json()


@api.get('/accuracy')
def get_accuracy():
    return jsonify(model.accuracy(clf))


if __name__ == '__main__':
    clf = model.make_model()
    x, y = model.make_training_data()
    clf.fit(x, y)
    model.save_model(clf)
    api.run(debug=True, port=4000)
