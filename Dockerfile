FROM node:20.5.0-alpine3.17

# outputs python installation logs straight into terminal to trace in docker
ENV PYTHONUNBUFFERED=1

# install dependencies for node-gyp 
# because @nx/workspace uses @parcel/watcher that uses parcel that uses node-gyp
# https://github.com/nodejs/node-gyp#on-unix
RUN apk add --update --no-cache python3 make g++

WORKDIR /app

RUN npm install -g pnpm

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
