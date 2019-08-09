const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')

const dababaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'

const db = new Sequelize(dababaseUrl)

db
  .sync({force: false})
  .then(() => console.log('Database connected'))

const Message = db.define(
  'message',
  {
    text: Sequelize.STRING
  }
)

const stream = new Sse()

const app = express()

const middelware = cors()
app.use(middelware)
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.get('/stream',
        async (req,res) => {
          const messages = await Message.findAll()
          const data = JSON.stringify(messages)
          stream.updateInit(data)
          stream.init(req,res)
        } 
        //sse.init
      )

app.post('/message', 
        async (req, res) => {
        const { message } = req.body

  const entity = await Message.create({ text: message})

  const messages = await Message.findAll()

  const data = JSON.stringify(messages)

  sse.updateInit(data)
  sse.send(data)


  res.send(entity)
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listning on ${port}`))




//*************For chat App**************** */
// const express = require('express')
// const Sse = require('json-sse')
// const bodyParser = require('body-parser')

// const data = 'hello world'

// const sse = new Sse(data)

// const app = express()

// const jsonParser = bodyParser.json()
// app.use(jsonParser)

// app.get('/stream', sse.init)

// app.post('/message', (req,res) => {
//   const { message } = req.body
//   sse.send(message)
//   res.send(message)
// })

// const port = process.env.PORT || 5000

// app.listen(port, () => console.log(`Listning on ${port}`))