const redis = require("redis");
const { promisifyAll } = require("bluebird");
promisifyAll(redis);

class RedisClient {
  constructor(redis) {
    this.client = redis;
  }
}

module.exports = new RedisClient(redis.createClient());
