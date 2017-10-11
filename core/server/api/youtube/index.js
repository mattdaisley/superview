const subscriptions = require('./subscriptions'),
      popular       = require('./popular'),
      passthrough   = require('./passthrough')

let youtube = {
  subscriptions,
  popular,
  passthrough,
}

module.exports = youtube