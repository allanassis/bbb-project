const Queue = require("../models/Queue");

module.exports = async function postVote(fastify, opts, next) {
  const {
    redis,
    mongo: { db: mongoDB }
  } = fastify;
  const voteQueue = new Queue(redis);

  fastify.post("/", async ({ body: data }, reply) => {
    data = JSON.parse(data);
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
