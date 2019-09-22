const cluster = require('cluster');
const Participant = require('../models/Participant');
const { ObjectID } = require('mongodb');

module.exports = (fastify, opts, next) => {
  fastify.post('/participant', async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { name } = data;
    const { client } = fastify.mongo;
    const db = await client.db('bbb');
    const participant = new Participant(name, db);
    const result = await participant.save();
    reply.send(result.shift());
  });
  fastify.get('/participant/:id', async ({ params: { id } }, reply) => {
    console.log(cluster.worker.id);
    const { client } = fastify.mongo;
    const db = await client.db('bbb');
    if (!id) {
      const participants = await Participant.getAll(db);
      reply.send({ participants });
    }
    const participant = await new Participant(null, db).get(id);
    reply.send(participant);
  });

  next();
};
