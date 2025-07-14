const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('Hola mundo desde node.js página web con acento, o sea página con acento jejeje')
  } else if (req.url === '/imagen-pendeja.jpg') {
    res.setHeader('Content-Type', 'image/jpg')
    fs.readFile('images.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal server error')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('Contacto')
  } else {
    res.statusCode = 404 // No encontrado
    res.end('Error 404')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening in port http://localhost:${desiredPort}`)
})
