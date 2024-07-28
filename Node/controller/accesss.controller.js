const AccessService = require("../service/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp`, req.body);
      const result = await AccessService.signUp(
        req.body.membername,
        req.body.password
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new AccessController();
