import io
import os.path

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



async def from_file(file):
    file_ext = os.path.splitext(file.filename)

    if file_ext[1] == '.xlsx':
        df = pd.read_excel(io.StringIO((await file.read()).decode('utf-8')), engine='openpyxl')
    elif file_ext[1] == '.xls':
        df = pd.read_excel(io.StringIO((await file.read()).decode('utf-8')))
    elif file_ext[1] == '.csv':
        df = pd.read_csv(io.StringIO((await file.read()).decode('utf-8')))
    else:
        print("something fucked up tbh", file.filename, file_ext)
        return None

    return df
