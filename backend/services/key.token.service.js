const { BadRequest, NotFound } = require("../core/error.response");
const keyTokenService = require("../models/repositories/key.token.repo");

class KeyTokenService {
  async createKeyToken({ userId, secretKey }) {
    const checkKeyToken = await keyTokenService.getKeyTokenByFields({
      userId,
    });

    console.log("checkKeyToken:", checkKeyToken);

    if (checkKeyToken) {
      throw new NotFound("There is a key token with this user");
    }

    const keyToken = await keyTokenService.createKeyToken(userId, secretKey);

    console.log("keyToken:", keyToken);

    if (!keyToken) {
      throw new BadRequest("Create key token fail");
    }

    return keyToken;
  }

  async updateKeyTokenByUserId(userId, data) {
    const updateKeyToken = await keyTokenService.updateKeyTokenByUserId(
      userId,
      data
    );

    console.log("updateKeyToken:key token service", updateKeyToken);

    return updateKeyToken;
  }

  async getKeyTokenByFields(data) {
    const keyToken = await keyTokenService.getKeyTokenByFields(data);

    // console.log("keyToken:key token service", keyToken);

    return keyToken;
  }
}

module.exports = new KeyTokenService();
