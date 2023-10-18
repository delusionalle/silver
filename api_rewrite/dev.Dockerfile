FROM python:3.9

COPY . /app
WORKDIR /app/src

RUN pip install -r ../requirements.txt

CMD ["uvicorn", "app:api", "--reload", "--reload-dir", ".", "--reload-delay", "5", "--host", "172.25.0.12", "--port", "4000"]
