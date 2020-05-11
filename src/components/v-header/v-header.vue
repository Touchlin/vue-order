<template>
    <div class="header" @click="showDetail">
        <div class="header_top">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="header_bottom">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </div>

</template>

<script>
import supportIco from '../support-ico/support-ico'
export default {
    name: 'v-header',
    props: {
        seller: {
            type: Object,
            default() {
                return {

                }
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        showDetail() {
            this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
                $props: {
                    seller: 'seller'
                }
            })
            this.headerDetailComp.show()
        }
    },
    components: {
        supportIco
    }
}
</script>

<style lang="stylus">
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"

    .header
        position relative
        color :#fff
        background : $color-background-ss
        overflow :hidden
        .header_top
            position :relative
            padding: 24px 12px 18px 24px
            .avatar
                display :inline-block
                width :64px
                height :64px
                vertical-align :top
                img
                    border-radius :2px
            .content
                margin-left :16px
                margin-top :2px
                display :inline-block
                .title
                    margin-bottom :10px
                    .brand
                        margin-right :6px
                        display :inline-block
                        vertical-align :top
                        width :30px
                        height :18px
                        bg-image :('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        font-size :18px
                        line-height :18px
                        font-weight :bold
                        color: rgb(255,255,255)
                .description
                    margin-bottom :10px
                    font-size :12px
                    line-height 12px
                    color :rgb(255,255,255)
                    font-weight :200
                .support
                    display: flex
                    align-items: center
                    .support-ico
                        margin-right :4px
                    .text
                        display :inline-block
                        font-size :10px
                        line-height :12px
                        color :rgb(255,255,255)
                        font-weight :400
            .support-count
                display :flex
                align-items :center
                position :absolute
                right :12px
                bottom :18px
                padding : 0 8px
                background :rgba(0,0,0,.2)
                height :24px
                line-height :24px
                border-radius :14px
                font-size :10px
                color :rgb(255,255,255)
                font-weight :200
                text-align center
                .count
                    margin-right :2px
                .icon-keyboard_arrow_right
                    font-size :10px
        .header_bottom
            height :28px
            line-height :28px
            padding :0 12px 0 12px
            display :flex
            align-items :center
            background-color :rgba(1,17,27,.2)
            .bulletin-title
                flex: 0 0 22px
                width :22px
                height :12px
                bg-image :('bulletin')
                background-size : 22px 12px
                background-repeat : no-repeat
                margin-right :4px
                margin-bottom :1px
            .bulletin-text
                white-space :nowrap
                overflow :hidden
                text-overflow :ellipsis
                font-size :10px
                font-weight :400
                margin-right :4px
            .icon-keyboard_arrow_right
                flex: 0 0 10px
                width: 10px
                font-size: 12px
        .background
            position :absolute
            right :0
            left :0
            top :0
            width :100%
            height :100%
            z-index :-1
            filter :blur(10px)
</style>
