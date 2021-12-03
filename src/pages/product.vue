<template>
    <div class="product">
        <!-- 4. 引用组件 -->
        <product-param>
            <template v-slot:buy>
                <button class="btn">立即购买</button>
            </template>
        </product-param>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
        <div class="h">123</div>
    </div>
</template>
<script>
    // 1. 引入组件 
    import ProductParam from './../components/ProductParam'
    export default {
        name:'product',
        // 2. 定义组件
        components:{
            // 3. 加载组件
            ProductParam
        }
    }
</script>
<style lang="scss">
    .product{
        .h{
            height: 150px;
        }
        button{
            margin-left: 10px;
        }
    }
</style>