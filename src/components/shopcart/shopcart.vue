<template>
  <div class="shopcart">
      <div class="content">
      	<div class="content-left">
      		<div class="logo-wrapper">
      			<div class="logo">
      				<i class="icon-cart"></is>
      			</div>
      		</div>
      		<div class="price">
      			￥99
      		</div>
      		<div class="desc">
      			
      		</div>
      	</div>
      	<div class="content-right">
      		
      	</div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'shopcart'
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.shopcart
		position:fixed
		height:48px 
		width:100%
		bottom:0
		z-index:50
		.content
			display:flex
			background:#141d27
			font-size:0
			height:100%
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
						.icon-cart
							font-size:24px
							line-height:44px
							font-size:24px;
							color:#80858a
				.price
					display:inline-block
					vertical-align:top
					margin-top:12px
					line-height:24px
					padding-right:12px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,0.1)
					font-size:16px
					foont-weight:700
				.desc
					display:inline-block	
			.content-right
				flex:0 0 105px
				width:105px
				
</style>