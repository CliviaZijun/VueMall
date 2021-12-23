<template>
    <div class="ali-pay">
        <loading v-if="loading"></loading>
        <!-- v-html专门用于赋值html,因为向支付宝发请求，支付宝会给发一段html源码，我们需要把html源码赋值到div中去，然后进行提交 -->
        <div class="form" v-html="content"></div>
    </div>
</template>
<script>
import Loading from './../components/Loading.vue'
export default {
    name:'alipay',
    components:{
        Loading
    },
    data(){
        return{
            orderId:this.$route.query.orderId,
            content:'',
            loading:true
        }
    },
    mounted(){
        this.paySubmit();
    },
    methods:{
        paySubmit(){
            this.axios.post('/pay',{
                orderId:this.orderId,
                orderName:'苞米商城',
                amount:0.01,
                payType:1
            }).then((res)=>{
                this.content = res.content;
                // 自动触发跳转
                setTimeout(()=>{
                    document.forms[0].submit();//触发支付宝返回的form中的脚本
                },100)
                //因为v-html赋值需要一定的时间，所以我们不要在下面直接触发，要给它一个渲染时间
            })
        }
    }
}
</script>