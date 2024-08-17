const { BadRequest, InternalServerError } = require("../core/error.response");
const { isValidObjectId, removeNullUndefinedFields } = require("../utils");
const userRepo = require("../models/repositories/user.repo");

class UserService {
  async updateUserById(userId, userUpdateData) {
    isValidObjectId(userId);

    const removeNullData = removeNullUndefinedFields(userUpdateData);

    const user = await userRepo.getUserById(userId);

    if (!user) {
      throw new BadRequest("User not found");
    }

    const updatedUser = await userRepo.updateUserById(userId, removeNullData);

    if (!updatedUser) {
      throw new BadRequest("Update user fail");
    }

    return updatedUser;
  }

  async getUsers(filter) {
    filter = { isDelete: false, ...filter };

    const users = await userRepo.getUsers(filter);

    if (!users) {
      throw new BadRequest("Users not found");
    }

    return users;
  }

  async getUserById(userId) {
    const users = await userRepo.getUserById(userId);

    if (!users) {
      throw new BadRequest("Users not found");
    }

    return users;
  }
}

module.exports = new UserService();
