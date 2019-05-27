const Event = require('../Models/EventModel')
const User = require('../Models/UserModel')

class EventController {
  async index (req, res) {
    try {
      const events = await Event.find()

      return res.send(events)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async show (req, res) {
    try {
      const event = await Event.findById(req.params.id)
        .populate({
          path: 'presents',
          select: '_id, fullName, email',
          options: { sort: { createdAt: -1 } }
        })
        .populate({
          path: 'enrolleds',
          select: '_id, fullName, email',
          options: { sort: { createdAt: -1 } }
        })
        .populate({
          path: 'creator',
          select: '_id, fullName, email'
        })

      if (!event) {
        return res.status(400).send({ error: 'event not found' })
      }

      return res.send(event)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async store (req, res) {
    try {
      const { name, description, value, startsIn, endsIn } = req.body

      const creator = await User.findById(req.userId)

      const event = await Event.create({
        name,
        description,
        value,
        creator,
        startsIn,
        endsIn
      })

      return res.send({ event })
    } catch (error) {
      return res.status(500).send({ error })
    }
  }
  async update (req, res) {
    try {
      const event = await Event.findById(req.params.id)

      if (!event) {
        return res.status(400).send({ error: 'event not found' })
      }

      const name = req.body.name || event.name
      const description = req.body.description || event.description
      const value = req.body.description || event.value
      const startsIn = req.body.startsIn || event.startsIn
      const endsIn = req.body.endsIn || event.endsIn

      await Event.findOneAndUpdate(
        req.params.id,
        { name, description, value, startsIn, endsIn },
        {
          new: true
        }
      )

      return res.send(event)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async destroy (req, res) {
    try {
      if (!(await Event.findById(req.params.id))) {
        return res.status(400).send({ error: 'event not found' })
      }

      await Event.findByIdAndDelete(req.params.id)

      return res.send()
    } catch (error) {
      return res.status(500).send({ error })
    }
  }
}

module.exports = new EventController()
