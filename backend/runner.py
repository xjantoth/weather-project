"""
Main Flask file calling all API endpoints
"""

import sqlite3
import logging
from config import conf
from flask_cors import CORS
from flask import (Flask, jsonify)
from flask_restful import Api
from src.models import WeatherData
from src.resources import (
    WeatherDataResource,
    DataBetweenDates,
    LastNDays,
)

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.WARNING)
# app.logger.addHandler(stream_handler)
app.logger.stream_handler

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{db_path}'.format(
    db_path=conf['sqlite_file'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@app.before_first_request
def create_tables():
    from src.db import db
    with app.app_context():
        db.init_app(app)
        db.create_all()


api =  Api(app)
api.add_resource(WeatherDataResource, '/api/v1/data')
api.add_resource(DataBetweenDates, '/api/v1/data/select')
api.add_resource(LastNDays, '/api/v1/data/days')

if __name__ == '__main__':
    from src.db import db
    db.init_app(app)
    app.run(host='0.0.0.0')