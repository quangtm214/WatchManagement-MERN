const Member = require("../model/memberModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { use } = require("passport");
const { createTokenPair } = require("../auth/auth.Utils");
const { getInfodata } = require("../utils");
class AccessService {
  static signUp = async (membername, password) => {
    try {
      console.log("membername", membername);
      console.log("password", password);
      const hoderMember = await Member.findOne({
        membername: membername,
      }).lean();
      if (hoderMember) {
        return {
          code: "xxx",
          message: "Member name already exists",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newMember = new Member({ membername, password: hashedPassword });
      newMember.save();
      if (newMember) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        console.log({ privateKey, publicKey }); // savec collection KeyStore
        const publicKeyString = await KeyTokenService.createKeyToken(
          newMember._id,
          publicKey
        );

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "publicKeyString error",
          };
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // create token pair
        const tokens = await createTokenPair(
          { id: newMember._id },
          publicKeyObject,
          privateKey
        );
        console.log("create token success", tokens);

        return {
          code: 201,
          metadata: {
            member: getInfodata({
              field: ["_id", "membername"],
              object: newMember,
            }),
            tokens,
          },
        };
      }
      return {
        code: "xxx",
        message: "Member not created",
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.stack,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
