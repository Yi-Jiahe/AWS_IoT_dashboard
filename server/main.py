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
    device_name = device_name if device_name != '' else 'esp32-thermostat'
    history = request.args.get('history')
    try:
        history = float(history)
    except ValueError:
        history = 1

    timestamps, temperatures, humidities = get_environmental_data(device_name=device_name, history=history)
    return {
        "timestamps": timestamps,
        "temperatures": temperatures,
        "humidities": humidities
    }

def get_environmental_data(device_name='esp32-thermostat', history=1):
    """
    Queries DynamoDB for environmental data from the specified device over the last n days

    :param device_name: Name of device to query data from
    :param history: Number of days of history to include
    :return: 3 lists containing the timestamps, temperature and humiditiy data respectively
    """
    time_now = round(time.time() * 1000)
    time_start = time_now - history * MILLISECONDS_PER_DAY

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('environmental_data')
    response = table.scan(
        FilterExpression=Attr('device_id').eq(device_name) & Attr('sample_time').gt(time_start)
    )
    items = response['Items']
    timestamps, temperatures, humidities = [], [], []
    for item in items:
        timestamps.append(item['sample_time'])
        data = item['device_data']
        temperatures.append(data['temperature'])
        humidities.append(data['humidity'])

    return timestamps, temperatures, humidities


if __name__ == '__main__':
    timestamps, temperatures, humidities = get_environmental_data()
    print(timestamps)
    print(temperatures)
    print(humidities)
