import pandas as pd
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import f1_score
from sklearn.model_selection import train_test_split, StratifiedKFold
import optuna
from imblearn.over_sampling import SMOTE
from sklearn_genetic import GASearchCV
from sklearn_genetic.space import Integer

# Load data
train_data = pd.read_csv('../api/train.csv')
test_data = pd.read_csv('../api/test.csv')

# Data preprocessing
exclude_columns = ['Месяц3', 'Количество позиций']
X = train_data.drop(columns=exclude_columns + ['y'])
y = train_data['y']
y.value_counts()
sm = SMOTE(random_state=42, k_neighbors=5)
X_res, y_res = sm.fit_resample(X, y)
y_res.value_counts()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.05, random_state=42)


# Define the objective function to optimize with Optuna
def objective(trial):
    # Define the hyperparameter search space
    param_space = {
        'n_estimators': trial.suggest_int('n_estimators', 50, 300),
        'max_depth': trial.suggest_int('max_depth', 3, 10),
        'learning_rate': trial.suggest_uniform('learning_rate', 0.01, 0.5),
        'subsample': trial.suggest_uniform('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_uniform('colsample_bytree', 0.6, 1.0),
        'gamma': trial.suggest_uniform('gamma', 0, 5),
        'min_child_weight': trial.suggest_int('min_child_weight', 1, 5),
    }

    # Create an XGBoost classifier with the suggested hyperparameters
    xgb_model = XGBClassifier(random_state=42, **param_space)

    # Fit the model on the training data
    xgb_model.fit(X_train, y_train)

    # Make predictions on the test data
    test_predictions = xgb_model.predict(X_test)

    # Calculate the F1 score as the objective to maximize
    f1_macro = f1_score(y_test, test_predictions, average='macro')

    return f1_macro


param_grid = {'n_estimators': Integer(50, 500),
              'max_depth': Integer(1, 20)}
# Create and save a submission file using the best hyperparameters
clf = XGBClassifier(random_state=42)
# Our cross-validation strategy (it could be just an int)
cv = StratifiedKFold(n_splits=3, shuffle=True)

# The main class from sklearn-genetic-opt
evolved_estimator = GASearchCV(estimator=clf,
                               cv=cv,
                               scoring='f1_macro',
                               param_grid=param_grid,
                               n_jobs=-1,
                               verbose=True,
                               population_size=10,
                               generations=30)
clf.fit(X_res, y_res)
evolved_estimator.fit(X_train, y_train)
f1_macro = evolved_estimator.predict(X_test)
print("Best F1-Score (Test):", f1_score(f1_macro, y_test, average='macro'))
test_data = test_data.drop(columns=exclude_columns)
y_predict_ga = evolved_estimator.predict(test_data)
submission_df = pd.DataFrame({'id': range(len(y_predict_ga)), 'value': y_predict_ga})  # No 'ID' column
submission_df.to_csv('submission5.csv', index=False)

