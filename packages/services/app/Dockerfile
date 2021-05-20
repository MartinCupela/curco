FROM curco.common

COPY config /curco/config

EXPOSE 3000

WORKDIR /curco/packages/services/app

COPY packages/services/app /curco/packages/services/app

RUN cd /curco && lerna bootstrap && yarn install && yarn build:app && rm -rf /curco/config/*

ENV NODE_ENV=production

CMD yarn start