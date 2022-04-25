<template>


<el-container>
  <el-header>
        <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
        </el-row>
  </el-header>
  <el-main>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
        <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
 </el-main>
  <el-footer>
    <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </el-footer>
</el-container>

      

</template>
<script lang="ts">
 

export default {
  data() {
    return {
    }
  }
}
    /*
    mnt --> usdt
Function: swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)
MethodID: 0x38ed1739
[0]:  0000000000000000000000000000000000000000000000000de0b6b3a7640000 // 1000000000000000000
[1]:  0000000000000000000000000000000000000000000000008648ac87abdefb7a // 9676173498109590000
[2]:  00000000000000000000000000000000000000000000000000000000000000a0 // 160
[3]:  000000000000000000000000a47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9 // addr_from
[4]:  0000000000000000000000000000000000000000000000000000000062653347 // 1650799431 时间戳 2022-04-24 19:23:51
[5]:  0000000000000000000000000000000000000000000000000000000000000002 // 2
[6]:  000000000000000000000000450af0a7c8372eee72dd2e4833d9aac4928c151f //usdt 地址
[7]:  000000000000000000000000b7f04aefa2612a8321618af162fe8d90aa087e45 //mnt 地址


    usdt --> mnt
Function: swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)

MethodID: 0x38ed1739
[0]:  0000000000000000000000000000000000000000000000008ac7230489e80000
[1]:  0000000000000000000000000000000000000000000000000e17a03aa5637a4f
[2]:  00000000000000000000000000000000000000000000000000000000000000a0
[3]:  000000000000000000000000a47ebd3d8c32bcdea12f15c13bd2b70fb7975aa9
[4]:  00000000000000000000000000000000000000000000000000000000626614c9
[5]:  0000000000000000000000000000000000000000000000000000000000000002
[6]:  000000000000000000000000b7f04aefa2612a8321618af162fe8d90aa087e45
[7]:  000000000000000000000000450af0a7c8372eee72dd2e4833d9aac4928c151f


*/

</script>
<style>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    
  }
  

  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-row {
    margin-bottom: 20px;}

    .el-row:last-child {
      margin-bottom: 0;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>