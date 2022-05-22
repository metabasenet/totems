
 
<template>
  <div> 
    <el-input
            style="width: 217px"
            v-model="tagName"
            type="text"
            size="mini"
            placeholder="请输入名称"
      ></el-input>
   <input type="number" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
<input name=txt1 onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}">
<el-input   oninput ="value=value.replace(/[^0-9.]/g,'')"></el-input>
<input type="number" class="input"  oninput="value=value.replace('-', '')" />

  </div>
</template>
 

 

<script>
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
        }
 
  },
  mounted:{
 
 },
};
</script>
 
