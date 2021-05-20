# curco (CURrency COnverter)

This is a monorepo managed by lerna. There are two services:
- Converter app consisting of client and server (app)
- wrapper for fixer.io api (api)

These services use library packages from (packages/libs).

### Deployment on localhost

Services are to be deployed as Docker containers.

To run the stack in containers:

0. Create config/production.js file, e.g.:

```javascript
module.exports = {
  APP: {
    SERVER_PORT: "3000",
  },
  API: {
    URL: "http://localhost:3001",
    SERVER_PORT: "3001",
    API_KEY: "<YOUR_FIXER.IO_API_KEY>"
  }
}
```

1. Build a common image shared by app and api images

```bash
$ yarn docker:prebuild
...
```

2. Build individual app and api images
```bash
$ yarn docker:build
...
```

3. Now you can start all containers at once:

```bash
$ yarn docker:up
```

Or separately:

```bash
$ yarn docker:db -d # elasticsearch + kibana
$ yarn docker:services -d # app + api
...
```

You can access the app at http://localhost:3000 in your browser.

### Identified Business Requirements

**Wrapper for fixer.io api**
1. Avoid calling fixer.io api, if the data has already been requested for the given date.
2. Use ElasticSearch for tracking the client requests and request statistics aggregation


#### Todos left:

**Known Issue**
- API package: reading aggregate from elasticsearch after updating index does not reflect the recent changes
-> possible solution is to use GraphQL Subscriptions

**Tests**
- packages/libs/fixerio
- packages/services/api
- packages/services/app/client

**Deployment**
- docker registry
- gitlab-ci.yml / github/workflows