const { BadRequest } = require('../core/error.response');
const User = require('../models/User.model')

const sigin = (req, res) => {
    const {password} = req.body;

    if ( !password  ) {
        throw new BadRequest("You need to enter password")
    }
}