import joblib
import pandas as pd
import xgboost as xgb
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
import matplotlib

matplotlib.use('AGG')
import matplotlib.pyplot as plt

import parsers

params = {
    'learning_rate': 0.2222699,
    'max_depth': 14,
    'n_estimators': 200,
    'min_child_weight': 4,
    'gamma': 0.01,
    'seed': 0
}


def make_model():
    return xgb.XGBClassifier(**params)


def make_training_data():
    training_data = pd.read_csv('../data/train.csv')
    training_data = parsers.rename_columns(training_data, is_train_set=True)
    x_train = parsers.process(training_data).drop('is_late', axis=1)
    y_train = training_data['is_late']
    return x_train, y_train


def accuracy(model, xts, yts):
    preds = model.predict(xts)
    acc = f1_score(yts, preds, average='macro')
    return acc


def save_model(model):
    model.save_model('model.json')


def load_model(model):
    try:
        return model.load_model('model.json')
    except Exception as e:
        return None
