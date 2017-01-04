<template>
  <div class="shopcart">
       <div class="content">
      	<div class="content-left">
      		<div class="logo-wrapper">
      			<div class="logo" v-bind:class="{active:totalCount>0}">
      				<i class="icon-cart"></is>
      			</div>
      			<span class="count" v-show="totalCount">
      				{{totalCount}}
      			</span>
      		</div>
      		<div class="price" v-bind:class="{highLight:totalPrice>10}">
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
  </div>
</template>
<script type="text/ecmascript-6">
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
		} 
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
		z-index:50
		.content
			display:flex
			background:#141d27
			font-size:0
			height:100%
			color:rgba(255,255,255,0.4)
			.content-left
				flex:1
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
					
</style>