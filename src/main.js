import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@babel/polyfill"
import i18n from './lang/index'



//兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
        var binary = "";
        var pt = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            //pt.result  - readonly so assign binary
            pt.content = binary;
            pt.onload()
        }
        reader.readAsArrayBuffer(fileData);
    }
}

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {
    Validator
} from 'vee-validate';

Vue.use(router)

Vue.use(ElementUI)
//验证
Validator.addLocale(zh_CN);
/*
Vue.use(VeeValidate, {
    locale: 'zh_CN',
});*/
const configValidator = {
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};
Vue.use(VeeValidate, configValidator);


Vue.config.productionTip = false


//定义api全局变量
import api from './request/api';
Vue.prototype.$api = api;

// //定义staffapi全局变量
// import staffapi from './request/staffapi';
// Vue.prototype.$staffapi = staffapi;
import Web3 from 'web3'
Vue.prototype.Web3 = Web3
import adaptive from './lang/Adaptive.js';
Vue.use(adaptive);
new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')