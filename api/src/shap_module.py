import shap

friendly_names = {
    'supplier': 'Поставщик',
    'material': 'Материал',
    'category_manager': 'Категорийный менеджер',
    'operations_manager': 'Операционный менеджер',
    'factory': 'Завод',
    'buying_organisation': 'Закупочная организация',
    'buying_group': 'Группа закупок',
    'balancing_unit': 'Балансовая единица',
    'measuring_unit': 'Единица измерений',
    'material_group': 'Группа материалов',
    'delivery_variant': 'Вариант поставки',
    'urgency_mark': 'НРП',
    'length': 'Длительность',
    'until_delivery': 'До поставки',
    'month1': 'Месяц 1',
    'month2': 'Месяц 2',
    'month3': 'Месяц 3',
    'day_of_week': 'День недели',
    'sum': 'Сумма',
    'number_of_positions': 'Количество позиций',
    'amount': 'Количество',
    'amount_of_handlers_7': 'Количество обработчиков 7',
    'amount_of_handlers_15': 'Количество обработчиков 15',
    'amount_of_handlers_30': 'Количество обработчиков 30',
    'order_agreement_1': 'Согласование заказа 1',
    'order_agreement_2': 'Согласование заказа 2',
    'order_agreement_3': 'Согласование заказа 3',
    'delivery_date_change_7': 'Изменение позиции заказа на закупку: изменение даты поставки 7',
    'delivery_date_change_15': 'Изменение позиции заказа на закупку: изменение даты поставки 15',
    'delivery_date_change_30': 'Изменение позиции заказа на закупку: изменение даты поставки 30',
    'deblocking_cancellation_freq': 'Отмена полного деблокирования заказа на закупку',
    'delivery_date_paper_change_freq': 'Изменение позиции заказа на закупку: изменение даты поставки на бумаге',
    'delivery_date_change_freq': 'Изменение позиции заказа на закупку: дата поставки',
    'agreement_cycle_amount': 'Количество циклов согласования',
    'change_after_agreement_amount': 'Количество изменений после согласований',
    'days_0_1': 'Дней между 0-1',
    'days_1_2': 'Дней между 1-2',
    'days_2_3': 'Дней между 2-3',
    'days_3_4': 'Дней между 3-4',
    'days_4_5': 'Дней между 4-5',
    'days_5_6': 'Дней между 5-6',
    'days_6_7': 'Дней между 6-7',
    'days_7_8': 'Дней между 7-8',
}


def force_plot_html(explainer: shap.TreeExplainer, shap_values, x):
    force_plot = shap.plots.force(explainer.expected_value, shap_values, x, show=False)
    html = f"{shap.getjs()}<body>{force_plot.html()}</body>"
    return html
