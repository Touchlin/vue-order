import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './cube-ui'
import './register'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
