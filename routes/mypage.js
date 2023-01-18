const express = require('express')
const router = express.Router()
const mypageController = require('../controllers/mypage')

router.get('/', mypageController.get)

module.exports = router