<template>
    <div class="tab">
        <!-- <div class="tab-item" @click="showPage">商品</div>
        <div class="tab-item">评论</div>
        <div class="tab-item">商家</div> -->
        <router-link to="/goods" class="tab-item" tag="div">商品</router-link>
        <router-link to="/ratings" class="tab-item" tag="div">评价</router-link>
        <router-link to="/seller"  class="tab-item" tag="div">商家</router-link>
    </div>
</template>

<script>
export default {
    name: 'tab',
    data() {
        return {}
    },
    methods: {
    },
    components: {}
}
</script>

<style lang="stylus">
    @import '~common/stylus/mixin';
    .tab
        display :flex
        width :100%
        height :40px
        line-height :40px
        color :rgb(77,85,93)
        border-1px(rgba(7,17,27,.2))
        .tab-item
            display :block
            flex :1
            text-align :center
            &.active
                color :rgb(240,20,20)
                // border-bottom :1px solid rgb(240,20,20)
</style>
