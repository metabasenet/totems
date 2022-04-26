<template>
  <el-container>

    <el-main> 
        <el-tabs  v-model="usable" :tab-position="tabPosition" @tab-click="handleClick"  >
          <el-tab-pane v-for="(tab, index) in tabs" :key="index"   :name="tab.name"  :label="tab.label">
            <div v-show="usable === '1'">
              <el-row>
                 <el-col :span="24">
                    <div id ="mntSwapDiv">
                      <div class="fl"><span v-if="mntFromTo == 1">From</span><span v-else>To</span>: MNT</div>
                      <el-input  v-model="mntSwap"   type="number"  placeholder="please input swap MNT value"></el-input>
                    </div>
                    <div id="swapButton" class="fr top10">
                      <el-button type="primary" @click="exchange()" >exchange</el-button>
                    </div>
                    <div id ="usdtSwapDiv">
                    <div class="fl"><span v-if="usdtFromTo == 1">From</span><span v-else>To</span>: USDT</div>
                      <el-input  v-model="usdtSwap" type="number"  placeholder="please input swap MNT value" ></el-input>
                    </div>
                    <div class="fr top10">
                      <!--<el-button type="primary" @click="postFlutterInfo()">postFlutterInfo</el-button  >-->
                      <el-button type="primary" @click="swapExactTokensForTokens()">Commit</el-button>
                    </div>
                 </el-col>
              </el-row>
       
            </div>
            <div v-show="usable === '2'">
              <h1>Liquidity</h1>
            </div>
            <div v-show="usable === '3'">
              <h1>remove Liquidity</h1>
            </div>
            <div v-show="usable === '4'">
              <h1>Trend</h1>
            </div>
          </el-tab-pane>
        </el-tabs>
    </el-main>
    <el-footer style="height:auto;">    
      <el-row :gutter="20" class="" style="margin:0;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <p>
              MNT: <span>{{ mnt }}</span>
            </p>
            <p>
              USDT: <span>{{ usdt }}</span>
            </p>
            <p>
              LP: <span>{{ lp }}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <p>
              Pool MNT: <span>{{ mntPool }}</span>
            </p>
            <p>
              Pool USDT: <span>{{ usdtPool }}</span>
            </p>
            <p>
              <span>{{ mntToUsdtRate }}</span>
            </p>
            <p><span>{{skill}}</span></p>
            <p>
              <span>{{ usdtToMntRate }}</span>
            </p>
       
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import BigNumber from 'bignumber.js';
BigNumber.config({DECIMAL_PLACES:4,ROUNDING_MODE:5})
export default {
  data() {
    return {
      tabPosition: "top",
      usable: "1",
      tabs: [
        { name: "1", label: "Swap" },
        { name: "2", label: "Liquidity" },
        { name: "3", label: "Remove" },
        { name: "4", label: "Trend" },
      ],
      mntSwap: new BigNumber(),
      usdtSwap: new BigNumber(),
      mnt_addr: "0x450af0a7c8372eee72dd2e4833d9aac4928c151f",
      usdt_addr: "0xb7f04aefa2612a8321618af162fe8d90aa087e45",
      lp_addr: "0x82260d3f8c98e90a4ec0dcf709e2ad8f592ea941",
      client_addr: "0xa47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9",
      uniswap_addr : "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3",
      privateKey:"0674179d55ae762ce33ab07c842690946adcbd7f87fada26ce2a6be6ec25c360",
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
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
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "from", type: "address" },
            { name: "to", type: "address" },
            { name: "value", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "spender", type: "address" },
            { name: "addedValue", type: "uint256" },
          ],
          name: "increaseAllowance",
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
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "spender", type: "address" },
            { name: "subtractedValue", type: "uint256" },
          ],
          name: "decreaseAllowance",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
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
          inputs: [],
          payable: true,
          stateMutability: "payable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Approval",
          type: "event",
        },
      ],
      mnt: new BigNumber(),
      usdt: new BigNumber(),
      lp: new BigNumber(),
      mntPool: new BigNumber(),
      usdtPool: new BigNumber(),
      skill: "",
      mntToUsdtRate: new BigNumber(),
      usdtToMntRate: new BigNumber(),
      _reserve0:new BigNumber(),
      _reserve1:new BigNumber(),
      ROUNDING_MODE:5,  //Default ROUNDING_MODE
      calculationOnce:true,
      exchangeState:true,
      mntFromTo:1,
      usdtFromTo:0,


    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    getAddress(client_addr, contractAddress, type) {
      //let BigNumber = require("bignumber.js");
      let Ether = new BigNumber(10e17);
      let web3 = new this.Web3(this.url);
      let web3Contract = new web3.eth.Contract(this.abi, contractAddress);
      web3Contract.methods
        .balanceOf(client_addr)
        .call()
        .then((v) => {
          
          let ret = new BigNumber(v);
          let value = new BigNumber(ret/Ether).toFixed(this.ROUNDING_MODE); 
          switch (type) {
            case 1:
              this.mnt = value;               
              break;
            case 2:
              this.usdt = value;
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
    getPriceRate() {
 
      let web3 = new this.Web3(this.url);
      let priceAbi = [
        {
          constant: true,
          inputs: [],
          name: "getReserves",
          outputs: [
            {
              internalType: "uint112",
              name: "_reserve0",
              type: "uint112",
            },
            {
              internalType: "uint112",
              name: "_reserve1",
              type: "uint112",
            },
            {
              internalType: "uint32",
              name: "_blockTimestampLast",
              type: "uint32",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "token0",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "token1",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ];
      let web3Contract = new web3.eth.Contract(priceAbi, this.lp_addr);
      web3Contract.methods.getReserves().call((error,result)=>{

        this._reserve0=new BigNumber(result._reserve0);
        this._reserve1=new BigNumber(result._reserve1);
        this.mntToUsdtRate=new BigNumber(new BigNumber( this._reserve1)/new BigNumber( this._reserve0));
        this.usdtToMntRate=new BigNumber(new BigNumber(this._reserve0)/new BigNumber( this._reserve1));
        //console.log('_reserve0',result._reserve0);
        //console.log('_reserve1',result._reserve1);

      });
      //this.priceRate =  abc._reserve1;
      //console.log(abc);
    },
    getFlatterInfo() {
      window.addEventListener(
        "flutterInAppWebViewPlatformReady",
        function (event) {
          window.flutter_inappwebview
            .callHandler("haha")
            .then((result)=>{
              alert(result["skill"]);
              this.skill = result["skill"];
            });
        }
      );
    },
    postFlutterInfo() {
      window.flutter_inappwebview.callHandler(
        "hehe",
        "saga",
        true,
        ["sex", 28],
        { bro: "kanon" }
      );
    },
    refresh() {
      window.location.reload();
    },   
    exchange(){
      this.exchangeState=!this.exchangeState;
 
      if (!this.exchangeState){
        this.$el.querySelector("#swapButton").before(this.$el.querySelector("#usdtSwapDiv"));
        this.$el.querySelector("#swapButton").after(this.$el.querySelector("#mntSwapDiv"));
        this.mntFromTo=0;
        this.usdtFromTo=1;
      }else{
        this.$el.querySelector("#swapButton").after(this.$el.querySelector("#usdtSwapDiv"));
        this.$el.querySelector("#swapButton").before(this.$el.querySelector("#mntSwapDiv"));
        this.mntFromTo=1;
        this.usdtFromTo=0;
      }
     
    },
    swapExactTokensForTokens(){
      let Tx= require('ethereumjs-tx').Transaction;
      //let Tx= require('ethereumjs-tx');
      let Common = require('ethereumjs-common').default;
      let web3 = new this.Web3(this.url);
      let abi = [{
        "inputs": [{
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
        }, {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
        }, {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
        }, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }],
        "name": "swapExactTokensForTokens",
        "outputs": [{
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
      }];
      let privKey = new Buffer.from(this.privateKey, 'hex');
      let con=new web3.eth.Contract(abi,this.con_addr);
      let swapValue=this.mntSwap;
      if(this.mntFromTo ==0){swapValue=this.usdtSwap;}
      //let amountIn=new BigNumber(10**18 * swapValue);
      let amountIn = web3.utils.toWei(swapValue,'ether');
      //let amountIn= 10**18 * swapValue; 
      let amountOutMin=web3.utils.toWei('0','ether');
     //let amountOutMin=0;
      let path=[this.mnt_addr,this.usdt_addr]; //mnt swap usdt
      if(this.mntFromTo ==0){
        path=[this.usdt_addr,this.mnt_addr];//usdt swap mnt
      }      
      let to=this.client_addr;
      //let deadline=new BigNumber(Math.floor(Date.now()/1000)+1200);
      let deadline=web3.utils.toHex(Math.floor(Date.now()/1000)+1200);
      web3.eth.getTransactionCount(to,(err,txCount)=>{
          const txObject={
          nonce: web3.utils.toHex(txCount),
          gasLimit:web3.utils.toHex(150000),
          gasPrice:web3.utils.toHex(web3.utils.toWei('10','Gwei')),
          to:this.uniswap_addr,  
          data:con.methods.swapExactTokensForTokens(amountIn,amountOutMin,path,to,deadline).encodeABI()
        }    
        let BSC_MAIN=Common.forCustomChain('mainnet',{name:'bnb',networkId:97,chainId:97},'petersburg');       
        let tx=new Tx(txObject,{common:BSC_MAIN});  
        tx.sign(privKey);
        const serializedTx=tx.serialize();       
        let raw='0x'+serializedTx.toString('hex');   
        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
          console.log('err:',err,'txHash:',txHash);
        })
        
      });
    }

  },
  mounted() {
    this.getPriceRate();
    this.getFlatterInfo();
    this.getAddress(this.client_addr, this.mnt_addr, 1);
    this.getAddress(this.client_addr, this.usdt_addr, 2);
    this.getAddress(this.client_addr, this.lp_addr, 3);
    this.getAddress(this.lp_addr, this.mnt_addr, 4);
    this.getAddress(this.lp_addr, this.usdt_addr, 5);
  },
  computed:{
    mntToUsdtSwap(){
      const{mntSwap}=this
      return {mntSwap}
    },
    usdtToMntSwap(){
      const{usdtSwap}=this
      return {usdtSwap}
    }
  },
  watch:{
    mntToUsdtSwap(val){
      //console.log('1111', parseFloat(val.mntSwap));
      //console.log('2222', parseFloat(this.mntToUsdtRate));
      if (this.calculationOnce){
        this.calculationOnce=false;
        let amountInWithFee=new BigNumber(val.mntSwap) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve1;
        let denominator=(new BigNumber( this._reserve0) * 1000 ) +amountInWithFee;
        this.usdtSwap= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE); 
      }else{
        this.calculationOnce=true;
      } 
    },
    usdtToMntSwap(val){
      //console.log('33333', parseFloat(val.usdtSwap));
     // console.log('44444', parseFloat(this.usdtToMntRate));
      if (this.calculationOnce){
        this.calculationOnce=false;
        let amountInWithFee=new BigNumber(val.usdtSwap) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve0;
        let denominator=(new BigNumber( this._reserve1) * 1000 ) +amountInWithFee;
        this.mntSwap= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE);   
      }else{
        this.calculationOnce=true;
      }
    }
  },
 
};
</script>

<style >
.app-container {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
}
.the-container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
}
.el-tabs {
  /*padding-left: 10px;*/
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-main {
    color: #333;
    text-align: center;
  
    padding:15px;
  }
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.footer_wrap {
  background-color: rgb(179, 216, 255);

  position: relative;
  bottom: 0;
  padding: 10px 0 0;
  width: 100%;
  height: auto;

  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.footer_wrap p {
  padding-left: 10px;
}
.footer_wrap p span {
  color: blue;
}
.el-footer {
    padding: 0;
    box-sizing: border-box;
    flex-shrink: 0;
    background-color: rgb(179, 216, 255);
    height: auto;

}
.el-footer p span {
  color: blue;
}
.el-tabs__item.is-top{font-size:18px;}
.fl{text-align: left;}
.fr{text-align: right;}
.center{text-align: center;}
.top10{padding-top:10px;}
</style>