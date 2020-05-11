import Vue from 'vue'
import VueRouter from 'vue-router'

const Goods = () => import('../components/goods/goods')
const Ratings = () => import('../components/ratings/ratings')
const Seller = () => import('../components/seller/seller')
const sureOrder = () => import('../components/sure-order/sure-order')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/goods'
    },
    {
        path: '/goods',
        name: 'goods',
        component: Goods
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: Ratings
    },
    {
        path: '/seller',
        name: 'seller',
        component: Seller
    },
    {
        path: '/sureorder',
        name: 'sureorder',
        component: sureOrder
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: ''
})

export default router
