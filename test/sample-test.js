const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Candidates", () => {
  it("Should return name of first candidate", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    await candidates.deployed();
    const candidate = await candidates.candidates(1);

    expect(candidate.name).to.equal("Thor");
  });

  it("Should return empty string", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    await candidates.deployed();
    const candidate = await candidates.candidates(0);

    expect(candidate.name).to.equal('');
  });

  it("Should return valid vote of true ", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    await candidates.deployed();

    expect(await candidates.validVotes(2)).to.equal(true);
  });

  it("Should return valid vote of false ", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    await candidates.deployed();

    expect(await candidates.validVotes(7)).to.equal(false);
  });
});

describe("Ballot", function () {
  it("Should be reverted if same address attempt to vote twice", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy("Ballot deployed", candidates.address);
    const mockAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
    await ballot.deployed('');
    await ballot.voteCandidate('123', mockAddress, 1);

    expect(ballot.voteCandidate('123', mockAddress, 2)).to.be.reverted;
  });

  it("Should be reverted as ballot owner should not be able to vote", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy("Ballot deployed", candidates.address);
    await ballot.deployed('');

    expect(ballot.voteCandidate('123', ballot.ballotAddress, 1)).to.be.reverted;
  });

  it("Should be reverted as vote is invalid", async function () {
    const Candidates = await ethers.getContractFactory("Candidates");
    const candidates = await Candidates.deploy("Candidates deployed");
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy("Ballot deployed", candidates.address);
    const mockAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
    await ballot.deployed('');

    expect(ballot.voteCandidate('123', mockAddress, 7)).to.be.reverted;
  });
});
