const { Created, Ok } = require("../core/success.response");
const branchService = require("../services/branch.service");

class BranchController {

  
  async createBranch(req, res) {
    new Created({
      message: "Create new branch successfully",
      metadata: await branchService.createBranch(req.body),
    }).send(res);
  }

  async getBranchById(req, res) {
    new Ok({
      message: "Get branch by Id successfully",
      metadata: await branchService.getBranchById(req.params.branchId),
    }).send(res);
  }

  async getBranchByFields(req, res) {
    new Ok({
      message: "Get branch by name successfully",
      metadata: await branchService.getBranchByFields(req.query),
    }).send(res);
  }

  async getBranches(req, res) {
    const filter = req.query; // This will get all query parameters as an object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const options = { page, limit };

    new Ok({
      message: "Get branches by filter successfully",
      metadata: await branchService.getBranches(filter, options),
    }).send(res);
  }

  async deleteBranchById(req, res) {
    new Ok({
      message: "Deleted branch by id successfully",
      metadata: await branchService.deleteBranchById(req.params.branchId),
    }).send(res);
  }

  async updateBranchById(req, res) {
    new Ok({
      message: "Update branch by id successfully",
      metadata: await branchService.updateBranchById(
        req.params.branchId,
        req.body
      ),
    }).send(res);
  }
}

module.exports = new BranchController();
