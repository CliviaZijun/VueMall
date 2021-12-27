<template>
    <div class="order-pay">
        <order-header title="订单支付">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-wrap">
                    <div class="item-order">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯~</h2>
                            <p>请在<span>0小时30分</span>内完成支付，超时后将取消订单</p>
                            <p>收货信息：{{addressInfo}}</p>
                        </div>
                        <div class="order-total">
                            <p>应付总额：<span>{{payment}}</span>元</p>
                            <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail = !showDetail"></em></p>
                        </div>
                    </div>
                    <div class="item-detail" v-if="showDetail">
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div class="detail-info theme-color">{{orderId}}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{addressInfo}}</div>
                        </div>
                        <div class="item goods">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                <ul>
                                    <li v-for="(item,index) in orderDetail" :key="index">
                                        <img v-lazy="item.productImage" alt="">{{item.productName}}×{{item.quantity}}
                                    </li>
                                    <!-- <li><img v-lazy="'/imgs/item-box-1.png'" alt="">小米CC9</li>
                                    <li><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2c9307e9690dfbca39d8de770a7a8664.png" alt="">小米8 青春 全网通版 6GB内存 深空灰 64GB</li>
                                    <li><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/2c9307e9690dfbca39d8de770a7a8664.png" alt="">小米8青春版 标准高透贴膜 高透</li> -->
                                </ul>
                            </div>
                        </div>
                        <div class="item">
                            <div class="detail-title">发票信息：</div>
                            <div class="detail-info">电子发票 个人</div>
                        </div>
                    </div>
                </div>
                <div class="item-pay">
                    <h3>选择以下支付方式付款</h3>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
                        <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
                    </div>
                </div>
            </div>
        </div>
        <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
        <!-- 这里关闭事件就不能用@click绑定了，要通过自定义事件，直接@方法名，这样才能接收子组件所传递过来的 -->
        <!-- :img是因为子组件定义的名称叫img, 要将本父组件的payImg传递给子组件 -->
        <modal
            title="支付确认"
            btnType="3"
            :showModal="showPayModal"
            sureText="查看订单"
            cancelText="未支付"
            @cancel="showPayModal = false" 
            @submit="goOrderList"
        >
            <template v-slot:body>
                <p>是否已完成支付？</p>
            </template>
        </modal>
    </div>
</template>
<script>
import QRCode from 'qrcode';
import ScanPayCode from './../components/ScanPayCode.vue';
import Modal from './../components/Modal.vue';
import OrderHeader from './../components/OrderHeader.vue';
export default {
    name:'order-pay',
    data(){
        return {
            orderId:this.$route.query.orderNo,//一进页面就可以取到的内容
            addressInfo:'',//收货人地址信息
            orderDetail:[],//订单详情，包含了商品列表
            payment:0,//支付总金额
            showDetail:false,//是否显示订单详情
            payType:'',//支付类型
            showPay:false,//是否显示微信支付弹框
            payImg:'',//微信支付的二维码地址
            showPayModal:false,//是否显示二次支付确认弹框
            T:'',//定时器ID，单独声明它是为了既可以使用也可以取消
        }
    },
    components:{
        ScanPayCode,
        Modal,
        OrderHeader
    },
    mounted(){
        // 根据订单号获取商品数据
        this.getOrderDetail();
    },
    methods:{
        getOrderDetail(){
            // 取到orderNo后，发请求，调用接口拉取订单详情
            this.axios.get(`/orders/${this.orderId}`).then((res)=>{//动态路由
                // 接口的订单信息
                let item = res.shippingVo;
                this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
                this.orderDetail = res.orderItemVoList;
                this.payment = res.payment;
            })
        },
        paySubmit(payType){
            this.payType = payType;
            if(payType == 1){
                window.open('/#/order/alipay?orderId='+this.orderId,'_blank');
            }else{
                this.axios.post('/pay',{
                    orderId:this.orderId,
                    orderName:'苞米商城',
                    amount:0.01,
                    payType:2
                }).then((res)=>{
                    //通过toDataURL转换成Base64的语法，webpack会把一些小的icon转换成base64，好处是减少请求，不会有真实的图片地址，只是一个非常长的64位的字符串，这样前端访问时就不需要再去耗带宽地拉取图片请求了
                    QRCode.toDataURL(res.content)
                    .then(url => {
                        this.showPay = true;
                        this.payImg = url;
                        this.loopOrderState();//生成二维码后开始轮询
                    })
                    .catch(() => {
                        this.$message.error('微信二维码生成失败，请稍后重试');
                    })
                })
            }
        },
        goOrderList(){
            this.$router.push('/order/list');
        },
        // 关闭微信弹框
        closePayModal(){
            this.showPay = false;
            this.showPayModal = true;
            clearInterval(this.T);// 同样地，若用户关闭二维码也需要关闭定时器
        },
        //轮询当前订单支付状态 
        loopOrderState(){
            this.T = setInterval(() => {
                this.axios.get(`/orders/${this.orderId}`).then((res)=>{
                    if(res.status == 20){  //若已支付
                        clearInterval(this.T);//清掉定时器
                        this.goOrderList();//自动跳转到订单列表
                    }
                })
            }, 1000);//通常设置500ms 或者 1s都是比较合理的
        }
    }
}
</script>
<style lang="scss">
    @import './src/assets/scss/config.scss';
    .order-pay{
        .wrapper{
            background-color: $colorJ;
            padding-top: 32px;
            padding-bottom: 261px;
            .order-wrap{
                background-color: $colorG;
                padding: 62px 53px;
                font-size: $fontJ;
                margin-bottom: 30px;
                .item-order{
                    display: flex;
                    align-items: center;
                    .icon-succ{
                        // flex: 1;
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
                        background-size: 55px;
                        margin-right: 40px;
                    }
                    .order-info{
                        margin-right: 248px;
                        h2{
                            font-size: $fontE;
                            color: $colorB;
                            margin-bottom: 20px;
                        }
                        p{
                            color: $colorC;
                            span{
                                color: $colorA;
                            }
                        }
                    }
                    .order-total{
                        &>p:first-child{
                            margin-bottom: 30px;
                        }
                        span{
                            font-size: $fontC;
                            color: $colorA;
                        }
                        .icon-down{
                            display: inline-block;
                            width: 14px;
                            height: 10px;
                            background: url('/imgs/icon-down.png') no-repeat center;
                            background-size: contain;
                            margin-left: 9px;
                            cursor: pointer;
                            transition: all .5s;
                            &.up{
                                transform: rotate(180deg);
                            }
                        }
                        /* .icon-up{
                            transform: rotate(180deg);
                        } */
                    }
                }
                .item-detail{
                    border-top: 1px solid $colorF;
                    padding-top: 47px;
                    padding-left: 130px;
                    font-size: $fontJ;
                    margin-top: 45px;
                    .item{
                        margin-bottom: 19px;
                        .detail-title{
                            float: left;
                            width: 100px;
                        }
                        .detail-info{
                            display: inline-block;
                            vertical-align: middle;
                            img{
                                width: 30px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
            .item-pay{
                padding: 26px 50px 72px;
                background-color: $colorG;
                color: $colorB;
                h3{
                    font-size: $fontG;
                    font-weight: bold;
                    color: $colorB;
                    padding-bottom: 24px;
                    border-bottom: 1px solid $colorF;
                    margin-bottom: 26px;
                }
                .pay-way{
                    font-size: $fontH;
                    .pay{
                        display: inline-block;
                        width: 188px;
                        height: 64px;
                        border: 1px solid $colorF;
                        cursor: pointer;
                        &:last-child{
                            margin-left: 20px;
                        }
                        &.checked{
                            border: 1px solid $colorA;
                        }
                    }
                    .pay-ali{
                        background: url('/imgs/pay/icon-ali.png') no-repeat center;
                        background-size: 103px 38px;
                        margin-top: 19px;
                    }
                    .pay-wechat{
                        background: url('/imgs/pay/icon-wechat.png') no-repeat center;
                        background-size: 111px 33px;
                    }
                }
            }
        }
    }
</style>