FROM node:alpine

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

WORKDIR /home/nextjs/app
COPY . /home/nextjs/app/

RUN npm ci --only=production
RUN npx next telemetry disable

CMD [ "npm", "start" ]
