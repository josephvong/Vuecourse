<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="!!foodObj.count" v-on:click="subtractHandle" ><i class="icon-minus"></i></div>
    <div class="cart-count" v-show="!!foodObj.count" >{{foodObj.count}}</div>
    <div class="cart-increase" v-on:click="addHandle"><i class="icon-plus"></i></div>	
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue" 
export default {
  name: 'cartcontrol',
  props:{
  	foodObj:{
  		type:Object
  	}
  },
  methods:{
    addHandle(){
      if(!this.foodObj.count){
         Vue.set(this.foodObj,"count",1)
         //alert("no")
      }else{
        this.foodObj.count=this.foodObj.count+1;
      }
      
    },
    subtractHandle(){
        this.foodObj.count=this.foodObj.count-1;
        if(this.foodObj.count==0){
          Vue.delete(this.foodObj,"count")
        }
    }
  }


}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
      font-size:0
      &>.cart-decrease, &>.cart-increase
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
      &>.cart-count
          display:inline-block
          width:20px
          height:20px
          line-height:20px
          font-size:10px
          text-align:center
          color:gray                 
      .cart-decrease
          float:left;
          color:rgb(0,160,220)
      .cart-increase
          float:right;
          color:white     
          background-color:rgb(0,160,220)     
        
			
</style>
