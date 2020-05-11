<template>
    <div class="ratings" ref="ratingsWrapper">
        <div class="ratings-wrapper">
            <div class="overview">
                <div class="overview-left">
                    <div class="score">{{seller.score}}</div>
                    <div class="desc">综合评分</div>
                    <div class="compare">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right ">
                    <div class="one">
                        <span class="titude">服务态度</span>
                        <star :size=36 :score=seller.serviceScore></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="one">
                        <span class="titude">服务态度</span>
                        <star :size=36 :score=seller.serviceScore></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="arrive">
                        <div class="time">送达时间<span class="deliveryTime">{{seller.deliveryTime}}分钟</span></div>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="ratings-select-wrap">
                <ratingsSelect
                    :selectType="selectType"
                    :onlyContent="onlyContent"
                    :desc="desc"
                    :ratings="ratings"
                    @updateSelectType="updateSelectType"
                    @updateSelectCon="updateSelectCon"
                >
                </ratingsSelect>
            </div>
            <div class="ratings-select-list">
                <ul>
                    <li class="select-item" v-for="(item, index) in ratings" :key="index" v-show="needShow(item.rateType, item.text)">
                        <div class="item-left">
                            <img :src="item.avatar" alt="" width="28" height="28" class="img">
                        </div>
                        <div class="item-right">
                            <div class="name-time">
                                <span class="name">{{item.username}}</span>
                                <span class="time">{{item.rateTime | formatDate}}</span>
                            </div>
                            <div class="clearfix"></div>
                            <div class="star">
                                <star :size=24 :score="item.score"></star>
                                <span class="arrive" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                            </div>
                            <div class="text">{{item.text}}</div>
                            <div class="approve">
                                <span class="icon" :class="{'icon-thumb_up':item.rateType === 0, 'icon-thumb_down':item.rateType === 1}"></span>
                                <span v-for="(recommend, index) in item.recommend" :key="index" class="recommend">
                                    {{recommend}}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ratings } from '../../api/index'
import split from '../split/split'
import star from '../star/star'
import ratingsSelect from '../ratings-select/ratings-select'
import BScroll from 'better-scroll'
import { formatDate } from '../../common/js/formatDate'

export default {
    name: 'ratings',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            selectType: 2,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            }
        }
    },
    methods: {
        getRatings() {
            ratings().then(res => {
                this.ratings = res
            })
        },
        updateSelectType(type) {
            // console.log(type)
            this.selectType = type
            this.$nextTick(() => {
                this.ratingsWrapper.refresh()
            })
        },
        updateSelectCon(value) {
            // console.log(value)
            this.onlyContent = value
            this.$nextTick(() => {
                this.ratingsWrapper.refresh()
            })
        },
        needShow(type, text) {
            // !text相当于text === ''
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === 2) {
                return true
            } else {
                return this.selectType === type
            }
        }
    },
    components: {
        split,
        star,
        ratingsSelect
    },
    computed: {
    },
    filters: {
        formatDate(value) {
            const date = new Date(value)
            return formatDate(date, 'yyyy-mm-dd HH:MM:SS')
        }
    },
    created() {
        this.getRatings()
        this.$nextTick(() => {
            if (!this.ratingsWrapper) {
                this.ratingsWrapper = new BScroll(this.$refs.ratingsWrapper, {
                    click: true
                })
            } else {
                this.ratingsWrapper.refresh()
            }
        })
    }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

 .ratings
    position: absolute
    top: 176px
    bottom :0
    left: 0
    width :100%
    overflow hidden
    .overview
        display :flex
        padding:18px 0
        .overview-left
            flex: 0 0 137px
            width :137px
            border-right :1px solid rgba(7,17,27,.1)
            text-align :center
            @media only screen and (max-width: 320px)
                flex: 0 0 120px
                width: 120px
            .score
                @media only screen and (max-width: 320px)
                    margin-top :0
                font-size :24px
                color :rgb(255,153,0)
                line-height :28px
                margin-top :6px
                margin-bottom :6px
            .desc
                font-size :12px
                color :rgb(7,17,27)
                line-height :12px
                margin-bottom :10px
            .compare
                font-size :10px
                color :#93999f
                line-height :10px
                margin-bottom :6px
        .overview-right
            flex: 1
            @media only screen and (min-width: 375px)
                padding: 6px 0 6px 24px
            @media only screen and (max-width: 320px)
                padding-left: 6px
            .one
                display :flex
                align-items :center
                font-size :13px
                color :rgb(7,17,27)
                line-height :12px
                margin-bottom :8px
                .titude
                    margin-right :12px
                .score
                    font-size :12px
                    color :rgb(255,153,0)
                    line-height :18px
                    margin-left :12px
            .arrive
                font-size :13px
                color :rgb(7,17,27)
                line-height :12px
                .deliveryTime
                    font-size :12px
                    color :#93999f
                    line-height :18px
                    margin-left :12px
    .ratings-select-list
        margin : 0 18px
        .select-item
            display :flex
            padding-bottom :18px
            padding-top:18px
            border-1px(rgba(7,17,27,.1))
            .item-left
                flex: 0 0 28px
                width :28px
                margin-right :12px
                .img
                    border-radius :50%
            .item-right
                flex: 1
                .name-time
                    width :100%
                    height :12px
                    font-size :10px
                    line-height :12px
                    .name
                        float:left
                        color :rgb(7,17,27)
                        margin-bottom :4px
                    .time
                        float: right
                        color: rgb(147,153,159)
                .clearfix
                    clear :both
                .star
                    margin-bottom :6px
                    .arrive
                        font-size :10px
                        font-weight :200
                        color :rgb(147,153,159)
                        line-height :12px
                        margin-left :6px
                .text
                    font-size :12px
                    color :rgb(7,17,27)
                    line-height :18px
                    margin-bottom :8px
                .approve
                    display :flex
                    flex-wrap: wrap
                    .icon
                        // display :inline-block
                        // vertical-align :middle
                        font-size :12px
                        line-height :16px
                        color :rgb(0,160,220)
                        margin-right :8px
                    .icon-thumb_down
                        color: rgb(183,187,191)
                    .recommend
                        border:1px solid rgba(7,17,27,.1)
                        border-radius :2px
                        font-size :9px
                        color :rgb(147,153,159)
                        line-height :16px
                        padding: 0 6px
                        margin: 0 12px 6px 0
                        overflow :hidden
</style>
