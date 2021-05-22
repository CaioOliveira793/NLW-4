# development
FROM node:lts-alpine as development

ARG GROUP=api
ARG USER=api

WORKDIR /home/node/api

RUN apk --no-cache add shadow && \
	groupadd $GROUP && \
	useradd --no-log-init --home /home/node --gid $GROUP $USER && \
	chown -R $USER:$GROUP /home/node && \
	chmod -R 764 /home/node

USER $USER:$GROUP

COPY --chown=$USER:$GROUP package*.json yarn.lock ./
RUN yarn install
COPY --chown=$USER:$GROUP ./ ./

CMD yarn start:dev



#-----//-----//-----//-----//-----//-----//-----//-----#
# production:
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

COPY --chown=$USER:$GROUP ./ ./

RUN yarn install --silent && \
	yarn build && \
	yarn cache clean

CMD yarn start:prod
