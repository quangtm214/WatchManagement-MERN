const { permission } = require("process");
const { apiKey } = require("../auth/checkAuth");
const ApiKey = require("../model/apikey.model");
const Crypto = require("crypto");
const findeById = async (key) => {
  //   const newkey = await ApiKey.create({
  //     key: Crypto.randomBytes(64).toString("hex"),
  //     permissions: ["0000"],
  //   });
  //   console.log("newkey", newkey);
  const objKey = await ApiKey.findOne({ key, status: true }).lean();
  return objKey;
};
module.exports = { findeById };
