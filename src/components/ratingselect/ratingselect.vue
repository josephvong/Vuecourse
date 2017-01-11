<template>
  <div class="ratingselect">
     this is a ratings
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
  		type:Object
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

</style>