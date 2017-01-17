<template>
  <div class="ratingselect">
     <ul class="rating-tab">
       <li class="all">全部<span></span></li>
       <li class="like">推荐<span></span></li>
       <li class="dislike">吐槽<span></span></li>
     </ul>  
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE=0; // 赞 常量
const NEGATIVE=1; // 弹 常量
const ALL = 2;    // 全部 常量
export default {
  name: 'ratingselect',
  props:{
  	ratings:{  // 投票数组
  		type:Array,
  		default(){
  			return []
  		}
  	},
  	selectType:{  // 首次显示评价的类型
  		type:Number,
  		default: ALL  //默认为显示全部评价 （用ALL 常量显示）
  	},
  	onlyContent:{
  		type:Boolean,
  		default:false
  	},
  	desc:{
  		type:Object,
  		default(){
  			return {
  				all:'全部',
  				negative:'不满意',
  				positive:'满意'
  			}
  		}
  	}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    margin-bottom:30px
    .rating-tab
      width:100%;
      li
        display:inline-block
        padding:8px 12px
        margin-right:8px
        font-size:12px  
        &.all
          color:white
          background:rgba(0,160,220,1) 
        &.like
          color:rgb(77,85,93)
          background:rgba(0,160,220,0.2)
        &.dislike
          color:rgb(77,85,93)
          background:rgba(77,85,93,0.2)  
        
</style>