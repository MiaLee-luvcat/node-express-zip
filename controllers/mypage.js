//* external
const path = require('path')

//* internal
const { cl } = require('./helper')

const get = async (req, res, next) => {
  try {
    res.render('index', { title: 'Express mypage' })
  }
  catch (err) {
    next()
  }
}

module.exports = { get }