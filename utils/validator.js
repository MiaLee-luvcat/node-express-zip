//* external
const joi = require('joi')

//* internal
const { cl } = require('../controllers/helper')

const input = joi.string().trim().required()

const query = joi.object({
    input
})

module.exports = { query }