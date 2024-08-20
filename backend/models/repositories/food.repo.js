const Food = require("../Food.model");

class FoodRepository {
  async createFood(data) {
    const food = new Food(data);
    return await food.save();
  }

  async findFoodById(id) {
    return await Food.findById(id).lean();
  }

  async findFoodByFields(fields) {
    return await Food.find(fields).lean();
  }

  async findAllFoods(skip, limit) {
    return await Food.find({ isDeleted: false, isDisable: false })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async updateFoodGeneralInfoById(id, data) {
    return await Food.findByIdAndUpdate(id, data, { new: true });
  }

  async disableFoodById(id) {
    return await Food.findByIdAndUpdate(id, { isDisable: true }, { new: true });
  }

  async softDeleteFoodById(id) {
    return await Food.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}

module.exports = new FoodRepository();
