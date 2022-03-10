// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Candidates.sol";

contract Ballot {
    string public ballotName;
    address public ballotAddress;
    address private candidatesContractAddress;
    uint256 private totalVotes;
    uint256 public endVotes;

    mapping (address => Vote) private voters;
    mapping (uint => uint) public candidateVotes;

    constructor(string memory _ballotName, address _candidatesContractAddress) {
        ballotName = _ballotName;
        ballotAddress = msg.sender;
        candidatesContractAddress = _candidatesContractAddress;
    }

    event VoteCreated(address voterAddress, uint256 timestamp);
    
    struct Vote {
        string identification;
        address voterAddress;
        uint vote;
        uint256 timestamp;
    }
    
    function voteCandidate(string memory id, address voterAddress, uint voteResult) public {
        require(ballotAddress != voterAddress);

        uint hasVoted = getVoterVote(voterAddress);

        if(hasVoted != 0) {
            revert("You have voted.");
        }

        bool isVoteValid = checkVoteValidity(candidatesContractAddress, voteResult);

        if(!isVoteValid) {
            revert("Invalid vote.");
        }

        totalVotes += 1;
        candidateVotes[voteResult] += 1;
        voters[voterAddress] = Vote(id, voterAddress, voteResult, block.timestamp);

        emit VoteCreated(voterAddress, block.timestamp);
    }

    function getVoterVote(address voterAddress) private view returns(uint) {
         Vote storage voter = voters[voterAddress];
         return voter.vote;
    }

     function checkVoteValidity(address addr, uint voteResult) private view returns(bool) {
        return Candidates(addr).validVotes(voteResult);
    }
}
