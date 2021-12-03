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
                        <input type="text" placeholder="邮箱/手机号码/小米ID" v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" v-on:click="login">登录</a>  <!-- 登陆时绑定login事件  v-on:click === @click -->
                    </div>
                    <div class="tips">
                        <div class="sms" @click="register">手机短信登陆/注册</div>
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
    name:'login',
    data(){
        return{
            username:'',
            password:'',
            userId:'', //除了用户名和密码，也要保存一个用户ID，因为前后端是分离的，前后端通信时需要传递一个凭证告诉对方， 一般使用cookie。
            // 把用户ID当作cookie，每次发请求时把cookie的用户ID传给服务端，服务端收到之后才能知道我们的身份是谁，然后根据用户ID来进行操作。
            
            // //临时为了让res不报错先打印一下，进行调试
            // res:{}
        }
    },
    methods:{
        login(){
            //let username = this.username;
            //解构
            let {username,password} = this;
            this.axios.post('/user/login',{
                // 传参
                // 小技巧：当key和value一样时，我们可以简写成名称。
                // 如果不一样，比如 data中return{a:'',b:''} login中let {a,b} = this; 详写的方式为：
                // username:a,password:b
                // 而当key和value一样时，可以简写👇
                username,
                password
            }).then((res)=>{
                // //临时用于让res不报错并调试res
                // this.res = res;
                
                // 用cookie保存用户id
                this.$cookie.set('userId',res.id,{expires:'1M'});
                // res就是接口返回来的结果
                // 能进到then里就说明接口返回成功了，成功后使用push进行跳转，跳转到首页去
                
                // 保存用户名至Vuex
                this.$store.dispatch('saveUserName',res.username);//方法名，所传参数

                this.$router.push('/index');

            })//这里如果担心报错的话可以继续.catch进行捕获，但其实不需要，因为在main.js中已经定义过接口错误拦截了
        },
        register(){
            this.axios.post('/user/register',{
                username:'Clivia',
                password:'Clivia',
                email:'Clivia@hotmail.com'
            }).then(()=>{
                alert('注册成功');
            })
        }
    }
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
                        display: inline-block;
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