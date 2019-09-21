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

  next();
};
