import warnings

import joblib
from sklearn.metrics import f1_score

warnings.filterwarnings("ignore")


# fit f1 score to xgboost
def xgb_f1(y, t, threshold=0.5):
    t = t.get_label()
    y_bin = (y > threshold).astype(int)
    return 'f1', f1_score(t, y_bin)


def fit(clf, xtr, ytr):
    return clf.fit(xtr, ytr)


def pred(clf, xts, threshold=0.5):
    return clf.predict(xts) > threshold


def test(clf, xts, yts):
    return f1_score(yts, pred(clf, xts), average='macro')


def params_from_file():
    print("[model] Loading saved parameters from params.pkl.")
    return joblib.load('params.pkl')


def params_to_file(current_params):
    joblib.dump(current_params, 'params.pkl')
    print("[model] Saved current parameters to params.pkl.")


def model_from_file():
    print("[model] Loading saved model from model.pkl.")
    return joblib.load('model.pkl')


def model_to_file(model):
    joblib.dump(model, 'model.pkl')
    print("[model] Saved model to model.pkl.")
