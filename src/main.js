import Vue from 'vue'

import VueRouter from "vue-router"

import App from './App'


Vue.use(VueRouter);




/* “eslint-disable no-new” 此注释为当使用“eslint”进行格式检测时，允许直接用 “new”来创建对象，而无需付给某个变量*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
