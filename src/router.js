import Vue from "vue"
import VueRouter from "vue-router"


import seller from "./components/seller/seller.vue"
import ratings from "./components/ratings/ratings.vue"
import goods from "./components/goods/goods.vue"

Vue.use(VueRouter)


let router = new VueRouter({
	mode: 'history',  // 启用路由的 “history”模式
	base:__dirname,//应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
	linkActiveClass:"active",
	routes:[
		{path:'/seller',component:seller},
		{path:'/goods',component:goods},
		{path:'/ratings',component:ratings},
	]
})

export default router
















