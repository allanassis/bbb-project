const fastify = require("fastify");
const fastifyMongo = require("fastify-mongodb");
const fastifyRedis = require("fastify-redis");

const createApp = (config, routes, dbsConfig) => {
  const fastifyInstance = fastify(config);
  // Registando os bancos de dados
  fastifyInstance.register(fastifyRedis, { ...dbsConfig.redis });
  fastifyInstance.register(fastifyMongo, { ...dbsConfig.mongo });

  routes.forEach(route => fastifyInstance.register(route));

  return fastifyInstance
};

module.exports = createApp;
