const Mongo = require('mongodb').MongoClient;

class MongoClient {
  constructor({ url, dbName, ...rest }) {
    this.client = new Mongo(`${url}/${dbName}`, rest);
    this.url = url;
    this.sdbName = dbName;
  }
  async connect() {
    return await this._connect();
  }

  _connect(){
    return new Promise((resolve, reject) => {
      this.client.connect((err, client) => {
        if(err) reject(err)
        resolve(client)
      })
    })
  }
}

module.exports = new MongoClient({
  url: 'mongodb://127.0.0.1',
  dbName: 'bbb',
  useUnifiedTopology: true,
  useNewUrlParser: true
});
