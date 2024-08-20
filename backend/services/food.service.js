const { BadRequest } = require("../core/error.response");
const foodRepository = require("../models/repositories/food.repo");
const removeNullUndefinedFields = require("../utils/remove.null.fields.util");

class FoodService {
  async createFood(data, userData) {
    console.log("userData: ", userData);
    data = {...data, userId: userData.userId}
    
    return await foodRepository.createFood(data);
  }

  async getFoodById(id) {
    return await foodRepository.findFoodById(id);
  }

  async getFoodByFields(fields) {
    return await foodRepository.findFoodByFields(fields);
  }

  async getAllFoods(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await foodRepository.findAllFoods(skip, limit);
  }

  async updateFoodGeneralInfoById(id, data) {
    const food = await foodRepository.findFoodById(id);
    data = removeNullUndefinedFields(data);

    if (food.isDeleted || food.isDisable) {
      throw new BadRequest(
        "Can not update food because it is delete or disable"
      );
    }
    const { isDisable, isDeleted, ...generalInfo } = data;
    return await foodRepository.updateFoodGeneralInfoById(id, generalInfo);
  }

  async disableFoodById(id) {
    return await foodRepository.disableFoodById(id);
  }

  async deleteFoodById(id) {
    return await foodRepository.softDeleteFoodById(id);
  }
}

module.exports = new FoodService();
