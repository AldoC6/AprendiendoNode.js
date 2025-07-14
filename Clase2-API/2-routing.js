const http = require('node:http')

// Common JS permite importar json
const dittoJSON = require('./pokemon/ditto.json')

// Para una API existen diferentes metodos (Los mas comunes):
// GET = Peticion para recuperar datos
// HEAD = Casi lo mismo de GET pero sin proporcionar el body
// POST = Crea una entidad de un recurso  ???
// PUT = Reemplaza un recurso que ya existe
// DELETE = Eliminar
// OPTIONS = Describe los recursos
// PATCH = Modifica parcialmente una parte del recurso

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET': // Metodo GET!!
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'aplication/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('404')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // Se puede llamar a una base de datos para guardar info!!!!!!!
            res.writeHead(201, { 'Content-Type': 'aplication/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('404')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server Listening on port http://localhost:1234')
})
