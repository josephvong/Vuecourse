<template>
  <div class="shopcart">
      <div class="content">
      	<div class="content-left">
      		<div class="logo-wrapper" v-on:click="listToggle">
      			<div id="LOGO" class="logo" v-bind:class="{active:totalCount>0}">
      				<i class="icon-cart"></is>
      			</div>
      			<span class="count" v-show="totalCount">
      				{{totalCount}}
      			</span>
      		</div>
      		<div class="price" v-bind:class="{highLight:totalPrice>=10}">
      			￥{{totalPrice}}
      		</div>
      		<div class="desc">
      			需配送费{{deliveryPrice}}元
      		</div>
      	</div>
      	<div class="content-right" v-bind:class="payClass">
      		<div class="pay">
      			{{payDesc}}
      		</div>
      	</div>
      </div>
      <transition name="coverFade">
      	<div class="list-cover"  v-show="listShow" v-on:click="listToggle"></div>
       </transition>
      <transition name="listFade"> 
	    <div class="shopcart-list" v-show="listShow">
      		<div class="list-header">
      			<span class="title">购物车</span>
      			<span class="empty" v-on:click="empty">清空</span>
      		</div>
      		<div class="list-content" ref="cartList">
				<ul>
					<li v-for="food in selectedFoods" class="food">
						<div class="food-info">
							<div class="name">
								{{food.name}}
							</div>
							<div class="price">￥{{food.price*food.count}}</div>
						</div>
						<div class="control-wrapper">
							<cartcontrol v-bind:foodObj=food></cartcontrol>
						</div>
					</li>
				</ul>
      		</div>
	    </div>
       </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from "components/cartcontrol/cartcontrol.vue"
import BScroll from "better-scroll"
export default {
  name: 'shopcart',
  props:{
  	selectedFoods:{
  		type:Array,
  		default:function(){
  			return [
  				{price:10,count:1}
  			]
  		}
  	},
  	deliveryPrice:{
  		type:Number,
  		default:0
  	},
  	minPrice:{
  		type:Number,
  		default:0
  	},
  },
  data(){
  	return { 
  		fold:false  // cartList 列表折叠
  	}
  },
  computed:{
  	totalPrice(){
		let tPrice=0;
		for(let i=0;i<this.selectedFoods.length;i++){
			tPrice+=this.selectedFoods[i].price*this.selectedFoods[i].count
		}
		return tPrice
	},
	totalCount(){
		let tCount=0;
		for(let i=0;i<this.selectedFoods.length; i++){
			tCount+=this.selectedFoods[i].count
		}
		return tCount
	},
	payDesc(){
		if(this.totalPrice===0){
			return `￥${this.minPrice}元`;
		}else if(this.totalPrice<this.minPrice){
			let diff=this.minPrice-this.totalPrice;
			return `还差￥${diff}元起送`
		}else{
			return "去结算";
		}
	},
	payClass(){
		if(this.totalPrice<this.minPrice){
			let diff=this.minPrice-this.totalPrice;
			return "not-enougth"
		}else{
			return "enougth"
		}
	},
	listShow(){
		let isShow
		if(this.totalCount>0){
			isShow=this.fold
			
		}else{
			this.fold=false 
			isShow=false
		}
		if(isShow){
			this.$nextTick(()=>{
				if(!this.cartList){ 
					this.cartList=new BScroll(this.$refs.cartList,{
						click:true
					})
				}else{ 
					this.cartList.refresh()
				} 
			})
		}
		return isShow
	} 
  },
  methods:{
  	listToggle(){
  		if(this.totalCount>0){  
  			this.fold=!this.fold
  			console.log(this.selectedFoods)
  		}
  	},
  	empty(){ 
  		this.selectedFoods.forEach(function(item){
  			item.count=0
  		})
  	} 
  },
  components:{
  	cartcontrol:cartcontrol
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.shopcart
		position:fixed
		height:48px
		width:100%
		bottom:0px
		left:0
		z-index:20
		.content
			display:flex
			background:#141d27
			font-size:0
			height:100%
			color:rgba(255,255,255,0.4)
			
			.content-left
				flex:1
				background:#141d27
				z-index:21 
				.logo-wrapper
					display:inline-block
					position:relative;
					top:-10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					border-radius:50%
					background:#141d27
					z-index:21
					.logo
						width:100%
						height:100%
						border-radius:50%
						background:#2b343c
						text-align:center
						&.active
							background:rgba(0,160,220,1)
						&.active>.icon-cart
							color:white
						.icon-cart
							font-size:24px
							line-height:44px
							font-size:24px;
							color:#80858a
					.count
						position:absolute
						display:inline-block
						top:0
						right:0px
						height:16px
						padding:0 6px
						border-radius:8px
						font-size:9px
						line-height:16px
						font-weight:700
						background-color:rgba(240,20,20,1)
						color:rgba(255,255,255,1)
						box-shdow:0 4px 8px 0px rgba(0,0,0,0.4)
						z-index:21
				.price
					display:inline-block
					vertical-align:top
					margin-top:12px
					line-height:24px
					padding-right:6px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,0.1)
					font-size:16px
					font-weight:700
					color:rgba(255,255,255,0.4)
					z-index:21
					&.highLight
						color:rgba(255,255,255,1)

				.desc
					display:inline-block
					vertical-align:top
					line-height:24px
					margin:12px 0 0 5px
					font-size:10px
			.content-right
				flex:0 0 100px
				width:100px
				z-index:21
				.pay
					height:48px
					line-height:48px
					font-size:12px
					font-weight:500
					text-align:center
				&.not-enougth
					background-color:#2b333b
				&.enougth
					background-color:#00b43c
					color:#fff
		.list-cover
			position:fixed
			top:0
			bottom:48px
			width:100%
			background:rgba(0,0,0,0.4)
			z-index:2
			opacity:1
			&.coverFade-enter-active,&.coverFade-leave-active
				transition: all .5s
			&.coverFade-enter,&.coverFade-leave-active
				opacity:0
		.shopcart-list
			position:absolute
			bottom:48px
			overflow:hidden
			width:100%
			z-index:5
			transform:translateY(0px)
			&.listFade-enter-active,&.listFade-leave-active
				transition: all .5s
			&.listFade-enter,&.listFade-leave-active
				transform:translateY(100%)
			.list-header
				height:40px
				box-sizing:border-box
				padding:0 18px
				background:#f3f5f7
				&>span
					line-height:40px
					font-size:14px
					color:rgb(7,17,27)
				.title
					float:left
				.empty
					float:right
					color: rgb(0,160,220)
			.list-content
				background:white
				padding:0 18px
				max-height:260px
				overflow:hidden
				.food
					width:100%
					height:48px
					display:flex
					display:-webkit-flex
					border-bottom:1px solid rgba(1,17,27,0.1)
					.food-info
						display:block
						position:relative
						height:100%
						flex:1 1 auto
						-webkit-flex:1 1 auto
						font-size:14px 
						.name
							position:absolute
							left:0
							top:0
							display:block
							line-height:48px
							width:70%
							height:100%
							overflow: hidden
							text-overflow:ellipsis
							white-space: nowrap
						.price
							position:absolute
							right:0
							top:0
							display:block
							width:30%
							height:100%
							line-height:48px
							text-align:center
					.control-wrapper
						flex:0 1 60px
						-webkit-flex:0 1 60px
						height:100%
						padding-top:12px
						box-sizing:border-box
	

</style>