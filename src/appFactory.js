const fastify = require("fastify");
const fastifyMongo = require("fastify-mongodb");
const fastifyRedis = require("fastify-redis");

const createApp = (config, routes, dbsConfig) => {
  const fastifyInstance = fastify(config);
  // Registando os bancos de dados
  fastifyInstance.register(fastifyRedis, { ...dbsConfig.redis });
  fastifyInstance.register(fastifyMongo, { ...dbsConfig.mongo });
  //   fastifyInstance.register(routes[0]);

  routes.forEach(route => fastifyInstance.register(route));

  fastifyInstance.listen(3000, () => {
    console.log(`Fastify "Hello World" listening, PID: ${process.pid}`);
  });
};

module.exports = createApp;
