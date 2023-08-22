const SsafyToken = artifacts.require("SsafyToken");
const Nfast = artifacts.require("Nfast");
const SaleFactory = artifacts.require("SaleFactory")

module.exports = async function (deployer) {
  await deployer.deploy(Nfast,"NFasT","A307");
  await deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  await deployer.deploy(SaleFactory,SsafyToken.address,Nfast.address);
};
