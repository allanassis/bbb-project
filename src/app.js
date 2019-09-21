const createApp = require('./appFactory');
const cluster = require('cluster');
const voteRotes = require('./routes/votes');
const { client } = require('./models/Redis');
const { client: mongoClient } = require('./models/Mongo');

const NUM_CPU_CORES = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < NUM_CPU_CORES; i++) {
    cluster.fork();
  }
  cluster.on('exit', _ => {
    cluster.fork();
  });
  setInterval(() => {
    console.log(`salvando...`);
    const save = client.bgsave();
    console.log(save);
  }, 20000);
} else {
  const app = createApp({}, [voteRotes], {
    mongo: {
      client: mongoClient
    },
    redis: {
      client,
      host: '127.0.0.1'
    }
  });
  app.listen(3000, (err, address) => {
    if (err)
      console.error(`Algo deu errado ao subir a aplicação, erro: ${err}`);
    else
      console.log(
        `Aplicação ouvindo no endereço local ${address}, processo: ${process.pid}`
      );
  });

  console.log(cluster.worker.id);
}
