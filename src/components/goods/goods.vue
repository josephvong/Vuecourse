<template>
  <div class="goods">
    <div class="menu-wrapper" ref="leftList">
    	<ul class="food-menu" >
			<li v-for="(item,index) in goods" class="menu-item" v-bind:class="{active:index==activeIndex}" v-bind:index="index" v-on:click="leftListClick($event)">
				<span>
					 <em v-show="item.type>0" v-bind:class="iconClass[item.type]"></em>{{item.name}}
				</span>
			</li>
    	</ul>
    </div>
    <div class="foods-wrapper"  ref="rightList" v-on:scroll>
    	<ul >
    		<li v-for="item in goods" class="food-list" ref="foodList">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
					<li v-for="food in item.foods" class="food-item border-1px" >
						<div class="icon" v-on:click="pointFood(food,$event)">
							<img v-bind:src="food.icon"/>
						</div>
						<div class="content">
							<h2 class="food-name">{{food.name}}</h2>
							<p class="food-desc">{{food.description}}</p>
							<div class="extra">
								<span>月售：{{food.sellCount}}</span>
								<span>好评率：{{food.rating}}</span>
							</div>
							<div class="price">
								<span>
									<em>￥</em>{{food.price}}
								</span>
								<span class="old-price" v-show="!!food.oldPrice">
									￥{{food.oldPrice}}
								</span>
							</div>
							<div class="control-wrapper">
								<cartcontrol v-bind:foodObj=food v-bind:eventHub="eventHub"></cartcontrol>
							</div>
						</div>
					</li>
    			</ul>
    		</li>
		</ul>
    </div>
    <shopcart v-bind:delivery-price=seller.deliveryPrice  v-bind:min-price=seller.minPrice v-bind:selected-foods="selectedFoods"
    ></shopcart>

	<food v-bind:food="chooseFood" ref="food"></food>


  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll"
import shopcart from "components/shopcart/shopcart.vue"
import cartcontrol from "components/cartcontrol/cartcontrol.vue"
import food from "components/food/food.vue"
import Vue from "vue"
let bus= new Vue();

export default {
  name: 'goods',
  props:{
  	seller:{
  		type:Object
  	}
  },
  data(){
  	return {
  		goods:[],
  		iconClass:["decrease","discount","guarantee","invoice","special"],
  		listHeight:[],
  		rightSclTop:0,
  		chooseFood:{}, // 选中的 food 数据对象
  		eventHub: new Vue(), // goods内的事件处理器
  	}
  },
  computed:{
	activeIndex(){
		for (let i=0 ; i<this.listHeight.length; i++){
			let height1= this.listHeight[i];
			let height2= this.listHeight[i+1];
			if (!height2 || (this.rightSclTop>=height1 && this.rightSclTop<height2)) {
				return i;
			}
		}
		return 0;
	},
	selectedFoods(){
		let selFoods=[];
		this.goods.forEach((good)=>{
			good.foods.forEach((food)=>{
				if(food.count){
					selFoods.push(food);
				}
			})
		})
		return selFoods
	}
  },
  methods: {
  	initScroll() {   // 滚动菜单初始化
  		this.leftScroll= new BScroll(this.$refs.leftList,{
  			click: true,
  			useTransition:true
  		});
  		this.rightScroll=new BScroll(this.$refs.rightList,{
  			probeType: 3,
  			click: true,
  			useTransition:true,
  			momentum: true
  		});

  		this.rightScroll.on("scroll",(pos)=>{
  			this.rightSclTop=Math.abs(Math.round(pos.y));
  		})
  	},
  	getListHeight(){	// 获取 右边 每个菜单专栏的高度
  		let foodList=this.$refs.foodList;
  		let itemH=0;
  		let foodHeight=[];
        for(let i=0; i<foodList.length;i++){
            foodHeight.push(itemH);
            itemH+=foodList[i].clientHeight
        }
        this.listHeight=foodHeight;
  	},
  	leftListClick:function(event){  // 左边点击事件
  		if(!event._constructed){
  			return;
  		}
  		let foodList = this.$refs.foodList;
  		let clickIndex=parseInt(event.currentTarget.getAttribute("index"));
  		let targetE=foodList[clickIndex];// 通过遍历 “getListHeight()”得出的哥哥栏目的高度数组
  		this.rightSclTop=this.listHeight[clickIndex];  // 让 右侧菜单自动滚动到对应的栏目
  		this.rightScroll.scrollToElement(targetE,300)
  	},
  	pointFood:function(food,event){  // 点击 右侧 菜单 事件函数
  		if(!event._constructed){
          return;
        }
      this.chooseFood=food
  		this.$refs.food.showFood()
  	}
  },
  mounted(){
  	this.$http.get("/api/goods").then((response)=>{
  		response= response.body
  		this.goods=response.data;
  		this.$nextTick(function(){
  			this.initScroll();		//  通过ajax 获取到数据内容，进行滚动菜单的初始化
  			this.getListHeight();  //初始化了滚动列表后 获取每个栏目的高度
  		})
  	})
  },
  components:{
  	shopcart:shopcart,
  	cartcontrol:cartcontrol,
  	food:food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.goods
	width: 100%
	display: flex
	position: absolute
	top: 174px
	bottom: 46px
	overflow: hidden
	.menu-wrapper
		flex: 0 0 80px
		width: 80px
		background:#F4F5F7
		.menu-item
			display: table
			padding: 0 12px
			width: 100%
			box-sizing: border-box
			height: 54px
			&.active
				background:white
			&>span
				display: table-cell
				vertical-align: middle
				font-size: 12px
				font-weight: 200
				line-height: 16px
				&>em
					display: inline-block
					width: 12px
					height: 12px
					font-weight: bold
					background: no-repeat
					background-size: 14px 14px
					background-position: 0 0
					vertical-align: top
					margin-right: 5px
					&.decrease
						bg-image("guarantee_2")
					&.guarantee
						bg-image("guarantee_2")
					&.discount
						bg-image("discount_2")
					&.invoice
						bg-image("invoice_2")
					&.special
						bg-image("special_2")
	.foods-wrapper
		flex: 1
		.food-list
			h1
				border-left: 3px solid #d9dde1
				height: 26px
				line-height: 26px
				font-size: 12px
				color: rgb(147,153,159)
				padding-left: 14px
				background: #f4f5f7
			.food-item
				display: flex
				padding: 18px
				border-1px(#e3e4e6)
				.icon
					flex 0 0 57px
					margin-right: 10px
					&>img
						width: 57px
						height: 57px
				.content
					flex: 1
					.food-name
						font-size: 14px
						color: rgb(7,17,27)
						line-height: 14px
						margin: 2px 0 8px 0
					.food-desc
						margin: 0px 0 8px 0
						font-size: 10px
						line-height: 14px
						color: rgb(147,153,159)
				.extra
					margin: 0px 0 8px 0
					font-size: 10px
					line-height: 10px
					color: rgb(147,153,159)
				.price
					font-size: 14px
					color: red
					font-weight: 700
					line-height: 24px
					vertical-align: top
					em
						font-style: normal
						font-size: 10px
					.old-price
						font-size: 10px
						color: gray
						vertical-align: top
						text-decoration: line-through
			.control-wrapper
				position:absolute
				height:20px
				width:60px
				bottom:18px
				right:18px
	.bottom-wrapper
		position:fixed
		height:48px
		width:100%
		top:0px
		left:0
		z-index:50




</style>