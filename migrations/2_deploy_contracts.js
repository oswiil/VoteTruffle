var SimpleStorage = artifacts.require('./SimpleStorage.sol');
var Urnas = artifacts.require('./Urnas.sol');
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Urnas);
};
