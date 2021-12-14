<template>
    <div class="order-header">
        <!-- 每个页面都设置一个主class,可以防止页面之间class串用，虽然scoped也可以，但它会帮我们生成一堆无用的标签和属性，页面就会比较重，非必要不要使用 -->
        <div class="container clearfix"> <!-- 解决浮动塌陷问题 -->
            <!-- 安全区域 -->
            <!-- logo -->
            <div class="header-logo">
                    <a href="/#/index"></a>
            </div>
            <!-- 标题 -->
            <div class="title">
                <!-- <h2>我的购物车<span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span></h2> -->
                <h2>{{title}}<slot name="tip"></slot></h2> <!-- 原来的span设置成插槽，因为其他页面没有这个span，只有title -->
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'order-header',
    props:{
        title:String
    },// 定义props，接收外部变量的组件
    computed:{
        ...mapState(['username'])//封装了this.$store.state.username
    }
}
</script>
<style lang="scss">
    @import './../assets/scss/config.scss';
    .order-header{
        // height: 112px;
        padding:30px 0;
        border-bottom: 2px solid $colorA;
        .header-logo{
            float: left;
        }
        .title,.username{
            display: inline-block;//因为本身它右边有一块儿，它不是块级元素，而是行内块级元素，所以要先占为inline-block
            height: 55px;
            line-height: 55px;
        }
        .title{
            h2{
                font-size: $fontC;
                color: $colorB;
            }
            margin-left: 54px;
            span{
                font-size: $fontJ;
                margin-left: 17px;
                color: $colorD;
                font-weight: 400;//bold太粗了，直接定义数值
            }
            float: left;
        }
        .username{
            float: right;
            a{
                color: $colorC;
                font-size: $fontI;
            }
        }
    }
</style>