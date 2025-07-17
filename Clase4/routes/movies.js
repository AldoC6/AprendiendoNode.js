import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll) // Carpeta controllers

moviesRouter.get('/:id', MovieController.getById) // Carpeta controllers

moviesRouter.post('/', MovieController.create) // Carpeta controllers

moviesRouter.delete('/:id', MovieController.delete) // Carpeta controllers

moviesRouter.patch('/:id', MovieController.update) // Carpeta controllers
