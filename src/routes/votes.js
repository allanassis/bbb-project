const Vote = require("../models/Votes");

const cluster = require("cluster");

module.exports = (fastify, opts, next) => {
  fastify.post("/", async ({ body: data }, reply) => {
    console.log(cluster.worker.id);
    const { id } = data;
    const votes = new Vote(id);
    votes.incVote();
    reply.res.end();
  });

  next();
};