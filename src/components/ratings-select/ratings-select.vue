<template>
    <div class="ratings-select">
        <div class="ratings-type">
            <div class="desc-all" :class="{'active':selectTypePlus ===2 }" @click="select(2)">
                {{desc.all}}
                <span class="text">{{ratings.length}}</span>
            </div>
            <div class="desc-pos" :class="{'active':selectTypePlus ===0 }" @click="select(0)">
                {{desc.positive}}
                <span class="text">{{POSITIVE.length}}</span>
            </div>
            <div class="desc-neg" :class="{'active':selectTypePlus ===1 }" @click="select(1)">
                {{desc.negative}}
                <span class="text">{{NEGATIVE.length}}</span>
            </div>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="icon-check_circle" :class="{'active':onlyContentPlus}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    name: 'ratings-select',
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        }
    },
    created() {
        this.selectTypePlus = this.selectType
        this.onlyContentPlus = this.onlyContent
    },
    data() {
        return {
            selectTypePlus: '',
            onlyContentPlus: ''
        }
    },
    methods: {
        select(type) {
            this.selectTypePlus = type
            this.$emit('updateSelectType', type)
        },
        toggleContent() {
            this.onlyContentPlus = !this.onlyContentPlus
            this.$emit('updateSelectCon', this.onlyContentPlus)
        }
    },
    computed: {
        POSITIVE() {
            return this.ratings.filter(item => {
                return item.rateType === POSITIVE
            })
        },
        NEGATIVE() {
            return this.ratings.filter(item => {
                return item.rateType === NEGATIVE
            })
        }
    },
    components: {}
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

.ratings-select
    .ratings-type
        padding:18px 0
        margin: 0 18px
        border-1px(rgba(7,17,27,.1))
        .desc-all
            display :inline-block
            padding:8px 12px
            margin-right :8px
            font-size :12px
            color: rgb(77,85,93)
            line-height :16px
            background-color :rgba(0,160,220,.2)
            border-radius :2px
            &.active
                color :#fff
                background-color :rgb(0,160,220)
            .text
                font-size :10px
        .desc-pos
            display :inline-block
            padding:8px 12px
            margin-right :8px
            font-size :12px
            color: rgb(77,85,93)
            line-height :16px
            background-color :rgba(0,160,220,.2)
            border-radius :2px
            &.active
                color :#fff
                background-color :rgb(0,160,220)
            .text
                font-size :10px
        .desc-neg
            display :inline-block
            padding:8px 12px
            font-size :12px
            color: rgb(77,85,93)
            line-height :16px
            background-color :rgba(77,85,93,.2)
            &.active
                color :#fff
                background-color :rgba(77,85,93,.6)
            .text
                font-size :10px
    .switch
        display :flex
        align-items :center
        padding: 12px 0
        color :rgb(147,153,159)
        border-1px(rgba(7,17,27,.1))
        .icon-check_circle
            font-size :24px
            color :rgb(147,153,159)
            margin-right :4px
            margin-left :18px
            &.active
                color :#00c850
        .text
            font-size :12px
</style>
