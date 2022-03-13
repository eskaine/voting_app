
const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const Candidates = await hre.ethers.getContractFactory("Candidates");
  const Ballot = await hre.ethers.getContractFactory("Ballot");

  const ownerName = "Asgardians Succession Council";
  const candidates = await Candidates.deploy(ownerName);
  const ballot = await Ballot.deploy(ownerName, candidates.address);

  await candidates.deployed();
  await ballot.deployed();

  console.log("Candidates deployed to:", candidates.address);
  console.log("Ballot deployed to:", ballot.address);

  fs.writeFileSync('./config.js', `
    export const candidatesContractAddress = "${candidates.address}"
    export const candidatesOwnerAddress = "${candidates.signer.address}"
    export const ballotContactAddress ="${ballot.address}"
    export const ballotOwnerAddress = "${ballot.signer.address}"
  `);
  console.log("File written successfully\n");
}

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
