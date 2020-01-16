"""API specification"""

import pytz
import datetime
from random import randint
from flask import jsonify
from flask_restful import Resource
from src.models import WeatherData

class WeatherDataResource(Resource):
    """
    This is the API which will grab all the available data from
    present in SQLite3 database.
    """
    def get(self):
        try:
            _data = WeatherData.get_all_available_data()
            if _data:
                return [
                    {
                        "created": str(i.created),
                        "temperature": i.temperature,
                    } 
                    for i in _data
                ], 200
            return {"msg": "No data could be retrived from a database."}, 404
        except Exception as e:
            return None
    """
    This is the API saves temperature data to
    SQLite3 database.
    """
    def post(self):
        try:
            create_date = datetime.datetime.now(pytz.timezone("America/New_York"))
            _data = WeatherData(
                created=create_date,
                temperature=str(randint(0, 30))
                )
            _data.save_to_db()

            return {"msg": "{data} has been saved to database.".format(
                data=_data.json()
            )}, 200
        except Exception as e:
            return {"msg": "Could not save data to database. {error}".format(
                error=e
            )}, 400

    