const subscriptions = require('./subscriptions'),
      passthrough   = require('./passthrough')

let youtube = {
  subscriptions,
  passthrough,
}

module.exports = youtube