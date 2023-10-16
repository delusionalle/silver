import io

import joblib
import pandas as pd
from flask import Flask, request

import model
import model_util

app = Flask(__name__)
model.make_new_model()
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
    global clf

    file = request.files['file']
    if file:
        df = parse_file_to_df(file)
        if df.empty:
            return "Unsupported file format.", 400

        df_old = pd.read_csv('./train.csv')

        if set(df.columns) != set(df_old.columns):
            missing_in_old = set(df.columns) - set(df_old.columns)
            missing_in_new = set(df_old.columns) - set(df.columns)

            return f"Malformed data. You're missing columns: {missing_in_new}, current data is missing columns: {missing_in_old}", 400

        df.to_csv('./train2.csv', mode='a')

    # TODO: Ask user if should run parameter optimization
    acc = model.make_new_model()
    clf = model_util.model_from_file()
    return f"Retraining completed. New accuracy: {acc}. Check console for logs", 200


@app.post('/predict')
def predict():
    file = request.files['file']
    print(file.filename)

    df = parse_file_to_df(file)
    if df.empty:
        return "Unsupported file format.", 400

    df = model_util.preprocess(df)

    pred = model_util.pred(clf, df)
    pred_df = pd.DataFrame({'id': range(len(pred)), 'value': pred})

    return pred_df.to_json()


if __name__ == '__main__':
    app.run(debug=True, port=3002)
