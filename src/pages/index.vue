
<template>
    <div class="index">
        <!--模块必须都在安全距离内，所以首先要用container包括一下-->
        <div class="container">
            <div class="swiper-box">
                <swiper v-bind:options="swiperOption"><!--所以就需要去script里面定义这个变量-->
                    <!--循环列表slideList定义好后就可以开始写下面的循环了-->
                    <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
                        <!--👆这里不定义key会报错，因为循环的swiper-slide需要有个key，可以方便主键的缓存-->
                        
                        <!--v-bind指令绑定href属性，但凡用到指令，指令里面就都是动态变量JS变量了，所以但凡用到字符串，一定要再加单引号括起来-->
                        <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
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
                    //指定上下张
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
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
                ]
            }
        }
    }
</script>
<!--插件中的样式也是可以覆盖的，别人的标签也可以找到class去覆盖-->
<!--找样式的方法见笔记-->
<style lang="scss">
    //这里要一层一层的去定义，防止css样式来回串用，影响其他页面的样式
    .index{
        .swiper-box{
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