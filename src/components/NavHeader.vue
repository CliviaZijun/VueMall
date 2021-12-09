<template>
    <div class="header">
        <div class="nav-topbar">
            <!--一般小元素都用a标签-->
            <div class="container">
                <div class="topbar-menu">
                    <!--href="javascript:; 防止页面刷新-->
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login()">登录</a>
                    <a href="javascript:;">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart()"> <span class="icon-cart"></span> 购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <!--做一个循环，循环用ul-li标签是最合适的，因为li标签刚好是一个对称的结构，而且可以无限循环下去-->
                            <ul>
                                <!--每一个li就是一个商品-->
                                <!--循环用v-for指令，
                                    v-for默认是直接循环对应的数组，但因为这里我们要用到索引，所以要加个item，
                                    又因为item自己带索引，所以要加index（没有索引的话就直接item就好）
                                    
                                    这里建议加一个key,
                                    因为key可以提高渲染速度，而且后期复用率更高。
                                    在二次渲染时，它会自动缓存，
                                    发现数据有元素缓存了的话，它就直接去取，不会再重复渲染，从而提高性能
                                    这一优势数据量越大表现得越明显
                                    -->
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img :src="item.mainImage" :alt="item.subtitle"> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6511d77270e94146c0b1f96b66d8cc58.png?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6511d77270e94146c0b1f96b66d8cc58.png?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">Redmi智能电视X55 2022</div>
                                        <div class="pro-price">2999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6511d77270e94146c0b1f96b66d8cc58.png?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6511d77270e94146c0b1f96b66d8cc58.png?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">Redmi智能电视X65 2022</div>
                                        <div class="pro-price">3999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8871821795310769c1d3896c99b12381.png?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8871821795310769c1d3896c99b12381.png?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视6 65" OLED</div>
                                        <div class="pro-price">6999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a1ae5341d2dae66cd42566c60d2d666.png?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a1ae5341d2dae66cd42566c60d2d666.png?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视 大师 77" OLED</div>
                                        <div class="pro-price">17999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/932b583c6eccd8aabfa0771f8a854940.jpg?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/932b583c6eccd8aabfa0771f8a854940.jpg?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">小米透明电视</div>
                                        <div class="pro-price">39999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8871821795310769c1d3896c99b12381.png?thumb=1&w=400&h=275&f=webp&q=90" alt=""> -->
                                            <!-- 懒加载👇 -->
                                            <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8871821795310769c1d3896c99b12381.png?thumb=1&w=400&h=275&f=webp&q=90'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视 大师 65英寸OLED</div>
                                        <div class="pro-price">9499元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <!--防止点击的时候刷新、跳转-->
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
    name:'nav-header',
    //一定不要定义成全局的data，要定义成局部data，防止数据串用
    data(){
        return{
            // username:this.$store.state.username,
            phoneList:[]
        }
    },
    computed:{
        /* username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount;
        } */
        ...mapState(['username','cartCount'])
    },
    filters:{
        currency(val){
            if(!val) return '0.00';
            return '￥'+val.toFixed(2)+'元';
        }
    },
    mounted(){
        this.getProductList();
    },
    methods:{
        login(){
            this.$router.push('/login');
        },
        getProductList(){
            //接口的名字
            this.axios.get('/products',{
                params:{
                    categoryId:'100012',
                    //由于查询时每次只显示六个，我们可以：
                    //方法一：把pageSize修改为6
                    //pageSize:6
                    
                }
            }).then((res)=>{ //链式调用//这里的res看main.js，它实际上是response.data.data，也就是说不包含status。
                //res.list;
                //方法二（常用）：
                if(res.list.length>6){
                    this.phoneList = res.list.slice(0,6);
                }else{
                    res.list;
                }
            })
        },
        goToCart(){
            //跳转路由，如果是动态路由 取参数：$router.params  $router.query e.g. this.$router.params.userId  this.$router.query.userId
            this.$router.push('/cart');
        }
    }
}
</script>
<style lang="scss">
    @import './src/assets/scss/base.scss';
    @import './src/assets/scss/mixin.scss';
    @import './src/assets/scss/config.scss';
    .header{
        .nav-topbar{
            height: 39px;
            //一般行高与高度保持一致
            line-height: 39px;
            background-color: #333333;
            color: #B0B0B0;
            .container{
                /*
                display: flex;
                justify-content: space-between;//水平方向居中
                align-items: center;//垂直方向居中
                */
                @include flex();
                a{
                    display: inline-block;
                    color: #B0B0B0;
                    margin-right: 17px;
                }
                .my-cart{
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;//框内居中
                    color: #ffffff;
                    margin-right: 0;
                    .icon-cart{
                        /*
                        //将span标签的长宽设置为icon的长宽，否则不显示
                        display: inline-block;
                        width: 16px;
                        height: 12px;

                        background:url('/imgs/icon-cart-checked.png') no-repeat center;
                        background-size: contain;//填充
                        */
                        @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
                        margin-right: 4px;   
                        vertical-align: middle;//并列元素竖直方向对齐        
                    }
                    
                }
            }
        }
        .nav-header{
            .container{
                position: relative;
                height: 112px;
                /*
                display: flex;
                justify-content: space-between;
                align-items: center;
                */
                @include flex();
                .header-menu{
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu{
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;
                        margin-right: 20px;
                        span{
                            cursor: pointer;
                        }
                        &:hover{//展示子菜单
                            color:$colorA;
                            .children{
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children{
                            position: absolute;
                            top: 112px;
                            left: 0;
                            width: 1226px;
                            height: 0;
                            opacity: 0;
                            overflow: hidden;//?
                            border-top: 1px solid #E5E5E5;
                            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                            z-index: 10;//?
                            transition: all 0.4s;
                            background-color: $colorG;
                            .product{
                                position: relative;
                                float: left;
                                width: 16.6%;
                                height: 220px;
                                font-size: 12px;
                                line-height: 12px;
                                text-align: center;
                                img{
                                    margin-top: 26px;
                                    width: auto;
                                    height: 111px;
                                }
                                a{
                                    display: inline-block;  //a里面嵌套的div是块级的，但是检查时鼠标放在div上才有显示，而a上没有。
                                                            //这是因为a是行级的，它撑不开。加上inline-box就好了,用子元素撑开它。
                                    
                                }
                                .pro-img{
                                    height: 137px;//这个随意按比例调就好
                                }
                                .pro-name{
                                    font-weight: bold;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color: $colorB;
                                }
                                .pro-price{
                                    color: $colorA;
                                }
                                &:before{
                                    content: '';
                                    position:absolute;
                                    top: 28px;
                                    right: 0;
                                    border-left: 1px solid $colorF;
                                    height: 100px;
                                    width: 1px;
                                }
                                &:last-child:before{
                                    display: none;
                                }
                            }

                        }
                    }
                }
                .header-search{
                    width: 319px;
                    .wrapper{
                        height: 50px;
                        border: 1px solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        input{
                            border: none;
                            border-right: 1px solid #E0E0E0;
                            width: 264px;
                            height: 50px;
                            padding-left: 14px;     //默认的是宽度不包括padding值，所以如果只设置width和padding，最终总长度将是width+padding(+border)
                            box-sizing: border-box; //设置加上这一条，就会将总长度限制在width中，
                                                    //因为：默认状态width/height是内容的长宽，而border-box下，width/height是除margin外整个元素的长款
                            
                        }
                        a{
                            /*
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            background: url('/imgs/icon-search.png') no-repeat center;
                            background-size: contain;
                            */
                            @include bgImg(18px,18px,'/imgs/icon-search.png');
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>