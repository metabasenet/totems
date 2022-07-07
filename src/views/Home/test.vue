
 
<template>
  <div> 

 <input type="button" name="button" id="button" @click="testaaa()"  value="test">
  </div>
</template>
 

 

<script>
  const bip39 = require('bip39')
  const {hdkey} =  require('ethereumjs-wallet')
  const util = require('ethereumjs-util')
export default {
  
  data() {
    return {
   
        tagName2:''

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
    clearNoNum(obj) {
            obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
            obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            obj.value=obj.value.replace(/-/g,"");
            obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
            if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                obj.value = parseFloat(obj.value);
          
        }
      },
    point(x,y){
      // let x=x;
      // let y=y;
    },
    m1({x,y}={x:0,y:0}){
      return [x,y];
    },
    foo(x,y=function(){x=2;}){
      x=3;
      y();
      console.log(x);
    },
  
 
    testaaa(){

   

      //1 生成助记词 ；1.1 和 1.2 自己按需。

      // 1.1 生成助记词 ;这里用生成的.
      // let mnemonic = bip39.generateMnemonic() 

      // 1.2 生成助记词 ;这里用写死的.
     // let mnemonic = "hold scale hybrid tank dilemma bullet ship language attitude rug tennis host"
      let mnemonic="retire turtle lazy eager churn alcohol cup cannon frequent romance wink better";
      
      console.log(mnemonic)
      this.obtainAccount(mnemonic);
    },
     //2.将助记词转成seed
      async getSeed(mnemonic){
          let seed = await bip39.mnemonicToSeed(mnemonic)
          console.log("seed:" + util.bufferToHex(seed))
          return seed
      },
      //3.提取私钥，公钥，账户
      async obtainAccount(mnemonic){
        console.log('a')
          let seed = await this.getSeed(mnemonic)
          //3.通过hdkey将seed生成HD Wallet
          let hdWallet = await hdkey.fromMasterSeed(seed)

          for (let i = 0; i < 100; i++) {
              //4.生成钱包中在m/44'/60'/0'/0/i路径的keypair
              let key = await hdWallet.derivePath("m/44'/60'/0'/0/" + i)
              //5.从keypair中获取私钥
              console.log("私钥：" + util.bufferToHex(key._hdkey._privateKey))
              //6.从keypair中获取公钥
              console.log("公钥：" + util.bufferToHex(key._hdkey._publicKey))
              //7.使用keypair中的公钥生成地址
              let address = await util.pubToAddress(key._hdkey._publicKey, true)
              //编码地址
              console.log('account',i+1,'0x'+address.toString('hex'))

      //分割线        console.log("__________________________________________________________")
          }
      }
 
     
     
 
  },
  mounted:{
 
 },
}
 
</script>
 
