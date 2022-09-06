
 
<template>
      <div>
          <!--<button class="enableEthereumButton">Enable Ethereum</button>-->
          <!--<button @click="transfer()">transfer</button>
          <button @click="getBalance()">getBalance</button>-->
          <button @click="voteMnt()">vote</button>
          
      </div>
</template>
 

 

<script>
import BigNumber from 'bignumber.js';
BigNumber.config({DECIMAL_PLACES:4,ROUNDING_MODE:5})
let Ether = new BigNumber(10e17);
  const bip39 = require('bip39')
  const {hdkey} =  require('ethereumjs-wallet')
  const util = require('ethereumjs-util')
export default {
  
  data() {
    return {
   
        tagName2:'',
        //web3:new this.Web3("https://data-seed-prebsc-1-s3.binance.org:8545"),
        web3:new this.Web3(window.ethereum),
        abi: [ { constant: true, inputs: [], name: "name", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "value", type: "uint256" }, ], name: "approve", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "from", type: "address" }, { name: "to", type: "address" }, { name: "value", type: "uint256" }, ], name: "transferFrom", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "addedValue", type: "uint256" }, ], name: "increaseAllowance", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "subtractedValue", type: "uint256" }, ], name: "decreaseAllowance", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: false, inputs: [ { name: "to", type: "address" }, { name: "value", type: "uint256" }, ], name: "transfer", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [ { name: "owner", type: "address" }, { name: "spender", type: "address" }, ], name: "allowance", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { inputs: [], payable: true, stateMutability: "payable", type: "constructor", }, { anonymous: false, inputs: [ { indexed: true, name: "from", type: "address" }, { indexed: true, name: "to", type: "address" }, { indexed: false, name: "value", type: "uint256" }, ], name: "Transfer", type: "event", }, { anonymous: false, inputs: [ { indexed: true, name: "owner", type: "address" }, { indexed: true, name: "spender", type: "address" }, { indexed: false, name: "value", type: "uint256" }, ], name: "Approval", type: "event", }, ],
        //mnt_addr: "0x450af0a7c8372eee72dd2e4833d9aac4928c151f",
        //usdt_addr: "0xb7f04aefa2612a8321618af162fe8d90aa087e45",
        mnt_abi:[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Cash","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"uint256","name":"cycle","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"valute","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fraction_mature","type":"uint256"}],"name":"Income","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"parent","type":"address"},{"indexed":true,"internalType":"address","name":"children","type":"address"}],"name":"Popularize","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"uint256","name":"cycle","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fraction_sum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"valute","type":"uint256"}],"name":"PreIncome","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Vote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"begin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"cash","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"child","outputs":[{"internalType":"address[]","name":"addrs","type":"address[]"},{"internalType":"uint256[]","name":"balances","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cycle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cycle_period","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"fraction","outputs":[{"internalType":"uint256","name":"fraction_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fraction_mature","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fraction_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"income","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"info","outputs":[{"internalType":"uint256","name":"balance_","type":"uint256"},{"internalType":"uint256","name":"fraction_","type":"uint256"},{"internalType":"uint256","name":"cycle_","type":"uint256"},{"internalType":"uint256","name":"lock_balance_","type":"uint256"},{"internalType":"uint256","name":"lock_time_","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lock_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"parent","outputs":[{"internalType":"address","name":"par","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"popularize","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"profit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"spreads","outputs":[{"internalType":"address","name":"parent","type":"address"},{"internalType":"uint256","name":"fraction","type":"uint256"},{"internalType":"uint256","name":"cycle","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"lock_balance","type":"uint256"},{"internalType":"uint256","name":"lock_time","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"vote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"withdrawal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],
        contractAddr:'0x7d71D0D02999e526eD3c8C729C2FB010455363e3',  
    };
  },
computed:{
    tagName: {
      get: function () {
        return this.tagName2
      },
      set: function (value) {
        console.log('value',value);
         this.tagName2=value.replace(/[\w]/g,'')
      },
    },
},
 
  methods: {
    voteMnt(){
        this.vote2(100);
    },
    async vote(amount) { //ran  random ,type ==1 bnb, type==2 mnt , type ==3 usdt

       this.web3.eth.getTransactionCount(ethereum.selectedAddress, async(err, txCount) => {
          let txObject={};
    
           let con =new this.web3.eth.Contract(this.mnt_abi,this.contractAddr);
            txObject = {
              nonce:    this.web3.utils.toHex(txCount),          
              gasLimit: this.web3.utils.toHex(80000),
              gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
              to: this.contractAddr,  //If it is BNB, here is the address. If it is usdt or MNT, here is the smart contract address
              data: con.methods.vote('', this.web3.utils.toWei(new BigNumber(amount).toString(),'ether')).encodeABI()    // if bnb ,not need send.
            }
          
          //56
          const BSC_MAIN = Common.forCustomChain('mainnet', {name: 'bnb', networkId: 97, chainId: 97}, 'petersburg');
          const tx = new Tx(txObject,{common: BSC_MAIN});
          let privKey = new Buffer.from(this.privateKey, 'hex');
          tx.sign(privKey);
          const serializedTx = tx.serialize();
          const raw = '0x' + serializedTx.toString('hex');
          //console.log(raw);
          await this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            let returnResult ={};
            console.log('err:', err, 'txHash:', txHash);
            if (err == null) {
                returnResult={result:'Success',txid:txHash};
            }else{
                returnResult={result:err,txid:''};
            }
            
          });
     
          this.init();
      
      });
    },
  init(){
       const ethereumButton = document.querySelector('.enableEthereumButton');

      ethereumButton.addEventListener('click', () => {
        //Will Start the metamask extension
        ethereum.request({ method: 'eth_requestAccounts' });
      });
  },
    getBalance(){
         this.web3.eth.getBalance(ethereum.selectedAddress).then((ret)=>{
          console.log(ret);
         this.getAddress(ethereum.selectedAddress,this.mnt_addr,1)
         this.getAddress(ethereum.selectedAddress,this.usdt_addr,2)
      }); 

    },
  getAddress(client_addr, contractAddress, type) {
        let web3Contract = new this.web3.eth.Contract(this.abi, contractAddress);
        web3Contract.methods
          .balanceOf(client_addr)
          .call()
          .then((v) => {
            
            let ret = new BigNumber(v);
            let value = new BigNumber(ret/Ether).toFixed(this.ROUNDING_MODE); 
            switch (type) {
              case 1:
                 console.log("mnt",value);       
                break;
              case 2:
                console.log("usdt",value);       
                 
                break;
              case 3:
                this.lp = value;
                break;
              case 4:
                this.mntPool = value;
                break;
              case 5:
                this.usdtPool = value;

                break;
            }
          })
          .then((sum) => {
            //console.log(sum);
          });
      
      },
    //  getBalance(){
    //    ethereum.request({
    //         method: 'eth_getBalance',
    //         params: [
    //            '0xA47eBD3d8c32BcdeA12F15c13BD2b70fb7975AA9' ,
    //             'latest'
    //         ]
    //     })
    //     .then((result) => {
    //         console.log("获取余额success--->" + result)
    //         let formartEther = ethers.utils.formatEther(result);
    //         console.log(formartEther)
    //     })
    //     .catch((error) => {
    //         console.log("获取余额error--->" + error.code)
    //     });
    // },
  // 90671
  //315
  transfer(){
    console.log("ethereum.isConnected()",ethereum.isConnected())
    console.log("ethereum.selectedAddress",ethereum.selectedAddress);
    //let result=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
     let result=[{ "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
    
    //let result=
    let MyContract = new this.web3.eth.Contract(result,'0x450af0a7c8372eee72dd2e4833d9aac4928c151f');

        let data = MyContract.methods.transfer('0xe2AF0787C4eE33610255C00Fc18e58ca800dC6F8',this.web3.utils.toWei('100','ether')).encodeABI();
        const transactionParameters = {
            //   nonce: '0x00', // ignored by MetaMask
            //gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10','Gwei')),
            gasPrice:this.web3.utils.toHex(this.web3.utils.toWei('10','Gwei')),
            
            //   gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: '0x450af0a7c8372eee72dd2e4833d9aac4928c151f', // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            // value: web3.utils.toHex('12'), // Only required to send ether to the recipient from the initiating external account.
            data: data, // Optional, but used for defining smart contract creation and interaction.
            //chainId: this.web3.utils.toHex('56'), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            chainId: this.web3.utils.toHex('97'),
        };
        ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })
        .then(function(result){
            //result是生成的交易hash值,用于在链上查看交易状态信息的索引
            successMessage(JSON.stringify(result))
        })
        .catch(function(reason){
            if(reason.code == 4001){
                errorMessage(reason.message);
            }else{
                console.log(reason);
            }
        });

 
    },
    vote2(amount){
    console.log("ethereum.isConnected()",ethereum.isConnected())
    console.log("ethereum.selectedAddress",ethereum.selectedAddress);
    //let result=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
     let result=this.mnt_abi;
    //let result=
    let MyContract = new this.web3.eth.Contract(result,this.contractAddr);

        let data = MyContract.methods.vote(this.web3.utils.toWei(amount.toString(),'ether')).encodeABI();
        const transactionParameters = {
            //   nonce: '0x00', // ignored by MetaMask
            //gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10','Gwei')),
            gasPrice:this.web3.utils.toHex(this.web3.utils.toWei('10','Gwei')),
            
            //   gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: this.contractAddr, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            // value: web3.utils.toHex('12'), // Only required to send ether to the recipient from the initiating external account.
            data: data, // Optional, but used for defining smart contract creation and interaction.
            //chainId: this.web3.utils.toHex('56'), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            chainId: this.web3.utils.toHex('97'),
        };
        ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })
        .then(function(result){
            //result是生成的交易hash值,用于在链上查看交易状态信息的索引
            successMessage(JSON.stringify(result))
        })
        .catch(function(reason){
            if(reason.code == 4001){
                errorMessage(reason.message);
            }else{
                console.log(reason);
            }
        });

 
    }
 
  },
}
 
</script>
 
