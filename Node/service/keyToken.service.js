const { filter, update } = require("lodash");
const keyToken = require("../model/keytoken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static createKeyToken = async (
    userId,
    publicKey,
    privateKey,
    refreshToken
  ) => {
    try {
      // const publicKeyString = publicKey.toString();
      // const tokens = await keyToken.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return tokens ? tokens.publicKey : null;

      const filter = { user: userId };

      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      console.log("update", update);
      const options = { new: true, upsert: true };
      const tokens = await keyToken.findOneAndUpdate(filter, update, options);
      console.log("tokens2", tokens);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByMemberId = async (userId) => {
    const token = await keyToken.findOne({ user: userId }).lean();
    return token;
  };

  static removeKeyById = async (id) => {
    console.log("id", id);
    return await keyToken.deleteOne({ _id: id });
  };
}
module.exports = KeyTokenService;
