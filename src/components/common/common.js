
export const convertTimeToFloat = (str) => {
    //console.log(str)
    if (!str.includes(":"))
        return parseFloat(str)
    const time = str.split(':')
    const m = parseFloat(time[1] / 60).toFixed(2)
    const h = parseFloat(time[0])
    
    return parseFloat(Number(h) + Number(m))
}