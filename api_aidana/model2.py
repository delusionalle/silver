import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import joblib

from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression

train_data = pd.read_csv('../api_rewrite/data/train.csv')

exclude_columns = ['Месяц3', 'Количество позиций']
X = train_data.drop(columns=exclude_columns + ['y'])
y = train_data['y']

model = XGBClassifier(random_state=42, n_estimators=100, max_depth=3)  # Update with your model parameters
model.fit(X, y)

joblib.dump(model, 'model.pkl')
