const brandService = require("../service/brandService");
const watchService = require("../service/watchesService");

class watchController {
  static async getListWatch(req, res, next) {
    try {
      const result = await watchService.getListWatch();
      const brands = await brandService.getBrand();
      res.render("watchManage", {
        title: "watches",
        watches: result,
        brands: brands,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createWatch(req, res, next) {
    try {
      const watch = req.body;
      console.log(" req.body: ", req.body);
      if (watch.Automatic) {
        console.log("watch.Automatic", watch.Automatic);
      }
      const result = await watchService.createWatch(watch);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async updateWatch(req, res, next) {
    try {
      const watchId = req.params.watchId;
      const watch = req.body;
      console.log(" req.body: ", req.body);
      const result = await watchService.updateWatch(watchId, watch);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async deleteWatch(req, res, next) {
    try {
      const watchId = req.params.watchId;
      const result = await watchService.deleteWatch(watchId);
      res.status(204).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async getDetailWatch(req, res, next) {
    try {
      const watchId = req.params.watchId;
      const watch = await watchService.getDetailWatch(watchId);
      res.status(200).json({ status: "success", data: watch });
    } catch (error) {
      next(error);
    }
  }
  static async addComments(req, res, next) {
    try {
      const watchId = req.params.watchId;
      let comment = req.body;
      comment = { ...comment, author: req.member.id };
      const watch = await watchService.addComments(watchId, comment);
      if (watch === "You have already commented on this watch") {
        return res.status(401).json({
          status: "fail",
          data: { message: "You have already commented on this watch" },
        });
      }
      res.status(201).json({ status: "success", data: watch });
    } catch (error) {
      next(error);
    }
  }
  static async editComment(req, res, next) {
    try {
      const watchId = req.params.watchId;
      let comment = req.body;
      comment = { ...comment, author: req.member._id };
      if (comment.author != req.member._id) {
        return res.redirect(`/watchs/detail/${watchId}`);
      }
      const result = await watchService.editComment(watchId, comment);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async deleteComment(req, res, next) {
    try {
      const watchId = req.params.watchId;
      const commentId = req.params.commentId;
      console.log("commentId2", commentId);
      const watch = await watchService.deleteComment(
        watchId,
        commentId,
        req.member._id
      );
      console.log("watch", watch);
      res.status(204).json({ status: "success", data: watch });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = watchController;
