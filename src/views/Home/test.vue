
 
<template>
    <div  >
        <button @click="password()">password</button>
    </div>
</template>
 
<script>
    export default{
        data(){
            return{}
        },
        props: ['showDialog','content','okText','cancelText','hideConfirm','hideCancle'],
        methods: {
            password(){
   console.log("ssssssssssss");
              let crypto = require('crypto');
              console.log("crypto",crypto);
              // example 96-bit nonce
              let nonce = Buffer.alloc(12, 0xff);
         console.log("nonce",nonce);
              // example 256-bit key
              let key = Buffer.alloc(32, 0x01);
         console.log("key",key);
              // some data to encrypt
              let data = Buffer.alloc(64, 0xbb);
         console.log("data",data);
              // construct the cipher
              let cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 });

         console.log("cipher",cipher);
              // encrypt the data which will return an encrypted Buffer
              // that is of equal length to the overall input to the
              // stream cipher
              let ret = cipher.update(data);
                       console.log("ret",ret);
              console.log(ret.toString('hex'));
              // 25805b670d5834ecb8a018ea87b6ff864117762481880fc723690d0e2d0cfd08a43c144291eb2df148b0d6981b66ca101344ea27c7a0860c2e5f1a7eed1e70eb

              // finalize cipher which allows us to calculate the MAC
              cipher.final();

              // obtain the 128-bit poly1305 MAC that includes our associated data
              cipher.getAuthTag()
              // 9ef622cec7a5719261031e9ca91049d4


            },
            password2(){
              const mycrypto = require('crypto')
              var aes = require('browserify-aes')
      

              const iv = mycrypto.randomBytes(16);
              const key = mycrypto.pbkdf2Sync(sessionKey, salt, 1000, 32, 'sha512');
              const cipher = aes.createCipherIv('aes-256-gcm', key, iv);
                     console.log("cipher",cipher);
            }
        }
    }
</script>
 
<style lang="" rel="stylesheet/scss">
 

    
</style>