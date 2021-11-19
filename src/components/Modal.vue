<template>
    <div class="modal" v-show="showModal">  <!-- v-show也可以放在外面，但是这里因为要结合transition，所以最好放在里面，否则动画容易失效 -->
        <!-- 遮罩层 -->
        <div class="mask"></div>
        <!-- 弹框 -->
        <div class="modal-dialog">
            <!-- 头部 -->
            <div class="modal-header">
                <span>标题</span>
                <!-- javascript:; 防止跳转和刷新 -->
                <a href="javascript:;" class="icon-close"></a>
            </div>
            <!-- 内容 -->
            <div class="modal-body">
                <!-- body要做成动态的，因为里面的东西不确定，可能是文本也可能是表单等 -->
                <!-- 用插槽的方式才能做成动态的。  -->
                <slot name="body"></slot>
            </div>
            <!-- 底部 -->
            <div class="modal-footer">
                <div class="btn-group">
                    <!-- footer也要做成动态的，因为下方不一定有几个按钮 -->
                    <a href="javascript:;" class="btn">确定</a>
                    <a href="javascript:;" class="btn btn-default">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 定义参数
    export default {
        name:'modal',
        // 一定把能抽取的变量抽取出来
        props:{
            // body中的框有不同的尺寸，∴可以定义文本框的类型，便于后续指定
            // 弹框类型：小small、中middle、大large、表单form
            modalType:{
                type:String,
                default:'form'
            },
            // 弹框标题
            title:String,
            //按钮类型：1：确定按钮 2：取消按钮 3：确定&取消
            btnType:String,
            sureText:{
                type:String,
                default:'确定'
            },
            cancelText:{
                type:String,
                default:'取消'
            },
            // 👇是否展示弹框，用于做动画，动画要在组件里去控制，要在最前面加一个v-show来控制动画
            showModal:{
                type:Boolean,
                default:true
            }
        }
    }
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>