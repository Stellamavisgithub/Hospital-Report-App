FROM node:iron-alpine3.17

ENV PORT=4000

WORKDIR /usr/app

COPY ./ ./

RUN yarn install --production

RUN yarn add bcrypt

RUN yarn tsc

EXPOSE 4000

CMD ["yarn","start"]

