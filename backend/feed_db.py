"""Fill up database with fake data"""

import requests
import datetime

def save_to_db(n):
    """Save data to database 
    with the datetime from past
    """
     
    dates = []
    initial = datetime.datetime.now().replace(microsecond=0)
    for _ in range(0, n):
        dates.append(initial)
        initial = initial - datetime.timedelta(minutes=120)
    
    for i in dates:
        requests.post(
            url="http://backend/api/v1/data",
            params={
                "created": str(i).replace(' ', 'T')
            }
        )

        
save_to_db(n=100)

    
