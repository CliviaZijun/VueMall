
<template>
    <div class="index">
        <!--模块必须都在安全距离内，所以首先要用container包括一下-->
        <div class="container">
            <!-- 轮播图 -->
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
            <!-- 广告位 -->
            <div class="ads-box">
                <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
                    <!-- <img v-bind:src="item.img" alt=""> -->
                    <!-- 懒加载👇 -->
                    <img v-lazy="item.img" alt="">
                </a>
            </div>
            <!-- banner -->
            <div class="banner">
                <a href="/#/product/30">
                    <!-- <img src="/imgs/banner-1.png" alt=""> -->
                    <!-- 懒加载👇 -->
                    <img v-lazy="'/imgs/banner-1.png'" alt="">  <!-- 这里要注意，由于凡是指令后面跟的一定是变量，所以这里的地址要再用单引号引起来 -->
                </a>
            </div>
        </div>
        <!-- 商品内容区 -->
        <div class="product-box"> <!-- 因为设计稿中的灰色部分的宽是占整屏的，所以把它从container中拿出来 -->
            <div class="container"> <!-- 嵌套一个container保证商品内容在安全区域内 -->
                <h2>手机</h2>
                <div class="wrapper">
                    <div class="banner-left">
                        <a href="/#/product/35">
                            <!-- <img src="/imgs/mix-alpha.jpg" alt=""> -->
                            <!-- 懒加载👇 -->
                            <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
                        </a>
                    </div>
                    <div class="list-box">
                        <!-- 两行商品，定义两个list -->
                        <div class="list" v-for="(arr,index_i) in phoneList" v-bind:key="index_i">
                            <div class="item" v-for="(item,index_j) in arr" :key="index_j">
                                <!-- tag一般做绝对定位 -->
                                <!-- <span v-bind:class="{'new-pro':index_j%2==0}">新品</span> -->
                                <span v-if="index_j%2==0" class=new-pro>新品</span>
                                <span v-if="index_j%2==1" class=kill-pro>秒杀</span>
                                <div class="item-img">
                                    <!-- <img v-bind:src="item.mainImage" alt=""> -->
                                    <!-- 懒加载👇 -->
                                    <img v-lazy="item.mainImage" alt="">
                                </div>
                                <div class="item-info">
                                    <h3>{{item.name}}</h3>
                                    <p>{{item.subtitle}}</p><!-- 描述信息一般用p标签 -->
                                    <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                                </div>
                                
                            </div>
                        </div>
                        <div class="list"></div>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <!-- 定义一个Modal -->
        <modal 
            title="提示" 
            sureText="查看购物车" 
            btnType="1" 
            modalType="middle" 
            v-bind:showModal="showModal"
            v-on:submit="goToCart"
            v-on:cancel="showModal=false"
            >  <!-- 动态绑定showModal，后续调接口 -->
            <template v-slot:body> <!-- 新版的插槽调用要先用template包起来才能被嵌套 -->
                <p>商品添加成功！</p>
            </template>
        </modal>
    </div>
</template>
<script>
    import ServiceBar from './../components/ServiceBar.vue'
    //swiper是一个很大而全的组件，我们不需要全部引入，只需要用解构语法结构出所需组件即可
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    //同时，样式也要引入，否则不会生效
    import 'swiper/css/swiper.css'

    import Modal from './../components/Modal.vue'

    export default {
        name:'index',
        components:{
            Swiper,
            SwiperSlide,
            ServiceBar,
            Modal
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
                        shadow: false,
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
                ],
                //定义广告位所需数组
                adsList:[
                    {
                        id:33,
                        img:'/imgs/ads/ads-1.png'
                    },
                    {
                        id:48,
                        img:'/imgs/ads/ads-2.jpg'
                    },
                    {
                        id:45,
                        img:'/imgs/ads/ads-3.png'
                    },
                    {
                        id:47,
                        img:'/imgs/ads/ads-4.jpg'
                    },
                ],
                // 定义商品列表所需数组
                phoneList:[
                    // [1,1,1,1],[1,1,1,1]// 先占位，后面会以接口的方式传入数据
                ],
                showModal:false
            }
        },
        // 交互
        // 需要一个mounted来初始化商品
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.axios.get('/products',{
                    params:{
                        categoryID:100012,
                        pageSize:18
                    }
                }).then((res)=>{
                    res.list = res.list.slice(10,18);
                    this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]
                })
            },
            addCart(id){
                // this.showModal = true;
                // //下面暂时实现不了，后面再弄
                ///*                 
                this.axios.post('/carts',{
                    productId: id,
                    selected: true
                }).then((res)=>{
                    this.showModal = true; //弹框
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);//实时更新右上角购物车数量
                }).catch(()=>{
                    this.showModal = true;
                }) 
                //*/
            },
            goToCart(){
                this.$router.push('/cart')
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
        // 广告位样式
        .ads-box{
            /*
            display: flex;
            justify-content: space-between;
            */
            @include flex();
            margin-top: 14px;
            margin-bottom: 31px;
            a{
                height: 167px;
                width: 296px;
            }
        }
        // banner
        .banner{
            margin-bottom: 50px;
        }
        // 商品列表样式
        .product-box{
            background-color: $colorJ;
            padding: 30px 0 50px;
            // 先不定义高度，让内容自动把它撑开
            h2{
                font-size: $fontF;
                height: 21px;
                line-height: 21px;
                color: $colorB;
                margin-bottom: 20px;
            }
            .wrapper{
                display: flex;
                .banner-left{
                    margin-right: 16px;
                    img{
                        width: 224px;
                        height: 619px;
                    }
                }
                .list-box{
                    .list{
                        // display: flex;
                        // justify-content: space-between;
                        @include flex();
                        width: 986px;
                        margin-bottom: 14px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .item{
                            width: 236px;
                            height: 302px;
                            background-color: $colorG;
                            text-align: center;
                            span{
                                display: inline-block;//span本身是个行内元素，不设置inline-block的话背景颜色设置不上
                                width: 67px;
                                height: 24px;
                                font-size: 14px;
                                line-height: 24px;
                                color: $colorG;
                                font-weight: bold;
                                // 因为有新品和秒杀两种，所以最好定义两种标签
                                &.new-pro{
                                    background-color: #7ECF68;
                                }
                                &.kill-pro{
                                    background-color: #E82626;
                                }
                            }
                            .item-img{
                                img{
                                    height: 195px;
                                    width: 100%;
                                }                               
                            }
                            .item-info{
                                h3{
                                    font-size: $fontJ;
                                    color: $colorB;
                                    line-height: $fontJ;
                                    font-weight: bold;
                                }
                                p{
                                    color: $colorD;
                                    line-height: 13px;
                                    margin:6px auto 13px;
                                }
                                .price{
                                    font-size: $fontJ;
                                    color: #F20A0A;
                                    font-weight: bold;
                                    cursor: pointer;
                                    &:after{
                                        @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                                        content: '';//占位
                                        margin-left: 5px;
                                        vertical-align: middle;//元素齐平
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>