
<template>
    <div class="index">
        <!--模块必须都在安全距离内，所以首先要用container包括一下-->
        <div class="container">
            <div class="swiper-box">
                <!-- 轮播菜单静态部分 -->
                <div class="nav-menu">
                    <ul class="menu-wrap">
                        <li class="menu-item">
                            <a href="">手机 电话卡</a>
                            <!-- children--鼠标移上去时展示，移走时收起，所以默认display:none -->
                            <div class="children">
                                <ul v-for="(item,i_index) in menuList" v-bind:key="i_index">
                                    <li v-for="(sub,j_index) in item" :key="j_index">
                                        <!-- 写死的部分设置为0了，所以直接判断即可，为0时 sub即为false -->
                                        <a v-bind:href="sub?'/#/product/'+sub.id : '' ">
                                            <img v-bind:src="sub?sub.img : '/imgs/item-box-1.png'" alt="">
                                            {{sub?sub.name : '小米9'}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="">电视 盒子</a>
                        </li>
                        <li class="menu-item">
                            <a href="">笔记本 平板</a>
                        </li>
                        <li class="menu-item">
                            <a href="">家电 插线板</a>
                        </li>
                        <li class="menu-item">
                            <a href="">出行 穿戴</a>
                        </li>
                        <li class="menu-item">
                            <a href="">智能 路由器</a>
                        </li>
                        <li class="menu-item">
                            <a href="">电源 配件</a>
                        </li>
                        <li class="menu-item">
                            <a href="">生活 箱包</a>
                        </li>
                    </ul>
                </div>

                <!-- 轮播功能 -->
                <swiper v-bind:options="swiperOption"><!--所以就需要去script里面定义这个变量-->
                    <!--循环列表slideList定义好后就可以开始写下面的循环了-->
                    <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
                        <!--👆这里不定义key会报错，因为循环的swiper-slide需要有个key，可以方便主键的缓存-->
                        
                        <!--v-bind指令绑定href属性，但凡用到指令，指令里面就都是动态变量JS变量了，所以但凡用到字符串，一定要再加单引号括起来-->
                        <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- 
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div> 
                    -->
                </swiper>
                
            </div>
            <div class="ads-box"></div>
            <div class="banner"></div>
            <div class="product-box"></div>
        </div>
        <service-bar></service-bar>
    </div>
</template>
<script>
    import ServiceBar from './../components/ServiceBar.vue'
    //swiper是一个很大而全的组件，我们不需要全部引入，只需要用解构语法结构出所需组件即可
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    //同时，样式也要引入，否则不会生效
    import 'swiper/css/swiper.css'
    export default {
        name:'index',
        components:{
            Swiper,
            SwiperSlide,
            ServiceBar
        },
        //在data()里面定义局部变量去承载return的一个object
        data(){
            return{
                swiperOption:{
                    /*
                    //指定上下张
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    */
                    //指定分页器分什么东西，才能使分页器生效
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    //设置自动轮播
                    autoplay:true,
                    //设置循环播放
                    loop:true,
                    //设置动画效果
                    effect:'cube',
                    cubeEffect: {
                        slideShadows: true,
                        shadow: true,
                        shadowOffset: 100,
                        shadowScale: 0.6
                    }
                },
                //由于swiper-slide内的a标签需要循环，所以这里需要定义一个循环的列表
                slideList:[
                //可跳转的
                {
                    //列表按照设计稿的元素来设置
                    //需要图片和ID
                    //这里的轮播是写死的，真实开发中可以要求后端提供一个轮播的接口来查这些数据
                    id:'42',//必须是数据库中已经存在的商品id
                    img:'/imgs/slider/slide-1.jpg'
                },
                {
                    id:'45',
                    img:'/imgs/slider/slide-2.jpg'
                },
                {
                    id:'46',
                    img:'/imgs/slider/slide-3.jpg'
                },
                //再设置两个不跳转的
                {
                    id:'',
                    img:'/imgs/slider/slide-4.jpg'
                },
                {
                    id:'',
                    img:'/imgs/slider/slide-5.jpg'
                }
                ],
                //定义轮播菜单所需数组
                menuList:[
                    //一列有六项，所以一维数组要有六项，里面有四个元素，所以每项里面还要有四项
                    [
                        //它是一个Object，里面有id、img、name三个元素
                        {//这里id由于不是动态查询的，所以暂时写死
                            id:30,
                            img:'/imgs/item-box-1.png',
                            name:'小米CC9'
                        },{   
                            id:31,
                            img:'/imgs/item-box-2.png',
                            name:'小米8青春版'
                        },{   
                            id:32,
                            img:'/imgs/item-box-3.jpg',
                            name:'Redmi K20 Pro'
                        },{   
                            id:33,
                            img:'/imgs/item-box-4.jpg',
                            name:'移动4G专区'
                        }
                    ],
                    //下面的暂时写死
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]
                ]
            }
        }
    }
</script>
<!--插件中的样式也是可以覆盖的，别人的标签也可以找到class去覆盖-->
<!--找样式的方法见笔记-->
<style lang="scss">
    @import './src/assets/scss/config.scss';
    @import './src/assets/scss/mixin.scss';
    //这里要一层一层的去定义，防止css样式来回串用，影响其他页面的样式
    .index{
        .swiper-box{
            // 轮播菜单样式
            .nav-menu{
                position:absolute;
                width: 264px;
                height: 451px;
                z-index: 9;
                padding: 26px 0;
                background-color: #55585a7a;
                box-sizing: border-box;//规定两个并排的带边框的框
                .menu-wrap{
                    .menu-item{
                        height: 50px;
                        line-height: 50px;
                        a{
                            position: relative;
                            display: block;
                            font-size: 16px;
                            color: $colorG;
                            padding-left: 30px;
                            &:after{
                                position: absolute;
                                right: 30px;
                                top:17.5px;
                                content: '';//占位，使伪类生效
                                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
                            }
                        }
                    
                        &:hover{
                            background-color: $colorA;
                            .children{
                                display: block;
                            }
                        }
                        .children{
                            display: none;
                            width: 962px;
                            height: 451px;
                            background-color: $colorG;
                            position: absolute;
                            top: 0;
                            //right: 0;//定义right:0的话，右边会靠在菜单上
                            left: 264px;
                            border: 1px solid $colorH;
                            ul{
                                display: flex;
                                justify-content: space-between;
                                height: 75px;
                                li{
                                    height: 75px;
                                    line-height: 75px;//使文字垂直方向居中
                                    flex: 1;//平均值 也就是使li标签平均分布//或者width: 241px;
                                    padding-left: 23px;

                                }
                                a{
                                    color: $colorB;
                                    font-size: 14px;
                                }
                                img{
                                    width: 42px;
                                    height: 35px;
                                    vertical-align: middle;//使图片和文字居中
                                    margin-right: 12px;
                                }
                            }
                        }
                    }
                }
            }

            // 轮播功能样式
            .swiper-container{
                //先控制高度
                height: 451px;
                //然后再控制图片让其100%显示
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>