<template>
  <div class="ratingselect">
     <ul class="rating-tab">
       <li class="all">{{desc.all}}<span>{{typeNum.all}}</span></li>
       <li class="like">{{desc.positive}}<span>{{typeNum.positive}}</span></li>
       <li class="dislike">{{desc.negative}}<span>{{typeNum.negative}}</span></li>
     </ul> 
     <div class="show-all">
        <span class="icon-checkbox-checked" v-bind:class="{checked:!isShowAll}" v-on:click="isShowAll=!isShowAll"></span>只看有内容的评价
     </div> 
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
  				positive:'满意',
          negative:'不满意',
  			}
  		}
  	}
  },
  data(){
    return{
      isShowAll:true
    }
  },
  computed:{
    typeNum:function(){

      let type={
        all:this.ratings.length,
        positive:0,
        negative:0
      }
      if(this.ratings.length>0){ 
        for (var i = 0 ; i < this.ratings.length; i++) {
          if(this.ratings[i].rateType==0){
            type.positive=type.positive+1
          }else if(this.ratings[i].rateType==1){
            type.negative=type.negative+1
          }
        }
        return type
      }else{
        return type
      }
    }
  },
  methods:{

  }, 
  mounted(){
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    margin:15px 0
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
    .show-all
      padding:12px 0
      font-size:12px
      color:rgb(147,153,159)
      line-height:24px
      &>span
        line-height:24px
        font-size:12px
        color: rgb(147,153,159)
        margin-right:8px
        &.checked
          color: #6AF248  
</style>

