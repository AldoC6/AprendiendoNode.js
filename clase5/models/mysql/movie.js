// Tarea: hacer el get by genre, delete y patch

import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return []
    }

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )
    if (movies.length === 0) return null
    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      rate,
      poster
    } = input

    // TAREA: Agregar la conexion de genre

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
            `INSERT INTO movie(id, title, year, director, duration, poster, rate) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // Aqui se puede mandar informacion sensible, NO MOSTRAR AL USUARIO
      throw new Error('Error creating movie')
      // Enviar la traza a un servicio interno
    }

    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    // Ejercicio crear delete ✅
    await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]
    )
  }

  static async update ({ id, input }) {
    // Ejercicio crear update ✅
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      rate,
      poster
    } = input
    await connection.query(
      'UPDATE movie SET title = ? WHERE id = UUID_TO_BIN(?)',
      [title, id]
    )
  }
}
