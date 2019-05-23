const express = require('express')

const UserController = require('../App/Controllers/UserController')
const EventController = require('../App/Controllers/EventController')
const SessionController = require('../App/Controllers/SessionController')
const SubscriptionController = require('../App/Controllers/SubscriptionController')
const AuthMiddleware = require('../App/Middlewares/Authenticate')
const AdmMiddleware = require('../App/Middlewares/Administrator')

class Routes {
  publicRoutes () {
    const routes = express.Router()

    routes.post('/sessions', SessionController.store)

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

    routes.post('/subscriptions/:id', SubscriptionController.subscribe)
    routes.post(
      '/subscriptions/unsubscribe/:id',
      SubscriptionController.unsubscribe
    )

    return routes
  }

  AdmRoutes () {
    const routes = express.Router()

    routes.use(AuthMiddleware.verifyToken)
    routes.use(AdmMiddleware.verifyTypeUser)

    routes.get('/users', UserController.index)
    routes.get('/users/:id', UserController.show)

    routes.post('/events', EventController.store)
    routes.put('/events/:id', EventController.update)
    routes.delete('/events/:id', EventController.destroy)

    routes.post(
      '/subscriptions/presence/:id',
      SubscriptionController.confirmPresence
    )

    return routes
  }
}

module.exports = new Routes()
