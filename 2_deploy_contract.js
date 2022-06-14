const Demo_Contract = artifacts.require("Urnas");

module.exports = function(deployer) {
  deployer.deploy(Demo_Contract);
};
