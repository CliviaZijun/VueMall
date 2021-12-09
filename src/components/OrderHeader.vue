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
                <a href="javascript:;">Clivia</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'order-header',
    props:{
        title:String
    }// 定义props，接收外部变量的组件
}
</script>
<style lang="scss">
    .order-header{
        height: 112px;
        padding:30px 0;
        .header-logo{
            float: left;
        }
        .title,.username{
            display: inline-block;//因为本身它右边有一块儿，它不是块级元素，而是行内块级元素，所以要先占为inline-block
            height: 55px;
            line-height: 55px;
        }
        .title{
            margin-left: 54px;
            font-size: 28px;
            color: #333333;
            span{
                font-size: 14px;
                margin-left: 17px;
                color: #999999;
                font-weight: bold;
            }
            float: left;
        }
        .username{
            float: right;
            a{
                color: #666666;
                font-size: 16px;
            }
        }
    }
</style>