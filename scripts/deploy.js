
const main = async () => {
  const Candidates = await hre.ethers.getContractFactory("Candidates");
  const Ballot = await hre.ethers.getContractFactory("Ballot");

  const candidates = await Candidates.deploy();
  const ballot = await Ballot.deploy();

  await candidates.deployed();
  await ballot.deployed();

  console.log("Candidates deployed to:", candidates.address);
  console.log("Ballot deployed to:", ballot.address);
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
