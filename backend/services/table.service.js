const { BadRequest } = require("../core/error.response");
const removeNullUndefinedFields = require("../utils/remove.null.fields.util");
const isValidObjectId = require("../utils/valid.object.id.util");
const tableRepo = require("../models/repositories/table.repo");

class TableService {
    async createTable(tableData, userData) {
        tableData = { ...tableData, userId: userData.userId }
        const existTable = await tableRepo.getTableByFields({
            number: tableData.number,
        });

        if (existTable) {
            throw new BadRequest("This table number is already taken for the branch");
        }

        const newTable = await tableRepo.createTable(tableData);

        if (!newTable) {
            throw new BadRequest("Fail to create new table");
        }

        return newTable;
    }

    async getTableById(tableId) {
        isValidObjectId(tableId);

        const selectedOptions = "-isDelete";

        const table = await tableRepo.getTableById(tableId, selectedOptions);

        if (!table) {
            throw new BadRequest("There is no table with this id");
        }

        return table;
    }

    async getTableByFields(query) {

        const selectedOptions = "-isDelete";

        const table = await tableRepo.getTableByFields(query, selectedOptions);
        if (!table) {
            throw new BadRequest("Table not found with this query");
        }
        return table;
    }

    async getTables(filter = {}, options = {}) {
        filter = { isDelete: false, ...filter };

        const selectedOptions = "-isDelete";

        const tables = await tableRepo.getTables(
            filter,
            options,
            selectedOptions
        );

        if (!tables) {
            throw new BadRequest("Tables not found");
        }

        return tables;
    }

    async deleteTableById(tableId) {
        isValidObjectId(tableId);

        const table = await tableRepo.getTableById(tableId);

        if (!table) {
            throw new BadRequest("Table not found");
        }

        const deletedTable = await tableRepo.deleteTableById(tableId);

        return deletedTable;
    }

    async updateTableById(tableId, tableUpdateData) {
        isValidObjectId(tableId);

        const removeNullData = removeNullUndefinedFields(tableUpdateData);
        const { isDelete, ...validUpdateData } = removeNullData;

        const table = await tableRepo.getTableById(tableId);

        if (!table) {
            throw new BadRequest("Table not found");
        }

        const updatedTable = await tableRepo.updateTableById(
            tableId,
            validUpdateData
        );

        return updatedTable;
    }
}

module.exports = new TableService();
