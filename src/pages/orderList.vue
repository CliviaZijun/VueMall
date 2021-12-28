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
export default {
    name:'order-list',
    components:{//注册
        OrderHeader,
        Loading,
        NoData
    },
    data(){
        return{
            loading:true,
            list:[]
        }
    },
    mounted(){
        this.getOrderList();
    },
    methods:{
        getOrderList(){
            this.axios.get('/orders').then((res)=>{
                this.loading = false;
                this.list = res.list;
            }).catich(()=>{
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
        }
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
                                    font-size: $fontG;
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
            }
        }
    }
</style>