FROM python:3.10.1-slim
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --upgrade pip setuptools wheel && pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8001
CMD ["uvicorn" , "main:app" , "--proxy-headers", "--host", "0.0.0.0", "--port", "8001"]