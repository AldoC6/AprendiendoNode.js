import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string({
    invalid_type_error: 'Movie director must be a string',
    required_error: 'Movie director is required.'
  }),
  duration: z.number().int().positive(),
  rate: z.number().max(10).min(0).default(5), // Valor por defecto 5
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of strings.'
    }
  )

  // No es correcto validar en cada request o sea crear el esquema
  // Lo correcto es crear una carpeta schemas y crear los archivos de las validaciones
  // No todas las validaciones son requeridas
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
