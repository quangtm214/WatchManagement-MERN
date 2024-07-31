const keyToken = require("../model/keytoken.model");

class KeyTokenService {
  static createKeyToken = async (userId, publicKey, privateKey) => {
    try {
      // const publicKeyString = publicKey.toString();
      const tokens = await keyToken.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = KeyTokenService;
