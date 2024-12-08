FROM node:20
WORKDIR /app
ENV PORT 3030
ENV MODEL_URL 'https://storage.googleapis.com/model-ml-bucket10/ml-model/model.json'
COPY . .
RUN npm install
EXPOSE 3030
CMD [ "npm", "run", "start"]
