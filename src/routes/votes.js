const { post, get } = require('../handlers/votes');

module.exports = (fastify, opts, next) => {
  fastify.post('/vote', post);
  fastify.get('/vote/:id', get);

  next();
};
