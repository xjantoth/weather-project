import pytz
import datetime
from datetime import date
from src.db import db


class WeatherData(db.Model):
    __tablename__ = 'weather_data'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(
        db.DateTime, 
        default=datetime.datetime.now(pytz.timezone("Europe/Bratislava")).replace(microsecond=0)
        )
    temperature = db.Column(db.String())
    humidity = db.Column(db.String())

    def __init__(self, humidity, temperature, created):
        self.humidity = humidity
        self.temperature = temperature
        self.created = created

    def json(self):
        return {
            "created": self.created,
            "temperature": self.temperature,
            "humidity": self.humidity,
            }

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_data_between_specific_dates(start=None, end=None):    
        try:
            if start and end:
                data = WeatherData.query.filter(
                    WeatherData.created <= end).filter(
                        WeatherData.created >= start)
                return data
            return {"msg": "Please define START and END dates properly"}, 404
        except Exception as e:
            return {"msg": "Could not get required dates. {error}".format(
                error=e
            )}, 500
            

    @classmethod
    def find_latest(cls):
        return cls.query.order_by(cls.created.desc()).first()
    
    @classmethod
    def get_all_available_data(cls):
        """
        :return:
        """
        try:
            weather_data = cls.query.all()
            return weather_data
        except Exception as e:
            print("Could not return weather data: {error}".format(
                error=e)
                )
            return None
    

