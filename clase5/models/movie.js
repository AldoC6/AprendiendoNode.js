// En el modelo se maneja toda la logica del negocio

// import { validateMovie, validatePartialMovie } from '../schemas/movies'
import { readJSON } from '../utlis.js'
import { randomUUID } from 'crypto'

const movies = readJSON('./movies.json')

// No es de a huevo utilizar una clase
export class MovieModel {
  // Metodo GET con filtro de genero
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  // Metodo GET por ID
  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  // Metodo POST para crear una nueva pelicula
  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
