###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:19.7-alpine As development

WORKDIR /usr/src/hw_7_docker

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node


###################
# BUILD FOR PRODUCTION
###################
FROM node:19.7-alpine As build

WORKDIR /usr/src/hw_7_docker

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/hw_7_docker/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


###################
# PRODUCTION
###################
FROM node:19.7-alpine As production

COPY --chown=node:node --from=build /usr/src/hw_7_docker/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/hw_7_docker/dist ./dist
COPY --chown=node:node --from=build /usr/src/hw_7_docker/views ./views

# Запускаем сервер
CMD [ "node", "dist/main.js" ]