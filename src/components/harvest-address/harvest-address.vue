<template>
    <div class="harvest-address" v-show="isHarvest">
        <div class="harvest-top">
            <div class="return-icon" @click="back">
                <i class="icon-arrow_lift"></i>
            </div>
            <div class="text">收货地址</div>
        </div>
        <div class="harvest-wrapper">
            <ul class="harvest-content">
                <li class="harvest-list" v-for="(item) in address" :key="item.addressId" @click="harvestClick(item)">
                    <div class="list-left">
                        <div class="top">{{item.streetName}}</div>
                        <div class="bottom">
                            <span class="userName">{{item.userName}}</span>
                            <span class="tel">{{item.tel}}</span>
                            <span class="default" v-show="item.isDefault">(默认地址)</span>
                        </div>
                    </div>
                    <div class="list-right">
                        <span class="icon-editor"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'harvest-address',
    props: {
        address: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isHarvest: false
        }
    },
    methods: {
        back() {
            this.isHarvest = false
        },
        show() {
            this.isHarvest = true
        },
        harvestClick(item) {
            this.$emit('harvestAddress', item)
            this.isHarvest = false
        }
    },
    components: {}
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

.harvest-address
    position :fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    z-index :12
    background-color: #fff
    .harvest-top
        position: fixed
        top: 0
        left: 0
        width :100%
        background-color :#fff
        padding:10px 0
        text-align :center
        line-height :32px
        border-1px(rgba(7,17,27,.1))
        .return-icon
            position :absolute
            left: 5px
            top: 10px
            .icon-arrow_lift
                display :block
                font-size :20px
                padding: 6px
                color: #ccc
        .text
            color: rgb(7,17,27)
    .harvest-wrapper
        position :absolute
        top: 52px
        bottom: 0
        left: 0
        width: 100%
        .harvest-content
            .harvest-list
                display :flex
                align-items :center
                padding:16px 0
                margin: 0 16px
                line-height :30px
                border-1px(rgba(7,17,27,.1))
                .list-left
                    flex: 0 0 230px
                    width: 230px
                    .top
                        font-size :16px
                        font-weight :500
                    .bottom
                        font-size :13px
                        font-weight :200
                        color: rgba(7,17,27,.7)
                        .userName
                            margin-right: 8px
                        .default
                            color: rgb(240,20,20)
                            margin-left :8px
                .list-right
                    flex: 1
                    text-align :right
                    .icon-editor
                        display :inline-block
                        vertical-align: middle
                        font-size :28px
                        color: #666
</style>
