export function deliverTime(date) {
    let hour = date.getHours()
    let minute = date.getMinutes() + 38
    if (minute > 59) {
        hour += 1
        minute = minute - 60
    }
    return `${hour}:${padLeftZero(minute)}`
}

function padLeftZero(str) {
    const str1 = str + ''
    return ('00' + str1).substr(str1.length)
}
