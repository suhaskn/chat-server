const express = require('express')
const Sse = require('json-sse')
const bodyParser = require('body-parser')

const cors = require('cors')

const messages = ['hello world']

const data = JSON.stringify(messages)

const sse = new Sse(data)

const app = express()

const middelware = cors()
app.use(middelware)
const jsonParser = bodyParser.json()
app.use(jsonParser)

app.get('/stream', sse.init)

app.post('/message', (req,res) => {
  const { message } = req.body
  messages.push(message)

  const data = JSON.stringify(messages)

  sse.updateInit(data)
  sse.send(data)


  res.send(message)
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