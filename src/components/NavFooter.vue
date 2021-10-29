<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="">
            <p>小米商城</p>
        </div>
        <div class="footer-link">
            <a href="/#/index">苞米商城</a><span>|</span>
            <a href="https://cliviazijun.github.io" target="_blank">CAT主页</a><span>|</span> 
            <a href="https://blog.csdn.net/CliviaZ" target="_blank">博客主页</a><span>|</span>
            <a href="https://github.com/CliviaZijun" target="_blank">Github主页</a>
        </div>
        <div class="copyright">
            <div href="">Copyright @2021 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'nav-footer'
}
</script>
<style lang="scss" scoped>//只有当前组件能被渲染，不加的话可能会影响其他组件
@import './src/assets/scss/config.scss';
.footer{
    height: 234px;
    border-top: 4px solid $colorA;
    background-color: $colorB;
    color: $colorD;
    font-size: $fontI;
    text-align: center;
    .footer-logo{
        margin-bottom: 31px;
        img{
            margin-top: 46px;
            margin-bottom: 13px;
            width: 53px;
            height: 36px;
        }
    }
    .footer-link{
        //a标签的颜色优先级大于父级的优先级，所以父级对字体颜色的设定对它不起作用
        a{
            color: $colorD;
            display: inline-block;
        }
        span{
            margin:0px 8px;
        }
    }
    .copyright{
        margin-top: 10px;
        .domain{
            color: $colorA;
        }  
    }
}
</style>