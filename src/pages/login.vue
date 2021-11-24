<template>
    <div class="login">
        <div class="container">
            <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">账号登录</span><span class="sep-line">|</span><span>扫码登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="邮箱/手机号码/小米ID">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="密码">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn">登录</a>
                    </div>
                    <div class="tips">
                        <div class="sms">手机短信登陆/注册</div>
                        <div class="reg">立即注册<span>|</span>忘记密码？</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-link">
                <a href="/#/index">苞米商城</a><span>|</span>
                <a href="https://cliviazijun.github.io" target="_blank">CAT主页</a><span>|</span> 
                <a href="https://blog.csdn.net/CliviaZ" target="_blank">博客主页</a><span>|</span>
                <a href="https://github.com/CliviaZijun" target="_blank">Github主页</a>
            </div>
            <p class="copyright">Copyright @2021 mi.futurefe.com All Rights Reserved.</p>
        </div>
    </div>
</template>
<script>
export default {
    name:'login'
}
</script>
<style lang="scss">
    @import './src/assets/scss/config.scss';
    @import './src/assets/scss/mixin.scss';
    .login{
        &>.container{// 前面加上&>是指该container是.login的container，以避免与下面的container混淆。
            height: 113px;
            img{
                width: auto;
                height: 100%;
            }
        }
        .wrapper{
            background: url('/imgs/login-bg.jpg') no-repeat center;
            .container{
                height: 576px;
                .login-form{
                    box-sizing: border-box;
                    padding-left: 31px;
                    padding-right: 31px;
                    width: 410px;
                    height: 510px;
                    background-color: $colorG;
                    position: absolute;
                    bottom: 29px;
                    right: 0;
                    h3{
                        line-height: 24px;
                        font-size: $fontE;
                        text-align: center;
                        margin: 40px auto 49px;
                        color: $colorC;
                        .checked{
                            color: $colorA;
                        }
                        .sep-line{
                            margin:0 32px;
                            color: $colorF;
                        }
                    }
                    .input{
                        // display: inline-block;
                        width: 348px;
                        height: 50px;
                        border: 1px solid $colorH;
                        margin-bottom: 20px;
                        input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            padding: 18px;
                            color: $colorD;
                            font-size: $fontJ;
                        }
                    }
                    .btn{
                        width: 348px;
                        line-height: 50px;
                        margin-top: 10px;
                        font-size: $fontI;
                    }
                    .tips{
                        margin-top: 14px;
                        display: flex;
                        justify-content: space-between;
                        font-size: $fontJ;
                        cursor: pointer;
                        .sms{
                            color: $colorA;
                        }
                        .reg{
                            color: $colorD;
                        }
                        span{
                            margin: 0 7px;
                        }
                    }
                }
                
            }
        }
        .footer{
            height: 100px;
            padding-top: 60px;
            text-align: center;
            color: $colorB;
            font-size: $fontJ;
            .footer-link{
                a{
                    color: $colorB;
                    display: inline-block;
                }
                span{
                    margin: 0 9px;
                }
            }    
            .copyright{
                margin-top: 19px;
            }
        }
    }
</style>