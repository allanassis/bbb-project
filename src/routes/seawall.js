const { post, put, get } = require('../handlers/seawall');

module.exports = (fastify, opts, next) => {
  fastify.post('/seawall', post);
  fastify.put('/seawall', put);
  fastify.get('/seawall/:id', get);

  next();
};
