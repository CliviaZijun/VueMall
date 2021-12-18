<template>
    <div>
        <!-- 动态绑定title和tip -->
        <order-header :title="title">
            <template v-slot:tip>
                <span>{{tip}}</span>
            </template>
        </order-header>
        <router-view></router-view>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader.vue'
import NavFooter from './../components/NavFooter.vue'
import ServiceBar from './../components/ServiceBar.vue'

export default {
    name:'order',
    data(){
        return{
            title:'',
            tip:''
        }
    },
    components: { 
        OrderHeader,
        ServiceBar,
        NavFooter
    },
    mounted(){
        // 获取当前路由地址
        let path = this.$route.path;//当前路由地址
        if(path == '/order/confirm'){
            this.title = '确认订单';
            this.tip = '请认真核对收货地址哦';
        }else if(path == '/order/list'){
            this.title = '订单列表';
            this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
        }else if(path == '/order/pay'){
            this.title = '订单支付';
            this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
        }
        // alipay就不用了，它是用于跳转至支付宝支付页面的一个中间跳转页面，不是一个真实的页面，一个空页面
    }
    
}
</script>