const BranchModel = require("../Branch.model");

const createBranch = async (branchData) => {
  const newBranch = await BranchModel.create(branchData);

  return newBranch;
};

const getBranchByFields = async (fields, selectedOption = {}) => {
  const branch = await BranchModel.findOne(fields, { isDelete: false })
    .select(selectedOption)
    .lean();

  return branch;
};

const getBranchById = async (branchId, selectedOption = {}) => {
  const branch = await BranchModel.findOne({
    _id: branchId,
    isDelete: false,
  }).select(selectedOption);

  return branch;
};

const getBranches = async (filter, options, selectedFields = {}) => {
  const { page, limit } = options;

  const branch = await BranchModel.find(filter, { isDelete: false })
    .select(selectedFields)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return branch;
};

const deleteBranchById = async (branchId) => {
  const branch = await BranchModel.findOneAndUpdate(
    { _id: branchId },
    { isDelete: true },
    { new: true }
  );

  return branch;
};

const updateBranchById = async (branchId, validUpdatedData) => {
  const branch = await BranchModel.findOneAndUpdate(
    { _id: branchId },
    validUpdatedData,
    { new: true }
  );

  return branch;
};

module.exports = {
  createBranch,
  getBranchByFields,
  getBranchById,
  getBranches,
  deleteBranchById,
  updateBranchById,
};
