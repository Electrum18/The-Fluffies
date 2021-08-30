FROM node:alpine

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3001
EXPOSE 3002

CMD ["yarn", "start"]
