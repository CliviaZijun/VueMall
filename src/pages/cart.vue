<template>
    <div class="cart">
        <order-header title="我的购物车">
            <!-- 在内部进行插槽传递 -->
            <template v-slot:tip>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="cart-box">
                    <div class="cart-container">
                        <ul class="cart-item-head">
                            <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
                            <li class="col-3">商品名称</li>
                            <li class="col-1">单价</li>
                            <li class="col-2">数量</li>
                            <li class="col-1">小计</li>
                            <li class="col-1">操作</li>
                        </ul>
                        <ul class="cart-item-list">
                            <li class="cart-item" v-for="(item,index) in list" :key="index">
                                <div class="item-check">
                                    <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
                                </div>
                                <div class="item-name">
                                    <img v-lazy="item.productMainImage" alt="">
                                    <span>{{item.productName+'，'+item.productSubtitle}}</span>
                                </div>
                                <div class="item-price">{{item.productPrice}}</div>
                                <div class="item-num">
                                    <div class="num-box">
                                        <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                                        <span>{{item.quantity}}</span>
                                        <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                                    </div>
                                </div>
                                <div class="item-total">{{item.productTotalPrice}}元</div>
                                <div class="item-del" @click="delProduct(item)"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="order-wrap clearfix">
                    <div class="cart-tip fl">
                        <a href="/">继续购物</a>
                        共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
                    </div>
                    <div class="total fr">
                        合计：<span>{{cartTotalPrice}}</span>元
                        <a href="javascript:;" class="btn" @click="order">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
        <modal
            title="提示"
            sureText="确认删除"
            btnType="3"
            modaLType="middle"
            :showModal="showModal"
            v-on:submit="confirmDelProduct"
            v-on:cancel="showModal=false"
            >
            <template v-slot:body>
                <p>是否确认将该商品移出购物车？</p>
            </template>

        </modal>
    </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader.vue'
import NavFooter from './../components/NavFooter.vue'
import ServiceBar from './../components/ServiceBar.vue'
import Modal from './../components/Modal.vue'

export default {
    name:'cart',
    components:{
        OrderHeader,
        ServiceBar,
        NavFooter,
        Modal
    },
    data(){
        return{
            list:[],//商品列表
            allChecked:false,//是否全选
            cartTotalPrice:0,//商品总金额
            checkedNum:0,//选中商品的数量
            cartTotalQuantity:0,//购物车商品总数
            showModal:false,
            tempId:0//用于临时保存待确认删除商品的ID
        }
    },
    mounted(){
        this.getCartList();
    },
    methods:{
        // 获取接口数据
        getCartList(){
            // 拉取的时候没有参数，直接指定返回值
            this.axios.get('/carts').then((res)=>{
                /* this.list = res.cartProductVoList || [];//没有返回的话返回空数组
                this.allChecked = res.selectedAll;
                this.cartTotalPrice = res.cartTotalPrice;
                this.checkedNum = this.list.filter(item=>item.productSelected).length;//ES6的简写形式，适用于只有一句代码的情况，全写形式如下👇
                // this.checkedNum = this.list.filter(item=>{
                //     return item.productSelected;
                // });*/
                this.renderData(res);
            }) 
            
        },
        // 全选&取消
        toggleAll(){
            let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
            this.axios.put(url).then((res)=>{
                this.renderData(res);
                /* this.list = res.cartProductVoList || [];
                // 但仅仅到这里会出现延迟，要给list allChecked cartTotalPrice checkNum等重新赋值，否则不发生变化。
                this.allChecked = res.selectedAll;
                this.cartTotalPrice = res.cartTotalPrice;
                this.checkedNum = this.list.filter(item=>item.productSelected).length; */
                
            })
        },
        // 抽取重复部分
        renderData(res){
            // 由于上面两个方法有重复部分，可以抽取一下
            this.list = res.cartProductVoList || [];
            // 但仅仅到这里会出现延迟，要给list allChecked cartTotalPrice checkNum等重新赋值，否则不发生变化。
            this.allChecked = res.selectedAll;
            this.cartTotalPrice = res.cartTotalPrice;
            this.checkedNum = this.list.filter(item=>item.productSelected).length;
            // 更新vuex
            this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
        },
        // 数量的加减 以及 单个商品选中&取消
        updateCart(item,type){
            let quantity = item.quantity,
                selected = item.selected;
            // 商品数量加减
            if(type == '-'){ 
                if(quantity == 1){
                    alert("商品至少保留一件");//后续会用elementUI替换掉
                    return;
                }
                --quantity;
            }else if(type == '+'){
                if(quantity > item.productStock){
                    alert("购买数量不能超过库存数量");
                    return;
                }
                ++quantity;
            //单个商品选中&取消
            }else{  
                selected = !item.productSelected;
            }
            this.axios.put(`/carts/${item.productId}`,{
                quantity,
                selected
            }).then((res)=>{
                this.renderData(res);
            });
        },
        // 删除购物车商品
        delProduct(item){
            this.showModal = true;
            this.tempId = item.productId;
            /* this.axios.delete(`/carts/${item.productId}`).then((res)=>{
                this.renderData(res);
            }); */
        },
        // 确认删除商品
        confirmDelProduct(tempId){
            tempId = this.tempId;
            this.axios.delete(`/carts/${tempId}`).then((res)=>{
                this.renderData(res);
            }); 
            this.tempId = 0;
            this.showModal = false;
        },
        // 购物车下单
        order(){
            // 方法1：
            let isCheck = this.list.every(item=>!item.productSelected);//没有任何商品被选中,返回布尔值
            if(isCheck){
                alert("请选择一件商品");
            }else{
                this.$router.push('/order/confirm');
            }
            /* //方法2：
            let checkedNum = this.checkedNum;
            if(checkedNum == 0){
                alert("请选择一件商品");
            }else{
                this.$router.push('/order/confirm');
            } */
        }
    }
}
</script>
<style lang="scss">
    @import './../assets/scss/config.scss';
    .cart{
        .wrapper{
            background-color: $colorJ;
            padding-top: 30px;
            padding-bottom: 114px;
            .cart-box{
                background-color: $colorG;
                font-size: $fontJ;
                color: &colorD;
                text-align: center;
                .cart-container{
                    width: 1140px;
                    position: relative;
                    margin-left: auto;
                    margin-right: auto;
                    .checkbox{
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        border: 1px solid $colorH;
                        vertical-align: middle;
                        margin-right: 17px;
                        cursor: pointer;
                        &.checked{
                            background: url('/imgs/icon-gou.png') $colorA no-repeat center;
                            background-size: 16px 12px;
                            border: none;
                        }
                    }
                    .cart-item-head{
                        display: flex;
                        height: 79px;
                        line-height: 79px;
                        .col-1{
                            flex: 1;
                        }
                        .col-2{
                            flex: 2;
                        }
                        .col-3{
                            flex: 3;
                        }
                    }
                    .cart-item-list{
                        .cart-item{
                            display: flex;
                            align-items: center;
                            height: 125px;
                            border-top: 1px solid $colorH;
                            font-size: $fontI;
                            .item-check{
                                flex: 1;
                                .checkbox{
                                    margin-right: 40px;
                                }
                            }
                            .item-name{
                                flex: 3;//针对父类
                                font-size: $fontH;
                                color: $colorB;
                                display: flex;//自身
                                align-items: center;
                                img{
                                    width: 80px;
                                    height: 80px;
                                    vertical-align: middle;
                                }
                                span{
                                    margin-left: 30px;
                                }
                            }
                            .item-price{
                                flex: 1;
                                color: $colorB;
                            }
                            .item-num{
                                flex: 2;
                                .num-box{
                                    display: inline-block;
                                    width: 150px;
                                    height: 40px;
                                    line-height: 40px;
                                    border: 1px solid $colorH;
                                    font-size: $fontJ;
                                    a{
                                        display: inline-block;
                                        color: $colorB;
                                        width: 50px;
                                    }
                                    span{
                                        display: inline-block;
                                        width: 50px;
                                        color: $colorB;
                                    }
                                }
                            }
                            .item-total{
                                flex: 1;
                                color: $colorA;
                            }
                            .item-del{
                                flex: 1;
                                width: 14px;
                                height: 12px;
                                background: url('/imgs/icon-close.png') no-repeat center;
                                background-size: contain;
                                cursor: pointer;
                            }
                        }
                    }
                }
                
            }
            .order-wrap{
                font-size: $fontJ;
                color: $colorC;
                margin-top: 20px;
                height: 50px;
                line-height: 50px;
                .cart-tip{
                    margin-left: 29px;
                    a{
                        color: $colorC;
                        margin-right: 37px;
                    }
                    span{
                        color: $colorA;
                        margin: 0 5px;
                    }
                }
                .total{
                    font-size: $fontJ;
                    color: $colorA;
                    span{
                        font-size: $fontE;
                    }
                    a{
                        width: 202px;
                        height: 50px;
                        line-height: 50px;
                        font-size: $fontH;
                        margin-left: 37px;
                    }
                }
            }
        }
    }
</style>