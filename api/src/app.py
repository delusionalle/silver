import io

import joblib
import pandas as pd
from flask import Flask, request

import model
import model_util

app = Flask(__name__)
clf = model_util.model_from_file()


def parse_file_to_df(file):
    file_ext = file.filename[file.filename.find('.') + 1:]
    print(file_ext)

    if file_ext == 'xlsx':
        df = pd.read_excel(io.StringIO(file.read().decode('utf-8')), engine='openpyxl')
    elif file_ext == 'xls':
        df = pd.read_excel(io.StringIO(file.read().decode('utf-8')))
    elif file_ext == 'csv':
        df = pd.read_csv(io.StringIO(file.read().decode('utf-8')))
    else:
        return None

    return df


@app.post('/train')
def train():
    file = None #request.files['file']
    if file:
        df = parse_file_to_df(file)
        if not df:
            return "Unsupported file format.", 400

        df.to_csv('./data/train.csv', mode='a')

    # TODO: Ask user if should run parameter optimization
    acc = model.make_new_model(True)
    return f"Retraining completed. New accuracy: {acc}. Check console for logs", 200


@app.post('/predict')
def predict():
    file = request.files['file']
    print(file.filename)

    df = parse_file_to_df(file)
    if not df:
        return "Unsupported file format.", 400

    df = model_util.preprocess(df)

    pred = model_util.pred(clf, df)
    pred_df = pd.DataFrame({'id': range(len(pred)), 'value': pred})

    return pred_df.to_json()


if __name__ == '__main__':
    app.run(debug=True)
