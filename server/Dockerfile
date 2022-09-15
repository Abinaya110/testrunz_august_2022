FROM node:16-alpine3.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN apk -U upgrade
RUN apk update && apk add py3-pip
RUN apk add g++ 
RUN npm install
ADD repositories /etc/apk/repositories
RUN apk add --update python python-dev gfortran py-pip build-base py-numpy@community

COPY . .

EXPOSE 5000

CMD ["npm","start"]
