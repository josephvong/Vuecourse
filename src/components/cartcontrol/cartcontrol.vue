<template>
  <div class="cartcontrol">
    <transition name="decreaseFade">
      <div class="cart-decrease" v-show="!!foodObj.count" v-on:click="subtractHandle">
          <i class="icon-minus"></i>
      </div>
    </transition>
    <transition name="countFade">
      <div class="cart-count" v-show="!!foodObj.count" >{{foodObj.count}}</div>
    </transition>
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
    addHandle(event){
      if(!event._constructed){
        return;
      }
      if(!this.foodObj.count){
         Vue.set(this.foodObj,"count",1)
         //alert("no")
      }else{
        this.foodObj.count=this.foodObj.count+1;
      }
      
    },
    subtractHandle(){
        if(!event._constructed){
          return;
        }
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
    width:100%
    height:100% 
    position:relative
    &>div
      position:absolute
      height:20px
      width:20px
      top:0
      line-height:20px
      text-align:center
      border-radius:50%
      &>i
        line-height:20px
        display:block
        height:20px
        font-size:10px   
    .cart-increase
      background:#00A0DC
      color:white
      right:0
    .cart-decrease
      box-sizing:border-box
      border:1px solid #00A0DC 
      border-radius:50%
      color:#00A0DC
      right:0
      transform:translateX(-40px)
    .cart-count 
      color:gray
      left:20px 
      font-size:12px
    .decreaseFade-enter-active,.decreaseFade-leave-active
      transition: all .5s
     
    .decreaseFade-enter,.decreaseFade-leave-active
      opacity:0
      transform:translateX(0px)
      transform:rotate(-180deg)  

			
</style>
