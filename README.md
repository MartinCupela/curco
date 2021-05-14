# curco (CURrency COnverter)

This is a monorepo managed by lerna. There are two services:
- Converter app consisting of client and server (app)
- wrapper for fixer.io api (api)

These services use library packages from (packages/libs).

Services are to be deployed as Docker containers.

### Identified Business Requirements

**Wrapper for fixer.io api**
1. Avoid calling fixer.io api, if the data has already been requested for the given date.
2. Use ElasticSearch for tracking the client requests and request statistics aggregation


#### Todo:

**Libs**
- ElastichSearch
    - schema 
    - queries

**App/Client**
- API client interface (originally I planned to use Apollo GraphQL, but seems overkill)

**Tests**
- packages/libs/fixerio
- packages/services/api
- packages/services/app/client

**Deployment**
- Dockerfile packages/services/app 
- Dockerfile packages/services/api
- docker-compose.build.yml
- docker-compose.staging.yml
- docker-compose.production.yml
- gitlab-ci.yml / github/workflows