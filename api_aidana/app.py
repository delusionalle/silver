from flask import Flask, request, jsonify, render_template
import pandas as pd
from xgboost import XGBClassifier
from sklearn.metrics import f1_score
from pathlib import Path
import io
import joblib

from AIModel import AIModel

app = Flask(__name__, template_folder='template')
model = joblib.load('model.pkl')
chosen_id = 0

models = [
    AIModel(0, 'xgboost', 'model.pkl'),
    AIModel(1, 'xgboost2', 'model.pkl'),
]

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

# Root endpoint
@app.get('/predict')
def train_new_model():
    return render_template('entry2.html')

 
@app.post('/view')
def view():
    # Read the File using Flask request
    file = request.files['file']

    print(file.filename)
    # save file in local directory
    # file.save(file.filename)

    df = parse_file_to_df(file)

    if df.empty:
        return "No data", 400
 
    # # Parse the data as a Pandas DataFrame type
    # # test_data = pandas.read_excel(file)

    exclude_columns = ['Месяц3', 'Количество позиций']
    df = df.drop(columns=exclude_columns)

    pre = model.predict(df)
    submission_df = pd.DataFrame({'id': range(len(pre)), 'value': pre})
    return submission_df.to_json()

@app.route('/aimodels')
def show_models():
    return render_template('models.html', models=models)


@app.route('/aimodels/<int:model_id>', methods=['GET', 'POST'])
def train_model(model_id):
    global chosen_id, model
    chosen_id = model_id
    model = models[model_id].load_model()
    return "Model is loaded"
 
@app.route('/')
def main_screen():
    return f'Current model is {models[chosen_id].name}'

# Main Driver Function
if __name__ == '__main__':
    # Run the application on the local development server
    app.run(debug=True)
