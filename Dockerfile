FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY truckMate/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR /app

COPY . /app

CMD ['uwsgi', '--http', ':8000', '--wsgi-file', 'truckMate/wsgi.py', '--master', '--processes', '4', '--threads', '2']