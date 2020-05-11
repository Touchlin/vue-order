<template>
    <div class="sure-box">
        <div class="order-top">
            <div class="return-icon" @click="back">
                <i class="icon-arrow_lift"></i>
            </div>
            <div class="text">{{text}}</div>
        </div>
        <div class="sure-order" ref="sureOrder">
            <div class="order-wrapper">
                <!-- <split></split> -->
                <div class="address-time">
                    <div class="adderss-list" @click="showHarvest">
                        <span class="streetName">{{defaultAddress.streetName}}</span>
                        <span class="userName">{{defaultAddress.userName}}</span>
                        <span class="tel">{{defaultAddress.tel}}</span>
                        <span class="icon-keyboard_arrow_right"></span>
                    </div>
                    <div class="arriveTime">
                        <selectList textColor="#00a0dc">
                            <template v-slot:text>
                                <span>立即送出</span>
                            </template>
                            <template v-slot:describe>
                                <span class="blue">约{{time}}送达</span>
                            </template>
                        </selectList>
                    </div>
                    <div class="pay">
                        <selectList>
                            <template v-slot:text>
                                <span>支付方式</span>
                            </template>
                            <template v-slot:describe>
                                <span class="blue">支付宝</span>
                            </template>
                        </selectList>
                    </div>
                </div>
                <split></split>
                <div class="seller-order">
                    <h2 class="title">{{seller.name}}</h2>
                    <h2 class="title-desc">您的主食点了吗？</h2>
                    <ul class="goods-list">
                        <li class="goods-item" v-for="(item, index) in goods" :key="index">
                            <span class="img">
                                <img :src="item.icon" alt="" width="35" height="35">
                            </span>
                            <span class="name">{{item.name}}</span>
                            <span class="count">×{{item.count}}</span>
                            <span class="oldPrice" v-show="item.oldPrice">¥{{item.oldPrice}}</span>
                            <span class="price" ref="price">¥{{item.price}}</span>
                        </li>
                    </ul>
                    <div class="deliver">
                        <span class="left">配送费-蜂鸟专送</span>
                        <span class="right">¥{{seller.deliveryPrice}}</span>
                    </div>
                    <div class="totalprice">
                        <span class="text">总计：</span>
                        <span class="price">¥{{totalPrice}} </span>
                        <span class="discount" v-show="discount >= 28">(满28-5)</span>
                    </div>
                </div>
                <split></split>
                <div class="ontime">
                    <div class="on-left">
                        <div class="top">
                            <span class="blue">准时达PLUS</span>
                            <span class="service">配送增值服务</span>
                        </div>
                        <p class="bottom">
                            超时10分钟赔付
                            <span class="money">2.16元</span>
                            红包，超时15分钟赔付
                            <span class="money">5.4元</span>
                            红包，超时30分钟赔付
                            <span class="money">15.12元</span>
                            红包
                        </p>
                    </div>
                    <div class="on-right">
                        <span class="text">¥0.21</span>
                        <span class="icon-check_circle" @click="toggleIsTime" :class="{'active': isTime}"></span>
                    </div>
                </div>
                <split></split>
                <div class="selectList-wrapper">
                    <selectList>
                    <template v-slot:text>
                        <span>订单备注</span>
                    </template>
                    <template v-slot:describe>
                        <span>点击选择无接触配送</span>
                    </template>
                    </selectList>
                </div>
                <div class="selectList-wrapper">
                    <selectList>
                    <template v-slot:text>
                        <span>餐具份数</span>
                    </template>
                    <template v-slot:describe>
                        <span>点击选择</span>
                    </template>
                    </selectList>
                </div>
                <div class="selectList-wrapper">
                    <selectList>
                    <template v-slot:text>
                        <span>发票信息</span>
                    </template>
                    <template v-slot:describe>
                        <span>该店支持线上开票，请下单写好发票信息</span>
                    </template>
                    </selectList>
                </div>
                <split></split>
            </div>
        </div>
        <orderCart :totalPrice="totalPrice" :discount="discount"  :discountPrice="discountPrice"></orderCart>

        <harvestAddress ref="harvestAddress" :address="address" @harvestAddress="changeDefaultAdd"></harvestAddress>
    </div>
</template>

<script>
// import Vue from 'vue'
import { address } from '../../api/index'
import { deliverTime } from '../../common/js/deliverTime'
import split from '../split/split'
import BScroll from 'better-scroll'
import selectList from '../select-list/select-list'
import orderCart from '../order-cart/order-cart'
import harvestAddress from '../harvest-address/harvest-address'

export default {
    name: 'sure-order',
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            address: [],
            defaultAddress: {},
            time: '',
            goods: {},
            isTime: false,
            scrollY: ''
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        getAddress() {
            address().then(res => {
                this.address = res
                this.getDefaultAddress()
            })
        },
        getDefaultAddress() {
            this.address.map(item => {
                if (item.isDefault === true) {
                    this.defaultAddress = item
                }
            })
        },
        getTime() {
            const date = new Date()
            this.time = deliverTime(date, 'HH:MM')
        },
        getGoods() {
            // console.log(this.$route.params.goods)
            this.goods = this.$route.params.goods
        },
        initScroll() {
            if (!this.sureOrder) {
                this.sureOrder = new BScroll(this.$refs.sureOrder, {
                    click: true,
                    probeType: 3
                })
                this.sureOrder.on('scroll', (pos) => {
                    // pos.y是一个负值，需要转为正值方便比较
                    // console.log(Math.abs(Math.round(pos.y)))
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            } else {
                this.sureOrder.refresh()
            }
        },
        // 准时达服务
        toggleIsTime() {
            this.isTime = !this.isTime
        },
        showHarvest() {
            this.$refs.harvestAddress.show()
        },
        changeDefaultAdd(value) {
            this.defaultAddress = value
        }
    },
    components: {
        split,
        selectList,
        orderCart,
        harvestAddress
    },
    computed: {
        totalPrice() {
            let result = 0
            this.goods.forEach(item => {
                result += item.count * item.price
            })
            if (result >= 28) {
                result = result - 5
            }
            if (this.isTime === true) {
                result += 0.21
            }
            return result + 4
        },
        discount() {
            let result = 0
            this.goods.forEach(item => {
                result += item.count * item.price
            })
            return result
        },
        discountPrice() {
            let result = 0
            this.goods.forEach(item => {
                if (item.oldPrice) {
                    result += Math.abs(item.oldPrice - item.price)
                }
            })
            return result
        },
        text() {
            // console.log(this.scrollY)
            if (this.scrollY > 70) {
                return `${this.defaultAddress.streetName}`
            } else {
                return '确认订单'
            }
        }
    },
    created() {
        this.getAddress()
        this.getGoods()
        this.getTime()
    },
    mounted() {
        this.initScroll()
    },
    activated() {
    }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';
.sure-box
    .order-top
        position: fixed
        top: 0
        left: 0
        width :100%
        z-index :11
        // background-color :#fff
        background-color :rgb(28,163,252)
        padding:10px 0
        text-align :center
        .return-icon
            position :absolute
            left: 5px
            top: 10px
            .icon-arrow_lift
                display :block
                font-size :20px
                padding: 6px
                color: #fff
        .text
            color: #fff
            font-size: 14px
            line-height :32px
    .sure-order
        position: absolute
        top: 52px
        left: 0
        bottom :48px
        width :100%
        z-index :1
        background-color :#fff
        .order-wrapper
            .address-time
                margin: 0 9px
                &.active
                    background-color :rgba(255,255,255,.1)
                .adderss-list
                    padding:18px 0
                    margin:0 18px
                    border-1px(rgba(7,17,27,.1))
                    .streetName
                        display :block
                        font-size :18px
                        font-weight :500
                        margin-bottom :6px
                    .userName
                        font-size: 12px
                        color: rgb(7,17,27)
                        margin-right :6px
                        margin-left: 2px
                    .tel
                        font-size :13px
                        color: rgb(7,17,27,.1)
                    .icon-keyboard_arrow_right
                        position :absolute
                        top: 30px
                        right: 0
                        font-size :22px
                        color: #ccc
                .arriveTime
                    padding:10px 0
                    margin :0 18px
                    border-1px(rgba(7,17,27,.1))
                    .blue
                        font-weight :500
                        color: #00a0dc
                .pay
                    padding:10px 0
                    margin :0 18px
                    .blue
                        font-weight :500
                        color: #00a0dc
            .seller-order
                padding-top: 20px
                margin: 0 18px
                font-size :14px
                .title
                    font-size :16px
                    padding-bottom :18px
                    border-1px(rgba(7,17,27,.1))
                .title-desc
                    padding:18px 0
                    border-1px(rgba(7,17,27,.1))
                    color: rgb(240,20,20)
                    font-weight :300
                .goods-list
                    .goods-item
                        padding:9px 0
                        display :flex
                        align-items :center
                        line-height :35px
                        position :relative
                        .img
                            img
                                vertical-align :top
                                border-radius :3px
                    .name
                        flex: 0 0 150px
                        width: 150px
                        margin-left :9px
                    .count
                        position :absolute
                        top: 9px
                        right: 80px
                        font-size :12px
                        @media only screen and (max-width: 320px)
                            right: 60px
                    .oldPrice
                        position :absolute
                        top: 9px
                        right: 38px
                        font-size :10px
                        color: #ccc
                        text-decoration :line-through
                        @media only screen and (max-width: 320px)
                            right: 29px
                    .price
                        position :absolute
                        top: 9px
                        right: 0
                        font-size :12px
                .deliver
                    font-size :14px
                    line-height :30px
                    padding:18px 0
                    position :relative
                    border-1px(rgba(7,17,27,.1))
                    .right
                        position :absolute
                        right: 0
                        top: 17px
                        font-size :12px
                .totalprice
                    font-size :14px
                    line-height :30px
                    padding:15px 0
                    position :relative
                    .price
                        position :absolute
                        right: 0
                        top: 16px
                        font-size :18px
            .ontime
                padding: 16px
                font-size :14px
                display :flex
                align-items :center
                position :relative
                .on-left
                    flex: 0 0 260px
                    width: 260px
                    @media only screen and (max-width: 320px)
                        flex: 0 0 200px
                        width: 200px
                        font-size :10px
                    .top
                        margin-bottom :4px
                        .blue
                            color: #00a0dc
                            margin-right :4px
                        .service
                            font-weight :600
                    .bottom
                        font-size :10px
                        font-weight :300
                        color: #666
                        .money
                            color: #000
                .on-right
                    font-size :20px
                    line-height :30px
                    flex
                    .text
                        position :absolute
                        right: 50px
                        top: 22px
                        font-size :16px
                    .icon-check_circle
                        color: #ccc
                        position :absolute
                        right: 16px
                        top: 21px
                        padding: 6px
                        &.active
                            color: #00B43C
            .selectList-wrapper
                padding:12px
                border-1px(rgba(7,17,27,.1))
</style>
