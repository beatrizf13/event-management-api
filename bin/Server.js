require('dotenv')

class Server {
  constructor () {
    const app = require('../src/App')
    const server = require('http').createServer(app)
    const io = require('socket.io')(server)

    app.use((req, res, next) => {
      req.io = io
      next()
    })

    const port = process.env.PORT || 3000

    server.listen(port)

    if (process.env.NODE_ENV === 'dev') {
      console.log('Listening on port ' + port)
    }
  }
}

module.exports = new Server()
