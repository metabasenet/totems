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
                      <el-input  v-model="mntSwap"   type="number"  placeholder="please input swap MNT value"  ></el-input>
                    </div>
                    <div id="swapButton" class="fr top10">
                      <el-button type="primary" @click="exchange()" >Exchange</el-button>
                    </div>
                    <div id ="usdtSwapDiv">
                    <div class="fl"><span v-if="usdtFromTo == 1">From</span><span v-else>To</span>: USDT</div>
                      <el-input  v-model="usdtSwap" type="number"  placeholder="please input swap USDT value" ></el-input>
                    </div>
                    <div class="fr top10">
                      <!--<el-button type="primary" @click="postFlutterInfo()">postFlutterInfo</el-button  >-->
                     <!-- <el-button type="primary" @click="swapExactTokensForTokensByPassword()">Commit</el-button>-->
                      <el-button type="primary" @click="swapExactTokensForTokens()">Commit</el-button>
                         <el-button type="primary" @click="postPassword()">password</el-button>
                
                      
                      
                       <!-- <el-button type="text" @click="inputPassword()">Message Box</el-button>-->
                    </div>
                 </el-col>
              </el-row>
       
            </div>
            <div v-show="usable === '2'">
              <el-row>
                <el-col :span="24">
                    <div  >
                      <div class="fl">MNT</div>
                      <el-input  v-model="mntLiquidity"   type="number"  placeholder="please input liquidity MNT value"  ></el-input>
                    </div>
                    
                    <div style="padding-top:15px;">
                      <div class="fl">USDT</div>
                      <el-input  v-model="usdtLiquidity" type="number"  placeholder="please input liquidity USDT value" ></el-input>
                    </div>
                    <div class="fr top10">
                      <el-button type="primary" @click="addLiquidity()">Commit</el-button>                      
                    </div>
                </el-col>
              </el-row>
            </div>
            <div v-show="usable === '3'">
               <el-row>
                <el-col :span="24">
                    <div >
                      <div class="fl">LP</div>
                      <el-input  v-model="lpRemove"   type="number"  placeholder="please input remove lp value"  ></el-input>
                    </div>
                    
                    <div style="padding-top:15px;">
                      <div class="fl">MNT</div>
                      <el-input  v-model="mntRemove" type="number"  placeholder="" disabled ></el-input>
                    </div>
                    <div style="padding-top:15px;">
                      <div class="fl">USDT</div>
                      <el-input  v-model="usdtRemove" type="number"  placeholder="" disabled ></el-input>
                    </div>
                    <div class="fr top10">
                      <el-button type="primary" @click="removeLiquidityWithPermit()">Commit</el-button>                      
                    </div>
                </el-col>
              </el-row>
            </div>
            <div v-show="usable === '4'">
              
            </div>
          </el-tab-pane>
        </el-tabs>
          <div v-show="usable === '4'">
            <div id="chart" ref ="chart" style="width:400px;height:200px;"></div>
          </div>
       

        <el-row :gutter="20" class="" style="margin-top:10px;background-color:linen;">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <p>
                MNT:<span v-if="!isNaN(mnt)">{{ mnt }}</span>
              </p>
              <p>
                USDT:<span v-if="!isNaN(usdt)">{{ usdt }}</span>
              </p>
              <p>
                LP:<span v-if="!isNaN(lp)">{{ lp }}</span>
              </p>
               <p>
                BNB:<span v-if="!isNaN(bnb)">{{bnb}}</span>
              </p>
              <p><span v-if="!isNaN(swapState)">{{swapState}}</span></p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <p>
                Pool MNT:<span v-if="!isNaN(mntPool)">{{ mntPool }}</span>
              </p>
              <p>
                Pool USDT:<span v-if="!isNaN(usdtPool)">{{ usdtPool }}</span>
              </p>
              <p>
                Price:<span v-if="!isNaN(mntToUsdtRate)">{{ mntToUsdtRate }}</span>
              </p>
            
             
        
            </div>
          </el-col>
        </el-row>
    </el-main>
    <el-footer style="height:auto;">    
      <el-row :gutter="20" class="" style="margin:0;">
        <el-col :span="14">
          <div class="grid-content bg-purple" style="display:flex; align-items:center;">
            {{approveInfo}}
          </div>
        </el-col>
        <el-col :span="10">
          <p >
            <div class="grid-content bg-purple" v-if="mntApprove === '0'">   
              <el-button type="primary" @click="approve(mnt_addr, 1)">Approve MNT</el-button>
            </div>
          </p>
          <p >
            <div class="grid-content bg-purple" v-if="usdtApprove === '0'">
              <el-button type="primary" @click ="approve(usdt_addr, 0)">Approve USDT</el-button>
            </div>
          </p>
        </el-col>        
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import BigNumber from 'bignumber.js';
BigNumber.config({DECIMAL_PLACES:4,ROUNDING_MODE:5})
let Tx= require('ethereumjs-tx').Transaction;
//let Tx= require('ethereumjs-tx');
let Common = require('ethereumjs-common').default;
let Ether = new BigNumber(10e17);
let eth_lib = require('eth-lib');
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
      mntLiquidity: new BigNumber(),
      usdtLiquidity:new BigNumber(),
      lpRemove:new BigNumber(),
      mntRemove:new BigNumber(),
      usdtRemove:new BigNumber(),
      mntApprove:"1",  //1 为已授权
      usdtApprove:"1", //1 为已授权
      approveInfo:"",// 授权信息
      mnt_addr: "0x450af0a7c8372eee72dd2e4833d9aac4928c151f",
      usdt_addr: "0xb7f04aefa2612a8321618af162fe8d90aa087e45",
      lp_addr: "0x82260d3f8c98e90a4ec0dcf709e2ad8f592ea941",  //account 1
      client_addr: "0xa47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9", //account 2
      //client_addr: "0xe2AF0787C4eE33610255C00Fc18e58ca800dC6F8",  // 
      uniswap_addr : "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3",
      privateKey:"0674179d55ae762ce33ab07c842690946adcbd7f87fada26ce2a6be6ec25c360",  //1
      //privateKey:"a0f4220b3ce3fce01080371af0d924341d52767b25c2abaea3d44c18ae67845b",
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
     
      DOMAIN_SEPARATOR :"0xd010526b15a49fbab086ffd91b78ef60d6bdb7037f5d98ba83de33b8fb33c43c",
      PERMIT_TYPEHASH :"0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9",
      password:"123",
      passwordInput:"",
      abi: [ { constant: true, inputs: [], name: "name", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "value", type: "uint256" }, ], name: "approve", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "from", type: "address" }, { name: "to", type: "address" }, { name: "value", type: "uint256" }, ], name: "transferFrom", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "addedValue", type: "uint256" }, ], name: "increaseAllowance", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function", }, { constant: false, inputs: [ { name: "spender", type: "address" }, { name: "subtractedValue", type: "uint256" }, ], name: "decreaseAllowance", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: false, inputs: [ { name: "to", type: "address" }, { name: "value", type: "uint256" }, ], name: "transfer", outputs: [{ name: "", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function", }, { constant: true, inputs: [ { name: "owner", type: "address" }, { name: "spender", type: "address" }, ], name: "allowance", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function", }, { inputs: [], payable: true, stateMutability: "payable", type: "constructor", }, { anonymous: false, inputs: [ { indexed: true, name: "from", type: "address" }, { indexed: true, name: "to", type: "address" }, { indexed: false, name: "value", type: "uint256" }, ], name: "Transfer", type: "event", }, { anonymous: false, inputs: [ { indexed: true, name: "owner", type: "address" }, { indexed: true, name: "spender", type: "address" }, { indexed: false, name: "value", type: "uint256" }, ], name: "Approval", type: "event", }, ],
      mnt: new BigNumber(""),
      usdt: new BigNumber(""),
      lp: new BigNumber(""),
      bnb:new BigNumber(""),
      mntPool: new BigNumber(""),
      usdtPool: new BigNumber(""),
      skill: "",
      mntToUsdtRate: new BigNumber(),
      usdtToMntRate: new BigNumber(),
      _reserve0:new BigNumber(),
      _reserve1:new BigNumber(),
      totalSupply:new BigNumber(),    
      ROUNDING_MODE:4,  //Default ROUNDING_MODE
      calculationSwapOnce:true,
      calculationLiquidityOnce:true,
      exchangeState:true,
      mntFromTo:1,
      usdtFromTo:0,
      swapState:"",
      web3:new this.Web3("https://data-seed-prebsc-1-s1.binance.org:8545"),
      slippageTolerance:new BigNumber("0.98"),
      uniswap_abi:[{ "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" },{ "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "amountADesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountBDesired", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "amountAMin", "type": "uint256" }, { "internalType": "uint256", "name": "amountBMin", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "bool", "name": "approveMax", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "removeLiquidityWithPermit", "outputs": [{ "internalType": "uint256", "name": "amountA", "type": "uint256" }, { "internalType": "uint256", "name": "amountB", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }],
      erc20_abi:[{ "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }],
      lp_abi: [{ "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }],
      legend:"",
      xAxis:"",
      series:"",
      minPrice:0,
      maxPrice:0,

    };
  },
  methods: {
    handleClick(tab) {
      //console.log("tab", tab);
      //this.getChartData(15);
      // this.$nextTick(()=>{
      //   console.log("this.$refs.chart",this.$refs.chart);
      //  this.$echarts.getInstanceByDom(this.$refs.chart).resize();
      // })

    },
    getTotalSupply() {      
      let web3Contract = new this.web3.eth.Contract(this.erc20_abi, this.lp_addr);
      web3Contract.methods.totalSupply().call().then((v)=>{
        let ret =new BigNumber(v);
        let value=new BigNumber(ret/Ether).toFixed(this.ROUNDING_MODE);
        this.totalSupply=value;
     
  
      })    
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
     
      let priceAbi = [ { constant: true, inputs: [], name: "getReserves", outputs: [ { internalType: "uint112", name: "_reserve0", type: "uint112", }, { internalType: "uint112", name: "_reserve1", type: "uint112", }, { internalType: "uint32", name: "_blockTimestampLast", type: "uint32", }, ], payable: false, stateMutability: "view", type: "function", }, { constant: true, inputs: [], name: "token0", outputs: [ { internalType: "address", name: "", type: "address", }, ], payable: false, stateMutability: "view", type: "function", }, { constant: true, inputs: [], name: "token1", outputs: [ { internalType: "address", name: "", type: "address", }, ], payable: false, stateMutability: "view", type: "function", }, ];
      let web3Contract = new this.web3.eth.Contract(priceAbi, this.lp_addr);
      web3Contract.methods.getReserves().call((error,result)=>{

        this._reserve0=new BigNumber(result._reserve0);
        this._reserve1=new BigNumber(result._reserve1);
        this.mntToUsdtRate=new BigNumber(new BigNumber( this._reserve1)/new BigNumber( this._reserve0)).toFixed(this.ROUNDING_MODE); ;
        this.usdtToMntRate=new BigNumber(new BigNumber(this._reserve0)/new BigNumber( this._reserve1)).toFixed(this.ROUNDING_MODE); ;
      });   
    },
    
     getFlatterInfo() {   
      window.addEventListener(
        "flutterInAppWebViewPlatformReady",
        (event) => {
          window.flutter_inappwebview
            .callHandler("haha1")
            .then((result)=>{
              this.skill = result["skill"];          
              alert(result["skill"]);      
            });
        }
      );
      window.addEventListener(
        "flutterInAppWebViewPlatformReady",
        (event) => {
          window.flutter_inappwebview
            .callHandler("haha")
            .then((result)=>{
              this.skill = result;          
              alert(result);      
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
     swapExactTokensForTokensByPassword() {
      this.$prompt('Please input your wallet password', '', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /[\s\S]*/,
        inputErrorMessage: 'Format error!'
      }).then(({ value }) => {
      
        
        this.$message({
          type: 'success',
          message: 'Your wallet password is: ' + value
        });
          this.passwordInput=value;    
        if (this.passwordInput !=this.password){
        alert("Password error"); return;}
        else{
          this.$options.methods.swapExactTokensForTokens();
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel input'
        });       
      });
    },
    async swapExactTokensForTokens(){
      let passwordInput = prompt('');
      if(passwordInput != this.password){
        alert("lease enter the correct wallet password!");
        return;
      } 
      let abi = [{ "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }];
      let privKey = new Buffer.from(this.privateKey, 'hex');   
      let con=new this.web3.eth.Contract(abi,this.con_addr);
      let swapValue=this.mntSwap;
      if(this.mntFromTo ==0){swapValue=this.usdtSwap;}
      //let amountIn=new BigNumber(10**18 * swapValue);
      let amountIn = this.web3.utils.toWei(new BigNumber(swapValue).toString(),'ether');
      //let amountIn= 10**18 * swapValue; 
      let swapoutValue=this.usdtSwap;
      if(this.mntFromTo ==0){swapoutValue=this.mntSwap;}
      let amountOutMin=this.web3.utils.toWei(new BigNumber(swapoutValue * this.slippageTolerance).toString(),'ether');
     //let amountOutMin=0;
      let path=[this.mnt_addr,this.usdt_addr]; //mnt swap usdt
      if(this.mntFromTo ==0){
        path=[this.usdt_addr,this.mnt_addr];//usdt swap mnt
      }      
      let to=this.client_addr;
      //let deadline=new BigNumber(Math.floor(Date.now()/1000)+1200);
      let deadline=this.web3.utils.toHex(Math.floor(Date.now()/1000)+1200);  
      this.web3.eth.getTransactionCount(to,async(err,txCount)=>{
          let txObject={
          nonce: this.web3.utils.toHex(txCount),
          gasLimit:this.web3.utils.toHex(150000),
          gasPrice:this.web3.utils.toHex(this.web3.utils.toWei('10','Gwei')),
          to:this.uniswap_addr,  
          data:con.methods.swapExactTokensForTokens(amountIn,amountOutMin,path,to,deadline).encodeABI()
        }    
        let BSC_MAIN=Common.forCustomChain('mainnet',{name:'bnb',networkId:97,chainId:97},'petersburg');       
        let tx=new Tx(txObject,{common:BSC_MAIN});  
        tx.sign(privKey);
        let serializedTx=tx.serialize();       
        let raw='0x'+serializedTx.toString('hex');   
        await this.web3.eth.sendSignedTransaction(raw,(err,txHash)=>{        
          if(err !=null){
            this.swapState=err;
          }
        })
        this.swapState="Swap success!";
          this.getAddress(this.client_addr, this.mnt_addr, 1);
          this.getAddress(this.client_addr, this.usdt_addr, 2);
          this.getAddress(this.client_addr, this.lp_addr, 3);
          this.getAddress(this.lp_addr, this.mnt_addr, 4);
          this.getAddress(this.lp_addr, this.usdt_addr, 5);
      });
    },
    changeApproveState(){
      if (this.mntApprove == "0" && this.usdtApprove =="0"){
          this.approveInfo="Please Approve MNT and USDT first!";
        }else if(this.mntApprove == "0" && this.usdtApprove =="1"){
          this.approveInfo="Please Approve MNT first!";
        }else if(this.mntApprove == "1" && this.usdtApprove =="0"){
          this.approveInfo="Please Approve USDT first!";
        }else{
          this.approveInfo="";
        }
    },
    // owner的erc20(con_addr)代币给spender授权
    approve( con_addr,type) {
      /*
        //https://testnet.bscscan.com/tx/0xf9562e15d1ba95636abec8d91695f613fcc647215ae00011e1169566be4cf8ba

        Function: approve(address spender, uint256 value)

        MethodID: 0x095ea7b3
        [0]:  0000000000000000000000009ac64cc6e4415144c455bd8e4837fea55603e5c3
        [1]:  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      */
  
      let privKey = new Buffer.from(this.privateKey, 'hex');
      let con = new this.web3.eth.Contract(this.erc20_abi,con_addr);
      con.methods.allowance(this.client_addr,this.uniswap_addr).call((_,ret) => {
          let v  = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
          if (ret < v / 2n) {
              this.web3.eth.getTransactionCount(this.client_addr, (err, txCount) => {           
                  let txObject = {
                      nonce:    this.web3.utils.toHex(txCount),
                      gasLimit: this.web3.utils.toHex(150000),
                      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
                      to: con_addr,
                      data: con.methods.approve(this.uniswap_addr,v).encodeABI()
                  }                  
                  let BSC_MAIN = Common.forCustomChain('mainnet', {name: 'bnb', networkId: 97, chainId: 97}, 'petersburg');
                  let tx = new Tx(txObject,{common: BSC_MAIN});
            
                  tx.sign(privKey);
                  let serializedTx = tx.serialize();
                  let raw = '0x' + serializedTx.toString('hex');
                      
                  this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {              
                      if (type ==1){
                        this.mntApprove="1";
                      }else{
                        this.usdtApprove="1";
                      }
                      this.$options.methods.changeApproveState.call(this);
                  });
              });
          } else {
              console.log('has been empowered');
            
          }
      });
    },    
    async addLiquidity(){
      /*
        Function: addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline)

        MethodID: 0xe8e33700
        [0]:  000000000000000000000000450af0a7c8372eee72dd2e4833d9aac4928c151f
        [1]:  000000000000000000000000b7f04aefa2612a8321618af162fe8d90aa087e45
        [2]:  000000000000000000000000000000000000000000000000016c0bfd0f3250c1
        [3]:  0000000000000000000000000000000000000000000000000de0b6b3a7640000
        [4]:  0000000000000000000000000000000000000000000000000147a463c0e07be0
        [5]:  0000000000000000000000000000000000000000000000000c7d713b49da0000
        [6]:  0000000000000000000000000873093deb492a6425d85906e2ce6e856bcdc71f
        [7]:  00000000000000000000000000000000000000000000000000000000626634c1
      */
     
      let privKey = new Buffer.from(this.privateKey, 'hex');
      let con = new this.web3.eth.Contract(this.uniswap_abi,this.uniswap_addr);
      // mnt         
   
      let amountADesired = this.web3.utils.toWei(new BigNumber(this.mntLiquidity).toString(),'ether');
      // usdt
      let amountBDesired = this.web3.utils.toWei(new BigNumber(this.usdtLiquidity).toString(),'ether');   
      let amountAMin = this.web3.utils.toWei(new BigNumber("0").toString(),'ether');   
      let amountBMin = this.web3.utils.toWei(new BigNumber("0").toString(),'ether');
      let to = this.client_addr;
      let deadline = this.web3.utils.toHex(Math.floor(Date.now()/1000) + 1200);
      this.web3.eth.getTransactionCount(to, async(err, txCount) => {
          let txObject = {
              nonce:    this.web3.utils.toHex(txCount),
              gasLimit: this.web3.utils.toHex(5000000),
              gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
              to: this.uniswap_addr,
              data: con.methods.addLiquidity(this.mnt_addr,this.usdt_addr,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline).encodeABI()
          }
          let BSC_MAIN = Common.forCustomChain('mainnet', {name: 'bnb', networkId: 97, chainId: 97}, 'petersburg');
          let tx = new Tx(txObject,{common: BSC_MAIN});
          tx.sign(privKey);
          let serializedTx = tx.serialize();
          let raw = '0x' + serializedTx.toString('hex');
          await this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {
              console.log('err:', err, 'txHash:', txHash);
          });
          console.log("AddLiquidity success!");
      });
    },
     permit(owner,spender,value,deadline,nonce) {
      let bs1 = this.web3.eth.abi.encodeParameters(['bytes32','address','address','uint256','uint256','uint256'],[this.PERMIT_TYPEHASH,owner,spender,value,nonce,deadline]);
      let hash1 = this.web3.utils.sha3(bs1);
      let bs2 = '0x1901' + this.DOMAIN_SEPARATOR.substring(2) + hash1.substring(2);
      let hash2 = this.web3.utils.sha3(bs2);
      return hash2;
    },

    async removeLiquidityWithPermit() {
    /*
      https://testnet.bscscan.com/tx/0x744ec648407d541f7d91bf3766bd74353bfe42856c28d4639e59333b62d63514
      Function: removeLiquidityWithPermit(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s)
      MethodID: 0x2195995c
      [0]:  000000000000000000000000450af0a7c8372eee72dd2e4833d9aac4928c151f
      [1]:  000000000000000000000000b7f04aefa2612a8321618af162fe8d90aa087e45
      [2]:  00000000000000000000000000000000000000000000000000eed25dcc0f2ed8
      [3]:  0000000000000000000000000000000000000000000000000044ce0ab54ddc92
      [4]:  000000000000000000000000000000000000000000000000029f767fa68c7fff
      [5]:  0000000000000000000000000873093deb492a6425d85906e2ce6e856bcdc71f
      [6]:  0000000000000000000000000000000000000000000000000000000062663bc9
      [7]:  0000000000000000000000000000000000000000000000000000000000000000
      [8]:  000000000000000000000000000000000000000000000000000000000000001c
      [9]:  851be53fb30fed79f09b25098bc95568912f5f69efda9027430d157226af642e
      [10]: 0befa2b4ee73547dd3b591a6709377dbfc149120465b1ddca514587473156fe5
      */
      let privKey = new Buffer.from(this.privateKey, 'hex');
      let con = new this.web3.eth.Contract(this.uniswap_abi,this.uniswap_addr);
      // lp
      let liquidity =this.web3.utils.toWei(new BigNumber(this.lpRemove).toString(),'ether');
      //let liquidity = BigNumber(0xeed25dcc0f2ed8n);
      // usdt
      let amountAMin = this.web3.utils.toWei(new BigNumber("0").toString(),'ether');
      let amountBMin = this.web3.utils.toWei(new BigNumber("0").toString(),'ether');

      let lp_con = new this.web3.eth.Contract(this.lp_abi,this.lp_addr);
      let nonce = await lp_con.methods.nonces(this.client_addr).call();
      let deadline = this.web3.utils.toHex(Math.floor(Date.now()/1000) + 1200);
      let ret = this.$options.methods.permit.call(this,this.client_addr,this.uniswap_addr,liquidity,deadline,nonce);   
      let sign_data = eth_lib.Account.sign(ret, '0x' + this.privateKey);
      let vrs = eth_lib.Account.decodeSignature(sign_data);
      let approveMax = 0;
      let to = this.client_addr;

      this.web3.eth.getTransactionCount(this.client_addr, async (err, txCount) => {
          let txObject = {
              nonce:    this.web3.utils.toHex(txCount),
              gasLimit: this.web3.utils.toHex(5000000),
              gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
              to: this.uniswap_addr,
              data: con.methods.removeLiquidityWithPermit(this.mnt_addr,this.usdt_addr,liquidity,amountAMin,amountBMin,to,deadline,approveMax,vrs[0],vrs[1],vrs[2]).encodeABI()
          }
          let BSC_MAIN = Common.forCustomChain('mainnet', {name: 'bnb', networkId: 97, chainId: 97}, 'petersburg');
          let tx = new Tx(txObject,{common: BSC_MAIN});
          tx.sign(privKey);
          let serializedTx = tx.serialize();
          let raw = '0x' + serializedTx.toString('hex');
          let ret = await this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {
              console.log('err:', err, 'txHash:', txHash);
          });
          console.log('removeLiquidity complete');
      });
    },
    async getChartData(times) {
      let params = {
            times:times,
      };
      //虚拟数据，以后修改
      //let res={ "xAxis": ["15","14","13","12","11","10","9", "8", "7", "6", "5", "4", "3","2","1"], "legend": ["MNt Price"], "series": [{ "name": "MNt Price", "data": [10, 11, 13, 16, 20, 25, 31,38,46,55,65,76,88,101,115] }] }
        let that = this
        this.$api.getUniswap(params).then(res => {     
            that.legend=res.legend;
            that.xAxis=res.xAxis; 
            that.minPrice=res.minPrice;
            that.maxPrice=res.maxPrice;          
               let series= [];
            for(let serieIndex =0; serieIndex<res.series.length; serieIndex++){               
                let serie=
                  {
                  name: res.series[serieIndex].name,
                  type: "line",
                  data: res.series[serieIndex].data,              
                  dateTime: "1",
                }
                series.push(serie)
            }
            that.series =series;
            that.drawChart();  
        });   
    },
    drawChart()
    { 
      //Object.defineProperty(document.getElementById('chart'),'clientWidth',{get:function(){return 400;}})
	    // Object.defineProperty(document.getElementById('chart'),'clientHeight',{get:function(){return 200;}})
      let myChart = this.$echarts.init(document.getElementById("chart"));  
      let option = {
          /*grid: {
              left: '10%',
              right: '5%',
              bottom: '5%',
              top: '5%'
            },*/
          title: {
          text: ""
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: '',
              crossStyle: {
                color: '#999'
              }
            },
            formatter: function (params) {        
              var relVal = "<h2>"+params[0].seriesName +"</h2>";
              for (var i = 0, l = params.length; i < l; i++) {        
               relVal+="<br/><div style=\"text-align:left;\">"+params[i].marker+"  "+params[i].data.dateTime+"</div><br/><div style=\"text-align:left;\">"+ params[i].marker+"  "+params[i].data.value+"</div>";
              }
                return relVal
              }
          },
          legend: {    
          data:this.legend
          },
          xAxis: {        
          data: this.xAxis        
          },
          yAxis: {
               type: 'value',              
                min: (this.minPrice - ( this.maxPrice - this.minPrice)  * 0.3).toFixed(this.ROUNDING_MODE),              
                max: (this.maxPrice + ( this.maxPrice - this.minPrice)  * 0.3).toFixed(this.ROUNDING_MODE),
          },
          series:this.series
      };        
      myChart.setOption(option);
     },
    getBNB(){
     this.web3.eth.getBalance(this.client_addr).then((ret)=>{
         let val=new BigNumber(ret/Ether).toFixed(this.ROUNDING_MODE);
         this.bnb =val;
      }); 
    },
    getApproveState(con_addr,type ){     
      let con = new this.web3.eth.Contract(this.erc20_abi,con_addr);
      con.methods.allowance(this.client_addr,this.uniswap_addr).call((_,ret) => {  
          let v  = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn;
          if (ret < v / 2n) {
            if (type ==1){
              this.mntApprove="0";
            }else{
              this.usdtApprove="0";
            }
           this.$options.methods.changeApproveState.call(this);
                    
          } else {
              //console.log('has been empowered');
            
          }
      });
    },
    postPassword(){
      let passwordInput = prompt('');

 window.flutter_inappwebview.callHandler(
        "hehe",
        "saga",
        true,
        ["sex", 28],
        { bro: "kanon" },
          {password:passwordInput});



      // window.flutter_inappwebview.callHandler(
      //   "hehe",
      //   "saga",
      //   true,
      //   ["sex", 28],
      //   { bro: "kanon" },
      //   {password:"passwordInput"}
      // );
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
    this.getTotalSupply();
    this.getChartData(15);
    this.getBNB();  
    this.$options.methods.getApproveState.call(this,this.mnt_addr , 1);
    this.$options.methods.getApproveState.call(this,this.usdt_addr, 0);
  
  },
  computed:{
    mntToUsdtSwap(){
      let {mntSwap}=this
      return {mntSwap}
    },
    usdtToMntSwap(){
      let {usdtSwap}=this
      return {usdtSwap}
    },
    mntToUsdtLiquidity(){
      let {mntLiquidity}=this
      return {mntLiquidity}
    },
    usdtToMntLiquidity(){
      let {usdtLiquidity}=this
      return {usdtLiquidity}
    },
    lpSupplyRemove(){
      let {lpRemove}=this
      return {lpRemove}
    },
    usableSwap(){
      let{usable}=this
      return {usable}
    }
  },
  watch:{
    mntToUsdtSwap(val,oldVal){     
      if (new BigNumber(val.mntSwap).toNumber()> new BigNumber(this.mnt).toNumber()){
        this.mntSwap=oldVal.mntSwap;
        return;
      }  
      if (this.calculationSwapOnce){
        this.calculationSwapOnce=false;
        let amountInWithFee=new BigNumber(val.mntSwap) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve1;
        let denominator=(new BigNumber( this._reserve0) * 1000 ) +amountInWithFee;
        this.usdtSwap= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE); 
      }else{
        this.calculationSwapOnce=true;
      } 
    },
    usdtToMntSwap(val,oldVal){
      if (new BigNumber(val.usdtSwap).toNumber()> new BigNumber(this.usdt).toNumber()){
        this.usdtSwap=oldVal.usdtSwap;
        return;
      }    
      if (this.calculationSwapOnce){
        this.calculationSwapOnce=false;
        let amountInWithFee=new BigNumber(val.usdtSwap) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve0;
        let denominator=(new BigNumber( this._reserve1) * 1000 ) +amountInWithFee;
        this.mntSwap= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE);   
      }else{
        this.calculationSwapOnce=true;
      }
    },    
    mntToUsdtLiquidity(val,oldVal){
       if (new BigNumber(val.mntLiquidity).toNumber()> new BigNumber(this.mnt).toNumber()){
         this.mntLiquidity=oldVal.mntLiquidity;
         return;
       }
      if (this.calculationLiquidityOnce){
        this.calculationLiquidityOnce=false;
        let amountInWithFee=new BigNumber(val.mntLiquidity) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve1;
        let denominator=(new BigNumber( this._reserve0) * 1000 ) +amountInWithFee;
        this.usdtLiquidity= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE); 
      }else{
        this.calculationLiquidityOnce=true;
      } 
    },
    usdtToMntLiquidity(val,oldVal){    
      if (new BigNumber(val.usdtLiquidity).toNumber()> new BigNumber(this.usdt).toNumber()){
         this.usdtLiquidity=oldVal.usdtLiquidity;
         return;
       }
      if (this.calculationLiquidityOnce){
        this.calculationLiquidityOnce=false;
        let amountInWithFee=new BigNumber(val.usdtLiquidity) * 998;
        let numerator=new BigNumber(amountInWithFee)* this._reserve0;
        let denominator=(new BigNumber( this._reserve1) * 1000 ) +amountInWithFee;
        this.mntLiquidity= new BigNumber(numerator/denominator).toFixed(this.ROUNDING_MODE);   
      }else{
        this.calculationLiquidityOnce=true;
      }
    },
    lpSupplyRemove(val,oldVal){ 
       if (new BigNumber(val.lpRemove).toNumber()> new BigNumber(this.lp).toNumber()){
         this.lpRemove=oldVal.lpRemove;
         return;
       }
      this.mntRemove= new BigNumber(val.lpRemove * this._reserve0 / this.totalSupply /Ether).toFixed(this.ROUNDING_MODE);  // using balances ensures pro-rata distribution
      this.usdtRemove =new BigNumber(val.lpRemove *  this._reserve1 / this.totalSupply /Ether).toFixed(this.ROUNDING_MODE); // using balances ensures pro-rata distribution
    },
    usableSwap(val){
      //if (val.usable =="4"){
        this.$nextTick(()=>{
         // this.getChartData(15);
         // console.log("val.usable",val.usable );
        })
      //}
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
  text-align: left;
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