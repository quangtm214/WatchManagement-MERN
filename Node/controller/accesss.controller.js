const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../service/access.service");

class AccessController {
  logout = async (req, res, next) => {
    console.log("req.keyStore", req.keyStore);
    new SuccessResponse({
      message: "Logout OK!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      statusCode: 201,

      metadata: await AccessService.login(req.body),
    }).send(res);
  };

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
