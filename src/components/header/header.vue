<template>
  <div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" v-bind:src="seller.avatar"/>
        </div>
        <div class="content">
            <div class="title">
                <span></span>
                <span>{{seller.name}}</span>
            </div>
            <div class="description">
                {{seller.description}} / {{seller.deliveryTime}} 分钟
            </div>
            <div class="support">
                在线支付满28减5
            </div>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'vHeader',
  props:{
    seller:{  // 定义 seller 属性 （从 App.vue 中 传入）
        type:Object  // 属性类型验证
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
    background:#000
    color:#fff
    .content-wrapper
        padding:24px 12px 18px 24px
        font-size:0
        .avatar
            display:inline-block

        .content
            display:inline-block
            height:100%
            margin-left:16px
            font-size:12px
            background:red
            .title
                height:16px
                margin-bottom:10px
                & > span:nth-of-type(2)
                    font-size:16px
                    color:rgb(255,255,255)
                    font-weight:bold
                    line-height:18px

            .description
                font-size:10px
                color:rgb(255,255,255)
                line-height:12px
                font-weight:100
                margin-bottom:15px

            /*.support*/




</style>