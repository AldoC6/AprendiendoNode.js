// Migrando .JS a .MJS

// En los tres puntos de require utilizar ctrl + . // y seleccionar la opción de convertir a import
// IMPORTANTE: No siempre lo hace bien
// La linea 9 lo hace mal, tendremos que reemplazarlo manualmente donde hace cada metodo
// No se pueden importar JSON con msj modules

import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

// import fs, { readFileSync } from 'node:fs'

// Forma 1 para leer un archivo JSON en MSJ modules
// const movies = fs.readFileSync = JSON.parse(readFileSync('./movies.json', 'utf-8'))

// Como leer un JSON en MSJ modules recomendado en 2023

const app = express()
// const cors = require('cors')
app.disable('x-powered-by')
app.use(json())

app.use(corsMiddleware())

// Separamos todas las rutas que tienen que ver con /movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
