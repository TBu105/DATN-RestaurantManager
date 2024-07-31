class BranchRepository {
  constructor(branchModel) {
    this.branchModel = branchModel;
  }

  async createBranch(branchData) {
    const newBranch = await this.branchModel.create(branchData);

    return newBranch;
  }

  async getBranchByFields(fields, selectedOption = {}) {
    const branch = await this.branchModel
      .findOne(fields, { isDelete: false })
      .select(selectedOption)
      .lean();

    return branch;
  }

  async getBranchById(branchId, selectedOption = {}) {
    const branch = await this.branchModel
      .findOne({
        _id: branchId,
        isDelete: false,
      })
      .select(selectedOption);

    return branch;
  }

  async getBranches(filter, options, selectedFields = {}) {
    const { page, limit } = options;

    const branch = await this.branchModel
      .find(filter, { isDelete: false })
      .select(selectedFields)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return branch;
  }

  async deleteBranchById(branchId) {
    const branch = await this.branchModel.findOneAndUpdate(
      { _id: branchId },
      { isDelete: true },
      { new: true }
    );

    return branch;
  }

  async UpdateBranchById(branchId, validUpdatedData) {
    const branch = await this.BranchModel.findOneAndUpdate(
      { _id: branchId },
      validUpdatedData,
      { new: true }
    );

    return branch;
  }
}

module.exports = BranchRepository;
