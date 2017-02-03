<template>
  <div class="ratings" refs="ratingWrap">
      <div class="rate-top">
      	<div class="top-left">
      		<div class="score">{{totalScore}}</div>
      		<div class="score-desc">综合评分</div>
      		<div class="compare">高于周边商家69.2%</div>
      	</div>
      	<div class="top-right">
      		<div class="info">
      			<span class="label">服务态度</span>
      			<div class="star-wrap">
      				<star v-bind:score="totalScore" v-bind:size="24" ></star>
      			</div>
      			<span class="score">{{totalScore}}</span>
      		</div>
      		<div class="info">
      			<span class="">服务态度</span>
      			<div class="star-wrap">
      				<star v-bind:score="totalScore" v-bind:size="24" ></star>
      			</div>
      			<span class="score">{{totalScore}}</span>
      		</div>
      		<div class="info">
      			<span class="">送达时间</span> 
      			<span class="score">{{averDelTime}}分钟</span>
      			<span>{{isShowContent}}</span>
      			<span>{{selectType}}</span>
      		</div> 
      	</div>
      </div>
      <div class="select-wrap"> 
         <ratingselect 
    			v-bind:desc="ratingDesc"
    			v-bind:isShowContent="isShowContent"
    			v-bind:ratings="data"
    			v-bind:eventHub="eventHub"
    		/>   
      </div> 
      <div class="list-wrap">
        <commentlist 
          v-bind:comments="data"
          v-bind:isShowContent="isShowContent"
          v-bind:selectType="selectType"
          v-bind:eventHub="eventHub"
        />
      </div>
    		 
  </div>
</template>

<script type="text/ecmascript-6">
import star from "components/star/star.vue"
import ratingselect from "components/ratingselect/ratingselect.vue"
import commentlist from "components/commentlist/commentlist.vue"
import BScroll from "better-scroll"
import Vue from "vue"
export default {
  name: 'ratings',
  data(){
  	return {
  		data:[],
  		totalScore:0,
  		averDelTime:0,
  		ratingDesc:{
  			"all":"全部",
  			"positive":"满意",
  			"negative":"不满意"
  		},
  		selectType:2,
  		isShowContent:false, 
  		eventHub:new Vue() 
  	}
  },
  computed:{
  	 
  },
  methods:{
  	getScoreTime(arr){
  		let score=0
  		let time=0
  		if(arr.length>0){
  			for(let elem of this.data){
  				if(elem.deliveryTime){
  					time+=parseInt(elem.deliveryTime);
  				}
  				
	  			score+=parseInt(elem.score); 
	  		}
  		}
  		this.averDelTime=Math.round(time/this.data.length) 
  		this.totalScore=Math.round(score/this.data.length*10)/10
  	},
  	toggleShowContent(){	//  切换是否只看有内容评论 的函数
  		this.isShowContent=!this.isShowContent;
  		this.$nextTick(()=>{
        this.eventHub.$emit("scrollRefresh") 
  		}) 
  	},
  	ratingFilter(N){ 
  	  this.selectType=N ;
      this.$nextTick(()=>{ 
        this.eventHub.$emit("scrollRefresh")
      }) 
    },
    
  },
  components:{
  	star:star,
  	ratingselect:ratingselect,
  	commentlist:commentlist
  },
  mounted(){
  	this.$http.get("/api/ratings").then((response)=>{
  		let res=response.body
  		this.data=res.data;
  		this.$nextTick(()=>{
  			this.getScoreTime(this.data) 
        this.eventHub.$emit("listInit")
  		})
  	})

  	this.eventHub.$on("toggleShowContent",()=>{// 监听 评论选择器
  		this.toggleShowContent()
  	})

  	this.eventHub.$on("selectType",(arg)=>{
        this.ratingFilter(arg);
    }) 

    
      /**/
      
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.rate-top
  padding:18px 0
  display:flex 
  display:-webkit-flex
  .top-left
    flex:0 0 138px
    -webkit-flex:0 0 138px
    border-right:1px solid rgba(0,0,0,0.4)
    .score
      line-height:28px
      font-size:24px
      color:rgb(255,153,0)
      text-align:center
    .score-desc
      font-size:12px
      color:rgb(7,17,27)
      line-height:12px
      margin:6px 0
      text-align:center
    .compare
      font-size:10px
      color:rgb(7,17,27)
      line-height:12px
      text-align:center
  .top-right
    flex:0 1 auto
    padding: 0 12px
    .info 
      height:18px
      margin-bottom: 8px
      line-height:18px
      font-size:12px
      text-align:center
      &>span 
        display inline-block
      &>div
        height:18px
        padding:0 6px
        display:inline-block
.select-wrap
  padding:0px 18px 0px 18px
  border-top: 1px solid rgba(7,17,27,0.1)
  border-bottom: 1px solid rgba(7,17,27,0.1)
.list-wrap
  width:100%
  position:absolute
  top:390px
  left:0
  bottom:0
  box-sizing border-box
  padding 0 18px  
</style>
