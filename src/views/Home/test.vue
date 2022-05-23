
 
<template>
  <div> 

 <input type="button" name="button" id="button" @click="testaaa()"  value="test">
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

      // let zhangSan=(id, chinesename)=>({id:1, chinesename:'zhangsan'});
      // console.log(zhangSan());
      // console.log([1,2,3].map(x =>  x*x))
      // let index =0;
      // let timer=setInterval(()=>{
      //     index++;
      //     console.log(index);
      // },1000)

    }
 
  },
  mounted:{
 
 },
};
</script>
 
