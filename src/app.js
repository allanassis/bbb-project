const createApp = require("./appFactory");
const cluster = require("cluster");
const voteRotes = require("./routes/votes");
const { client } = require("./models/Redis");
const { client: mongoClient } = require("./models/Mongo");

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
  mongoClient.connect((err => {
    createApp({}, [voteRotes], {
      mongo: {
        client: mongoClient
      },
      redis: {
        client,
        host: "127.0.0.1"
      }
    });

  }))

  console.log(cluster.worker.id);
}
