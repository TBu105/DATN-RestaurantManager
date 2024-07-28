const { Forbidden } = require("../core/error.response")

const denyAll = (req, res) => {
    throw new Forbidden("This route right now is unavailable")
}

module.exports = denyAll