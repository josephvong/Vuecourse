<template>
  <ul class="rating-list">
    <li v-for="item in ratings">
      <div class="info">
        <div class="date"><span>{{item.rateTime}}</span><span></span></div>
        <div class="user-info">
          <span>{{item.username}}</span>
          <div class="img-wrap">
            <img v-bind:src="item.avatar" />
          </div>
        </div>
      </div>
      <div class="comment">
        <span>{{item.text}}</span>
        <em v-if="item.rateType==0" class= "icon-cool2 good"></em>
        <em v-else  class="icon-angry2 bad"></em>
      </div>
    </li>
  </ul>

</template>
<script type="text/ecmascript-6">

export default {
  name: 'ratinglist',
  props:{
    ratings:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {

    }
  },
  mounted(){

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .rating-list
    border-top:1px solid rgba(7,17,27,0.1)
    &>li
      border-bottom:1px solid rgba(7,17,27,0.1)
      padding:8px 0
      .info
        width:100%
        height:12px
        .date
          display:inline-block
          line-height:12px
          font-size:10px
          color:rgb(147,153,159)
          float: left
          &>span
            margin-right:5px
        .user-info
          display:inline-block
          line-height:12px
          font-size:10px
          color:rgb(147,153,159)
          float:right
          &>span
            display:inline-block
            margin-right:5px
          &>.img-wrap
            display:inline-block
            width:12px
            height:12px
            border-radius:50%
            overflow: hidden
            &>img
              width:100%
              height:100%
      .comment
        position:relative
        box-sizing:border-box
        width:100%
        height:16px
        line-height:16px
        padding-left:20px
        margin-top:6px
        &>span
          display:inline-block
          width:100%
          height:16px
          line-height:16px
          font-size:16px
          overflow:hidden
          text-overflow:ellipsis
          white-space:nowrap
        &>em
          position:absolute
          display:block
          left:0
          top:0
          width:16px
          height:16px
          font-size:16px
          &.good
            color:rgb(0,160,220)
          &.bad
            color:rgb(174,159,159)
</style>