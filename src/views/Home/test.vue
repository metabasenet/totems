
 
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
      // const plus1=a=>a+1;
      // const mult2=a=>a * 2;
      // console.log(mult2(plus1(5)));
      // function factorial(n){
      //   if (n ===1) return 1;
      //   return n * factorial(n-1);
      // }
      // console.log(factorial(5));
      // let foo='outer';
      // function bar(func=()=>foo){
      //   let foo='inner';
      //   console.log(func());
      // }
      // bar();
      // function foo(...values){
      //   for(let value of values){
      //     console.log(value);
      //   }
      // }
      // foo(1,2,3);
      // let foo=(a, ...b)=>[a,b];
      // let foo1=foo(1,2,3,4,5);
      // console.log(foo1);
      // let index =1;
      // let timer=setInterval(() => {
      //  index++;
      //  console.log(new Date()+ "  "+ index) ;
      // }, 1);
      // timer();
      // function foo(){
      //   setInterval(()=>{
      //     console.log("args:",arguments);
      //   },1000)
      // }
      // foo(1,2,3);
      // let insert=(value)=>({into:(array)=>({after:(afterValue=>{
      //   array.splice(array.indexOf(afterValue) +1,0,value);
      //   return array;
      // })})});
      // let foo =insert(2).into([1,3]).after(1);
      // console.log(foo);
      // console.log(1, ...[2, 3, 4], 5)

    //  console.log(Math.max(...[1,2,9,4,7,8])) let foo=(...args)=>args.map()
    //console.log(Math.max(...[1,2,9,4,7,8]))
      // let array1=[1,2,3];
      // let array2=[4,5,6];
      // let array3=[...array1, ...array2];
      // console.log(array3);
      // // array1.push(...array2);
      // // console.log(array1);
      // console.log(new Date(...[2015,1,1]));
      // const [first, ...second]=[1,2,3,4,5];
      // console.log(first);
      // console.log(second);
      //67570.711422
      //20686485.124011
      //100805.862044
      //console.log(100836.888886 -100805.862044);
      //10
      //96.462458
      //31.02684200000658
      //let array1=[10, 96.462458,1008];
      let str="hello world";
      console.log(str.split('').reverse().join(''));


    }

 
  },
  mounted:{
 
 },
};
</script>
 
