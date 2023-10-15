import warnings

import joblib
import pandas as pd
import xgboost as xgb
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split
from hyperopt import hp, STATUS_OK, Trials, fmin, tpe

import model_util

warnings.filterwarnings("ignore")


def make_training_data():
    training_data = pd.read_csv('../train.csv')
    test_data = pd.read_csv('../test.csv')

    x = training_data.drop(['Месяц3', 'Количество позиций', 'y'], axis=1)
    y = training_data['y']

    return train_test_split(x, y, test_size=0.2, random_state=42)


search_space = {
    # 'max_depth': hp.quniform('max_depth', 3, 25, 1),
    'learning_rate': hp.uniform('learning_rate', 0.2, 0.25),
    'gamma': hp.uniform('gamma', 0, 0.03),
    # 'min_child_weight': hp.quniform('min_child_weight', 0, 10, 1),
    'n_estimators': 260,
    'seed': 0
}

best_params = {
    'learning_rate': 0.2222699,
    'max_depth': 14,
    'n_estimators': 200,
    'min_child_weight': 4,
    'gamma': 0.01,
    'seed': 0
}


def run_parameter_search(space, max_evals=5):
    x_train, x_test, y_train, y_test = make_training_data()
    current = model_util.params_from_file()

    def objective(search):
        clf = xgb.XGBClassifier(
            learning_rate=search['learning_rate'],
            n_estimators=current['n_estimators'],
            max_depth=current['max_depth'],
            gamma=search['gamma'],
            min_child_weight=current['min_child_weight'],
            verbosity=0, silent=True
        )

        evaluation = [(x_train, y_train), (x_test, y_test)]

        clf.fit(x_train, y_train, eval_set=evaluation, eval_metric='auc', early_stopping_rounds=10,
                verbose=False)

        prediction = clf.predict(x_test)
        accuracy = f1_score(y_test, prediction > 0.5, average='macro')
        print(f'SCORE: {accuracy}, PARAMS: {search}')
        return {
            'loss': -accuracy,
            'status': STATUS_OK
        }

    trials = Trials()
    new_params = fmin(fn=objective, space=space, algo=tpe.suggest, max_evals=max_evals, trials=trials)
    print(new_params)
    return new_params


def get_params(do_search_params=False, spc=None):
    current_params = model_util.params_from_file()

    if do_search_params:
        print("[model] Starting parameter optimization. This will take a while.")
        new_params = run_parameter_search(spc)

        print("[model] Optimization finished. [y] to use new params")
        if input() == 'y':
            current_params = current_params | new_params
            model_util.params_to_file(current_params)
            print("[model] Merged newly optimized parameters with current parameters.")
        else:
            print("[model] Dropping newly optimized parameters.")

    return current_params


def make_new_model(do_search_params=False):
    current_params = get_params(do_search_params, search_space)

    clf = xgb.XGBClassifier(**current_params)
    x_train, x_test, y_train, y_test = make_training_data()

    clf = model_util.fit(clf, x_train, y_train)
    model_util.model_to_file(clf)

