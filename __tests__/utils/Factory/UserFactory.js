const faker = require('faker')
const User = require('../../../src/App/Models/UserModel')

class Factory {
  async create (params = {}) {
    const user = await User.create({
      fullName: params.fullName || faker.name.findName(),
      email: params.email || faker.internet.email(),
      password: params.password || faker.internet.password(),
      role: params.role || 'user'
    })

    return user
  }
}

module.exports = new Factory()
