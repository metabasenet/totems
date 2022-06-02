
 
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

      // let str="hello world";
      // console.log(str.split('').reverse().join(''));
      // let arrayLike = {
      //   '0': 'a',
      //   '1': 'b',
      //   '2': 'c',
      //   length: 3
      // };
      // console.log(Array.from(arrayLike));
      // let set=new Set([1,2,6,9].map(x=>x*x));
      // console.log(set.has(4));
      // set.delete(7);
      // set.delete(6);
      // for(let index of set){
      //   console.log(index);
      // }
      // let foo =Array.from( [1,2,3],(x)=>x*x);
      // console.log(foo);

      // function foo(){
      //   return Array.from(arguments, value=> typeof value);
      // }
      // console.log(foo(null, [1,2],NaN,1,'123'));
      // console.log(Array.from({length:3},()=>'jack'));
      // function countSymbols(string){
      //   return Array.from(string).length;
      // }
      // console.log(countSymbols('asdxcv'));
      //console.log([1,2,3,-3,-4,5].find((n)=>n <0));
      // for(let key of ['a','b','c'].keys()){
      //   console.log(key);
      // }
      // for(let key of ['a','b','c'].values()){
      //   console.log(key);
      // }
      // for(let [index ,value] of ['a','b','c'].entries()){
      //   console.log(index , value);
      // }
      // function foo(x,y){
      //   return {x,y};
      // }
      // console.log(foo(1,2));
      // let birthday='2022-12-12';
      // let person={
      //   name:'zhangsan',
      //   age:12,
      //   birthday:birthday,
      //   hello(){return "hello " + this.name;}
      // }
      // console.log(person.name);
      // console.log(person.hello());
     
    //  let propkey='name';
    //  let object1 = {
    //    [propkey]:'zhangsan',
    //     ['a'+'ge']:24,
    //  };
    //  console.log(object1);
    //  console.log(object1[propkey]);
    // let object1={a:1,b:1};
    // let object2={b:2,c:2};
    // let object3={c:3};
    // let object=Object.assign(object1,object2, object3);
    // console.log(object);
    // var v1 = 'abc';
    // var v2 = true;
    // var v3 = 10;
    // let object =Object.assign({},v1,v2,v3);
    // console.log(object);
    // let isTeacher =false;
    // let promise =new Promise((resolve,reject)=>{
        
    //     setTimeout(()=>{
    //       console.log('100')
    //     },1000);
    //     let Teacher={
    //       name:'zhangsan',
    //       age:24,
    //     }
    //     if (isTeacher){
    //       resolve(Teacher);
    //     }else{reject('is not a teacher');}

    //   });

    
    // promise.then((result)=>{
    //   console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // });
    // let map =new Map();
    // map.set(0,'a');
    // map.set(1,'b');
    // map.set(2,'c');
    // for(let [key,val] of map){
    //   console.log(key , val);
    // }
    // for(let key of map.keys()){
    //   console.log(key);

    // }
    // for(let val of map.values()){
    //   console.log(val);
    // }
    class Person{
      constructor(name , age){
        this.name =name;
        this.age=age;
      }
      toString(){
        console.log(`name is ${this.name}, age is ${this.age}`);
      }
    }
    class Teacher extends Person{
      constructor(name,age,subject){

        super(name,age);
         this.subject=subject;
      }
      toString(){
        console.log(`name is ${this.name}, age is ${this.age} , subject is ${this.subject}`)
      }
      
    }
    Teacher.prototype.say=function(word){
            console.log(`teacher ${this.name} say ${word}`)
    }
    let teacher =new Teacher('zhangsan',24,'shuxue');
    teacher.say('xiakele');
 
  },
  mounted:{
 
 },
}
}
</script>
 
