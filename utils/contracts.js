import Candidates from '../artifacts/contracts/Candidates.sol/Candidates.json';
import Ballot from '../artifacts/contracts/Ballot.sol/Ballot.json';

import {candidatesContractAddress, candidatesOwnerAddress, ballotContactAddress, ballotOwnerAddress} from '../config';

export const candidates = {
    abi: Candidates.abi,
    address: candidatesContractAddress,
    ownerAddress: candidatesOwnerAddress
}

export const ballot = {
    abi: Ballot.abi,
    address: ballotContactAddress,
    ownerAddress: ballotOwnerAddress
}

