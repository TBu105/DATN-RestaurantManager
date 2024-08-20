const { Created, Ok } = require("../core/success.response");
const tableService = require("../services/table.service");

class TableController {
  async createTable(req, res) {
    new Created({
      message: "Create new table successfully",
      metadata: await tableService.createTable(req.body),
    }).send(res);
  }

  async getTableById(req, res) {
    new Ok({
      message: "Get table by Id successfully",
      metadata: await tableService.getTableById(req.params.tableId),
    }).send(res);
  }

  async getTableByFields(req, res) {
    new Ok({
      message: "Get table by fields successfully",
      metadata: await tableService.getTableByFields(req.query),
    }).send(res);
  }

  async getTables(req, res) {
    const filter = req.query; // This will get all query parameters as an object
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const options = { page, limit };

    new Ok({
      message: "Get tables by filter successfully",
      metadata: await tableService.getTables(filter, options),
    }).send(res);
  }

  async deleteTableById(req, res) {
    // Lấy tham số confirmDelete từ query string
    const confirmDelete = req.query.confirmDelete === "true";

    if (!confirmDelete) {
      return res.status(400).json({
        success: false,
        message: "Delete operation not confirmed. Please confirm deletion.",
      });
    }

    // Thực hiện xóa nếu người dùng đã xác nhận
    new Ok({
      message: "Deleted table by id successfully",
      metadata: await tableService.deleteTableById(req.params.tableId),
    }).send(res);
  }


  async updateTableById(req, res) {
    const { name, status } = req.body; // Lấy giá trị name và status từ request body
    
    // Tạo đối tượng chứa dữ liệu cần update
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (status !== undefined) updateData.status = status;
  
    // Gọi service để update dữ liệu
    const updatedTable = await tableService.updateTableById(req.params.tableId, updateData);
  
    new Ok({
      message: "Update table by id successfully",
      metadata: updatedTable,
    }).send(res);
  }
  
}

module.exports = new TableController();
