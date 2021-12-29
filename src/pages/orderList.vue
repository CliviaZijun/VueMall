<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <loading v-if="loading"></loading>
                    <div class="order" v-for="(order,index) in list" :key="index">
                        <div class="order-title">
                            <div class="item-info fl">
                                {{order.createTime}}
                                <span>|</span>
                                {{order.receiverName}}
                                <span>|</span>
                                订单号：{{order.orderNo}}
                                <span>|</span>
                                {{order.paymentTypeDesc}}
                            </div>
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{order.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content clearfix">
                            <div class="goods-box fl">
                                <div class="goods-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                                    <div class="goods-img">
                                        <img v-lazy="item.productImage" alt="">
                                    </div>
                                    <div class="goods-name">
                                        <div class="p-name">{{item.productName}}</div>
                                        <div class="p-money">{{item.totalPrice}}元 × {{item.quantity}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="goods-state fr" v-if="order.status == 20">
                                <a href="javascript:;">{{order.statusDesc}}</a>
                            </div>
                            <div class="goods-state fr" v-else>
                                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                            </div>
                        </div>
                    </div>
                    <!-- ⭐1.分页器 -->
                    <el-pagination class="pagination"
                        background
                        layout="prev, pager, next"
                        :pageSize="pageSize"
                        :total="total"
                        @current-change="handleChange"
                        >
                    </el-pagination>
                    <!-- ⭐2.按钮加载更多 -->
                    <div class="load-more" 
                        v-if="false"
                    >
                        <el-button
                            type="primary"
                            :loading="loading"
                            v-show="showNextPage"
                            @click="loadMore"
                        >
                            加载更多
                        </el-button>
                    </div>
                    <!-- ⭐3.滚动加载 -->
                    <div class="scroll-more" 
                        v-if="false"
                        v-infinite-scroll="scrollMore"
                        infinite-scroll-disabled="busy"
                        infinite-scroll-distance="410"
                    >
                    <!-- busy:true时停止滚动，false时释放 -->
                        <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
                    </div>
                    <no-data v-if="!loading && list.length==0"></no-data>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader.vue';
import Loading from './../components/Loading.vue';
import NoData from './../components/NoData.vue';
import {Pagination,Button} from 'element-ui';//⭐1&2.分页器 & 按钮加载更多
import infiniteScroll from 'vue-infinite-scroll';//⭐3. 滚动加载
export default {
    name:'order-list',
    components:{//注册
        OrderHeader,
        Loading,
        NoData,
        [Pagination.name]:Pagination, //⭐1.分页器 动态加载变量，[Pagination.name]会获取到el-pagination，把它解析成一个字符串，然后加载组件，就可以了。
        [Button.name]:Button//⭐2.按钮加载更多
    },
    directives:{
        infiniteScroll
    },//⭐3.滚动加载更多
    data(){
        return{
            loading:true,//如果使用滚动和按钮加载更多，默认值应设为false，否则loading动画重复
            list:[],
            pageSize:10,
            pageNum:1,
            total:0,
            showNextPage:true,//⭐2.按钮加载更多是否显示按钮
            busy:false,//⭐3.滚动加载是否触发，默认会触发滚动
        }
    },
    mounted(){
        this.getOrderList();
    },
    methods:{
        getOrderList(){
            this.busy = true;//⭐3.滚动加载 初次加载订单列表时禁用滚动加载，以防一上来就加载两页
            this.axios.get('/orders',{
                params:{
                    pageNum:this.pageNum
                }
            }).then((res)=>{
                this.loading = false;
                this.list = res.list;
                this.total = res.total;
                this.busy = false;//⭐3.滚动加载 初次加载完毕后再放开滚动加载
            }).catch(()=>{
                this.loading = false;
            })
        },
        goPay(orderNo){
            // 三种路由跳转方式
            // this.$router.push('/order/pay');
            this.$router.push({
                path:'/order/pay',
                query:{
                    orderNo
                }
            })
            /*this.$router.push({
                name:'order-pay',
                query:{
                    orderNo
                }
            }) */
        },
        // ⭐1.分页器
        handleChange(pageNum){
            this.pageNum = pageNum;
            this.getOrderList();
        },
        // ⭐2.按钮加载更多
        loadMore(){
            this.pageNum++;
            this.buttonGetList();
        },
        // ⭐3.滚动加载更多
        scrollMore(){
            this.busy=true;
            setTimeout(()=>{
                this.pageNum++;
                this.scrollGetList();
            },500);
        },
        // ⭐2.按钮加载更多所使用的获取订单列表方法
        buttonGetList(){
            this.loading = true;
            this.axios.get('/orders',{
                params:{
                    pageSize:10,
                    pageNum:this.pageNum
                }
            }).then((res)=>{
                this.loading = false;
                this.list = this.list.concat(res.list);
                this.showNextPage = res.hasNextPage;
            })
        },
        // ⭐3.滚动加载更多所使用的获取订单列表方法
        scrollGetList(){
            this.loading = true;
            this.axios.get('/orders',{
                params:{
                    pageSize:10,
                    pageNum:this.pageNum
                }
            }).then((res)=>{
                this.list = this.list.concat(res.list);
                if(res.hasNextPage){
                    this.busy = false;
                }else{
                    this.busy = true;
                    this.loading = false;
                }
            })
        },
    }
}
</script>
<style lang="scss">
    @import './../assets/scss/config.scss';
    @import './../assets/scss/mixin.scss';
    .order-list{
        .wrapper{
            background-color: $colorJ;
            padding-top: 33px;
            padding-bottom: 110px;
            .order-box{
                .order{
                    @include border();
                    background-color: $colorG;
                    margin-bottom: 31px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .order-title{
                        @include height(74px);
                        background-color: $colorK;
                        padding: 0 43px;
                        font-size: $fontI;
                        color: $colorC;
                        .item-info{
                            span{
                                margin: 0 9px;
                            }
                        }
                        .money{
                            font-size: $fontD;
                            color: $colorB;
                        }
                    }
                    .order-content{
                        padding: 0 43px;
                        .goods-box{
                            width: 88%;
                            .goods-list{
                                display: flex;
                                align-items: center;
                                height: 145px;
                                .goods-img{
                                    width: 112px;
                                    img{
                                        width: 100%;
                                    }
                                }
                                .goods-name{
                                    margin-left: 10px;
                                    font-size: $fontH;
                                    color: $colorB;
                                }
                            }
                        }
                        .goods-state{
                            @include height(145px);
                            font-size: $fontG;
                            color: $colorA;
                            a{
                                color: $colorA;
                            }
                        }
                    }
                }
                .pagination{
                    text-align: right;

                }
                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: $colorA;
                }
                .el-button--primary {
                    background-color: $colorA;
                    border-color: $colorA;
                }
                .scroll-more,.load-more{
                    text-align: center;
                }
            }
        }
    }
</style>