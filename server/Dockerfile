FROM python:3.7-alpine
ADD . /app
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates make gcc postgresql-dev linux-headers musl-dev libxslt-dev\
    libffi-dev jpeg-dev zlib-dev \
    && pip install -r requirements.txt
CMD ["python", "main.py"]
EXPOSE 8000