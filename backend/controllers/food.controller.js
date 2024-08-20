const foodService = require("../services/food.service");
const { Created, Ok } = require("../core/success.response");
const { BadRequest } = require("../core/error.response");

class FoodController {
  async createFood(req, res) {
    console.log("req.user: ", req.user);

    new Created({
      message: "Create new food successfully",
      metadata: await foodService.createFood(req.body, req.user),
    }).send(res);
  }

  async getFoodById(req, res) {
    const food = await foodService.getFoodById(req.params.id);
    if (!food) {
      throw new BadRequest("Food not found");
    }
    new Ok({
      message: "Get food by Id successfully",
      metadata: food,
    }).send(res);
  }

  async getFoodByFields(req, res) {
    new Ok({
      message: "Get food by fields successfully",
      metadata: await foodService.getFoodByFields(req.query),
    }).send(res);
  }

  async getAllFoods(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const foods = await foodService.getAllFoods(page, limit);
    new Ok({
      message: "Get foods successfully",
      metadata: foods,
    }).send(res);
  }

  async updateFoodGeneralInfoById(req, res) {
    const food = await foodService.updateFoodGeneralInfoById(
      req.params.id,
      req.body
    );
    if (!food) {
      throw new BadRequest("Food not found");
    }
    new Ok({
      message: "Update food by ID successfully",
      metadata: food,
    }).send(res);
  }

  async disableFoodById(req, res) {
    const updatedFood = await foodService.disableFoodById(req.params.id);
    new Ok({
      message: "Disable food by ID successfully",
      metadata: updatedFood,
    }).send(res);
  }

  async deleteFoodById(req, res) {
    const food = await foodService.deleteFoodById(req.params.id);
    if (!food) {
      throw new BadRequest("Food not found");
    }
    new Ok({
      message: "Delete food by ID successfully",
      metadata: food,
    }).send(res);
  }
}

module.exports = new FoodController();
