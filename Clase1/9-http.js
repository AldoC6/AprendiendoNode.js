const http = require('node:http')
const { findAvaliablePort } = require('./10-free-port')

const server = http.createServer((req, res) => {
  console.log('request recived')
  res.end('Hola mundo desde node.js ')
})
findAvaliablePort(3000).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
