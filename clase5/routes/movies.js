import { Router } from 'express'
import { MovieModel } from '../models/mysql/movie.js'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel: MovieModel })

  moviesRouter.get('/', movieController.getAll) // Carpeta controllers

  moviesRouter.get('/:id', movieController.getById) // Carpeta controllers

  moviesRouter.post('/', movieController.create) // Carpeta controllers

  moviesRouter.delete('/:id', movieController.delete) // Carpeta controllers

  moviesRouter.patch('/:id', movieController.update) // Carpeta controllers

  return moviesRouter
}
