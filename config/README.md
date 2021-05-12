To parse configurations, we use the [node-config](https://github.com/lorenwest/node-config) library.

Configuration file *default.js* is kept in version control system and should not contain any secrets.

**Local Development**

Create file *development.js* to override configuration values in *default.js*.

**Production**

Create file *production.js* to override configuration values in *default.js*.