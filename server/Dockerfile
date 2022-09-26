FROM node:16-alpine3.11
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk -U upgrade
RUN apk update && apk add py3-pip && apk add --update --no-cache py3-numpy
ENV PYTHONPATH=/usr/lib/python3.8/site-packages
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","start"]