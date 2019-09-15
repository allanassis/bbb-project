const Queue = require("../models/Queue");
const cluster = require("cluster");
module.exports = (fastify, opts, next) => {
  const {
    redis,
    mongo: { client: mongoClient }
  } = fastify;
  const mongoDB = mongoClient.db("bbb");
  const voteQueue = new Queue(redis);

  fastify.post("/", async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { id } = data;
    const recordsLen = await voteQueue.size(id);

    if (recordsLen == 100) {
      await incVotes(recordsLen, id).then(_ => voteQueue.clean(id));
    }
    voteQueue.enqueue(id, data);
    reply.res.end();
  });

  function incVotes(n, id) {
    return mongoDB
      .collection("bigwall")
      .updateOne({ id }, { $inc: { votes: n } }, { upsert: true });
  }

  next();
};
