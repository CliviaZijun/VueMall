<template>
    <div class="product">
        <!-- 4. 引用组件 -->
        <product-param title="小米8">
            <template v-slot:buy>
                <button class="btn">立即购买</button>
            </template>
        </product-param>
        <div class="content">
            <div class="item-bg">
                <h2>小米8</h2>
                <h3>8周年旗舰版</h3>
                <p>
                    <a href="javascript:;">全球首款双频 GPS</a><span>|</span>
                    <a href="javascript:;">骁龙845</a><span>|</span>
                    <a href="javascript:;">AI变焦双摄</a><span>|</span>
                    <a href="javascript:;">红外人脸识别</a>
                </p>
                <div class="price">
                    <span>¥<em>2599</em><del>¥2999</del></span>
                </div>
            </div>
            <div class="item-bg-2"></div>
            <div class="item-bg-3"></div>
            <div class="item-swiper">
                <swiper :options="swiperOption" class="product-swiper">
                    <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <p class="desc">小米8 AI变焦双摄拍摄</p>
            </div>
            <div class="item-video">
                <h2>60帧超慢动作摄影<br>慢慢回味每一瞬间的精彩</h2>
                <p>后置960帧电影般超慢动作视频，将眨眼间的每秒展现得淋漓尽致！<br>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
                <!-- <div class="video-bg" @click="showSlide = true"></div> -->
                <div class="video-bg" @click="showSlide = 'slideDown'"></div>
                <div class="video-box">
                    <!-- <div class="overlay" v-if="showSlide"></div> showSlide为true时，遮罩层出现；false时，遮罩层去除 -->
                    <div class="overlay" v-if="showSlide == 'slideDown'"></div> <!-- showSlide为slideDown时，遮罩层出现；否则，遮罩层去除 -->
                    <!-- <div class="video" v-bind:class="{'slide':showSlide}"> 不可以用v-if，动画效果会失效。用动态绑定的方式添加slide 这个class，当showSlide为true时就有这个class，false则无 -->
                    <div class="video" v-bind:class="showSlide"> 
                        <!-- animation时这里就不能用class的方式了，绑定class时：通常是数组的方式去绑定，或者object的方式去绑定，
                            transition方法就是用布尔值
                            但是animation那里有三个值 '' slideUp slideDown ，所以这里我们就可以用数组 或者字符串，丢一个字符串进去，直接去绑定变量本身
                         -->
                        <!-- <span class="icon-close" @click="showSlide = false"></span> -->
                        <span class="icon-close" @click="showSlide = 'slideUp'"></span>
                        <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>  
                        <!-- 一般autoplay就可以实现自动播放了，但是这里可能因为兼容性问题，必须加上muted才能自动播放 
                                        ⭐官方文档上写了： Muted autoplay is always allowed 但autoplay有条件 -->
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    // 1. 引入组件 
    import ProductParam from './../components/ProductParam'
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    // import 'swiper/css/swiper.css'
    export default {
        name:'product',
        // 2. 定义组件
        components:{
            // 3. 加载组件
            ProductParam,

            Swiper,
            SwiperSlide
        },
        data(){
            return{
                // showSlide:false,//控制动画效果 //默认false，即无模态框
                showSlide:'',//控制动画效果 //默认没有这个属性，可以控制它Down或Up
                swiperOption:{
                    // 设置自动轮播
                    autoplay:true,
                    slidesPerView:3,
                    spaceBetween:19,
                    freeMode:true,
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    }

                }
            }
        }
    }
</script>
<style lang="scss">
    @import './src/assets/scss/config.scss';
    @import './src/assets/scss/mixin.scss';
    .product{
        .h{
            height: 150px;
        }
        button{
            margin-left: 10px;
        }
        .content{
            .item-bg{
                background: url('/imgs/product/product-bg-1.png') no-repeat center;
                height: 718px;
                text-align: center;
                h2{
                    font-size: 80px;
                    font-weight: bold;
                    color: $colorB;
                    padding-top: 55px;
                }
                h3{
                    font-size: 24px;
                    font-weight: bold;
                    color: $colorB;
                    padding-top: 13px;
                    letter-spacing: 10px;
                }
                p{
                    margin-top: 20px;
                    a{
                        color: $colorB;
                        font-size: 16px;
                    }
                    span{
                        margin: 0 15px;
                    }
                }
                .price{
                    margin-top: 30px;
                    font-size: 30px;
                    em{
                        margin-left: 6px;
                        font-style: normal;
                        font-size: 38px;
                    }
                    del{
                        margin-left: 18px;
                        font-size: 26px;
                    }
                }
            }
            .item-bg-2{
                background: url('/imgs/product/product-bg-2.png') no-repeat center;
                height: 480px;
                background-size: auto 347px ;
            }
            .item-bg-3{
                background: url('/imgs/product/product-bg-3.png') no-repeat center;
                height: 638px;
                background-size: auto 638px;
            }
            .item-swiper{
                max-width: 1920px;
                margin: 36px auto 52px;
                .desc{
                    font-size: 18px;
                    color: $colorB;
                    text-align: center;
                    margin-top: 20px;
                    font-weight: bold;
                }
                img{
                    width: 100%;
                }
                .product-swiper{
                    padding-bottom: 31px;
                }
            }
            .item-video{
                max-width: 1920px;
                margin:auto;
                height: 1044px;
                background-color: #070708;
                color: $colorG;
                text-align: center;
                h2{
                    font-size: 60px;
                    padding-top: 82px;
                    margin-bottom: 47px;
                }
                p{
                    font-size: 24px;
                    margin-bottom: 58px;
                    font-weight: bold;
                }
                .video-bg{
                    background:url('/imgs/product/gallery-1.png') no-repeat center;
                    background-size: cover; //?
                    width: 1226px;
                    height: 540px;
                    margin: 0 auto 120px;
                    cursor: pointer;
                }
                .video-box{
                    .overlay{
                        @include position(fixed);
                        background-color: $colorB;
                        opacity: .4;
                        z-index: 10;
                    }
                    @keyframes slideDown{
                        // slideDown里面一般会有一个过渡
                        // transition里面就是过渡，animation里面要用比例，从0%👉20%👉30%👉...👉100%，这个过程中属性要发生什么样的变化，循着什么样的路径、轨迹移动
                        // 同时简单的效果也可以用from to，实现从哪到哪的效果。
                        // 这里的下拉就是top从-50%到50%，所以用from to 即可满足
                        from{
                            top: -50% ;
                            opacity: 0;
                        }
                        to{
                            top: 50%;
                            opacity: 1;
                        }
                    }
                    @keyframes slideUp{
                        from{
                            top: 50% ;
                            opacity: 1;
                        }
                        to{
                            top: -50%;
                            opacity: 0;
                        }
                    }
                    .video{
                        position: fixed;
                        top: -50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        z-index: 10;
                        width: 1000px;
                        height: 536px;
                        opacity: 0;
                        // // 指定transition使slide生效
                        // transition:all .6s;
                        // &.slide{
                        //     top: 50%;
                        //     opacity: 1;
                        // }
                        &.slideDown{
                            animation: slideDown .6s linear;
                            top: 50%;
                            opacity: 1;
                        }
                        &.slideUp{
                            animation: slideUp .6s linear;
                        }
                        
                        video{
                            width: 100%;
                            height: 100%;//使之撑满整个容器
                            object-fit: cover;//覆盖video自带的样式，object-fit类似background-size，cover是指让视频覆盖整个窗口
                            outline: none; //去除video内置样式，避免产生干扰
                        }

                        .icon-close{
                            position: absolute;
                            top: 20px;
                            right: 20px;
                            @include bgImg(20px,20px,'/imgs/icon-close.png');
                            cursor: pointer;
                            z-index: 11;
                        }
                        
                    }
                }
            }
        }
        
    }
</style>