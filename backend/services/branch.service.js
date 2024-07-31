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
const removeNullUndefinedFields = require("../utils/remove.null.fields.util");
const isValidObjectId = require("../utils/valid.object.id.util");

class BranchService {
  constructor(branchRepo) {
    this.branchRepo = branchRepo;
  }

  async createBranch(branchData) {
    const existBranch = await this.branchRepo.getBranchByFields({
      name: branchData.name,
    });

    if (existBranch) {
      throw new BadRequest("This branch name is already taken");
    }

    const newBranch = await this.branchRepo.createBranch(branchData);

    if (!newBranch) {
      throw new BadRequest("Fail to create new branch");
    }

    return newBranch;
  }

  async getBranchById(branchId) {
    isValidObjectId(branchId);

    const selectedOptions = "-isDelete -isPublic";

    const branch = await this.branchRepo.getBranchById(
      branchId,
      selectedOptions
    );

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

    const branch = await this.branchRepo.getBranchByFields(
      query,
      selectedOptions
    );
    if (!branch) {
      throw new BadRequest("Branch not found with this query");
    }
    return branch;
  }

  async getBranches(filter = {}, options = {}) {
    filter = { isDelete: false, ...filter };
    const selectedOptions = "-isDelete -isPublic";

    const branches = await this.branchRepo.getBranches(
      filter,
      options,
      selectedOptions
    );

    if (!branches) {
      throw new BadRequest("Branches not found");
    }

    return branches;
  }

  async deleteBranchById(branchId) {
    isValidObjectId(branchId);

    const branch = await this.branchRepo.getBranchById(branchId);

    if (!branch) {
      throw new BadRequest("Branch not found");
    }

    const deletedBranch = await this.branchRepo.deleteBranchById(branchId);

    return deletedBranch;
  }

  async updateBranchById(branchId, branchUpdateData) {
    isValidObjectId(branchId);

    const removeNullData = removeNullUndefinedFields(branchUpdateData);
    const { isDelete, ...validUpdateData } = removeNullData;

    const branch = await this.branchRepo.getBranchById(branchId);

    if (!branch) {
      throw new BadRequest("Branch not found");
    }

    const updatedBranch = await this.branchRepo.updateBranchById(
      branchId,
      validUpdateData
    );

    return updatedBranch;
  }
}

module.exports = BranchService;
