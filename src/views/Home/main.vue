    <template>
    <div>
    <div class="person_img" >
        <img id="person_img" :src="img_url"  @mouseover="person_info()" @mouseleave="cl_person_info()"/>
     </div>
    <div v-show="person_con" class="hidden_div" >
         <div>{{userid}}</div>
         <div>个人设置</div>
         <div>账户中心</div>
         <div>退出登录</div>
    </div>
    <el-select v-model="langFlag" @change="changeLanguages" 
                :default-first-option="true" :filterable="true"
                style="width: 130px;" placeholder="请选择语言">
        <el-option :key="item.value" v-for="item in language"
                :label="item.label" :value="item.value">
        </el-option>
    </el-select> 


    </div>
    </template>
  

<script>
    export default {
    name:'',
        data(){
            return{
                placeholder:'搜索课程',
                token:'',//判断是否登录的参数，在加载主页时直接判断
                person_con:false,
                userid:'',
                img_url:'https://btc.tokenview.com/icon/btc.png',
                langFlag: 'zh',
                langText:'中文/CN',
                language: 
                [
                    {
                        value: 'zh',
                        label: '中文/CN'
                    },
                    {
                        value: 'en',
                        label: '英文/EN'
                    }
                ],

            }
        },
         methods:{
         person_info(){
            this.person_con = true;
        },
        
         cl_person_info(){ 
            this.person_con = false;
        },
        changeLanguages() {
            console.log(this.$i18n.locale)//显示当前的语言
            this.$i18n.locale = this.langFlag;//将所选语言应用于页面
        },
        
        }
    }
    </script>