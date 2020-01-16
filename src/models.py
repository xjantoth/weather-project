import pytz
import datetime
from db import db


class WeatherData(db.Model):
    __tablename__ = 'weather_data'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(
        db.DateTime, 
        default=datetime.datetime.now(pytz.timezone("Europe/Bratislava"))
        )
    temperature = db.Column(db.String())

    def __init__(self, temperature, created):
        self.temperature = temperature
        self.created = created

    def json(self):
        return {
            "created": self.created,
            "temperature": self.temperature,
            }

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

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
            print("Could not return weather data: {}".format(e))
            return None
