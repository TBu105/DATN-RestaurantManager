const keyTokenModel = require("../KeyToken.model");

class KeyTokenRepository {
  async createKeyToken(userId, secretKey) {
    const newKeyToken = await keyTokenModel.create({
      userId,
      secretKey,
    });

    return newKeyToken;
  }

  async getKeyTokenByFields(filter) {
    const keyToken = await keyTokenModel.findOne(filter);

    return keyToken;
  }

  async updateKeyTokenByUserId(userId, data) {
    const updateToken = await keyTokenModel.findOneAndUpdate({ userId }, data, {
      new: true,
    });

    console.log("updateToken:key token repo", updateToken);

    return updateToken;
  }
}

module.exports = new KeyTokenRepository();
