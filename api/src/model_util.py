import warnings

import joblib
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split

warnings.filterwarnings("ignore")


def preprocess(df):
    df = df.drop(['month3', 'number_of_positions'], axis=1)
    return df


def rename_columns(df, is_train_set=False):
    new_names = [
        'supplier',
        'material',
        'category_manager',
        'operations_manager',
        'factory',
        'buying_organisation',
        'buying_group',
        'balancing_unit',
        'measuring_unit',
        'material_group',
        'delivery_variant',
        'urgency_mark',
        'length',
        'until_delivery',
        'month1',
        'month2',
        'month3',
        'day_of_week',
        'sum',
        'number_of_positions',
        'amount',
        'amount_of_handlers_7',
        'amount_of_handlers_15',
        'amount_of_handlers_30',
        'order_agreement_1',
        'order_agreement_2',
        'order_agreement_3',
        'delivery_date_change_7',
        'delivery_date_change_15',
        'delivery_date_change_30',
        'deblocking_cancellation_freq',
        'delivery_date_paper_change_freq',
        'delivery_date_change_freq',
        'agreement_cycle_amount',
        'change_after_agreement_amount',
        'days_0_1',
        'days_1_2',
        'days_2_3',
        'days_3_4',
        'days_4_5',
        'days_5_6',
        'days_6_7',
        'days_7_8',
    ]

    if is_train_set:
        new_names.append('is_late')

    return df.set_axis(new_names, axis='columns')


def split(df):
    x = df.drop(['is_late'], axis=1)
    y = df['is_late']
    return x, y


# Makes training data from CSV. Returns (X_train, Y_train, X_test, Y_test)
def make_training_data(df):
    df = rename_columns(df, is_train_set=True)
    df = preprocess(df)
    x, y = split(df)
    return train_test_split(x, y, test_size=0.2, random_state=42)


# fit f1 score to xgboost
def xgb_f1(y, t, threshold=0.5):
    t = t.get_label()
    y_bin = (y > threshold).astype(int)
    return 'f1', f1_score(t, y_bin)


def fit(clf, xtr, ytr):
    print("[model] Refitting with new data.")
    return clf.fit(xtr, ytr)


def pred(clf, xts, threshold=0.5):
    return clf.predict(xts) > threshold


def test(clf, xts, yts):
    return f1_score(yts, pred(clf, xts), average='macro')


def params_from_file():
    print("[model] Loading saved parameters from params.pkl.")
    return joblib.load('./params.pkl')


def params_to_file(current_params):
    print("[model] Saving params to params.pkl.")
    return joblib.dump(current_params, './params.pkl')


def model_from_file():
    print("[model] Loading saved model from model.pkl.")
    return joblib.load('./model.pkl')


def model_to_file(model):
    print("[model] Saving model to model.pkl.")
    return joblib.dump(model, './model.pkl')
