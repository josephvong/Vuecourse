<template>
  <div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" v-bind:src="seller.avatar"/>
        </div>
        <div class="content">
            <div class="title">
            <span></span><span>{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description}} / {{seller.deliveryTime}} 分钟
            </div>
            <!-- 注意：此处用v-if 因为seller 数据为异步获取，因此要用v-if 来判断 数据是否已经获取到-->
            <div class="support" v-if="seller.supports">
                <span v-bind:class="iconClass[seller.supports[0].type]"></span>
                <span>{{seller.supports[0].description}}</span>
            </div>
            <div class="more" v-if="seller.supports" >
                {{seller.supports.length}}个<i class="icon-play3"></i>
            </div>
        </div>
    </div>
    <div class="bulletin-wrapper">
        <span>{{seller.bulletin}}</span><i class="icon-play3"></i>
    </div>
    <div class="backcover">
        <img v-bind:src="seller.avatar">
    </div>
    <div class="module">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">


export default {
  name: 'vHeader',
  data(){
    return {
        prefType:0,
        iconClass:["decrease","discount","guarantee","invoice"]
    }
  },
  props:{
    seller:{  // 定义 seller 属性 （从 App.vue 中 传入）
        type:Object  // 属性类型验证
    }
  },
  mounted:function(){

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
    position:relative
    color:#fff
    overflow:hidden
    .content-wrapper
        padding:24px 12px 18px 24px
        font-size:0
        position:relative;

        .avatar
            display:inline-block
            vertical-align:top
            &>img
                border-radius:3px
                over-flow:hidden
        .content
            display:inline-block
            height:100%
            margin-left:16px
            font-size:12px

            .title
                height:16px
                margin-bottom:10px
                & > span:nth-of-type(1)
                    display:inline-block
                    vertical-align:top
                    width:30px
                    height:18px
                    background:no-repeat
                    bg-image("brand")
                    background-size:30px 18px
                    margin-right:4px
                & > span:nth-of-type(2)
                    display:inline-block
                    font-size:18px
                    color:rgb(255,255,255)
                    font-weight:bold
                    line-height:18px
            .description
                font-size:12px
                color:rgb(255,255,255)
                line-height:12px
                font-weight:100
                margin-bottom:15px
            .support
                display:inline-block
                height:12px
                &>span:nth-of-type(1)
                    display:inline-block
                    width:12px
                    height:12px
                    vertical-align:top
                    background:no-repeat
                    background-size:12px 12px
                    margin-right:5px
                    &.decrease
                        bg-image("decrease_2")
                    &.discount
                        bg-image("discount_2")
                    &.guarantee
                        bg-image("guarantee_2")
                    &.invoice
                        bg-image("invoice_2")
                &>span:nth-of-type(2)
                    font-size:12px
                    color:rgb(255,255,255)
                    line-height:12px
                    font-weight:100
            .more
                display:inline-block
                position:absolute
                right:12px
                bottom:12px
                height:24px;
                box-sizing:border-box
                padding:6px 8px
                line-height:12px;
                font-size:10px;
                border-radius:12px
                background:rgba(0,0,0,0.5);
                &>i
                    line-height:12px;
                    font-size:8px;
                    margin-left:3px
    .bulletin-wrapper
        position:relative
        width:100%
        height:28px
        box-sizing:border-box
        padding:0 12px
        background:rgba(0,0,0,0.4)

        &>span
            display:inline-block
            width:95%
            box-sizing:border-box
            padding-left:28px
            overflow:hidden
            text-overflow:ellipsis
            white-space:nowrap
            font-size:12px
            line-height:28px
            background:no-repeat 0 8px
            background-size:24px 12px
            bg-image("bulletin")
        &>i
            position:absolute
            top:50%
            right:12px
            height:28px
            margin-top:-14px
            display:inline-block
            font-size:12px
            line-height:28px
    .backcover
        position:absolute
        left:0
        top:0
        width:100%
        height:100%
        z-Index:-1
        &>img
            width:100%
            height:100%
            filter:blur(5px)
    .module
        position:fixed
        display:none
        left:0
        top:0
        width:100%
        height:100%
        background:red
        z-Index:100
</style>
/**/