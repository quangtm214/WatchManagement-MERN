const { findeById } = require("../service/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({ message: "Forbidden Error" });
    }

    const objKey = await findeById(key);
    if (!objKey) {
      return res.status(403).json({ message: "Forbidden Error" });
    }

    req.objectKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.objectKey.permissions) {
        return res.status(403).json({ message: "permission denied" });
      }
      console.log("permissions::", req.objectKey.permissions);
      const validPermission = req.objectKey.permissions.includes(permission);
      if (!validPermission) {
        return res.status(403).json({ message: "permission denied" });
      }
      return next();
    } catch (error) {}
  };
};

const asyncHandel = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { apiKey, permission, asyncHandel };
