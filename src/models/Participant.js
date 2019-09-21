class Participant {
  constructor(name, db) {
    this.name = name;
    this.db = db;
  }

  async save() {
    const { ops } = await this.db
      .collection('participant')
      .insertOne({ name: this.name });
    return ops;
  }
}

module.exports = Participant