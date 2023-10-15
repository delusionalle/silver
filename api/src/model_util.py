import warnings

import joblib
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split

warnings.filterwarnings("ignore")


def preprocess(df):
    df = df.drop(['Месяц3', 'Количество позиций'], axis=1)
    return df


def split(df):
    x = df.drop(['y'], axis=1)
    y = df['y']
    return x, y


# Makes training data from CSV. Returns (X_train, Y_train, X_test, Y_test)
def make_training_data(df):
    df = preprocess(df)
    x, y = split(df)
    return train_test_split(x, y, test_size=0.2, random_state=42)


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
    return joblib.load('objects/params.pkl')


def params_to_file(current_params):
    joblib.dump(current_params, 'objects/params.pkl')
    print("[model] Saved current parameters to params.pkl.")


def model_from_file():
    print("[model] Loading saved model from model.pkl.")
    return joblib.load('objects/model.pkl')


def model_to_file(model):
    joblib.dump(model, 'objects/model.pkl')
    print("[model] Saved model to model.pkl.")
