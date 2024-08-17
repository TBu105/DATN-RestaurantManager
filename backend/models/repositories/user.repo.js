const userModel = require("../User.model");
const mongoose = require("mongoose");

class UserRepository {
  async findUserByFields(userFilter) {
    const user = await userModel
      .findOne(userFilter, { isDeleted: false })
      .lean();

    return user;
  }

  async createUser(userData) {
    const newUser = await userModel.create(userData);

    return newUser;
  }

  async getUserById(userId) {
    const user = await userModel
      .findOne({ _id: userId, isDelete: false })
      .lean();

    return user;
  }

  async updateUserById(userId, updateData) {
    const user = await userModel
      .findOneAndUpdate({ _id: userId }, updateData, { new: true })
      .select()
      .lean();

    return user;
  }

  async getUsers(filter = {}, options = {}) {
    const { page = 1, limit = 10 } = options;

    const users = await userModel
      .find(filter)
      .select()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    console.log("users: user repo", users);

    return users;
  }
}

module.exports = new UserRepository();
