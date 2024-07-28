const _ = require("lodash");

const getInfodata = ({ field = [], object = {} }) => {
  return _.pick(object, field);
};

module.exports = { getInfodata };
