const JWT = require("jsonwebtoken");
const { asyncHandel } = require("./checkAuth");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByMemberId } = require("../service/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accesstoken
    const accesstoken = await JWT.sign(payload, publicKey, {
      expiresIn: "2d",
    });
    const refreshtoken = await JWT.sign(payload, privateKey, {
      expiresIn: "7d",
    });

    //

    JWT.verify(accesstoken, publicKey, (err, decode) => {
      if (err) {
        console.log(`error verify`, err);
      } else {
        console.log(`decode verify`, decode);
      }
    });
    return { accesstoken, refreshtoken };
  } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
  /**
  1- Check userId missing???
  2- get accessToken
  3 - verifyToken
  4 - check user in bds?
  5- check keyStore with this userId?
  6-OK all => return next()
 */

  //1
  const userId = req.headers[HEADER.CLIENT_ID];
  console.log("userId", userId);
  if (!userId) {
    throw new AuthFailureError("invalid request");
  }

  //2
  const keyStore = await findByMemberId(userId);

  if (!keyStore) {
    throw new NotFoundError("Not found keyStore");
  }

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailureError("invalid request");
  }

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    console.log("decodeUser", decodeUser);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError("invalid user");
    }
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = { createTokenPair, authentication };
