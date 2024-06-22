const Brand = require("../model/brandModel");
const Watch = require("../model/watchModel");
const watchService = require("./watchesService");

class brandService {
  static getBrand() {
    return Brand.find();
  }
  static createBrand(brand) {
    const newBrand = new Brand(brand);
    return newBrand.save();
  }
  static updateBrand(brandId, brandName) {
    console.log("brandId", brandId);
    console.log("brandName", brandName);
    return Brand.findByIdAndUpdate(
      brandId,
      { brandName: brandName },
      { new: true }
    );
  }
  static async deleteBrand(brandId) {
    const watch = await Watch.findOne({ brand: brandId });
    if (watch) {
      return "This brand is used in a watch!";
    }
    return Brand.findByIdAndDelete(brandId);
  }
}
module.exports = brandService;
