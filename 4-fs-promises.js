const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo...')

fs.readFile('./archivos.txt', 'utf-8')
  .then(texto => {
    console.log('Primer texto: ', texto)
  })

console.log('Haciendo cosas mientras lee el archivo') // esto se ejecuta antes que devolver la info del primer texto

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivos2.txt', 'utf-8')
  .then(texto2 => {
    console.log('Segundo texto: ', texto2)
  })
