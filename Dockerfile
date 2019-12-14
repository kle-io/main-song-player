FROM node:8.10-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --no-cache git

EXPOSE 3001

CMD [ "npm", "start" ]