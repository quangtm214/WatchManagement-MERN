const Member = require("../model/memberModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { use } = require("passport");
const { createTokenPair } = require("../auth/auth.Utils");
const { getInfodata } = require("../utils");
const { BadRequestError } = require("../core/error.response");
const { findbyName } = require("./member.service");
class AccessService {
  static logout = async (keyStore) => {
    console.log("keyStore", keyStore);
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log("delKey", delKey);
    return delKey;
  };

  static login = async ({ membername, password, refreshToken = null }) => {
    const foundMember = await findbyName({ membername });
    if (!foundMember) {
      throw new BadRequestError("Error: Member not found");
    }

    const match = await bcrypt.compare(password, foundMember.password);
    if (!match) {
      throw new AuthFailureError("authentication failed");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { userId: foundMember._id, membername },
      publicKey,
      privateKey
    );
    console.log("tokens", tokens);
    await KeyTokenService.createKeyToken(
      foundMember._id,
      publicKey,
      privateKey,
      tokens.refreshtoken
    );
    return {
      member: getInfodata({
        field: ["_id", "membername"],
        object: foundMember,
      }),
      tokens,
    };
  };

  static signUp = async (membername, password) => {
    console.log("membername", membername);
    console.log("password", password);
    const hoderMember = await Member.findOne({
      membername: membername,
    }).lean();
    if (hoderMember) {
      throw new BadRequestError("Error: Member already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = new Member({ membername, password: hashedPassword });
    newMember.save();
    if (newMember) {
      // created privateKey, publicKey
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      console.log({ privateKey, publicKey }); // savec collection KeyStore
      const keyStore = await KeyTokenService.createKeyToken(
        newMember._id,
        publicKey,
        privateKey
      );

      if (!keyStore) {
        //  throw new BadRequestError("Error: keyStore error");
        return {
          code: "xxx",
          message: "keyStore error",
        };
      }
      // const publicKeyObject = crypto.createPublicKey(publicKeyString);
      // create token pair
      const tokens = await createTokenPair(
        { id: newMember._id },
        publicKey,
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
  };
}

module.exports = AccessService;
