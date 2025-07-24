// Migrando .JS a .MJS

// En los tres puntos de require utilizar ctrl + . // y seleccionar la opción de convertir a import
// IMPORTANTE: No siempre lo hace bien
// La linea 9 lo hace mal, tendremos que reemplazarlo manualmente donde hace cada metodo
// No se pueden importar JSON con msj modules

import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  // const cors = require('cors')
  app.disable('x-powered-by')
  app.use(json())

  app.use(corsMiddleware())

  // Separamos todas las rutas que tienen que ver con /movies
  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}
