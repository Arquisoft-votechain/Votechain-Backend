// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const voting_contract = await hre.ethers.getContractFactory('VotingContract');
  //console.log(voting_contract)
  //const gasPrice = hre.ethers.utils.parseUnits("9000", "gwei"); // Establecer gas price a 10 Gwei
  //const gasLimit = hre.ethers.utils.parseUnits("20000", "gwei");
  //const overrides = {
    //gasPrice: gasPrice,
    //gasLimit: gasLimit,
  //};

  const VotingContract = await voting_contract.deploy();
  console.log('While waiting for confirmation, view the status in https://sepolia.etherscan.io/tx/'+VotingContract.deployTransaction.hash)
  await VotingContract.deployed();
  console.log('Contract deployed to:', VotingContract.address);
};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.log(error);
  process.exit(1);
})
