const express = require('express') // require = CommonJS
const crypto = require('crypto') // Libreria nativa de Node.js para generar IDs únicos
const app = express()
const cors = require('cors') // Middleware para manejar CORS
app.disable('x-powered-by')
app.use(cors()) // Habilita TODAS las rutas para solucionar CORS
app.use(express.json()) // Middleware para parsear el cuerpo de las peticiones a JSON
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

// Utilizamos Zod y yu para la validacion de los datos

// Libreria path-to-regexp:
// Convierte path (rutas) que son muy complicados.
// Los convierte en expresiones regulares

// Todos los recursos que sean movies se identifican con /movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  // El navegador nunca envia el header de origin cuando la peticion
  // es desde el mismo origen
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Permite el acceso desde el origen especificado
  }
  // Permite el acceso desde cualquier origen, resuelve CORS!!!!
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // Filtro para que salga en mayuscula o minuscula
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Filtrar por ID
app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

// Falta validaciones
app.post('/movies', (req, res) => {
  // Aqui usamos Zod para validar los datos de entrada zod = z, carpera schemas>movies.js
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // Genera un ID único
    ...result.data // Utilizamos el resultado de la validacion
  }
  // Esto no seria REST, porque estamos guardando
  // el estado de la aplicacion en la memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // 201 Created
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1) // Elimina la pelicula del array

  return res.json({ message: 'Movie deleted successfully' }) // 200 OK
})

// Actualizar una pelicula por ID
// Usamos PATCH para actualizar parcialmente
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex], // Mantenemos los datos existentes
    ...result.data // Actualizamos con los nuevos datos
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie) // 200 OK
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Permite el acceso desde el origen especificado
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE') // Permite los metodos especificados
  }
  res.send(200)
})

const port = process.env.port ?? 1234

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
