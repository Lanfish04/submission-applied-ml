FROM node:20
WORKDIR /app
ENV PORT 8000
ENV MODEL_URL 'https://storage.googleapis.com/model-ml-bucket10/ml-model/model.json'
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm", "run", "start"]