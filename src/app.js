const createApp = require('./appFactory');
const cluster = require('cluster');
const voteRotes = require('./routes/votes');
const seawallRotes = require('./routes/seawall');
const participant = require('./routes/participant');
const { client: redisClient } = require('./models/Redis');
const mongo = require('./models/Mongo');

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
    const save = redisClient.bgsave();
    console.log(save ? `Salvo` : `Erro ao salvar`);
  }, 20000);
} else {
  appUp();
  console.log(cluster.worker.id);
}

async function appUp() {
  const mongoClient = await mongo.connect();
  const app = createApp({}, [voteRotes, seawallRotes, participant], {
    mongo: {
      client: mongoClient
    },
    redis: {
      client: redisClient,
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
}
