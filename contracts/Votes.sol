// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Candidates.sol";

contract Votes {
    string public name;
    address public owner;
    address private candidatesContractAddress;
    uint256 public totalVotes;
    mapping (address => Vote) private voters;
    mapping (uint => uint) public candidateVotes;

    constructor(string memory _name, address _candidatesContractAddress) {
        name = _name;
        owner = msg.sender;
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
        require(owner != voterAddress);

        uint hasVoted = getVoterVote(voterAddress);
        bool isVoteValid = checkVoteValidity(candidatesContractAddress, voteResult);

        if(hasVoted != 0) {
            revert("You have voted.");
        }

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
