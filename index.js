//* external
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const NodeCache = require('node-cache')
const rateLimit = require('express-rate-limit')
const { JsonDB, Config } = require('node-json-db')

//* internal
const { errorHandler } = require('./middleware/errorHandler')
const validator = require('./utils/validator')

//* internal - routes
const mypageRouter = require('./routes/mypage')

//* variable
const port = 3000
const myCache = new NodeCache()
const db = new JsonDB(new Config('myDataBase', true, false, '/'))

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

//* [start] 시간당 요청 제한
const limiter = rateLimit({
  max                   : 5, // Limit each IP to 6 requests per `window` (here, per 1 min)
  windowMs              : 60 * 1000, // 1분
  legacyHeaders         : false, // Disable the `X-RateLimit-*` headers
  standardHeaders       : true, // Return rate limit info in the `RateLimit-*` headers
  skipSuccessfulRequests: true,
  requestWasSuccessful  : (request, response) => response.statusCode < 400,
  // handler: async function (req, res, /*next*/) {
  //   limitIps.create({ ip: requestIp.getClientIp(req) })
  //   return res.status(429).json({ error: 'You sent too many requests. Please wait a while then try again' })
  // },
  async handler(req, res, /*next*/) {
    return res.status(429).json({ message: 'Thank U for your interest' })
  },
})

app.use(limiter)
//* [end] 시간당 요청 제한


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

app.get('/ssy', async(req, res, next) => {
  try {
    await db.push('/test1', ['super test2'], false)

    //* Get the data from the root
    const data = await db.getData('/')

    //* Or from a particular DataPath
    const data2 = await db.getData('/test1')
    return res.status(200).json({ data, data2 })
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