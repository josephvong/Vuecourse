<template>
  <div class="commentlist" ref="commentList">
    <ul class="com-list">
      <li v-for="item in dateFormat" v-show="!isShowContent||item.text">
        <div class="com-left">
          <div class="thumb">
            <img v-bind:src="item.avatar" /> 
          </div>
        </div>
        <div class="com-right">
          <div class="basic">
            <div class="top">
              <p class="name">{{item.username}}</p>
              <p class="date">{{item.dateFmt}} {{item.timeFmt}}</p> 
            </div>
            <div class="star-wrap">
              <star v-bind:score="item.score" v-bind:size="24" ></star> 
            </div>
            <span class="deliver-time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span> 
          </div>
          <div class="comment">
              {{item.text}}
          </div>
          <div class="recommend" v-show="item.recommend.length>0" >
              <div class="tag" v-for="elem in item.recommend">{{elem}}</div> 
          </div>
        </div>
      </li> 
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
import BScroll from "better-scroll"
import star from "components/star/star.vue"
export default {
  name: 'commentlist',
  props:{
    comments:{
      type:Array,
      default(){
        return []
      }
    },
    isShowContent:{
      type:Boolean,
      default:false
    },
    selectType:{
      type:Number,
      default:2
    },
    eventHub:{
      type:Object
    }
  },
  data(){
  	return {
  		 
  	}
  },
  computed:{
    showList(){
      if(this.selectType==0){
        return this.comments.filter(function(item){
            return item.rateType==0
        })
      }else if(this.selectType==1){
        return this.comments.filter(function(item){
            return item.rateType==1
        })
      }else{
        return this.comments
      }
    },
    dateFormat(){
      var arr=[];
      this.showList.forEach( function(elem){
        if(elem.recommend.length>0){
          elem.recommend=elem.recommend.splice(0,3)
        }
        var oDate= new Date(elem.rateTime);
        var obj={dateFmt:oDate.Format("yyyy-MM-dd"),timeFmt:oDate.Format("hh:mm")}
        Object.assign(obj,elem);
        arr.push(obj);
      })
      return arr
    },
  },
  methods:{
    
  },
  mounted(){
    this.eventHub.$on("listInit",()=>{  
      this.$nextTick(()=>{
        this.commentScroll=new BScroll(this.$refs.commentList,{
          click:true,
          useTransition:true
        }) 
      }) 
    })
     this.eventHub.$on("scrollRefresh",()=>{
        this.commentScroll.refresh()
     })
    
     
  },
  components:{ 
    star:star
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.commentlist
  width:100%;
  height:100% 
  overflow:hidden  
  .com-list
    &>li
      display:flex
      display:-webkit-flex
      padding-bottom:18px
      border-bottom:rgba(7,17,27,0.1)
      .com-left
        width:28px 
        .thumb
          width:28px
          height:28px
          border-radius:50%
          overflow:hidden
          img
            display:block
            width:100%
            height:100%
      .com-right
        flex: 1 0 auto
        -webkit-flex: 1 0 250px
        padding-left:12px 
        .basic
          width:100%
          height:28px 
          .top
            width:100%;
            height:14px
            line-height:14px
            font-size:12px
            p
              line-height:14px
              font-size:12px
            .name 
              float:left 
            .date
              float:right
          .star-wrap
            display:inline-block
          .deliver-time
            line-height:14px
            font-size:12px
            color:rgb(147,153,159)
        .comment 
          display:-webkit-box
          padding:8px 0
          width:100%
          line-height:18px
          font-size:12px
          color:rgb(147,153,159)       
        .recommend  
          height: 16px 
          padding-left:12px
          display:flex
          display:-webkit-flex
          justify-content:flex-start
          -webkit-justify-content:flex-start
          .tag
            display:inline-block;
            flex:0 0 50px
            -webkit-flex:0 0 70px 
            height: 16px
            line-height:16px
            font-size:12px
            padding:0 6px
            margin-left:4px 
            overflow: hidden 
            text-overflow:  ellipsis 
            white-space: nowrap
            text-align:center
            border:1px solid rgba(7,17,27,0.1)
            border-radius:2px
            background:rgb(255,255,255)
          
          
</style>