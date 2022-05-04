<template>
  <div class="main">
    <div class="tab-wrapper">
    <ul class="tab-menu">
        <li :class="{active:tabIndex === '1'}" @click="handleClick('1')">Swap</li>
        <li :class="{active:tabIndex === '2'}" @click="handleClick('2')">Liquidity</li>
        <li :class="{active:tabIndex === '3'}" @click="handleClick('3')">Remove</li>
        <li :class="{active:tabIndex === '4'}" @click="handleClick('4')">Trend</li>
    </ul>
        <div class="both24"></div>
          <div class="tab-content space">
            <div class="contentshow" v-show="tabIndex === '1'">
              <div class="inputbox">
                <dl>
                  <dt>From</dt>
                  <dd>
                    <input class="inputshow" type="text" name="textfield" id="textfield" placeholder="Please Inputswap MNT value"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')">
                    <div class="thecoin"><h1><img src="../../assets/images/MNT.png"></h1>MNT</div>
                  </dd>
                </dl>
              </div>
              <div class="both24"></div>
              <div class="switch">
                    <input type="submit" name="button" id="button" value="切换">
              </div>
                <div class="inputbox">
                <dl>
                <dt>To</dt>
                <dd>
                <input class="inputshow" type="text" name="textfield" id="textfield" placeholder="Please Inputswap USDT value"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')">
                <div class="thecoin"><h1><img src="../../assets/images/USDT.png"></h1>USDT</div>
                </dd>
                </dl>
                </div>
                <div class="both24"></div>
              <div class="commit">
                <input type="submit" name="button2" id="button2" value="Commit" onClick="javascript:showDiv1()">
              </div>
            </div><!--Swap-->
        
        <div class="contentshow"  v-show="tabIndex === '2'">
        <div class="inputbox">
        <dl>
        <dt>MNT</dt>
        <dd>
        <input class="inputshow" type="text" name="textfield" id="textfield" placeholder="Please input liquidity MNT value"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')">
        <div class="thecoin"><h1><img src="../../assets/images/MNT.png"></h1>MNT</div>
        </dd>
        </dl>
        </div>
        <div class="both24"></div>
        <div class="inputbox">
        <dl>
        <dt>USDT</dt>
        <dd>
        <input class="inputshow" type="text" name="textfield" id="textfield" placeholder="Please input liquidity USDT value"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')">
        <div class="thecoin"><h1><img src="../../assets/images/USDT.png"></h1>MNT</div>
        </dd>
        </dl>
        </div>
        <div class="both24"></div>
        <div class="commit">
        <input type="submit" name="button2" id="button2" value="Commit" onClick="javascript:showDiv1()">
        </div>
        </div><!--Liquidity-->
        
        <div class="contentshow"  v-show="tabIndex === '3'">
        <div class="inputbox">
        <dl>
        <dt>LP</dt>
        <dd>
        <input class="inputshow" type="text" name="textfield" id="textfield" placeholder="Please input lpMNT value"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')">
        <div class="thecoin"><h1><img src="../../assets/images/MNT.png"></h1>MNT</div>
        </dd>
        </dl>
        </div>
        <div class="both24"></div>
        <div class="inputbox">
        <dl>
        <dt>MNT</dt>
        <dd>
        <input name="textfield" type="text" class="inputshow" id="textfield"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')" readonly="readonly" placeholder="">
        <div class="thecoin"><h1><img src="../../assets/images/MNT.png"></h1>MNT</div>
        </dd>
        </dl>
        </div>
        <div class="both24"></div>
        <div class="inputbox">
        <dl>
        <dt>USDT</dt>
        <dd>
        <input name="textfield" type="text" class="inputshow" id="textfield"  onblur="checkna()" onKeyUp="this.value=this.value.replace(/[^\d.]/g,'')" readonly="readonly" placeholder="">
        <div class="thecoin"><h1><img src="../../assets/images/USDT.png"></h1>MNT</div>
        </dd>
        </dl>
        </div>
        <div class="both24"></div>
        <div class="commit">
        <input type="submit" name="button2" id="button2" value="Commit" onClick="javascript:showDiv1()">
        </div>
        </div><!--Remove-->
        
        <div class="contentshow"  v-show="tabIndex === '4'">
        <div class="chartshow"></div>
        </div><!--Trend-->
    </div><!-- //tab-content -->
        <div class="both24"></div>
        <div class="datashow space">
        <div class="both24"></div>
        <ul>
        <li><em>MNT:</em>90921.9736</li>
        <li><em>USDT:</em>20912406.8904</li>
        <li><em>LP:</em>28166.9190</li>
        </ul>
        <ul>
        <li><em>Pool MNT:</em>9069.0624</li>
        <li><em>Pool USDT:</em>87489.7393</li>
        <li><em>Price:</em>9.6471</li>
        <li><em>BNB:</em>0.1</li>
        </ul>
        <div class="both24"></div>
        </div>
        <div class="both24"></div>
        <div class="chooseshow space">
        <h1>Please Approve MNT and USDT flrst!</h1>
        <div class="wrapper">
        <input name="select" type="radio" id="option-1" checked>
        <input type="radio" name="select" id="option-2">
        <label for="option-1" class="option option-1">
        <span>Approve MNT</span>
        </label>
        <label for="option-2" class="option option-2">
        <span>Approve USDT</span>
        </label>
        </div>
        </div>
        <div class="both24"></div>
        </div>
    </div>
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
      tabIndex:'1',
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
      lp_addr: "0x82260d3f8c98e90a4ec0dcf709e2ad8f592ea941", 
      //client_addr:"",
      client_addr: "0xa47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9", //account 1
      //client_addr: "0xe2AF0787C4eE33610255C00Fc18e58ca800dC6F8",  //account 2
      //privateKey:"",
      privateKey:"0674179d55ae762ce33ab07c842690946adcbd7f87fada26ce2a6be6ec25c360",  //1
      //privateKey:"a0f4220b3ce3fce01080371af0d924341d52767b25c2abaea3d44c18ae67845b",
      uniswap_addr : "0x9ac64cc6e4415144c455bd8e4837fea55603e5c3",

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
      this.tabIndex=tab;
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
            .callHandler("init")
            .then((result)=>{             
              this.client_addr = result["Address"];     
              //this.privateKey=result["PrivateKey"]; 
              alert(this.client_addr);
              this.$options.methods.init.call(this);
            
            });
        }
      );
      window.addEventListener("Transfer", (event) => {           
            alert(JSON.stringify(event.detail));
            //{token: "0xb7f04aefa2612a8321618af162fe8d90aa087e45",addr:"0x87391240190aB94F43a1365bBDe1610D6b61E2B5",amount:123.123}
   
        });



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
          //this.passwordInput=value; 
          //alert(value);   
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
    postPassword(){
      let passwordInput = prompt('');
      if (passwordInput == null || passwordInput.trim() ==''){
        alert("Please enter the correct wallet password!");
        return ;
      }
        window.flutter_inappwebview.callHandler('verify', passwordInput).then((result)=>{
          alert(JSON.stringify(result));
          if( result !=null && result !=""){
            //this.swapExactTokensForTokens();
          }else{
            alert("Please enter the correct wallet password!");
          }
        });
 
    },
    async swapExactTokensForTokens(){
    
      let abi = [{ "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" }, { "internalType": "address[]", "name": "path", "type": "address[]" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }], "name": "swapExactTokensForTokens", "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "stateMutability": "nonpayable", "type": "function" }];
      let privKey = new Buffer.from(this.privateKey, 'hex');   
      let con=new this.web3.eth.Contract(abi,this.con_addr);
      let swapValue=this.mntSwap;
      if(this.mntFromTo ==0){swapValue=this.usdtSwap;}
      let amountIn = this.web3.utils.toWei(new BigNumber(swapValue).toString(),'ether');
      let swapoutValue=this.usdtSwap;
      if(this.mntFromTo ==0){swapoutValue=this.mntSwap;}
      let amountOutMin=this.web3.utils.toWei(new BigNumber(swapoutValue * this.slippageTolerance).toString(),'ether');
      let path=[this.mnt_addr,this.usdt_addr]; //mnt swap usdt
      if(this.mntFromTo ==0){
        path=[this.usdt_addr,this.mnt_addr];//usdt swap mnt
      }      
      let to=this.client_addr;   
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
          this.$options.methods.getAddress.call(this,this.client_addr, this.mnt_addr, 1);
          this.$options.methods.getAddress.call(this,this.client_addr, this.usdt_addr, 2);
          this.$options.methods.getAddress.call(this,this.client_addr, this.lp_addr, 3);
          this.$options.methods.getAddress.call(this,this.lp_addr, this.mnt_addr, 4);
          this.$options.methods.getAddress.call(this,this.lp_addr, this.usdt_addr, 5);
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
    Transfer(toAddr,contractAddr="",amount, type) { //type ==1 bnb, type==2 mnt , type ==3 usdt

      this.web3.eth.getTransactionCount(this.client_addr, (err, txCount) => {
          let txObject={};
          if (type ===1){//bnb
            txObject = {
                nonce:    this.web3.utils.toHex(txCount),          
                gasLimit: this.web3.utils.toHex(80000),
                gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
                to: toAddr,  //If it is BNB, here is the address. If it is usdt or MNT, here is the smart contract address
                value: this.web3.utils.toHex(this.web3.utils.toWei(new BigNumber(amount).toString(),'ether')), //  if  bnb , this is transact bnb amount , if usdt or mnt , not need send, format  web3.utils.toWei('0.1','ether')
            }
          }else if (type ===2 || type ===3){
            let con = new this.web3.eth.Contract(this.erc20_abi,contractAddr);
            txObject = {
              nonce:    this.web3.utils.toHex(txCount),          
              gasLimit: this.web3.utils.toHex(80000),
              gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'Gwei')),
              to: contractAddr,  //If it is BNB, here is the address. If it is usdt or MNT, here is the smart contract address
              data: con.methods.transfer(toAddr, this.web3.utils.toWei(new BigNumber(amount).toString(),'ether')).encodeABI()    // if bnb ,not need send.
            }
          }
          //56
          const BSC_MAIN = Common.forCustomChain('mainnet', {name: 'bnb', networkId: 97, chainId: 97}, 'petersburg');
          const tx = new Tx(txObject,{common: BSC_MAIN});
          let privKey = new Buffer.from(this.privateKey, 'hex');
          tx.sign(privKey);
          const serializedTx = tx.serialize();
          const raw = '0x' + serializedTx.toString('hex');
          //console.log(raw);
          this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {
              console.log('err:', err, 'txHash:', txHash);
              if (err == null) {
                 
              }
          });
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
               relVal+="<br/><div style=\"text-align:left;\">"+params[i].marker+"  Time: "+params[i].data.dateTime+"</div><br/><div style=\"text-align:left;\">"+ params[i].marker+"  Price: "+params[i].data.value.toFixed(4)+"</div>";
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
          //alert("ret " +ret);
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
   
    init(){
      this.getPriceRate(); 
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
    }
    
  },
  mounted() {
   
     this.getFlatterInfo();  
     this.init();
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

<style>
 @import url("../../assets/css/main.css");
</style>