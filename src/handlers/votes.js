const Vote = require('../models/Votes');
const cluster = require('cluster');

const post = async ({ body: data }, reply) => {
  console.log(cluster.worker.id);
  const { id } = data;
  const votes = new Vote(id);
  votes.incVote();
  reply.send({ id, msg: 'Voto realizado com sucesso' });
};

const get = async (req, reply) => {
  const { id } = req.params;
  const vote = new Vote(id);
  const numVotes = await vote.getVote();
  reply.send({ id, numVotes });
};

module.exports = { post, get };
