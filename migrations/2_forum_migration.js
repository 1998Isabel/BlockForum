const ForumApp = artifacts.require("ForumApp");

module.exports = function(deployer) {
  deployer.deploy(ForumApp);
};
