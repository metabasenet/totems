
 
<template>
  <div>
    <button @click="password2()">password</button>
    <div>{{ letter }}</div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      letter: "\u{1F680}",
      erc20_abi: [
        {
          constant: false,
          inputs: [
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
    };
  },
  props: [
    "showDialog",
    "content",
    "okText",
    "cancelText",
    "hideConfirm",
    "hideCancle",
  ],
  methods: {
    password() {
      let crypto = require("crypto");
      console.log("crypto", crypto);
      // example 96-bit nonce
      let nonce = Buffer.alloc(12, 0xff);
      console.log("nonce", nonce);
      // example 256-bit key
      let key = Buffer.alloc(32, 0x01);
      console.log("key", key);
      // some data to encrypt
      let data = Buffer.alloc(64, 0xbb);
      console.log("data", data);
      // construct the cipher
      let cipher = crypto.createCipheriv("chacha20-poly1305", key, nonce, {
        authTagLength: 16,
      });

      console.log("cipher", cipher);
      // encrypt the data which will return an encrypted Buffer
      // that is of equal length to the overall input to the
      // stream cipher
      let ret = cipher.update(data);
      console.log("ret", ret);
      console.log(ret.toString("hex"));
      // 25805b670d5834ecb8a018ea87b6ff864117762481880fc723690d0e2d0cfd08a43c144291eb2df148b0d6981b66ca101344ea27c7a0860c2e5f1a7eed1e70eb

      // finalize cipher which allows us to calculate the MAC
      cipher.final();

      // obtain the 128-bit poly1305 MAC that includes our associated data
      cipher.getAuthTag();
      // 9ef622cec7a5719261031e9ca91049d4
    },
    
    add() {
      return 100;
    },
    password2(){
    
    },
    password3() {
      send = async () => {
        ethereum.enable();

        let account = "0xa47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9";
        console.log("" + account);
        
        let balance = await this.web3.eth.getBalance(account);
        console.log("" + balance);
        let contractAbi = this.erc20_abi;
        let contractAddress = "0x450af0a7c8372eee72dd2e4833d9aac4928c151f";
        let myContract = new this.web3.eth.Contract(
          contractAbi,
          contractAddress,
          {
            from: account, // default from address
            gasLimit: 70000,
            gasPrice: 1000000000, // default gas price in wei, 10 gwei in this case
          }
        );
        let a = 1000000;
        let toAddress = "0xe2AF0787C4eE33610255C00Fc18e58ca800dC6F8";
        console.log("" + toAddress);
        myContract.methods
          .transfer(toAddress, 1 * a)
          .send({ from: account }, function (error, transactionHash) {
            if (!error) {
              console.log("transactionHash is" + transactionHash);
            } else {
              console.log(error);
            }
          });
      };
    },
  },
};
</script>
 
<style lang="" rel="stylesheet/scss">
</style>