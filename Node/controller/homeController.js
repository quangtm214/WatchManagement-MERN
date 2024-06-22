const brandService = require("../service/brandService");
const watchService = require("../service/watchesService");

class homeController {
  static async gohome(req, res) {
    const filteredQuery = Object.fromEntries(
      Object.entries(req.query).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );
    // req.session.watchName = filteredQuery.watchName;
    // req.session.brand = filteredQuery.brand;
    console.log("reqQuery", req.query);
    console.log("filteredQuery", filteredQuery);
    const result = await watchService.getListWatch(filteredQuery);
    const brands = await brandService.getBrand();
    res.status(200).json({
      status: "success",
      data: {
        title: "WatchesHome",
        watches: result,
        brands: brands,
      },
    });
    // res.render("home", {
    //   title: "WatchesHome",
    //   watches: result,
    //   brands: brands,
    //   session: req.session,
    // });
  }
}
module.exports = homeController;
