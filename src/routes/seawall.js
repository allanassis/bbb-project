const cluster = require('cluster');

module.exports = (fastify, opts, next) => {
  fastify.post('/seawall', async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { participants } = data;
    const { client } = fastify.mongo;
    const db = await client.db('bbb');
    const { ops } = await db.collection('seawall').insertOne({
      participants,
      status: 'open'
    });
    reply.send({ doc: ops.shift() });
  });

  next();
};
