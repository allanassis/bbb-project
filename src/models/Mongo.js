const Mongo = require("mongodb").MongoClient;

class MongoClient {
  constructor({ url, dbName, ...rest }) {
    this.client = Mongo(url, rest);
  }
}

module.exports = new MongoClient({
  url: "mongodb://127.0.0.1",
  dbName: "bbb",
  useUnifiedTopology: true,
  useNewUrlParser: true
});
