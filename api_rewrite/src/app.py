import io
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
import xgboost
from fastapi import FastAPI, Request, Response, BackgroundTasks
from fastapi.middleware import cors
import warnings
import shap
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


def create_plot():
    buf = io.BytesIO()

    clf.get_booster().get_score(importance_type='gain', show=False)

    plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
    return buf


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
    clf.fit(x, y)
    is_trained = True
    return "Model retrained.", 200


@api.get('/predict')
async def make_prediction(request: Request):
    global is_trained

    if not is_trained:
        clf.fit(x, y)
        is_trained = True

    df = parsers.from_json(request.json())
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
async def get_accuracy():
    return model.accuracy(clf)

