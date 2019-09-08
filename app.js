const cluster = require("cluster");
const fastify = require("fastify")();
const voteRotes = require("./routes/votes");
const NUM_CPU_CORES = require("os").cpus().length;
const port = 3000;

fastify.register(require("fastify-redis"), { host: "127.0.0.1" });
fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  useUnifiedTopology: true,
  url: "mongodb://127.0.0.1/bbb"
});

if (cluster.isMaster) {
  for (let i = 0; i < NUM_CPU_CORES; i++) {
    cluster.fork();
  }
  cluster.on("exit", worker => {
    cluster.fork();
  });
} else {
  fastify.register(voteRotes);
  fastify.listen(port, () => {
    console.log(
      `Fastify "Hello World" listening on port ${port}, PID: ${process.pid}`
    );
  });
}
