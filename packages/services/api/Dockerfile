FROM curco.common

EXPOSE 3001

WORKDIR /curco/packages/services/api

COPY packages/services/api /curco/packages/services/api

RUN cd /curco && yarn install

ENV NODE_ENV=production

CMD yarn start