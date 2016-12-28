<template>
  <div class="cartcontrol">
    <div class="cart-decrease"><i class="icon-minus"></i></div>
    <div class="cart-count">a</div>
    <div class="cart-increase"><i class="icon-plus"></i></div>	
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'cartcontrol',
  props:{
  	food:{
  		type:Object
  	}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
      font-size:0
      &>div
          display:inline-block
          width:20px
          height:20px
          line-height:20px
          box-sizing:border-box
          border:1px solid rgb(0,160,220)
          text-align:center
          font-size:8px
          border-radius:50%
          &>i
              transform:scale(0.5)         
      .cart-decrease
          color:rgb(0,160,220)
           
               
        
			
</style>
<!--.cart-decrease
            display:inline-block
            box-sizing:border-box
            width:24px
            height:24px
            border:1px solid rgb(0,160,220)
            line-height:24px
            border-radius:50%  --> 