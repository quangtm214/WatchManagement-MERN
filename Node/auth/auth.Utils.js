const JWT = require("jsonwebtoken");

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
module.exports = { createTokenPair };
