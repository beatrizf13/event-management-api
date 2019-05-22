const Event = require('../Models/EventModel')
const User = require('../Models/UserModel')

class SubscriptionController {
  async subscribe (req, res) {
    try {
      const event = await Event.findById(req.params.id)

      await event.enrolleds.map(enrolled => {
        // eslint-disable-next-line eqeqeq
        if (enrolled == req.userId) {
          return res.status(400).send({ error: 'user already registered' })
        }
      })

      const enrolled = await User.findById(req.userId)

      event.enrolleds.push(enrolled)
      await event.save()

      return res.send(event)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async unsubscribe (req, res) {
    try {
      const event = await Event.findById(req.params.id)

      let enrolledIndex

      await event.enrolleds.map((enrolled, index) => {
        // eslint-disable-next-line eqeqeq
        if (enrolled == req.userId) {
          enrolledIndex = index
        }
      })

      // eslint-disable-next-line eqeqeq
      if (enrolledIndex == undefined) {
        return res.status(400).send({ error: 'user not registered' })
      }

      event.enrolleds.splice(enrolledIndex, 1)

      await event.save()

      return res.send(event)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async confirmPresence (req, res) {
    try {
      const event = await Event.findById(req.params.id)

      await event.enrolleds.map(enrolled => {
        // eslint-disable-next-line eqeqeq
        if (enrolled == req.userId) {
          return res.status(400).send({ error: 'user already confirmed' })
        }
      })

      const enrolled = await User.findById(req.userId)

      event.presents.push(enrolled)
      await event.save()

      return res.send(event)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }
}

module.exports = new SubscriptionController()
