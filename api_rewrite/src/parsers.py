import pandas as pd


def from_json(json):
    df = pd.read_json(json)
    with pd.read_csv('../data/test.csv') as test_data:
        if test_data.shape != df.shape:
            return None
        else:
            return df


def process(df: pd.DataFrame):
    df = df.drop(['month3', 'number_of_positions'], axis=1)
    return df
