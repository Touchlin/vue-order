<template>
    <div class="shop">
        <div class="shopcart">
            <div class="content">
                <div class="content-left"  @click.stop="toggleListShow">
                    <div class="logo-wrap">
                        <div class="logo" :class="{'active':selectFoodsNum > 0}">
                            <span class="icon-shopping_cart" :class="{'active':selectFoodsNum > 0}"></span>
                        </div>
                        <div class="logo-num" v-show="selectFoodsNum > 0">{{selectFoodsNum}}</div>
                    </div>
                    <div class="price" :class="{'active':selectFoodsPrice > 0}">¥{{selectFoodsPrice}}</div>
                    <div class="distribution">另需配送费{{ deliveryPrice }}元</div>
                </div>
                <div class="content-right" :class="selectFoodsPrice >= 20?'active':'no-active'" @click="goPay">
                    <span class="text">{{ payPrice }}</span>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="(ball,index) in balls" :key="index">
                    <transition
                        @before-enter="beforeDrop"
                        @enter="dropping"
                        @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="myFade">
                <div class="cart-list" v-show="fold">
                    <div class="list-title">
                        <div class="title">购物车</div>
                        <div class="clearList" @click.stop="clearList">清空</div>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food-list" v-for="(item, index) in selectFoods" :key="index">
                                <div class="food-name">{{item.name}}</div>
                                <div class="food-price">¥{{item.price * item.count}}</div>
                                <cartcontrol :food="item"></cartcontrol>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="list">
            <div class="list-mask" v-show="fold" @click="toggleListShow"></div>
        </transition>
    </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

const len = 10
const innerClsHook = 'inner-hook'

function createBalls() {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push({
            show: false
        })
    }
    return arr
}
export default {
    name: 'shopcart',
    props: {
        deliveryPrice: {
            type: Number
        },
        minPrice: {
            type: Number
        },
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    created() {
        this.dropBalls = []
        // 给需要滚动的区域在生命周期函数（create/mounted）里执行一次
        this.$nextTick(() => {
            this.listContent = new BScroll(this.$refs.listContent, {
            click: true
            })
        })
    },
    data() {
        return {
            balls: createBalls(),
            fold: false
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                }
            }
        },
      beforeDrop(el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      dropping(el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      },
      afterDrop(el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleListShow() {
          if (this.selectFoodsNum === 0) {
              return
          }
          this.fold = !this.fold
        //   if (this.fold === true) {
        //       this.$nextTick(() => {
        //           if (!this.scroll) {
        //               this.menuScroll = new BScroll(this.$refs.listContent, {
        //                 click: true
        //             })
        //           } else {
        //               this.scroll.refresh()
        //           }
        //       })
        //   }
      },
      clearList() {
          this.selectFoods.forEach(item => {
              item.count = 0
          })
      },
      goPay() {
          if (this.selectFoodsPrice >= 20) {
              this.$router.push({
                  path: '/sureorder',
                  name: 'sureorder',
                  params: {
                    goods: this.selectFoods
                }
              })
          }
      }
    },
    components: {
        cartcontrol
    },
    computed: {
        selectFoodsPrice() {
            let totalprice = 0
            this.selectFoods.forEach(item => {
                totalprice += item.price * item.count
            })
            return totalprice
        },
        selectFoodsNum() {
            let count = 0
            this.selectFoods.forEach(item => {
                count += item.count
            })
            return count
        },
        payPrice() {
            if (this.selectFoodsPrice === 0) {
                return '¥20起送'
            } else if (this.selectFoodsPrice < this.minPrice) {
                const diff = this.minPrice - this.selectFoodsPrice
                return `还差¥${diff}起送`
            } else {
                return '去结算'
            }
        }
    },
    watch: {
        selectFoodsNum(val) {
            if (val === 0) {
                this.fold = false
            }
        }
    }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin'
.shopcart
    position :fixed
    bottom :0
    left :0
    z-index :50
    width :100%
    height :48px
    background-color :#131d27
    .content
        display :flex
        .content-left
            flex :1
            .logo-wrap
                display :inline-block
                position :relative
                top :-10px
                width :56px
                height :56px
                border-radius :50%
                background-color :#131d27
                margin :0 12px
                padding :6px
                box-sizing :border-box
                .logo
                    display: inline-block
                    width :100%
                    height :100%
                    border-radius :50%
                    background-color :#2b343c
                    text-align :center
                    &.active
                        background-color :rgb(0,160,220)
                    .icon-shopping_cart
                        font-size :24px
                        line-height :44px
                        color :rgba(255,255,255,.4)
                        &.active
                            color: #fff
                .logo-num
                    position :absolute
                    top: 0
                    right: 0
                    width :24px
                    height :16px
                    line-height :16px
                    text-align :center
                    border-radius :16px
                    font-size :12px
                    font-weight 700
                    color :#fff
                    background-color :rgb(240,20,20)
                    box-shadow :0 4px 8px 0 rgba(0,0,0,.4)
            .price
                display :inline-block
                font-size :18px
                font-weight :700
                line-height :48px
                color :rgba(255,255,255,.4)
                vertical-align :top
                padding-right :12px
                border-right :1px solid rgba(255,255,255,.1)
                &.active
                    color: #fff
            .distribution
                display :inline-block
                font-size :13px
                line-height :48px
                font-weight :500
                color :rgba(255,255,255,.4)
                padding-left :12px
                vertical-align :top
                @media only screen and (max-width :320px)
                    padding-left: 3px
                    font-size :10px
        .content-right
            flex:0 0 105px
            text-align :center
            line-height :48px
            &.active
                background-color :#00b43c
                color :#fff
            &.no-active
                background-color :#2b343c
                color :rgba(255,255,255,.4)
            .text
                font-size :14px
                font-weight :700
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: #00a0dc
          transition: all 0.4s linear
    .cart-list
        position :absolute
        bottom : 48px
        left: 0
        z-index :-1
        width :100%
        &.myFade-enter,&.myFade-leave-to
            opacity :0
            transform :translateY(5%)
        &.myFade-enter-active,&.myFade-leave-active
            transition :all 0.2s ease-in
        .list-title
            height :40px
            line-height :40px
            background-color :#f3f5f7
            border-1px(rgba(7,17,27,.1))
            .title
                float: left
                font-size :14px
                font-weight :200
                color :rgb(7,17,27)
                margin-left: 18px
            .clearList
                float: right
                font-size :12px
                color: rgb(0,160,220)
                margin-right :18px
        .list-content
            max-height :214px
            overflow hidden
            background-color :#fff
            .food-list
                display: flex
                align-items :center
                position :relative
                padding:8px 0
                margin :0 18px
                height :48px
                line-height :48px
                border-1px(rgba(7,17,27,.1))
                .food-name
                    font-size :14px
                    color :rgb(7,17,27)
                .food-price
                    position :absolute
                    right :95px
                    font-size: 14px
                    font-weight :normal
                    color :rgb(240,20,20)
                .cartcontrol
                    position :absolute
                    right: 0
                    line-height :24px
.list-mask
    position :fixed
    top: 0
    left :0
    z-index :40
    width :100%
    height :100%
    background-color :rgba(7,17,27,.7)
    &.list-enter,&.list-leave-to
        opacity :0
        background-color :rgba(7,17,27,0)
    &.list-enter-active,&.list-leave-active
        transition :all 0.2s ease-in
</style>
