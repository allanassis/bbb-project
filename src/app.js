const cluster = require("cluster");
const voteRotes = require("./routes/votes");
const { client } = require("./models/Redis");

const NUM_CPU_CORES = require("os").cpus().length;
const port = 3000;

if (cluster.isMaster) {
  for (let i = 0; i < NUM_CPU_CORES; i++) {
    cluster.fork();
  }
  cluster.on("exit", _ => {
    cluster.fork();
  });
} else {
  const fastify = require("fastify")();
  fastify.register(require("fastify-redis"), {
    client,
    host: "127.0.0.1"
  });
  fastify.register(require("fastify-mongodb"), {
    forceClose: true,
    useUnifiedTopology: true,
    url: "mongodb://127.0.0.1/bbb"
  });
  fastify.register(voteRotes);

  console.log(cluster.worker.id);
  fastify.listen(port, () => {
    console.log(
      `Fastify "Hello World" listening on port ${port}, PID: ${process.pid}`
    );
  });
}
