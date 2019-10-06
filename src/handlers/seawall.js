const cluster = require('cluster');
const { ObjectID } = require('mongodb');

const post = async ({ body: data }, reply) => {
  console.log(cluster.worker.id);
  const { participants } = data;
  const { client } = fastify.mongo;
  const db = await client.db('bbb');
  const { ops } = await db.collection('seawall').insertOne({
    participants,
    status: 'open'
  });
  reply.send({ doc: ops.shift() });
};

const put = async ({ body: data }, reply) => {
  console.log(cluster.worker.id);
  const { status, _id } = data;
  const { client } = fastify.mongo;
  const db = await client.db('bbb');
  const { result } = await db
    .collection('seawall')
    .update({ _id: new ObjectID(_id) }, { $set: { status } });
  reply.send(result);
};

const get = async ({ params: { id } }, reply) => {
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
  const doc = await db.collection('seawall').findOne({ _id: new ObjectID(id) });
  reply.send(doc);
};

module.exports = { post, put, get };
