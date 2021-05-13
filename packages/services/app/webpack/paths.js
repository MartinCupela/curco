const path = require("path")

const rootDir = (_path) => path.join(path.normalize(path.join(__dirname,"..")), _path);
const clientDir = (_path) => path.join(path.normalize(path.join(__dirname,"../packages/client")), _path);

module.exports = {
  rootDir,
  clientDir
}