FROM node:8.9-alpine
WORKDIR /app
COPY ./package.json ./package.json
RUN npm install
RUN npm start