const brandService = require("../service/brandService");

class brandController {
  static async getBrand(req, res, next) {
    try {
      const brands = await brandService.getBrand();
      res.status(200).json({ status: "success", data: brands });
    } catch (error) {
      next(error);
    }
  }
  static async createBrand(req, res, next) {
    try {
      const brand = req.body;
      const result = await brandService.createBrand(brand);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async updateBrand(req, res, next) {
    try {
      const brandName = req.body.brandName;
      const brandId = req.params.brandId;
      const result = await brandService.updateBrand(brandId, brandName);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
  static async deleteBrand(req, res, next) {
    try {
      const brandId = req.params.brandId;
      const result = await brandService.deleteBrand(brandId);
      if (result === "This brand is used in a watch!") {
        res.status(401).json({ status: "fail", data: { message: result } });
      }
      res.status(204).json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = brandController;
