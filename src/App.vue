<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <keep-alive exclude="sure-order">
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from 'components/v-header/v-header'
import tab from 'components/tab/tab'
import { seller } from 'api'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  methods: {
    getSeller() {
      seller().then(res => {
        this.seller = res
      })
    }
  },
  components: {
    vHeader,
    tab
  },
  created() {
    this.getSeller()
  }
}
</script>

<style lang="stylus"></style>
