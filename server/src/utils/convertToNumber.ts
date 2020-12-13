export function convertIpToNumber(ip: string) {
    const ipArray = ip.split('.')
    const newIp = ipArray[0] + ipArray[1] + ipArray[2] + ipArray[3]
    return parseInt(newIp)
}

export function convertInchToNumber(inch: string) {
    const newInch = inch.split('\'\'')
    return parseInt(newInch[0])
}