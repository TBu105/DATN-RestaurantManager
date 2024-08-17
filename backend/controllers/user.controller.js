const { Ok } = require("../core/success.response");
const userService = require("../services/user.service");

class UserController {
  async updateUserById(req, res) {
    new Ok({
      message: "Update User By Id successfully",
      metadata: await userService.updateUserById(req.params.userId, req.body),
    }).send(res);
  }

  async getUsers(req, res) {
    new Ok({
      message: "Get Users successfully",
      metadata: await userService.getUsers(req.body),
    }).send(res);
  }

  async getUserById(req, res) {
    new Ok({
      message: "Get User By Id successfully",
      metadata: await userService.getUserById(req.params.userId),
    }).send(res);
  }
}

module.exports = new UserController();
