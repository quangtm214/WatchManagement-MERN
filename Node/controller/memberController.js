const memberService = require("../service/memberService");

class memberController {
  async updateMember(req, res) {
    let membername = req.body.membername;
    let memberID = req.member.id;
    let member = await memberService.updateMemberName(memberID, membername);
    console.log("member", member);
    if (member === "Membername already in use") {
      return res
        .status(401)
        .json({ status: "fail", data: { message: member } });
    }
    res.status(201).json({ status: "success", data: member });
  }
  async getAllMember(req, res) {
    let members = await memberService.getAllMember();

    res.status(200).json({ status: "success", data: members });
  }
}
module.exports = new memberController();
