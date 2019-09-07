const cluster = require("cluster");
const fastify = require("fastify")();
const NUM_CPU_CORES = require("os").cpus().length;
const port = 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < NUM_CPU_CORES; i++) {
    cluster.fork();
  }
  cluster.on("exit", worker => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Starting a new worker`);
    cluster.fork();
  });
} else {
  fastify.get("/", (req, res) => {
    console.log(`worker: ${cluster.worker.id}`);
    res.res.end();
  });
  fastify.listen(port, () => {
    console.log(
      `Fastify "Hello World" listening on port ${port}, PID: ${process.pid}`
    );
  });
}
