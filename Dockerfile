FROM node:erbium-alpine

RUN mkdir /app && chown -R node:node /app

COPY --chown=node:node ./package.json ./yarn.lock /app/

USER node
WORKDIR /app
RUN yarn install --production --frozen-lockfile

COPY --chown=node:node . /app/

CMD ["yarn", "start"]
