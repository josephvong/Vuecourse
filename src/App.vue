<template>
  <div id="app">
      <v-header></v-header>
      <div class="tab">
        <div class="tab-item">销售</div>
        <div class="tab-item">评论</div>
        <div class="tab-item">商家</div>
      </div>
      <div class="content">
           这是内容
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
#app 
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
  .tab-item
    flex:1
    text-align:center  
</style>
