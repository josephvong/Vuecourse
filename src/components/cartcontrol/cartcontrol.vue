<template>
  <div class="cartcontrol">
    <transition name="dropBall" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:before-leave="beforeLeave" v-on:leave-cancelled="leaveCancelled">
      <div ref="dropball" class="dropball" v-show="dropBallShow" ></div>
    </transition>
    <transition name="decreaseFade">
      <div class="cart-decrease" v-show="!!foodObj.count" v-on:click.stop="subtractHandle">
          <i class="icon-minus"></i>
      </div>
    </transition>
    <transition name="countFade">
      <div class="cart-count" v-show="!!foodObj.count" >
        {{foodObj.count}}
      </div>
    </transition>
    <div class="cart-increase" v-on:click.stop="addHandle">
      <i class="icon-plus"></i>
    </div>
    	
  </div>
</template>
<script type="text/ecmascript-6"> 
import Vue from "vue"

export default {
  name: 'cartcontrol',
  props:{
  	foodObj:{
  		type:Object
  	},
    eventHub:{
      type:Object
    }
  },
  data(){
    return {
      dropBallShow:true,
      isMoving:false,
      start:{x:0, y:0},
      terminal:{
        x:document.getElementById("LOGO").getBoundingClientRect().left+document.getElementById("LOGO").offsetWidth/2,
        y:document.getElementById("LOGO").getBoundingClientRect().top+document.getElementById("LOGO").offsetHeight/2
      },
      isTranslate:true
    }
  },
  computed:{
    dropballDirect(){
      let dir={dirX:0,dirY:0}
      dir.dirX=this.terminal.x-this.start.x;
      dir.dirY=this.terminal.y-this.start.y;
      return dir
    }
  },
  methods:{
    addHandle(event){
      if(!event._constructed){
        return;
      }
      if(!this.isMoving){
        if(!this.foodObj.count){
           Vue.set(this.foodObj,"count",1) 
        }else{
          this.foodObj.count=this.foodObj.count+1;
        }
        this.dropBallShow=false 
        this.start.x=event.currentTarget.getBoundingClientRect().left;
        this.start.y=event.currentTarget.getBoundingClientRect().top; 

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
    },
    beforeLeave(){
      
    },
    leave(){
      //this.$refs.dropball.style.transform="translate("+this.dropballDirect.dirX+"px,"+this.dropballDirect.dirY+"px)";
      this.$refs.dropball.style.right=-this.dropballDirect.dirX+"px"
      this.$refs.dropball.style.top=this.dropballDirect.dirY+"px"
      this.isMoving=true
    },
    afterLeave(){
        this.dropBallShow=true;
        this.isMoving=false
        //this.$refs.dropball.style.transform="translate(0,0)"
        this.$refs.dropball.style.right=0+"px"
        this.$refs.dropball.style.top=0+"px"
    },
    leaveCancelled(){

    }
  }


}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
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
      z-index:21
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
    .dropball
        position:absolute
        width:20px
        height:20px
        top: 0px
        right:0
        background:#00A0DC
        border-radius:50%
        display:block
        z-index:20
    .decreaseFade-enter-active,.decreaseFade-leave-active
      transition: all .5s 
    .decreaseFade-enter,.decreaseFade-leave-active
      opacity:0
      transform:translateX(0px)
      transform:rotate(-180deg)
    .dropBall-leave-active
      transition: right 0.3s , top 0.6s 
    .dropBall-leave
      //transform:translate(0,0)
      right:0
      top:0
      

			
</style>
