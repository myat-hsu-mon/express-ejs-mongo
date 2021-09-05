const express = require('express')
const app = express()
const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const port = 8000
const mongoose = require('mongoose')



mongoose.connect('mongodb://mongo:27017/docker-node-mongo', 
{
  useNewUrlParser: true,
  useUnifiedTopology:  true,
}).then( () => console.log('DB successfully connected'))
.catch((error) => console.log('DB connection error:', error))

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', userRouter);
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})