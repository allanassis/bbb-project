const { post, get } = require('../handlers/participant');

module.exports = (fastify, opts, next) => {
  fastify.post('/participant', post);
  fastify.get('/participant/:id', get);

  next();
};
