<template>
    <transition>
        <div class="food-detail" v-show="fdStatus" ref="foodDetail">
            <div class="food-content">
                <div class="img-wrap">
                    <img :src="food.image" alt="">
                    <div class="return-icon" @click="back">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="name">{{food.name}}</h1>
                    <div class="content-ratings">
                        <span class="out">月售{{food.sellCount}}份</span>
                        <span class="good">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="new">¥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <transition name="fade" v-if="!food.count || food.count === 0">
                        <div class="cart-old" @click="joinFood">
                            <span class="text">加入购物车</span>
                        </div>
                    </transition>
                    <div class="cart-new" v-else>
                        <cartcontrol :food="food" @add="joinFoods"></cartcontrol>
                    </div>
                </div>
                <split></split>
                <div class="food-introduce" v-show="food.info">
                    <h2 class="introduce">商品介绍</h2>
                    <p class="info">{{food.info}}</p>
                </div>
                <split v-show="food.info"></split>
                <div class="food-ratings">
                    <h2 class="title">商品评价</h2>
                    <ratingSelect
                        :ratings="food.ratings"
                        :selectType="selectType"
                        :onlyContent="onlyContent"
                        @updateSelectType="updateSelectType"
                        @updateSelectCon="updateSelectCon"
                        >
                    </ratingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings">
                            <li class="ratings-item" v-for="(item, index) in food.ratings" :key="index" v-show="needShow(item.rateType, item.text)">
                                <div class="user">
                                    <span class="name">{{item.username}}</span>
                                    <img :src="item.avatar" alt="" width="12" height="12">
                                </div>
                                <div class="time">{{item.rateTime | formatDate}}</div>
                                <div class="estimate">
                                    <span class="icon" :class="{'icon-thumb_up':item.rateType === 0, 'icon-thumb_down':item.rateType === 1}"></span>
                                    <span class="text">{{item.text}}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingSelect from '../ratings-select/ratings-select'
import { formatDate } from '../../common/js/formatDate'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
    name: 'food-detail',
    props: {
        food: {
            type: Object
        }
    },
    created() {
        this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.foodDetail, {
                    click: true
                })
            } else {
                this.scroll.refresh()
            }
        })
    },
    data() {
        return {
            fdStatus: false,
            selectType: ALL,
            onlyContent: false
        }
    },
    methods: {
        hasCount() {
            if (!this.food.count) {
                return true
            } else {
                return false
            }
        },
        show() {
            this.fdStatus = true
        },
        back() {
            this.fdStatus = false
        },
        // 组件上的间接点击事件需要event.target
        joinFood(event) {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            }
            this.$emit('add', event.target)
        },
        // 组件上的直接点击事件可以直接target
        joinFoods(target) {
            this.$emit('add', target)
        },
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === 2) {
                return true
            } else {
                return this.selectType === type
            }
        },
        updateSelectType(type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        updateSelectCon(value) {
            this.onlyContent = value
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        }
    },
    computed: {
    },
    components: {
        cartcontrol,
        split,
        ratingSelect
    },
    filters: {
        formatDate(value) {
            const date = new Date(value)
            // console.log(date)
            return formatDate(date, 'yyyy-mm-dd HH:MM:SS')
        }
    }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

.food-detail
    position :fixed
    top: 0
    // bottom :48px
    left :0
    z-index :40
    width :100%
    height :100%
    background-color :#fff
    &.v-enter,&.v-leave-to
        // opacity :0
        // background-color :rgba(0,0,0,0)
        transform :translateX(100%)
    &.v-enter-active,&.v-leave-active
        transition :all 0.3s linear
    .food-content
        //因为是异步获取图片，这样写防止抖动
        .img-wrap
            position :relative
            width :100%
            height :0
            padding-top :100%
            img
                position :absolute
                top: 0
                left :0
                width :100%
                height :100%
            .return-icon
                position :absolute
                left: 5px
                top: 10px
                .icon-arrow_lift
                    display :block
                    font-size :20px
                    padding: 6px
                    color: #fff
        .content
            padding: 18px
            position :relative
            .name
                font-size :14px
                font-weight :700
                color: rgb(7,17,27)
                line-height :14px
                margin-bottom :18px
            .content-ratings
                font-size :10px
                color :rgb(147,153,159)
                line-height :10px
                margin-bottom :18px
                .out
                    margin-right :12px
            .price
                font-size :14px
                font-weight :700
                line-height :24px
                .new
                    color: rgb(240,20,20)
                    margin-right :9px
                .old
                    color :rgb(147,153,159)
                    font-size :10px
                    text-decoration :line-through
            .cart-new
                position: absolute
                right: 18px
                bottom: 18px
            .cart-old
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                // height: 24px
                line-height: 24px
                padding: 3px 12px
                box-sizing: border-box
                border-radius: 16px
                font-size: 10px
                color: #fff
                background: rgb(0,160,220)
                opacity: 1
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.3s linear
                &.fade-enter, &.fade-leave-active
                    opacity: 0
                    // transform :translateX(-10%)
        .food-introduce
            margin: 18px
            padding-bottom :18px
            border-1px(rgba(7,17,27,.1))
            .introduce
                margin-bottom :6px
            .info
                font-size :12px
                line-height 24px
                font-weight :200
                color :rgb(77,85,93)
        .food-ratings
            padding:18px 0
            .title
                margin-left :18px
            .rating-wrapper
                padding: 16px 0
                margin: 0 16px
                .ratings-item
                    padding :16px 0
                    position :relative
                    border-1px(rgba(7,17,27,.1))
                    .user
                        position :absolute
                        right: 0
                        top: 16px
                        .name
                            margin-right :6px
                            font-size :10px
                            color :rgb(147,153,159)
                        img
                            display :inline-block
                            vertical-align :middle
                            border-radius :50%
                    .time
                        margin-bottom :6px
                        font-size :10px
                        color :rgb(147,153,159)
                        line-height :12px
                    .estimate
                        .icon
                            display :inline-block
                            font-size :12px
                            color :rgb(147,153,159)
                            line-height :24px
                            vertical-align :top
                            &.icon-thumb_up
                                color :rgb(0,160,220)
                        .text
                            display :inline-block
                            font-size :12px
                            color: rgb(7,17,27)
                            line-height :24px
                            margin-left :6px
                .no-rating
                    font-size :12px
                    // padding: 18px 0
                    color :rgb(147,153,159)
</style>
