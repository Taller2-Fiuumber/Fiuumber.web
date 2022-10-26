
# syntax=docker/dockerfile:1

FROM node:18-alpine3.15

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN apk update && apk add bash
RUN apk add curl

RUN npm install
RUN npm start build

CMD npm run start
