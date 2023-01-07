const express = require('express')
const router = express.Router()
const path = require('path')
const mypageController = require('../controllers/mypage')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express mypage' })
})
// router.get('/', mypageController.mypage)

module.exports = router