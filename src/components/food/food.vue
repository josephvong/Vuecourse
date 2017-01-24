<template>
	<transition name="foodFade">
		<div v-show="showFlag" class="point-food" ref="pointFood">
			<div class="content-wrap" >
		    <div class="image-header">
		     	<img v-bind:src="food.image"/>
		     	<div class="back" v-on:click="closeFood">
		     		<span class="icon-arrow-left"> </span>
		     	</div>
		    </div>
		    <div class="group content">
		     	<h1 class="title">{{food.name}}</h1>
		     	<p>月售{{food.sellCount}}份 &nbsp; &nbsp;好评率{{food.rating}}%</p>
		     	<div class="holder">
		     		<div class="price">
		     			<strong>￥{{food.price}}</strong>
		     			<span class="old-price" v-show="food.oldPrice!=''">￥{{food.oldPrice}}</span>
		     		</div>
		     		<transition name="addCartFade">
			     		<div class="addCart-wrapper" v-show="!food.count" v-on:click="addFood">
			     			加入购物车
			     		</div>
		     		</transition>
		     		<div class="control-wrapper" v-show="food.count">
						<cartcontrol v-bind:foodObj="food"  ref="cartControl"></cartcontrol>
					</div>
		     	</div>
		    </div>
		    <div class="group" v-show="food.info!=''">
		     	<h1 class="title">商品介绍</h1>
		     	<p>{{food.info}}</p>
		    </div>
		    <div class="group food-rating">
		     	<h1 class="title">商品评价</h1>
					<ratingselect v-bind:desc="ratingDesc" v-bind:ratings="food.ratings"></ratingselect>
					<ratinglist v-bind:ratings="food.ratings"></ratinglist>
		    </div>
	    </div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
import cartcontrol from "components/cartcontrol/cartcontrol.vue"
import ratingselect from "components/ratingselect/ratingselect.vue"
import ratinglist from "components/ratinglist/ratinglist.vue"
import BScroll from "better-scroll"
import Vue from "vue"
export default {
  name: 'food',
  props:{
  	food:{
  		type:Object
  	}
  },
  data(){
  	return {
  		showFlag:false, // 控制是否显示
  		isAdd:false,
  		ratingDesc:{
  			'all':'全部',
  			'positive':'推荐',
        'negative':'吐槽'
  		},
  		eventHub:new Vue()
  	}
  },
  methods:{
  	showFood(){
  		this.showFlag=true;
  		this.$nextTick(()=>{
  			if(!this.pointScroll){
					this.pointScroll=new BScroll(this.$refs.pointFood,{
						click:true
					})
  			}else{
  				this.pointScroll.refresh()
  			}
  		})
  	},
  	closeFood(){
  		this.showFlag=false;
  	},
  	addFood(event){
  		this.$refs.cartControl.addHandle(event)
  	}
  },
  components:{
  	cartcontrol:cartcontrol,
  	ratingselect:ratingselect,
  	ratinglist:ratinglist
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.point-food
		position: fixed
		left:0
		top:0
		bottom:48px
		width:100%
		background:white
		z-index:10
		transform:translateX(0%)
		overflow:hidden
		&.foodFade-enter-active,&.foodFade-leave-active
			transition:all 0.5s
		&.foodFade-enter,&.foodFade-leave-active
			transform:translateX(100%)
		.image-header
			position:relative
			width:100%
			height:0
			padding-top: 70%
			&>img
				position:absolute
				top:0
				lef:0
				height:100%
				width:100%
			.back
				position:absolute
				top:10px
				left:0
				.icon-arrow-left
					display:block
					padding:10px
					font-size:20px
					color:white
		.group
			padding:18px
			border-top:1px solid rgba(7,17,27,0.1)
			border-bottom:1px solid rgba(7,17,27,0.1)
			margin-bottom:16px
			h1
				font-size:14px
				font-weight:700
				color:rgb(7,17,27)
				line-height:22px
			p
				font-size:12px
				line-height:24px
				color:rgb(77,85,93)
		.content
			border-top:0px
			p
				font-size:10px
				line-height:16px
				color:rgb(7,17,27)
			.holder
				position:relative
				padding:0 9px
				height:24px
				.price
					display:inline-block
					height:24px
					line-height:24px
					strong
						font-size:14px
						color:red
						font-weight:700
					.old-price
						margin:0 5px
						line-height:24px
						font-style:normal
						font-size:10px
						color:gray
						text-decoration: line-through
				.addCart-wrapper
					position:absolute
					display:inline-block
					right:0
					top:0
					height:24px
					line-height:24px
					font-size:12px
					color:white
					padding:0 10px
					border-radius:12px
					opacity:1
					background: rgb(0,160,220)
				&>.addCartFade-enter-active , &>.addCartFade-leave-active
					transition:all 0.7s
				&>.addCartFade-enter , &>.addCartFade-leave-active
					opacity:0
				.control-wrapper
					position:absolute
					display:block
					right:0
					top:0
					height:20px
					width:60px





















</style>