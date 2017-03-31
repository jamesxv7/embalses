const express = require('express')

const port = process.env.port || 1337

const app = express()

app.use(express.static('public'))

let server = app.listen(port, function () {
  let host = server.address().address

  console.log('I am a running server', host, port)
})
