FROM node:lts-alpine as build

WORKDIR /home/node/api/dist
COPY ./ ./

RUN yarn install --silent && \
	yarn cache clean
RUN	yarn build

###########################################################################

FROM node:lts-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG GROUP=api
ARG USER=api

WORKDIR /home/node/api

RUN apk --no-cache --quiet add shadow && \
	groupadd $GROUP && \
	useradd --no-log-init --home /home/node --gid $GROUP $USER && \
	chown -R $USER:$GROUP /home/node && \
	chmod -R 764 /home/node

USER $USER:$GROUP

RUN yarn install --silent && \
	yarn cache clean

COPY --from=build --chown=$USER:$GROUP /home/node/api/dist ./dist

CMD yarn start:prod
