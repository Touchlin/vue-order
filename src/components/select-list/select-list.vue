<template>
    <div class="select-list">
        <div class="list-left">
            <slot name="text"></slot>
        </div>
        <div class="list-right">
            <slot name="describe"></slot>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'select-list',
    data() {
        return {}
    },
    methods: {},
    components: {},
    created() {
    }
}
</script>

<style lang="stylus">
.select-list
    position: relative
    display :flex
    .list-left
        flex: 0 0 70px
        width :70px
        font-size: 14px
        line-height :30px
    .list-right
        flex: 1
        color: #ccc
        font-size: 13px
        text-align :right
        line-height :30px
        padding-right: 25px
        @media only screen and (max-width :320px)
            font-size :10px
            text-overflow :ellipsis
            overflow: hidden
            white-space :nowrap
        .icon-keyboard_arrow_right
            position: absolute
            top: 3px
            right: 0
            font-size :24px
</style>
