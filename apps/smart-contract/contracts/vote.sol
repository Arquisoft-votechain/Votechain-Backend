// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

 contract VotingContract {
    struct Vote {
         uint studentId;
         uint politicalPartyId;
        uint electoralProcessId;
     }

     mapping(uint => Vote) public votes;
     mapping(uint => uint[]) public votesByPoliticalParty;

    event VoteRegistered(uint indexed voteId, uint studentId, uint politicalPartyId);

     uint public totalVotes;

     function registerVote(uint _studentId, uint _politicalPartyId, uint _electoralProcessId) public {
         votes[totalVotes] = Vote(_studentId, _politicalPartyId, _electoralProcessId);
         votesByPoliticalParty[_politicalPartyId].push(totalVotes);
         emit VoteRegistered(totalVotes, _studentId, _politicalPartyId);
         totalVotes++;
     }

     function getVote(uint _voteId) public view returns (uint, uint, uint) {
         Vote storage vote = votes[_voteId];
         return (vote.studentId, vote.politicalPartyId, vote.electoralProcessId);
     }

     function getAllVotesByPoliticalPartyId(uint _politicalPartyId) public view returns (uint[] memory) {
         return votesByPoliticalParty[_politicalPartyId];
     }

     function getAllVotes() public view returns (uint[] memory) {
         uint[] memory allVotes = new uint[](totalVotes);
         for (uint i = 0; i < totalVotes; i++) {
             allVotes[i] = i;
         }
         return allVotes;
     }
 }

// contract VotingContract {
//     address public contractAddress;
//     uint public studentId;
//     uint public politicalPartyId;

//     event ContractRegistered(address contractAddress, uint studentId, uint politicalPartyId);

//     constructor() {
//         contractAddress = address(this);
//     }

//     function registerContract(uint _studentId, uint _politicalPartyId) public {
//         studentId = _studentId;
//         politicalPartyId = _politicalPartyId;

//         emit ContractRegistered(contractAddress, studentId, politicalPartyId);
//     }

//     function getContract() public view returns (address, uint, uint) {
//         return (contractAddress, studentId, politicalPartyId);
//     }
// }