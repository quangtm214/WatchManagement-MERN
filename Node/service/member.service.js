const Member = require("../model/memberModel");

const findbyName = async ({ membername }) => {
  return await Member.findOne({ membername }).lean();
};

module.exports = { findbyName };
