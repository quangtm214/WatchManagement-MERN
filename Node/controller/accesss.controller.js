const { CREATED } = require("../core/success.response");
const AccessService = require("../service/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    console.log(`[P]::signUp`, req.body);
    const result = await AccessService.signUp(
      req.body.membername,
      req.body.password
    );
    new CREATED({
      message: "Registed OK!",
      metadata: result,
      options: {
        limit: 10,
      },
    }).send(res);
    // return res.status(201).json(result);
  };
}
module.exports = new AccessController();
