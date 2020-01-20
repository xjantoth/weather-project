FROM python:3-alpine

# RUN mkdir -p /data/microservice

# We copy just the requirements.txt first to leverage Docker cache
COPY ["wsgi.py", "runner.py", "requirements.txt", "config.py", "/data/"]
COPY ["src/", "/data/src/"]

RUN apk update \
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  && pip install --upgrade pip \
  && pip install -r /data/requirements.txt \
  && apk del build-deps

WORKDIR /data

ENTRYPOINT ["gunicorn"]

CMD ["--bind", "0.0.0.0:8000", "wsgi:app"]