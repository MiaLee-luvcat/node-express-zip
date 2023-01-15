const express = require('express')
const router = express.Router()
const mypageController = require('../controllers/mypage')
å
router.get('/', mypageController.get)

module.exports = router