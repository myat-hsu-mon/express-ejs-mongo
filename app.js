const express = require('express')
const app = express()
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const port = 8000
const mongoose = require('mongoose')
const ejs = require('ejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const { render } = require('./utilities/response')

mongoose.connect('mongodb://localhost:27017/docker-node-mongo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('DB successfully connected'))
  .catch((error) => console.log('DB connection error:', error))

const urlEncodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return render(res, 'pages/index')
})
app.use('/users', userRouter);
app.use('/auth', urlEncodedParser, authRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})