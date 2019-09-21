const Vote = require('../models/Votes');

const cluster = require('cluster');

module.exports = (fastify, opts, next) => {
  fastify.post('/vote', async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { id } = data;
    const votes = new Vote(id);
    votes.incVote();
    reply.send({id, msg: "Voto realizado com sucesso"});
  });

  fastify.get('/vote/:id', async (req, reply) => {
    const { id } = req.params;
    const vote = new Vote(id);
    const numVotes = await vote.getVote();
    reply.send({ id, numVotes });
  });

  next();
};
