<template>
    <div class="order-cart">
        <div class="order-wrapper">
            <div class="contentLeft">
                <div class="price">¥{{totalPrice}}</div>
                <div class="discount" v-show="tatalDisPrice">已优惠¥{{tatalDisPrice}}</div>
            </div>
            <div class="contentRight">
                <span class="text">确认支付</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order-cart',
    props: {
        totalPrice: {
            type: Number
        },
        discountPrice: {
            type: Number
        },
        // 满28-5
        discount: {
            type: Number
        }
    },
    data() {
        return {}
    },
    methods: {},
    components: {
    },
    computed: {
        tatalDisPrice() {
            let result = 0
            if (this.discount >= 28) {
                result = 5
            }
            if (this.discountPrice >= 0) {
                result += this.discountPrice
            }
            return result
        }
    }
}
</script>

<style lang="stylus">
.order-cart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 12
    background-color :#131d27
    .order-wrapper
        display :flex
        align-items :center
        .contentLeft
            flex: 1
            line-height: 48px
            color: #fff
            font-size :17px
            display :flex
            align-items :center
            .price
                display :inline-block
                padding : 0 18px
            .discount
                display :inline-block
                font-size :12px
                color: rgba(255,255,255,0.5)
                font-weight :400
                padding-left: 15px
                border-left: 1px solid rgba(255,255,255,0.1)
        .contentRight
            flex: 0 0 105px
            text-align: center
            line-height: 48px
            background-color: #00b43c;
            color: #fff
            .text
                font-size :14px
                font-weight :700
</style>
