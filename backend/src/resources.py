"""API specification"""

import pytz
import datetime
from random import randint
from flask import jsonify
from flask_restful import Resource, request, reqparse
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
                        "id": i.id,
                        "created": str(i.created),
                        "temperature": i.temperature,
                        "humidity": i.humidity,
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
            args = request.args
            create_date = datetime.datetime.now(pytz.timezone("Europe/Bratislava")).replace(microsecond=0)

            create_date_from_request = args.get('created', None) 
            # print(f"I see this {args} and it is of type {type(args)}  and {create_date_from_request}")
            
            if create_date_from_request:
                create_date_from_request = datetime.datetime.strptime(
                    create_date_from_request.replace('T', ' '), 
                    '%Y-%m-%d %H:%M:%S'
                )
                create_date = create_date_from_request


            _data = WeatherData(
                created=create_date,
                temperature= args.get('temperature', str(randint(0, 30))),
                humidity=args.get('humidity', str(randint(0, 40))),
                )
            _data.save_to_db()

            return {"msg": "{data} has been saved to database.".format(
                data=_data.json()
            )}, 200
        except Exception as e:
            return {"msg": "Could not save data to database. {error}".format(
                error=e
            )}, 400

    
class DataBetweenDates(Resource):
    """
    Get Data between specific dates.
    """
    def post(self):
        try:
            args = request.args
            print(args)
            _data = WeatherData.get_data_between_specific_dates(
                start=args['start'].replace('T', ' '), 
                end=args['end'].replace('T', ' ')
            )
            return [
                    {
                        "created": str(i.created),
                        "temperature": i.temperature,
                        "humidity": i.humidity,
                    } 
                    for i in _data
                ], 200
        except Exception as e:
            return{"msg": "Could not get data between specified date range. {error}".format(
                error=e
            )}, 500

class LastNDays(Resource):
    """Retrives last n-number of dates and returns 
    series of data per day
    """
    def get(self):

        days = 7
        get_current_day = datetime.datetime(
            year=datetime.date.today().year,
            month=datetime.date.today().month,
            day=datetime.date.today().day,
            hour=23,
            minute=59,
            second=59
        )
        intervals = {}
        for i in range(1, days + 1):
            
            get_current_day = get_current_day
            
            intervals[f"day_{i - 1}"] = {
                    "start": str(get_current_day - datetime.timedelta(days=i)),
                    "end": str(get_current_day - datetime.timedelta(days=i-1))
                    }
        
        data_series = {}
        for i in intervals:
            start = intervals[i]["start"]
            end = intervals[i]["end"]
            
            _data = WeatherData.get_data_between_specific_dates(
                start=str(start).replace('T', ' '), 
                end=str(end).replace('T', ' ')
            )
            
            data_series[i] = [
                {
                    "created": str(s.created.time()),
                    "temperature": s.temperature,
                    "humidity": s.humidity,
                } 
                for s in _data
            ]
            
        # rechart_compatible = {}
        # for i in data_series:
        #     rechart_compatible[i] = data_series[i]
        #     rechart_compatible["name"] = i
        
        # [{i: i**2, i**4: i} for i in range(2,7)]
        # [{2: 4, 16: 2}, {3: 9, 81: 3}, {4: 16, 256: 4}, {5: 25, 625: 5}, {6: 36, 1296: 6}]


        return [{"name": i, "data": data_series[i]} for i in data_series], 200

        # return data_series

            
        # return rechart_compatible, 200
            
        
class HealthClass(Resource):
    """
    This is the API checks backend connectivity to database.
    """
    def get(self):
        """Connects to PostgreSQL database"""
        try:
            WeatherData.get_all_available_data()
            return {
                "msg": "Dummy database connectivity check.",
                "message": True,
            }, 200

        except Exception as e:
            return {"msg": f"Cloud not load data from database: {e}"}, 500

    



