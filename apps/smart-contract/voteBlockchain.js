import { ethers } from 'ethers';
const contractABI = require('../ruta/al/archivo/Contrato.abi.json'); // Ruta al archivo JSON que contiene el ABI del contrato

const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com'); 


const contractAddress = '../smart-contract/vote.sol'; 

const contract = new ethers.Contract(contractAddress, contractABI, provider);

contract.on('VoteRegistered', (voter, voteHash) => {
  console.log('Hash del voto registrado:', voteHash);
});
