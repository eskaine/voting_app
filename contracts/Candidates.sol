// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Candidates {
    string public name;
    address public owner;
    mapping (uint => bool) public validVotes;
    mapping (uint => Candidate) public candidates;

    event CandidateCreated(address voterAddress, uint256 timestamp);
    
    struct Candidate {
        string name;
        uint id;
    }

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;

        candidates[1] = Candidate('Thor', 1);
        candidates[2] = Candidate('Iron Man', 2);
        candidates[3] = Candidate('Captain America', 3);
        candidates[4] = Candidate('Black Panther', 4);
        candidates[5] = Candidate('Hulk', 5);
        candidates[6] = Candidate('Captain Marvel', 6); 
        validVotes[1] = true;
        validVotes[2] = true;
        validVotes[3] = true;
        validVotes[4] = true;
        validVotes[5] = true;
        validVotes[6] = true;
    }

    function getCandidate(uint id) public view returns(Candidate memory) {
        return candidates[id];
    }
}
