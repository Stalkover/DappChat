const Web3 = require('web3');

const web3 = new Web3("http://localhost:3000");

import {ChatAppAddress, ChatAppABI} from "../Context/constants";

const contract = new web3.eth.Contract(ChatAppABI, ChatAppAddress);

web3.eth.net.isListening().then(()=>console.log("Web3 connection is established"))
.catch((e)=> console.log("Error: Unable to connect to the network", e));

if(contract){
    console.log("Contract connection is established");
} else {
    console.log("Error: Unable to connect to the contract");
}