FROM python:3

ADD ./app/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -q -r /tmp/requirements.txt

RUN useradd --create-home --shell /bin/bash myuser
USER myuser
WORKDIR /home/myuser

RUN mkdir app
ADD ./app/app.py app/app.py
ADD ./_site app/static

WORKDIR /home/myuser/app
EXPOSE 8080
CMD gunicorn --bind 0.0.0.0:8080 app:app
