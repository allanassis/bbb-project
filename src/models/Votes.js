const { client } = require("./Redis");

class Vote {
  constructor(id) {
    this.id = id;
  }

  async incVote() {
    await client.incrAsync(this.id);
  }

  async bgSave() {
    await client.bgsaveAsync();
  }

//   async save(db, id) {
//     const numVotes = await this.getAsync(id);
//     console.log("numvote", numVotes);
//     console.log("id", this.id);
//     db.collection("bigwall").updateOne(
//       { id: this.id },
//       { $inc: { votes: numVotes + 1 } },
//       { upsert: true }
//     );
//     client.del(this.id);
//   }
}

module.exports = Vote;
