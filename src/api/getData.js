import axios from 'axios'

const ERROk = 0

export function get(url) {
    return function (params) {
        return axios.get(url, { params }).then(res => {
            const { errno, data } = res.data
            if (errno === ERROk) {
                return data
            }
        })
    }
}
