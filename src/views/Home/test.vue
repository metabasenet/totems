<template>
  <el-button type="text" @click="permit()"> permit</el-button>
</template>
 
<script>
  export default {
  methods:{
    permit() {
      alert("OOO");
      let PERMIT_TYPEHASH ="0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9";
      console.log("permit");
      let web3=new this.Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
      let bs1 = web3.eth.abi.encodeParameters(['bytes32'],[PERMIT_TYPEHASH]);
      console.log("bs1",bs1); 
      //return bs1;
    },
  }
  }
</script>