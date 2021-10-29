<template>
    <div class="service">
        <div class="container">
            <ul>
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-7day"></span>7天无理由退货</li>
                <li><span class="icon-15day"></span>15天免费换货</li>
                <li><span class="icon-post"></span>满150元包邮</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'service-bar'
}
</script>
<style lang="scss">
@import './src/assets/scss/config.scss';
@import './src/assets/scss/mixin.scss';
    .service{
        padding: 33px 0;
        color: $colorC;
        font-size: 16px;
        li{
            display: inline-block;
            width: 24.9%;//一般将25%写成24.9%/24.8%，因为浏览器之间有差异，正好25%的话有时会将元素挤下来一点。
            text-align: center;
            border-right: 1px solid $colorH;
            span{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;//并列元素对齐
                margin-right: 8px;
            }
            .icon-setting{
                @include bgImg(20px,20px,'/imgs/icon-setting.png');
            }
            .icon-7day{
                @include bgImg(20px,20px,'/imgs/icon-7day.png');
            }
            .icon-15day{
                @include bgImg(20px,20px,'/imgs/icon-15day.png');
            }
            .icon-post{
                @include bgImg(20px,20px,'/imgs/icon-post.png');
            }
        }
        :last-child{
            border-right: none;
        }

    }
</style>