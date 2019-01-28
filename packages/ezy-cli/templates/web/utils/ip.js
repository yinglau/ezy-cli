const os = require('os')

const interfaces = os.networkInterfaces()
const ip = (() => {
  for (let i in interfaces) {
    let item = interfaces[i]
    let ipAddress = null
    item.map(si => {
      if (si.address !== '127.0.0.1' && si.family === 'IPv4') {
        ipAddress = si.address
      }
    })
    if (ipAddress !== null) {
      return ipAddress
    }
  }
})()

module.exports = ip
