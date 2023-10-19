import io
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
import shap
import xgboost
from fastapi import FastAPI, Request, Response, BackgroundTasks, UploadFile
from fastapi.middleware import cors
import warnings
import shap_module
from sklearn.model_selection import train_test_split
from starlette.responses import JSONResponse

import parsers
import model

warnings.filterwarnings('ignore')

api = FastAPI()
api.add_middleware(
    cors.CORSMiddleware,
    allow_origins=['*'],
    allow_headers=['*'],
    allow_methods=['*'],
)

x, y = model.make_training_data()
clf = model.load_model(xgboost.XGBClassifier())
if not clf:
    clf = model.make_model()
    xtr, xts, ytr, yts = train_test_split(x, y, test_size=0.25)
    clf.fit(xtr, ytr, eval_set=[(xts, yts)], verbose=50)
    model.save_model(clf)

is_trained = False

friendly_x = x
friendly_columns = [shap_module.friendly_names.get(n, n) for n in x.columns]
friendly_x.columns = friendly_columns

shap.initjs()
explainer = shap.TreeExplainer(clf)
shap_values = explainer.shap_values(friendly_x[:1000])


@api.get('/force_plot')
async def get_force_plot():

    plots = {}
    for i in range(1):
        ind = i
        plots[i] = shap_module.force_plot_html(explainer, shap_values, friendly_x)

    return shap_module.force_plot_html(explainer, shap_values, friendly_x)


@api.get('/importances')
async def importances():
    imps = await clf.feature_importances_.tolist()
    print("hi", clf.feature_importances_)
    return Response(content=imps, media_type='application/json')


@api.get('/params')
async def parameters():
    return model.params


@api.get('/')
def homepage():
    return "Welcome to the model API server"


@api.post('/train')
def run_training():
    global is_trained
    clf.fit(xtr, ytr, eval_set=[(xts, yts)], verbose=50)
    is_trained = True
    return "Model retrained.", 200


@api.post('/predict')
async def predict(file: UploadFile):
    df = await parsers.from_file(file)
    df = parsers.rename_columns(df)
    df = parsers.process(df)
    if df is None:
        return "Malformed data.", 400

    preds = clf.predict(df)
    df.insert(len(df.columns), "is_late", preds, True)

    return {'predictions': df.to_json(orient='records')}


@api.get('/accuracy')
async def get_accuracy():
    return model.accuracy(clf, xts, yts)
