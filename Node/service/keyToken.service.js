const keyToken = require("../model/keytoken.model");

class KeyTokenService {
  static createKeyToken = async (userId, publicKey) => {
    try {
      console.log("userId", userId);
      console.log("publicKey", publicKey);
      const publicKeyString = publicKey.toString();
      const tokens = await keyToken.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = KeyTokenService;
