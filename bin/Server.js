require('dotenv')

class Server {
  constructor () {
    const app = require('../src/App')

    const port = process.env.PORT || 3000

    app.listen(port)

    if (process.env.NODE_ENV === 'dev') {
      console.log('Listening on port ' + port)
    }
  }
}

module.exports = new Server()
