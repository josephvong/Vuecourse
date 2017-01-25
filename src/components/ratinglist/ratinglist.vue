<template>
  <ul class="rating-list">
    <li v-for="item in dateFormat" v-show="!isShowContent||item.text" >
      <div class="info">
        <div class="date">
        <span>{{ item.dateFmt }}</span><span>{{item.timeFmt}}</span> <span>{{selectType}}</span>
        </div>
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
const POSITIVE=0; // 赞 常量
const NEGATIVE=1; // 弹 常量
const ALL = 2;    // 全部 常量 

export default {
  name: 'ratinglist',
  props:{
    ratings:{
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
    eventHub:{     //事件集合
      type:Object,
    }
  },
  data(){
    return {
      //ratingDataList:this.ratings
    }
  },
  computed:{
    showList(){
      if(this.selectType==0){
        return this.ratings.filter(function(item){
            return item.rateType==0
        })
      }else if(this.selectType==1){
        return this.ratings.filter(function(item){
            return item.rateType==1
        })
      }else{
        return this.ratings
      }
    },
    dateFormat(){
      var arr=[];
      this.showList.forEach( function(elem){
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
    
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .rating-list
    border-top:1px solid rgba(7,17,27,0.1)
    margin-bottom:20px
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