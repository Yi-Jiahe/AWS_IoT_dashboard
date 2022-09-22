import time

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import boto3
from boto3.dynamodb.conditions import Attr

MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000


@app.route("/environmental_data")
def environmental_data():
    device_name = request.args.get('device_name')
    device_name = device_name if device_name else 'esp32-thermostat'
    history = request.args.get('history')
    try:
        history = int(history)
    except (ValueError, TypeError):
        history = 1

    return get_environmental_data(device_name=device_name, history=history)


def get_environmental_data(device_name='esp32-thermostat', history=1):
    """
    Queries DynamoDB for environmental data from the specified device over the last n days

    :param device_name: Name of device to query data from
    :param history: Number of days of history to include
    :return: 3 lists containing the timestamps, temperature and humiditiy data respectively
    """
    print(device_name, history)

    time_now = round(time.time() * 1000)
    time_start = time_now - round(history * MILLISECONDS_PER_DAY)

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('environmental_data')
    response = table.scan(
        FilterExpression=Attr('device_id').eq(device_name) & Attr('sample_time').gt(time_start)
    )
    items = response['Items']
    return [{
        "timestamp": item['sample_time'], 
        "temperature": item['device_data']['temperature'],
        "humidity": item['device_data']['humidity']
        } for item in items]


if __name__ == '__main__':
    timestamps, temperatures, humidities = get_environmental_data()
    print(timestamps)
    print(temperatures)
    print(humidities)
