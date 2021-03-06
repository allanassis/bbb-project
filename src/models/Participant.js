const { ObjectId } = require('mongodb');

class Participant {
  constructor(name = null, db) {
    this.name = name;
    this.db = db;
  }

  async get(id) {
    const doc = await this.db
      .collection('participant')
      .findOne({ _id: new ObjectId(id) });
    return doc;
  }

  static async getAll(db) {
    return await db.collection('participant').find({}).toArray();
  }

  async save() {
    const { ops } = await this.db
      .collection('participant')
      .insertOne({ name: this.name });
    return ops;
  }
}

module.exports = Participant;
