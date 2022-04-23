<template>
  <div class="p-home">
    <div class="page-network">
      <div>
        <el-tabs
          v-model="usable"
          :tab-position="tabPosition"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="(tab, index) in tabs"
            :key="index"
            :name="tab.name"
            :label="tab.label"
          >
            <div v-show="usable === '1'">
              <div>From: MNT</div>
              <el-input
                v-model="mntSwap"
                type="number"
                placeholder="please input MNT value"
              ></el-input>
              <div>To: USDT</div>
              <el-input
                v-model="usdtSwap"
                type="number"
                placeholder="please input MNT value"
              ></el-input>
              <br />
              <el-button type="primary" @click="postFlutterInfo()"
                >postFlutterInfo</el-button
              >
              <el-button type="primary" @click="refresh()">refresh</el-button>
              <el-button type="primary" @click="getPrice()">getPrice</el-button>
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
      </div>
    </div>
    <el-row :gutter="20" class="footer_wrap">
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
            Total MNT: <span>{{ mntTotal }}</span>
          </p>
          <p>
            Total USDT: <span>{{ usdtTotal }}</span>
          </p>
          <p>
            <span>333{{ priceRate }}</span
            >&nbsp;<span>{{ skill }}</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
      mntSwap: "",
      usdtSwap: "",
      usdt_addr: "0xb7f04aefa2612a8321618af162fe8d90aa087e45",
      mnt_addr: "0x450af0a7c8372eee72dd2e4833d9aac4928c151f",
      lp_addr: "0x82260d3f8c98e90a4ec0dcf709e2ad8f592ea941",
      client_addr: "0xa47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9",
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
      mnt: "",
      usdt: "",
      lp: "",
      mntTotal: "",
      usdtTotal: "",
      skill: "",
      priceRate: "yyyy",
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    getAddress(client_addr, contractAddress, type) {
      let BigNumber = require("bignumber.js");
      let Ether = new BigNumber(10e17);
      let web3 = new this.Web3(this.url);
      let web3Contract = new web3.eth.Contract(this.abi, contractAddress);
      web3Contract.methods
        .balanceOf(client_addr)
        .call()
        .then((v) => {
          console.log(v);
          let ret = new BigNumber(v);
          let value = parseFloat(ret.dividedBy(Ether)).toFixed(5);
          switch (type) {
            case 1:
              this.mnt = value;
              console.log(this.mnt);
              break;
            case 2:
              this.usdt = value;
              break;
            case 3:
              this.lp = value;
              break;
            case 4:
              this.mntTotal = value;
              break;
            case 5:
              this.usdtTotal = value;

              break;
          }
        })
        .then((sum) => {
          console.log(sum);
        });
      console.log("sss");
    },
    async getPrice() {
      this.priceRate = "22222";
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
      let abc = await web3Contract.methods.getReserves().call(/*function (error, result) {
        
        if (error) {
          console.log(error);
        } else {
          console.log("7777", result);

          let ret = parseInt(result._reserve1) / parseInt(result._reserve0);

          // this.priceRate=ret.toString();
          this.priceRate = "1111111";
          console.log("999999", this.priceRate);
        }
      }*/);
      this.priceRate =  abc._reserve1;
      console.log(abc);
    },
    getFlatterInfo() {
      window.addEventListener(
        "flutterInAppWebViewPlatformReady",
        function (event) {
          window.flutter_inappwebview
            .callHandler("haha")
            .then(function (result) {
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
  },
  mounted() {
    this.getPrice();
    this.getFlatterInfo();
    this.getAddress(this.client_addr, this.mnt_addr, 1);
    this.getAddress(this.client_addr, this.usdt_addr, 2);
    this.getAddress(this.client_addr, this.lp_addr, 3);
    this.getAddress(this.lp_addr, this.mnt_addr, 4);
    this.getAddress(this.lp_addr, this.usdt_addr, 5);
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
  padding-left: 10px;
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
</style>