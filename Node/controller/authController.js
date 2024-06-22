const { token } = require("morgan");
const authService = require("../service/authService");
const passport = require("passport");

class authController {
  async signup(req, res, next) {
    try {
      const member = req.body;
      const result = await authService.signup(member);
      if (result === "Membername already in use") {
        return res.status(401).json({
          status: "fail",
          data: {
            message: result,
          },
        });
      }
      res.status(201).json({ status: "success", data: {} });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const member = req.body;
      console.log("member", member);
      const result = await authService.login(member);
      if (
        result === "Member not found" ||
        result === "Password is not correct"
      ) {
        res.status(401).json({
          status: "fail ",
          data: {
            message: result,
          },
        });
      }
      res.status(201).json({
        status: "success",
        data: {
          token: result.token,
          member: result.member,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async protect(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("token", token);

    if (!token) {
      return res.status(401).json({});
    }
    const result = await authService.protect(token);
    if (result === "Member not found") {
      return res
        .status(401)
        .json({ status: "fail", data: { message: "Member not found" } });
    }
    if (result === "Member has changed password. Please login again") {
      return res.status(401).json({
        status: "fail",
        data: { message: "Member has changed password. Please login again" },
      });
    }
    req.member = result;
    next();
  }
  async restricAdmin(req, res, next) {
    if (req.member.isAdmin === false) {
      // return res.render("forbidden", {
      //   title: "403",
      //   message: "You do not have permission to perform this action",
      // });
    }
    next();
  }
  async logout(req, res, next) {
    // req.logout(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   req.flash("success_msg", "You are logged out");
    //   res.redirect("/auth/login");
    // });

    res.cookie("jwt", "", {
      expires: new Date(0),
      httpOnly: true,
    });
    req.session.destroy((err) => {
      if (err) {
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      }
    });
    res.redirect("/");
  }

  async personal(req, res) {
    const member = await authService.getMemberById(req.member._id);
    res.status(200).json({ status: "success", data: member });
  }

  async ChangePassword(req, res, next) {
    let member = req.body;
    member = { ...member, id: req.member.id };
    const result = await authService.ChangePassword(member);
    console.log("result", result);
    if (result === "Old password is incorrect") {
      return res.status(401).json({});
    }
    res.status(201).json({
      status: "success",
      data: { token: result.token, memberChange: result.memberChange },
    });
  }
}
module.exports = new authController();
