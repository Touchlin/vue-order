<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li :key="index" class="menu-item" v-for="(item, index) in goods" :class="{'current':currentIndex == index}" @click.stop="selectIndex(index)">
          <span class="text">
            <support-ico :size="3" :type="item.type" v-show="item.type > 0"></support-ico>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrap" ref="foodWrap">
      <ul class="food-ul">
        <li :key="index" class="food-list food-hook" v-for="(item, index) in goods">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li :key="index" class="food-item" v-for="(food, index) in item.foods" @click="selcetfoodsOption(food)">
              <div class="icon">
                <img :src="food.icon" height="57" width="57" />
              </div>
              <div class="content">
                <div class="name">{{ food.name }}</div>
                <div class="descript" v-show="food.description">{{ food.description }}</div>
                <div class="ex-descript">
                  <span class="extra">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now-p">¥{{ food.price }}</span>
                  <span class="old-p">{{ food.oldPrice }}</span>
                </div>
                <div class="cart-wrapper">
                  <cartcontrol @add="onadd" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <foodDetail :food="selectOptions" ref="foodDetail" @add="onadd"></foodDetail>
    <shopcart ref="shopCart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
  </div>
</template>

<script>
import { goods } from 'api'
import supportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import foodDetail from '../food-detail/food-detail'

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectOptions: {}
    }
  },
  methods: {
    getGoods() {
      goods().then(res => {
        this.goods = res
      })
    },
    // 给需要滚动的区域在生命周期函数（create/mounted）里执行一次
    getBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrap, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrap, {
        click: true,
        // 监听滚动
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        // pos.y是一个负值，需要转为正值方便比较
        // console.log(Math.abs(Math.round(pos.y)))
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    getListHeight() {
      const foodList = this.$refs.foodWrap.getElementsByClassName('food-hook')
      let heigh = 0
      this.listHeight.push(heigh)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        heigh += item.clientHeight
        this.listHeight.push(heigh)
      }
      // console.log(this.listHeight)
    },
    selectIndex(index) {
      // console.log(index)
      const foodlist = this.$refs.foodWrap.getElementsByClassName('food-hook')
      this.foodScroll.scrollToElement(foodlist[index], 300)
    },
    onadd(el) {
      this.$refs.shopCart.drop(el)
    },
    selcetfoodsOption(food) {
      this.selectOptions = food
      this.$refs.foodDetail.show()
    }
  },
  components: {
    supportIco,
    shopcart,
    cartcontrol,
    foodDetail
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      const result = []
      if (this.goods.length === 0) {
        return [{ price: 0, count: 0 }]
      } else {
        this.goods.forEach(item => {
          item.foods.forEach(food => {
            if (food.count) {
              result.push(food)
            }
          })
        })
        return result
      }
    }
  },
  created() {
    this.getGoods()
    // 设置超时获取，不然无法计算高度
    setTimeout(() => {
      this.$nextTick(() => {
        this.getBScroll()
        this.getListHeight()
      })
    }, 100)
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin'

.goods
  position: absolute
  top: 176px
  bottom :48px;
  width:100%
  // height :444px
  display: flex
  overflow hidden
  .menu-wrap
    flex: 0 0 80px;
    background-color: #f3f5f7
    .menu-item
      // display :flex
      // align-items :center
      display: table
      width: 56px
      height: 54px
      padding: 0 12px
      &.current
        position relative
        z-index :10
        background-color :#fff
        font-weight :700
        margin-top :-1px
        .text
          border-none()
      .text
        display: table-cell
        vertical-align: middle
        width: 56px
        font-size: 12px
        line-height: 14px
        font-weight: 200
        border-1px(rgba(7, 17, 27, 0.1))
        .support-ico
          vertical-align: -2px
  .food-wrap
    flex: 1
    .food-list
      .title
        height :26px
        line-height :26px
        padding-left :19px
        font-size :12px
        background-color :#f3f5f7
        border-left :2px solid #d9dde1
        color :rgb(147,153,159)
      .food-item
        display :flex
        margin: 18px
        padding-bottom :18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          flex : 0 0 57px
          margin-right :10px
        .content
          flex :1
          .name
            font-size :14px
            line-height :14px
            color :rgb(7,17,27)
            margin-top :2px
            margin-bottom :8px
          .descript
            font-size :10px
            line-height :13px
            color :rgb(147,153,159)
            margin-bottom :8px
          .ex-descript
            font-size :10px
            line-height :10px
            color :rgb(147,153,159)
            margin-bottom :6px
            .extra
              margin-right :12px
          .price
            font-weight :normal
            line-height :14px
            .now-p
              color :rgb(240,20,20)
              margin-right :8px
              font-size :14px
            .old-p
              color :rgb(147,153,159)
              font-size :10px
              text-decoration :line-through
          .cart-wrapper
            position :absolute
            bottom :10px
            right :0
</style>
