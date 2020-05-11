<template>
     <div class="cartcontrol">
        <transition name="myFade">
            <div class="cart-dec base icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decrease"></div>
        </transition>
        <transition name="myFade2">
            <div class="cart-text base" v-show="food.count > 0">{{food.count}}</div>
        </transition>
            <div class="cart-add base icon-add_circle" @click.stop="add()"></div>
    </div>
</template>

<script>
import Vue from 'vue'

const EVENT_ADD = 'add'

export default {
    name: 'cartcontrol',
    created() {
    },
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {}
    },
    methods: {
        add() {
            if (!this.food.count) {
                // this.food.count = 1
                // 实现响应式
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            this.$emit(EVENT_ADD, event.target)
        },
        decrease() {
            if (this.food.count) {
                this.food.count--
            }
        }
    },
    components: {}
}
</script>

<style lang="stylus">
.cartcontrol
    .base
        display :inline-block
        padding: 3px 6px
        font-size :22px
        line-height :22px
        color: rgb(0,160,220)
    .cart-dec
        opacity :1
        &.myFade-enter-active,&.myFade-leave-active
            transition :all 0.3s linear
        &.myFade-enter,&.myFade-leave-to
            opacity :0
            transform: translateX(24px) rotate(180deg)
    .cart-text
        opacity :1
        font-size :13px
        vertical-align :top
        color :rgb(147,153,159)
        &.myFade2-enter-active,&.myFade2-leave-active
            transition :all 0.3s linear
        &.myFade2-enter,&.myFade2-leave-to
            opacity :0
            transform: translateX(24px) rotate(180deg)
    // .cart-add
</style>
