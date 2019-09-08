class Queue {
  constructor(redisClient) {
    this.client = redisClient;
  }

  enqueue(queueName, doc) {
    this.client.rpush(queueName, JSON.stringify(doc));
  }
  clean(voteId) {
    console.log("aqui ");
    this.client.del(voteId);
  }
  size(queueName) {
    return this.client.llen(queueName);
  }
}

module.exports = Queue;
