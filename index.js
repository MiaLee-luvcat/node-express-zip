//* external
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const NodeCache = require('node-cache')

//* internal
const { errorHandler } = require('./middleware/errorHandler')
const validator = require('./utils/validator')

//* internal - routes
const mypageRouter = require('./routes/mypage')

//* variable
const port = 3000
const myCache = new NodeCache()

const app = express()

//* view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

const models = require('./models/index.js')

models.sequelize.sync().then( () => {
  console.log('DB 연결 성공')
}).catch(err => {
  console.log('연결 실패')
  console.log(err)
})

let a = 1
global.b = a

app.use('/mypage', mypageRouter)

app.get('/siri', async (req, res, next) => {
  try {
    const { input } = await validator.query.validateAsync(req.query)

    return res.status(200).send(`query.input is ${ input }`)
  }
  catch(err) {
    next(err)
  }  
})

//* 서버 도메인을 들키면 안 되므로 아예 404로 넘김
app.get('/', (req, res) => {
  return res.status(404).send('')
})

app.use((req, res, next) => { //* 없는 라우터 분기 404 처리 부분
  return res.status(404).send()
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`start http://localhost:${ port }`)
})