require('dotenv')

const app = require('../src/App')

const server = require('http').Server(app)
const io = require('socket.io')(server)

class Server {
  constructor () {
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
