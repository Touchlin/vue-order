import { get } from './getData'

const seller = get('/api/seller')
const goods = get('api/goods')
const ratings = get('api/ratings')
const address = get('api/address')

export {
    seller,
    goods,
    ratings,
    address
}
