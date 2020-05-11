<template>
    <transition name="myFade">
        <div class="header-detail" v-show="visible">
            <div class="detail-wrap clear-fix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrap">
                        <star :size=48 :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <!-- 不用span是因为android会出现问题 -->
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="support">
                        <li v-for="(item,index) in seller.supports" :key="index" class="support-li">
                            <support-ico :size=2 :type="item.type"></support-ico>
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <!-- 不用span是因为android会出现问题 -->
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="announce">
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hide">
                <i class="icon-close"></i>
            </div>
        </div>
    </transition>
</template>

<script>
import star from '../star/star'
import supportIco from '../support-ico/support-ico'

export default {
    name: 'header-detail',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        }
    },
    components: {
        star,
        supportIco
    }
}
</script>

<style lang="stylus">
    .header-detail
        position :fixed
        top :0
        left :0
        width :100%
        height :100%
        z-index :100
        overflow :auto
        background-color :rgba(7,17,27,.8)
        color: #fff
        // backdrop-filter: blur(10px)
        &.myFade-enter-active,&.myFade-leave-active
            transition :all 0.2s ease-in
        &.myFade-enter,&.myFade-leave-to
            opacity :0
            background-color :rgba(7,17,27,0)
        .detail-wrap
            min-height :100%
        .clear-fix
            content :""
            display :block
            clear :both
            height :0
            // visibility :hidden
            .detail-main
                padding :64px 36px
                .name
                    font-size :16px
                    line-height :16px
                    font-weight :700
                    text-align :center
                .star-wrap
                    height :24px
                    margin :16px 0 28px 0
                    text-align :center
                .title
                    display :flex
                    .line
                        flex :1
                        position :relative
                        top:-6px
                        border-bottom :1px solid rgba(255,255,255,.2)
                    .text
                        font-size :14px
                        padding: 0 12px
                        font-weight :700
                .support
                    padding :24px 12px 28px
                    .support-li
                        display :flex
                        align-items :center
                        margin-bottom :12px
                        &:last-child
                            margin-bottom :0
                        .support-ico
                            margin-right :12px
                        .text
                            font-size :12px
                            font-weight :200
                            line-height :12px
                            color :rgb(255,255,255)
                .announce
                    padding :24px 12px 0
                    line-height :24px
                    font-size :12px
                    font-weight :200
                    color :rgb(255,255,255 )
        .detail-close
            position :relative
            margin :-64px auto 0 auto
            width :32px
            height :32px
            font-size :32px
            clear :both
            color :#fff
</style>
