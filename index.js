//* external
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

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

app.get('/siri', (req, res) => {
  if(!req.query?.input) return res.status(200).send(`Input query 'input'!  example: localhost:3000/siri?input=ok`)
  return res.status(200).send(`query.input is ${ req.query?.input }`)
})

app.use((req, res, next) => { //* 없는 라우터 분기 404 처리 부분
  return res.status(404).send()
})

app.listen(port, () => {
  console.log(`start http://localhost:${ port }`)
})