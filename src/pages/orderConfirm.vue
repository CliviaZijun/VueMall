<template>
    <div class="order-confirm">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
            <defs>
                <symbol id="icon-add" viewBox="0 0 31 32">
                <title>add</title>
                <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 32 32">
                <title>edit</title>
                <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
                </symbol>
                <symbol id="icon-del" viewBox="0 0 32 32">
                <title>delete</title>
                <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
                <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
                <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
                <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
                </symbol>
            </defs>
        </svg>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <div class="item-address">
                        <h2 class="addr-title">收货地址</h2>
                        <div class="addr-list clearfix">
                            <div class="addr-info" v-for="(item,index) in list" :key="index"> <!-- list指的是地址列表 -->
                                <h2>{{item.receiverName}}</h2>
                                <div class="phone">{{item.receiverMobile}}</div>
                                <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                                <div class="action">
                                    <a href="javascript:;" class="fl" @click="delAddress(item)">
                                        <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                                    </a>
                                    <a href="javascript:;" class="fr">
                                        <svg class="icon icon-edit"><use xlink:href="#icon-edit"></use></svg>
                                    </a>
                                </div>
                            </div>
                            <!-- <div class="addr-info">
                                <h2>Clivia</h2>
                                <div class="phone">185****6357</div>
                                <div class="street">四川省 成都市 金牛区 育仁西路<br>茶店子客运站</div>
                                <div class="action">
                                    <a href="javascript:;" class="fl">
                                        <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                                    </a>
                                    <a href="javascript:;" class="fr">
                                        <svg class="icon icon-edit"><use xlink:href="#icon-edit"></use></svg>
                                    </a>
                                </div>
                            </div> -->
                            <div class="addr-add" @click="openAddressModal">
                                <div class="icon-add"></div>
                                <div>添加新地址</div>
                            </div>
                        </div>
                    </div>
                     <div class="item-goods">
                            <h2>商品</h2>
                            <ul>
                                <li v-for="(item,index) in cartList" :key="index">
                                    <div class="goods-name">
                                        <img v-lazy="item.productMainImage" alt="">
                                        <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                                    </div>
                                    <div class="goods-price">{{item.productPrice}}元×{{item.quantity}}</div>
                                    <div class="goods-total">{{item.productTotalPrice}}元</div>
                                </li>
                                <!-- <li>
                                    <div class="goods-name">
                                        <img src="/imgs/item-box-1.png" alt="">
                                        <span>小米8 6GB 全息幻彩紫 64GB</span>
                                    </div>
                                    <div class="goods-price">1999元x2</div>
                                    <div class="goods-total">1999元</div>
                                </li> -->
                            </ul>
                    </div>
                    <div class="item-shipping">
                        <h2>配送方式</h2>
                        <span>包邮</span>
                    </div>
                    <div class="item-invoice">
                        <h2>发票</h2>
                        <a href="javascript:;">电子发票</a>
                        <a href="javascript:;">个人</a>
                    </div>
                    <div class="detail">
                        <div class="item">
                            <span class="item-name">商品件数：</span>
                            <span class="item-val">{{countProduct}}件</span>
                        </div>
                        <div class="item">
                            <span class="item-name">商品总价：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">优惠活动：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item">
                            <span class="item-name">运费：</span>
                            <span class="item-val">0元</span>
                        </div>
                        <div class="item-total">
                            <span class="item-name">应付总额：</span>
                            <span class="item-val">{{cartTotalPrice}}元</span>
                        </div>
                    </div>
                    <div class="btn-group">
                        <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
                        <a href="javascript:;" class="btn btn-large">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <modal title="删除确认" btnType="1" :showModal="showDelModal" @cancel="showDelModal=false" @submit="submitAddress"><!-- Modal组件的自定义事件，详见Modal.vue -->
            <template v-slot:body>
                <p>您确定要删除此地址吗？</p>
            </template>
        </modal>
        <modal title="新增确认" btnType="1" :showModal="showEditModal" @cancel="showEditModal=false" @submit="submitAddress">
            <template v-slot:body>
                <div class="edit-wrap">
                    <div class="item">
                        <!-- 双向绑定：也是与react的一大区别 -->
                        <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName"> <!-- 可以直接绑定receiverName，但是这样比较复杂，死板，不够灵活，我们可以将其缩减成一个对象，用之前定义的checkedItem对象对其统一设置 -->
                        <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
                    </div>
                    <div class="item">
                        <!-- 省市区的级联，做三个下拉框 -->
                        <select name="province" v-model="checkedItem.receiverProvince"> <!-- 过去用jquery做的时候需要绑定id，vue就可以不用了 -->
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="河北">河北</option>
                        </select>
                        <select name="city" v-model="checkedItem.receiverCity"> 
                            <option value="北京">北京</option>
                            <option value="天津">天津</option>
                            <option value="河北">石家庄</option>
                        </select>
                        <select name="district" v-model="checkedItem.receiverDistrict"> 
                            <option value="北京">昌平区</option>
                            <option value="天津">海淀区</option>
                            <option value="河北">东城区</option>
                            <option value="天津">西城区</option>
                            <option value="河北">顺义区</option>
                            <option value="天津">房山区</option>
                        </select>
                    </div>
                    <div class="item">
                        <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
                    </div>
                    <div class="item">
                        <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>
<script>
import Modal from './../components/Modal.vue'
export default {
    name:'order-confirm',
    data(){
        return{
            list:[],//收货地址列表
            cartList:[],//购物车中需要结算的商品列表
            cartTotalPrice:0,//商品总金额
            countProduct:0, //结算商品总数
            // 删除地址功能
            checkedItem:{},//选中的商品对象
            userAction:'',//用户行为：0：新增 1：编辑 2：删除
            showDelModal:false,//是否显示删除弹框
            // 新增地址功能
            showEditModal:false,//是否显示新增/编辑弹框

        }
    },
    // mounted👉生命周期的钩子
    mounted(){
        this.getAddressList();
        this.getCartList();
    },
    methods:{
        getAddressList(){
            this.axios.get('/shippings').then((res)=>{
                this.list = res.list;
            });
        },
        openAddressModal(){
            this.userAction = 0;
            this.checkedItem = {};
            this.showEditModal = true;
        },
        delAddress(item){
            this.checkedItem = item;//保存要删除的对象
            this.userAction = 2;//删除事件
            this.showDelModal = true;
        },
        // 地址删除、编辑、新增功能
        submitAddress(){
            let {checkedItem,userAction} = this;
            let method,url,params={};
            if(userAction == 0){
                method = 'post', url = '/shippings';
            }else if(userAction == 1){
                method = 'put', url = `/shippings/${checkedItem.id}`;
            }else{
                method = 'delete', url = `/shippings/${checkedItem.id}`;
            }
            if(userAction == 0 || userAction == 1){
                let {receiverName,receiverMobile,receiverProvince, receiverCity,receiverDistrict,receiverAddress,receiverZip} = checkedItem;
                let errMsg='';
                if(!receiverName){
                    errMsg = '请输入收货人名称';
                }else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
                    errMsg = '请输入正确格式的手机号码';
                }else if(!receiverProvince){
                    errMsg = '请选择省份';
                }else if(!receiverCity){
                    errMsg = '请选择对应的城市';
                }else if(!receiverAddress || !receiverDistrict){
                    errMsg = '请输入收货地址';
                }else if(!/\d{6}/.test(receiverZip)){
                    errMsg = '请输入六位邮编';
                }
                if(errMsg){
                    this.$message.error(errMsg);
                    return;
                }
                params = {
                    /* // 如果不需要校验，可以直接定义，更简洁
                    receiverName: checkedItem.receiverName,
                    receiverMobile: checkedItem.receiverMobile,
                    receiverProvince: checkedItem.receiverProvince,
                    receiverCity: checkedItem.receiverCity,
                    receiverDistrict: checkedItem.receiverDistrict,
                    receiverAddress: checkedItem.receiverAddress,
                    receiverZip: checkedItem.receiverZip */
                    // 但是为了方便校验，还是采用了解构的方式
                    receiverName,
                    receiverMobile,
                    receiverProvince,
                    receiverCity,
                    receiverDistrict,
                    receiverAddress,
                    receiverZip
                }
            }
            this.axios[method](url,params).then(()=>{// 不需要返回值，删除成功就成功了
                this.closeModal();
                this.getAddressList();//重新拉取一次，避免并发带来的问题
                this.$message.success('操作成功');
            });//变成一个动态的请求
            // this.axios.get()
        },
        closeModal(){
            // 因为不仅showModal要设置为false，一些赋值也要还原，所以总结在一个方法里
            this.checkedItem = {};
            this.userAction = '';
            this.showDelModal = false;
            this.showEditModal = false;
        },
        getCartList(){
            this.axios.get('/carts').then((res)=>{
                let list = res.cartProductVoList;//获取购物车中所有商品数据
                this.cartTotalPrice = res.cartTotalPrice;//购物车中选中的商品总金额
                this.cartList = list.filter(item=>item.productSelected);//过滤，购物车中需要结算的商品列表
                this.cartList.map((item)=>{
                    this.countProduct += item.quantity;
                });
            })
        }
    },
    components:{
        Modal
    }
}
</script>
<style lang="scss">
    @import './src/assets/scss/config.scss';
    @import './src/assets/scss/base.scss';
    .order-confirm{
        .wrapper{
            background-color: $colorJ;
            padding-top: 30px;
            padding-bottom: 84px;
            .order-box{
                background-color: $colorG;
                padding-left: 40px;
                padding-bottom: 40px;
                .addr-title{
                    font-size: $fontG;
                    color: $colorB;
                    font-weight: 200;
                    margin-bottom: 21px;
                }
                .item-address{
                    padding-top: 38px;
                    .addr-list{
                        .addr-info,.addr-add{
                            box-sizing: border-box;
                            float: left;
                            width: 271px;
                            height: 180px;
                            border: 1px solid $colorH;
                            margin-right: 15px;
                            padding: 15px 24px;
                            font-size: $fontJ;
                            color: #757575;
                        }
                        .addr-info{
                            cursor: pointer;
                            h2{
                                height: 27px;
                                font-size: $fontH;
                                font-weight: 300;
                                color: $colorB;
                                margin-bottom: 10px;
                            }
                            .street{
                                height: 50px;
                            }
                            .action{
                                height: 50px;
                                line-height: 50px;
                                .icon{
                                    width: 20px;
                                    height: 20px;
                                    fill: $colorC;
                                    vertical-align: middle;
                                    &:hover{
                                        fill: $colorA;
                                    }
                                }
                            }
                            &.checked{
                                border: 1px solid $colorA;
                            }
                        }
                        .addr-add{
                            text-align: center;
                            color: $colorD;
                            cursor: pointer;
                            .icon-add{
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: url('/imgs/icon-add.png') #e0e0e0 no-repeat center;
                                background-size: 14px;
                                margin: 0 auto;
                                margin-top: 45px;
                                margin-bottom: 10px;
                            }
                        }
                    }
                }
            }
            .item-goods{
                margin-top: 34px;
                border-bottom: 1px solid $colorH;
                padding-bottom: 12px;
                h2{
                    border-bottom: 1px solid $colorH;
                    padding-bottom: 5px;
                }
                li{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    line-height: 40px;
                    margin-top: 10px;
                    font-size: $fontI;
                    color: $colorB;
                    .goods-name{
                        flex: 5;
                        img{
                            width: 30px;
                            height: 30px;
                            vertical-align: middle;
                        }
                    }
                    .goods-price{
                        flex: 2;
                    }
                    .goods-total{
                        padding-right: 44px;
                        color: $colorA;
                    }
                }
            }
            .item-shipping,.item-invoice{
                margin-top: 31px;
                line-height: 31px;
                h2{
                    display: inline-block;
                    margin-right: 71px;
                    font-size: $fontG;
                    width: 80px;
                }
                span,a{
                    font-size: $fontI;
                    color: $colorA;
                    margin-right: 23px;
                }
            }
            .detail{
                padding: 50px 44px 33px 0;
                border-bottom: 1px solid $colorJ;
                text-align: right;
                font-size: $fontI;
                color: $colorC;
                .item-val{
                    color: $colorA;
                    display: inline-block;
                    width: 100px;
                }
                .item{
                    line-height: 15px;
                    margin-bottom: 12px;
                }
                .item-total{
                    .item-val{
                        font-size: $fontC;
                    }
                }
            }
            .btn-group{
                margin-top: 37px;
                text-align: right;
            }
        }
        .edit-wrap{
            font-size: $fontJ;
            .item{
                margin-bottom: 15px;
                .input{
                    display: inline-block;
                    width:281px;//原本是283px，结果手机号的input突然出界下移了，不知为何，待明天重新开机看看。
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15px;
                    border: 1px solid #e5e5e5;
                    &+.input{ //兄弟元素
                        margin-left: 14px;
                    }
                }
                select{
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #e5e5e5;
                    margin-right: 15px;
                }
                textarea{
                    height: 62px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 13px 15px;
                    border: 1px solid #e5e5e5;
                }
            }
        }
    }
</style>