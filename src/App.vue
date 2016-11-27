<template>
  <div id="app">
      <v-header></v-header>
      <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/sells">销售</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/goods">商家</router-link>
        </div>
      </div>
      <div class="content">
        <router-view> </router-view>
      </div>
  </div>
  
</template>

<script type="text/ecmascript-6">
import vHeader from "./components/header/header.vue"

export default {
  name: 'app',
  components:{
    vHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  .tab
    display:flex
    display:-webkit-flex 
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex:1
    -webkit-flex:1
    text-align:center
    & > a
        display:block
        font-size:14px
        color:rgb(77,85,93)
        &.active
            color: rgb(240,20,20)  
</style>
