//* external
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

//* internal
const { errorHandler } = require('./middleware/errorHandler')
const validator = require('./utils/validator')

//* variable
const port = 3000

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

//* 서버 도메인을 들키면 안 되므로 아예 404로 넘김
app.get('/', (req, res) => {
  return res.status(404).send('')
})

app.get('/siri', async (req, res, next) => {
  try {
    const { input } = await validator.query.validateAsync(req.query)

    return res.status(200).send(`query.input is ${ input }`)
  }
  catch(err) {
    next(err)
  }  
})

app.use((req, res, next) => { //* 없는 라우터 분기 404 처리 부분
  return res.status(404).send()
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`start http://localhost:${ port }`)
})