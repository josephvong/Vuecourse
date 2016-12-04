<template>
  <div class="star" v-bind:class="starType" >
      <span v-for="item in itemClass" v-bind:class="item" class="star-item" track-by="$index"></span>	
  	  <!-- <span class="star-item on"></span><span class="star-item on"></span> -->
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH=5	// 恒定 的5 颗星 的 数量
const CLS_ON= "on"  //  全星
const CLS_HALF="half"  // 半星
const CLS_OFF="off"		// 无星
//上面为 该组件的常量，用来定义组件的一些 属性

export default {
  name: 'star',
  props:{
  	size:{		// 控制星星大小的类 的 属性
  		type:Number
  	},
  	score:{		// 显示当前分数	
  		type:Number
  	}
  },
  computed:{
  		starType() {  // starType 是用来定义 使用那个大小 类型
  			return "star-"+ this.size
  		},
  		itemClass() {  // 输出根据当前score 给每个
  			let result=[]		// 最终输出的 数组
  			//console.log(this.score);
  			let score = Math.floor(this.score*2)/2  // 分数取5以内的整数
  			
  			let hasDecimal = score % 1 !==0  // 判断此score 是否整数,若不是，截取分数的小数部分
  			let integer =Math.floor(score) // 先将所有score 向下取整
  			 
  			for (var i = 0; i < integer; i++) {
  				result.push(CLS_ON) // 分数的 整数部分，给 result 数组传入 “ON” 字段
  			}
  			if(hasDecimal){		// 如果 积分有小数， 则在result 后面添加 “half" 的字段
  				result.push(CLS_HALF)
  			}
  			while(result.length<LENGTH){ //如果result数组长度少于固定星星长度，给后面的result添加 ”off“字段
  				result.push(CLS_OFF)
  			}
  			return result;
  		}
  },
  updated:function(){
  	//console.log(this.itemClass)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.star
	margin:20px auto
	text-align:center
	&.star-48
		.star-item
			display:inline-block	
			width:20px
			height:20px
			margin-right:22px
			background:on-repeat
			background-size:20px 20px 
			&.on
				bg-image('star48_on')
			&.half
				bg-image('star48_half')
			&.off
				bg-image('star48_off')
	&.star-36
		.star-item
			display:inline-block	
			width:15px
			height:15px
			margin-right:16px
			background:on-repeat
			background-size:15px 15px 
			&.on
				bg-image('star36_on')
			&.half
				bg-image('star36_half')
			&.off
				bg-image('star36_off')
	&.star-24
		.star-item
			display:inline-block	
			width:10px
			height:10px
			margin-right:3px
			background:on-repeat
			background-size:10px 10px 
			&.on
				bg-image('star24_on')
			&.half
				bg-image('star24_half')
			&.off
				bg-image('star24_off') 
</style>