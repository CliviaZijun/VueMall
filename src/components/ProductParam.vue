<template>
<!-- 添加父容器把内容包裹起来 -->
    <div class="nav-bar" :class="{'is_fixed':isFixed}">  <!-- 动态绑定isFixed方法，true就有，false就无，那么只需控制is_fixed这个样式 -->
        <div class="container"> <!-- 保障安全区域 -->
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <!-- 按钮用插槽，因为组件中的立即购买可能是跳到详情页面，也可能是添加购物车，跳转到购物车页面等，所以使用插槽的方式便于复用 -->
                <slot name="buy"></slot>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'nav-bar',
    props:{
        title:String //从父组件带到子组件，string类型。
    },
    data(){
        return{
            // 返回一些吸顶所需变量
            isFixed:false //默认false
        }
    },
    mounted(){
        // 初始化一些方法
        // 给windows绑定一些事件
        window.addEventListener('scroll',this.initHeight);//使浏览器页面滚动时可以被监视到 //之所以事件要把方法名称单独拖出来额外定义，而非直接用一个function，是为了便于组件销毁时事件的移除
    },
    methods:{
        // 定义一些方法
        initHeight(){
            // 去浏览器的控制台试一下是用document.documentElement.scrollTop（Chrome和Edge都是） 还是window.body.scrollTop（IE）
            // 同时看一下window.pageYOffset(已过时，window.scrollY)，与上面指令的值是一样的。
            // 考虑到浏览器兼容问题，都写上，总有一个能取到
            let scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > 152? true:false;
        }
    },
    destroyed(){
        window.removeEventListener('scroll',this.initHeight,false);
    }
}
</script>
<style lang="scss">
    @import './src/assets/scss/config.scss';
    @import './src/assets/scss/mixin.scss';
    .nav-bar{
        height: 70px;
        line-height: 70px;//定义行高是为了为了内容垂直方向居中
        border-top: 1px solid $colorH;
        background-color: $colorG;
        width: 100%;
        z-index: 10;
        &.is_fixed{
            position: fixed;
            top:0;
            box-shadow: 0 5px 5px $colorE;
        }
        .container{
            @include flex();
            .pro-title{
                font-size: $fontH;
                color: $colorB;
                font-weight: bold;
            }
            .pro-param{
                font-size: $fontJ;
                a{
                    color: $colorC;
                }
                span{
                    margin: 0 10px;
                }
            }
        }
    }
</style>