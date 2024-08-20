const tableModel = require("../Table.model");

class TableRepository {
  async createTable(tableData) {
    const newTable = await tableModel.create(tableData);
    return newTable;
  }

  async getTableByFields(fields, selectedOption = {}) {
    const table = await tableModel
      .findOne(fields, { isDelete: false })
      .select(selectedOption)
      .lean();

    return table;
  }

  async getTableById(tableId, selectedOption = {}) {
    const table = await tableModel
      .findOne({
        _id: tableId,
        //isDelete: false,
      })
      .select(selectedOption);

    return table;
  }

  async getTables(filter, options, selectedFields = {}) {
    const { page, limit } = options;
    //{ isDelete: false }
    const tables = await tableModel
      .find(filter)
      .select(selectedFields)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    console.log(filter);


    return tables;
  }

  async deleteTableById(tableId) {
    const table = await tableModel.findOneAndUpdate(
      { _id: tableId },
      //{ isDelete: true },
      { new: true }
    );

    return table;
  }

  async updateTableById(tableId, validUpdatedData) {
    const table = await tableModel.findOneAndUpdate(
      { _id: tableId },
      validUpdatedData,
      { new: true }
    );

    return table;
  }
}

module.exports = new TableRepository();
