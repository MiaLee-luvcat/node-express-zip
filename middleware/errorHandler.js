const { cl } = require('../controllers/helper')

const errorHandler = (error, req, res, next) => {
  //* 기본적으로 서버 에러라는 가정하에 500 세팅 
  let status = error.status || 500
  let message = error.message

  //* joi 라이브러리 사용한 validation 검사 에러(입력값 오류)
  if(error.name === 'ValidationError') {
    cl(error.message)
    status  = 400
    message = '입력값이 잘못됐습니다.'
  }
  //* 서버 에러
  if(error.status === 500) {
    message = 'Server Error'
  }

  return res.status(status).json({ message })
}

module.exports = { errorHandler }