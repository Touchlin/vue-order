<template>
  <div class="seller" ref="Seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrap">
          <star :size=36 :score="seller.score"></star>
          <span class="star-ratingCount">({{seller.ratingCount}})</span>
          <span class="star-sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="desc">
          <div class="min-price">
            <span class="top">起送价</span>
            <span class="bottom">{{seller.minPrice}}</span>
            元
          </div>
          <div class="deliver-price">
            <span class="top">商家配送费</span>
            <span class="bottom">{{seller.deliveryPrice}}</span>
            元
          </div>
          <div class="deliver-time">
            <span class="top">平均配送时间</span>
            <span class="bottom">{{seller.deliveryTime}}</span>
            分钟
          </div>
        </div>
        <div class="collect" @click="clickFavorite">
          <span class="icon icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="descrition">{{seller.bulletin}}</p>
        <ul>
          <li class="bulletin-item" v-for="(item, index) in seller.supports" :key="index">
            <supportIco :size="4" :type="item.type"></supportIco>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-img">
        <h1 class="title">商家实景</h1>
        <div class="img-wrapper" ref="imgWrapper">
          <ul class="img-list" ref="UL">
            <li class="img-item" v-for="(img, index) in seller.pics" :key="index">
              <img :src="img" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-infomation">
        <div class="title">商家信息</div>
        <ul class="info-list">
          <li class="info-item" v-for="(item, index) in seller.infos" :key="index">
            <span class="info">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import supportIco from '../support-ico/support-ico'
import BScroll from 'better-scroll'

export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite: false
    }
  },
  methods: {
    ready() {
      if (this.seller.pics) {
        const picWidth = 120
        const margin = 6
        const result = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.UL.style.width = result + 'px'
        this.$nextTick(() => {
          this.imgWrapper = new BScroll(this.$refs.imgWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
      }
    },
    clickFavorite() {
      this.favorite = !this.favorite
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split,
    supportIco
  },
  created() {
    this.$nextTick(() => {
      if (!this.Seller) {
        this.Seller = new BScroll(this.$refs.Seller, {
          click: true
        })
      } else {
        this.Seller.refresh()
      }
    })
  },
  mounted() {
    this.ready()
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

.seller
  position :absolute
  top: 176px
  bottom :0
  left :0
  width :100%
  overflow hidden
  .seller-content
    .overview
      position :relative
      padding: 18px 0
      margin: 0 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom :8px
      .star-wrap
        display :flex
        align-items :center
        font-size :10px
        color :rgb(77,85,93)
        line-height :18px
        padding-bottom :18px
        border-1px(rgba(7,17,27,.1))
        .star
          margin-top :4px
        .star-ratingCount
          margin-left :8px
          margin-right :12px
      .desc
        display :flex
        align-items :center
        text-align :center
        font-weight :200
        font-size :10px
        .min-price
          display :inline-block
          flex:1
          padding:18px 0
        .deliver-price
          display :inline-block
          flex:1
          padding:18px 0
        .deliver-time
          display :inline-block
          flex:1
          padding:18px 0
        .top
          display :block
          font-size :10px
          color :rgb(147,153,159)
          line-height :10px
          margin-bottom :8px
        .bottom
          font-size :24px
          font-weight :200
          color: rgb(7,17,27)
          line-height :24px
      .collect
        position :absolute
        top: 18px
        right: 0
        text-align :center
        .icon
          display :block
          font-size :24px
          line-height :24px
          color: rgba(7,17,27,.2)
          width :36px
          &.active
            color :rgb(240,20,20)
        .text
          font-size :10px
          color :rgb(77,85,93)
          line-height :10px
    .bulletin
      padding-top: 18px
      margin:0 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom :8px
      .descrition
        font-size :12px
        font-weight :200
        color: rgb(240,20,20)
        line-height :24px
        margin :0 12px
        padding-bottom :18px
        border-1px(rgba(7,17,27,.1))
      .bulletin-item
        display :flex
        align-items :center
        padding: 16px 0
        margin:0 12px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
        .text
          font-size :12px
          font-weight :200
          color :rgb(7,17,27)
          line-height :16px
          margin-left :6px
    .seller-img
      padding:18px 0 18px 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom :12px
      .img-wrapper
        .img-list
          width 100%
          overflow hidden
          white-space: nowrap
          .img-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .seller-infomation
      padding:18px 18px 0 18px
      .title
        font-size :14px
        color :rgb(7,17,27)
        line-height :14px
        margin-bottom :12px
      .info-list
        .info-item
          padding:16px 12px
          border-top:1px solid rgba(7,17,27,.1)
          .info
            font-size :12px
            font-weight :200
            color :rgb(7,17,27)
            line-height :16px
</style>
