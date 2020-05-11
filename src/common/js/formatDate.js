export function formatDate(date, type) {
    if (/(y+)/.test(type)) {
        type = type.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const obj = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'M+': date.getMinutes(),
        'S+': date.getSeconds()
    }
    for (const k in obj) {
        // 有特殊字符``，无法使用/ /正则
        // console.log(/(`${k}`)/.test(type))
        if (new RegExp(`(${k})`).test(type)) {
            // console.log(RegExp.$1) //输出mm、dd、HH、MM、SS
            const str = obj[k] + ''
            type = type.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return type
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
