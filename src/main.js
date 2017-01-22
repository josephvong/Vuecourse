import Vue from 'vue'
import VueResource from 'vue-resource'


import store from './Vuex.js'    // 传入全局状态仓库
import router from './router.js'  // 传入路由组件
import App from './App.vue'

import 'common/stylus/index.styl'

Vue.use(VueResource)


/* “eslint-disable no-new” 此注释为当使用“eslint”进行格式检测时，允许直接用 “new”来创建对象，而无需付给某个变量*/
/* eslint-disable no-new */
new Vue({
  router:router, // 注册路由
  store:store,   // 注册状态库
  render:h=>h(App,{}),
  mounted: ()=>{
  	router.push({"path":"/seller"})
  },

}).$mount("#app")

// 使用路由时 App组件的注册方式
/*new Vue({
	//router:router,
	render:h=>(App),
}).$mount("#app");*/