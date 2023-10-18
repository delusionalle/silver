FROM python:3.9

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 4000
ENV PORT 4000
ENTRYPOINT uvicorn src/app:api --host 172.25.0.12 --port 4000
