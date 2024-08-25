FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

# COPY config.yaml /app/config.yaml

RUN yarn build

EXPOSE 3055

CMD ["yarn", "run", "start:prod"]