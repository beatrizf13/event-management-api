const express = require('express')

const UserController = require('../App/Controllers/UserController')
const EventController = require('../App/Controllers/EventController')
const SessionController = require('../App/Controllers/SessionController')
const AuthMiddleware = require('../App/Middlewares/Authenticate')

class Routes {
  publicRoutes () {
    const routes = express.Router()

    routes.post('/sessions', SessionController.store)

    routes.get('/users', UserController.index)
    routes.get('/users/:id', UserController.show)
    routes.post('/users', UserController.store)

    routes.get('/events', EventController.index)
    routes.get('/events/:id', EventController.show)

    return routes
  }

  privateRoutes () {
    const routes = express.Router()

    routes.use(AuthMiddleware.verifyToken)

    routes.put('/users/:id', UserController.update)
    routes.delete('/users/:id', UserController.destroy)

    routes.post('/events', EventController.store)
    routes.put('/events/:id', EventController.update)
    routes.delete('/events/:id', EventController.destroy)

    return routes
  }
}

module.exports = new Routes()
