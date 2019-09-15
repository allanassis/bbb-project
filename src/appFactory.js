const fastify = require("fastify");
const fastifyMongo = require("fastify-mongodb");
const fastifyRedis = require("fastify-redis");

const createApp = (config, routes, dbsConfig) => {
  const fastifyInstance = fastify(config);
  routes.forEach(route => fastifyInstance.register(route));

  // Registando os bancos de dados
  fastifyInstance.register(fastifyMongo, dbsConfig.mongo);
  fastifyInstance.register(fastifyRedis, dbsConfig.redis);
};

module.exports = createApp;
