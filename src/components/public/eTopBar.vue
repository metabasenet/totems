<template>
</template>


<script>
    export default {
        name: "eTopBar",
        data() {
            return {
                options: [{
                    value: 1,
                    label: 'address',
                }, {
                    value: '2',
                    label: 'block'
                }, {
                    value: '3',
                    label: 'tx'
                }],
                value: 1,
                search_text:'',
                openFlag: false,
                openLanguage: false,
                openLanguageDiv:false,
                langFlag: 'zh-CN',
                langText:'中文',
                language: 
                [
                    {
                        value: 'zh-CN',
                        label: '中文'
                    },
                    {
                        value: 'en-US',
                        label: 'English'
                    }
                ],
              
            }
        },

        methods: {
            search(){
                if(this.value == 1){
                    this.$router.push({ path: "address", query: { address: this.search_text } });
                }else if(this.value == 2){
                    this.$router.push({ path: "block", query: { hash: this.search_text } });
                }else{
                    this.$router.push({ path: "tx", query: { txid: this.search_text } });
                }
            },
            toggleMenu(){
                this.openFlag =!this.openFlag
   
            },
            chooseLanguage(value){
                this.openLanguage =false
                this.$i18n.locale=value
            },
            showLanguage(){
                this.openLanguage=true
                
            },          
            hideLanguage(){    
                this.openLanguage=false
            },
            changeLanguages() {
                localStorage.setItem('virtualCurrencyLocale', this.langFlag)
                this.$i18n.locale = localStorage.getItem('virtualCurrencyLocale')

                //console.log(this.$i18n.locale)//显示当前的语言
                //this.$i18n.locale = this.langFlag;//将所选语言应用于页面
            },
            getDefaultLanguage(){
                var virtualCurrencyLocale=localStorage.getItem('virtualCurrencyLocale')
                if (virtualCurrencyLocale =='en-US'){
                    this.langFlag='en-US'
                    this.langText='English'    
                }
            }

        },

        created() {this.getDefaultLanguage()}
    }
</script>
