const server = require('../../server')

module.exports = () => {
    global.httpServer = server
}
