/**
 * createBranch [Admin- Manager]
 * updateBranchById [Admin- Manager]
 * deleteBranchById [Admin- Manager]
 * getBranchById [Admin- Manager]
 * getBranchByName [Admin- Manager]
 * getAllBranches [Admin- Manager]
 *
 */

const { BadRequest } = require("../core/error.response");
const {
  createBranch,
  getBranchByFields,
  getBranchById,
  getBranches,
  deleteBranchById,
  updateBranchById,
} = require("../models/repositories/branch.repo");
const removeNullUndefinedFields = require("../utils/remove.null.fields.util");
const isValidObjectId = require("../utils/valid.object.id.util");

class BranchService {
  async createBranch(branchData) {
    const existBranch = await getBranchByFields({ name: branchData.name });

    if (existBranch) {
      throw new BadRequest("This branch name is already taken");
    }

    const newBranch = await createBranch(branchData);

    if (!newBranch) {
      throw new BadRequest("Fail to create new branch");
    }

    return newBranch;
  }

  async getBranchById(branchId) {
    isValidObjectId(branchId);

    const selectedOptions = "-isDelete -isPublic";

    const branch = await getBranchById(branchId, selectedOptions);

    if (!branch) {
      throw new BadRequest("There is not branch with this id");
    }

    // test the virtual field in mongoose
    // if you use lean() you can't use the virtual field
    // console.log(branch);

    return branch;
  }

  async getBranchByFields(query) {
    const selectedOptions = "-isDelete -isPublic";

    const branch = await getBranchByFields(query, selectedOptions);
    if (!branch) {
      throw new BadRequest("Branch not found with this query");
    }
    return branch;
  }

  async getBranches(filter = {}, options = {}) {
    filter = { isDelete: false, ...filter };
    const selectedOptions = "-isDelete -isPublic";

    const branches = await getBranches(filter, options, selectedOptions);

    if (!branches) {
      throw new BadRequest("Branches not found");
    }

    return branches;
  }

  async deleteBranchById(branchId) {
    isValidObjectId(branchId);

    const branch = await getBranchById(branchId);

    if (!branch) {
      throw new BadRequest("Branch not found");
    }

    const deletedBranch = await deleteBranchById(branchId);

    return deletedBranch;
  }

  async updateBranchById(branchId, branchUpdateData) {
    isValidObjectId(branchId);

    const removeNullData = removeNullUndefinedFields(branchUpdateData);
    const { isDelete, ...validUpdateData } = removeNullData;

    const branch = await getBranchById(branchId);

    if (!branch) {
      throw new BadRequest("Branch not found");
    }

    const updatedBranch = await updateBranchById(branchId, validUpdateData);

    return updatedBranch;
  }
}

module.exports = new BranchService();
