import io

import joblib
import pandas as pd
from flask import Flask, request

import model


app = Flask(__name__)


@app.post('/predict')
def predict():
    file = request.files['file']
    print(file.filename)

    file_ext = file.filename[file.filename.find('.') + 1:]
    print(file_ext)

    if file_ext == 'xlsx':
        df = pd.read_excel(io.StringIO(file.read().decode('utf-8')), engine='openpyxl')
    elif file_ext == 'xls':
        df = pd.read_excel(io.StringIO(file.read().decode('utf-8')))
    elif file_ext == 'csv':
        df = pd.read_csv(io.StringIO(file.read().decode('utf-8')))

    df = df.drop(columns=['Месяц3', 'Количество позиций'])

    pred = model.predict(df)
    pred_df = pd.DataFrame({'id': range(len(pred)), 'value': pred})

    return pred_df.to_json()

if __name__ == '__main__':
    app.run(debug=True)