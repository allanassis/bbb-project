const cluster = require('cluster');
const { ObjectID } = require('mongodb');
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

  fastify.put('/seawall', async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { status, _id } = data;
    const { client } = fastify.mongo;
    const db = await client.db('bbb');
    const { result } = await db
      .collection('seawall')
      .update({ _id: new ObjectID(_id) }, { $set: { status } });
    reply.send(result);
  });

  fastify.get('/seawall/:id', async ({ params: { id } }, reply) => {
    console.log(cluster.worker.id);
    const { client } = fastify.mongo;
    const db = await client.db('bbb');
    if (!id) {
      const docs = await db
        .collection('seawall')
        .find({})
        .toArray();
      reply.send(docs);
    }
    const doc = await db
      .collection('seawall')
      .findOne({ _id: new ObjectID(id) });
    reply.send(doc);
  });
  next();
};
