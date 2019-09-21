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
}

module.exports = Vote;
