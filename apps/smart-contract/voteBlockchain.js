const Web3 = require('web3');
const contractABI = require('./contracts/VotingContract.json');

class VotingContract {
  constructor(contractAddress, web3Provider) {
    this.contractAddress = contractAddress;
    this.web3 = new Web3(web3Provider);
    this.contract = new this.web3.eth.Contract(contractABI, this.contractAddress);
  }

  async registerVote(studentId, politicalPartyId, electoralProcessId) {
    return this.contract.methods.registerVote(studentId, politicalPartyId, electoralProcessId).send({ from: 'YOUR_ADDRESS' });
  }

  async getVote(voteId) {
    return this.contract.methods.getVote(voteId).call();
  }

  async getAllVotesByPoliticalPartyId(politicalPartyId) {
    return this.contract.methods.getAllVotesByPoliticalPartyId(politicalPartyId).call();
  }

  async getAllVotes() {
    return this.contract.methods.getAllVotes().call();
  }

}

module.exports = VotingContract;
