import xgboost
import joblib

params = {
    'max_depth': 14,
    'learning_rate': 0.2222699,
    'gamma': 0.01,
    'min_child_weight': 4,
    'n_estimators': 260,
    'seed': 0
}

model = xgboost.XGBClassifier(**params)
joblib.dump('model.pkl')
