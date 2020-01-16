# weather-project
Collecting weather data from Raspberry Pi sensors

# Quick start
```bash
python -m venv venv3-weather
echo "venv3-weather" > .gitignore
source venv3-weather/bin/activate
pip install -r requirements.txt
```

# Start your app
```bash
source venv3-weather/bin/activate
export FLASK_APP=runner
flask run
```

# Example of usage
```bash
curl -X POST http://127.0.0.1:5000/api/v1/data
{"msg": "{'created': datetime.datetime(2020, 1, 16, 16, 29, 54, 137177), 'temperature': '13'} has been saved to database."}


curl -X GET  http://127.0.0.1:5000/api/v1/data
[{"created": "2020-01-16 16:22:37.719453", "temperature": "1"}, {"created": "2020-01-16 16:22:52.736508", "temperature": "28"}, {"created": "2020-01-16 16:22:53.632374", "temperature": "28"}, {"created": "2020-01-16 16:22:54.015451", "temperature": "0"}, {"created": "2020-01-16 16:22:54.222398", "temperature": "25"}, {"created": "2020-01-16 16:22:54.413553", "temperature": "27"}, {"created": "2020-01-16 16:22:54.589431", "temperature": "8"}, {"created": "2020-01-16 16:23:45.801641", "temperature": "21"}, {"created": "2020-01-16 16:27:43.142714", "temperature": "0"}, {"created": "2020-01-16 16:27:51.006740", "temperature": "23"}, {"created": "2020-01-16 16:27:51.910773", "temperature": "1"}, {"created": "2020-01-16 16:27:52.567149", "temperature": "30"}]
```


# Time selection
```bash

curl -X GET  "http://127.0.0.1:5000/api/v1/data"[{"created": "2020-01-17 00:26:39.349742", "temperature": "25"}, {"created": "2020-01-17 00:29:18", "temperature": "9"}, {"created": "2020-01-17 00:29:22", "temperature": "17"}, {"created": "2020-01-17 00:29:23", "temperature": "21"}, {"created": "2020-01-17 00:29:23", "temperature": "2"}, {"created": "2020-01-17 00:29:23", "temperature": "30"}, {"created": "2020-01-17 00:29:24", "temperature": "12"}, {"created": "2020-01-17 00:29:24", "temperature": "12"}, {"created": "2020-01-17 00:29:24", "temperature": "20"}, {"created": "2020-01-17 00:29:24", "temperature": "5"}, {"created": "2020-01-17 00:29:24", "temperature": "4"}, {"created": "2020-01-17 00:29:25", "temperature": "9"}, {"created": "2020-01-17 00:29:25", "temperature": "12"}, {"created": "2020-01-17 00:29:25", "temperature": "27"}, {"created": "2020-01-17 00:29:25", "temperature": "8"}, {"created": "2020-01-17 00:35:02", "temperature": "17"}, {"created": "2020-01-17 00:35:03", "temperature": "26"}, {"created": "2020-01-17 00:35:03", "temperature": "1"}, {"created": "2020-01-17 00:35:04", "temperature": "15"}, {"created": "2020-01-17 00:35:04", "temperature": "14"}, {"created": "2020-01-17 00:35:04", "temperature": "1"}, {"created": "2020-01-17 00:35:04", "temperature": "0"}, {"created": "2020-01-17 00:35:04", "temperature": "18"}, {"created": "2020-01-17 00:35:05", "temperature": "16"}, {"created": "2020-01-17 00:35:05", "temperature": "1"}, {"created": "2020-01-17 00:35:05", "temperature": "6"}, {"created": "2020-01-17 00:35:05", "temperature": "9"}, {"created": "2020-01-17 00:35:05", "temperature": "9"}, {"created": "2020-01-17 00:35:06", "temperature": "5"}, {"created": "2020-01-17 00:35:06", "temperature": "26"}, {"created": "2020-01-17 00:35:06", "temperature": "8"}, {"created": "2020-01-17 00:35:06", "temperature": "22"}, {"created": "2020-01-17 00:35:06", "temperature": "6"}, {"created": "2020-01-17 00:35:07", "temperature": "19"}, {"created": "2020-01-17 00:36:40", "temperature": "23"}, {"created": "2020-01-17 00:36:41", "temperature": "7"}, {"created": "2020-01-17 00:36:42", "temperature": "28"}, {"created": "2020-01-17 00:36:42", "temperature": "26"}, {"created": "2020-01-17 00:36:42", "temperature": "24"}]

 curl -X POST "http://127.0.0.1:5000/api/v1/data/select?start=2020-01-17T00:35:07&end=2020-01-17T00:36:42"
[{"created": "2020-01-17 00:35:07", "temperature": "19"}, {"created": "2020-01-17 00:36:40", "temperature": "23"}, {"created": "2020-01-17 00:36:41", "temperature": "7"}]

```

