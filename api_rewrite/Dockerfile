FROM python:3.9

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 4000
ENV PORT 4000
ENTRYPOINT python src/app.py
