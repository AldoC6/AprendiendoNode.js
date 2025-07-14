const dittoJSON = require('./pokemon/ditto.json')
const express = require('express')
const PORT = process.env.PORT ?? 1234
const app = express() // Dentro se pueden agregar diferentes opciones
app.disable('x-powered-by') // Elimina el nuevo header creado por express (Garantiza Seguridad)

// Las funciones se van corriendo de forma secuencial

// app.use(express.json()) con esta linea se puede hacer todo lo que hicimos abajo XD

// Midleware, [Explicacion hasta el final]
app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Aqui solo llegan request que son POST y que tiene el header content-type: aplication/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la informacion en el req.body
    // casi siempre se muta
    req.body = data
    next()
  })
  // NEXT ES OBLIGATORIO PARA CONTINUAR
})

// si no encuentra la ruta de get va a la de post
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

// Ruta de post!!
app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en base de datos
  res.status(201).json(req.body)
})

// La ULTIMA a la que va a llegar
app.use((req, res) => {
  res.status(404).send('Error 404')
})

// Puerto donde se lanza el proyecto
app.listen(PORT, () => {
  console.log(`Server Listening on port http://localhost:${PORT}`)
})

// Que es un middleware?
// Es un proceso en el que pasa todo lo que tu quieras
// antes de llegar a la que trata
// Middleware puede:
// Extraer cookies, validar si un usuario esta logeado, extraer informacion de json
// Cuando el middleware termina de procesar llama al metodo next()

// Resumen:

// El middleware es una funcion que se ejecuta entre la peticion y la respuesta
