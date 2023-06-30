
import Web3, { Contract, ContractAbi } from "web3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Web3ServiceImpl {
    private web3Instance: Web3;
    private privateKey: string;
    private account;
    private contract;
    private contractAddress: string;
    private contractAbi: any;

    setContractAddress(address: string){
        this.contractAddress = address;
    }

    constructor(private configService: ConfigService) {
        this.web3Instance = new Web3(
            new Web3.providers.HttpProvider(
                this.configService.get<string>('WEB3_ENDPOINT')
            )
        )
        //this.contractAddress = _contractAddres;
    }

    initParameters(){
        this.privateKey = this.configService.get<string>('PRIVATE_KEY');
        this.account = this.web3Instance.eth.accounts.privateKeyToAccount('0x'+this.privateKey);

        this.contractAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "_electoralProcessId", "type": "uint256" }], "name": "countElectoralProcessVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_politicalPartyParticipantId", "type": "uint256" }, { "internalType": "uint256", "name": "_electoralProcessId", "type": "uint256" }], "name": "countPoliticalPartyParticipantVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getContractAddres", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_voteId", "type": "uint256" }, { "internalType": "uint256", "name": "_electoralProcessId", "type": "uint256" }], "name": "getVote", "outputs": [{ "components": [{ "internalType": "uint256", "name": "voteId", "type": "uint256" }, { "internalType": "uint256", "name": "studentId", "type": "uint256" }, { "internalType": "uint256", "name": "politicalPartyParticipantId", "type": "uint256" }], "internalType": "struct VotingContract.Vote", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_voteId", "type": "uint256" }, { "internalType": "uint256", "name": "_studentId", "type": "uint256" }, { "internalType": "uint256", "name": "_politicalPartyParticipantId", "type": "uint256" }, { "internalType": "uint256", "name": "_electoralProcessId", "type": "uint256" }], "name": "registerVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
       
        this.contract = new this.web3Instance.eth.Contract(this.contractAbi, this.contractAddress);
    }

    async getContractAddress() {
        try {
            const contractAddress = await this.contract.methods.getContractAddres().call({from: this.account.address});
            console.log(contractAddress);
            return contractAddress;

        } catch (error) {
            console.error('Error al llamar al método:', error);
        }
    }

    async getElectoralProcessVotes(electoralProcessId: number) {
        try {
            const countVotes = await this.contract.methods.countElectoralProcessVotes(electoralProcessId).call({from: this.account.address});
            console.log(countVotes);
            return countVotes;

        } catch (error) {
            console.error('Error al llamar al método:', error);
        }
    }

    async getPoliticalPartyParticipantVotes(politicalPartyParticipantId: number, electoralProcessId: number) {
        try {
            const countVotes = await this.contract.methods.countPoliticalPartyParticipantVotes(politicalPartyParticipantId,electoralProcessId).call({from: this.account.address});
            console.log(countVotes);
            return countVotes;

        } catch (error) {
            console.error('Error al llamar al método:', error);
        }
    }

    async registerVote(voteId: number, studentId: number, politicalPartyParticipantId: number, electoralProcessId){
        const txObject = this.contract.methods.registerVote(voteId,studentId,politicalPartyParticipantId,electoralProcessId);
        const gas = await txObject.estimateGas({from: this.account.address});
        const gasPrice = await this.web3Instance.eth.getGasPrice();
        const data = txObject.encodeABI();
        const nonce = await this.web3Instance.eth.getTransactionCount(this.account.address);

       
        //console.log(this.account.address);
        const signedTx = await await this.web3Instance.eth.accounts.signTransaction(
            {
              to: this.contractAddress,
              data,
              gas,
              gasPrice,
              nonce, 
            },
            '0x'+this.privateKey
          );

        //console.log(signedTx);
        
        const receipt = await this.web3Instance.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt.transactionHash.toString();
    }

}