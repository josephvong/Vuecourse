import Vue from 'vue'

import router from './router.js'

import App from './App.vue'

import 'common/stylus/index.styl'


/* “eslint-disable no-new” 此注释为当使用“eslint”进行格式检测时，允许直接用 “new”来创建对象，而无需付给某个变量*/
/* eslint-disable no-new */
new Vue({
  router:router,
  render:h=>h(App,{}),
  mounted:()=>{
  	router.push({"path":"/sells"})
  }
  
}).$mount("#app")

// 使用路由时 App组件的注册方式
/*new Vue({
	//router:router, 
	render:h=>(App), 
}).$mount("#app");*/