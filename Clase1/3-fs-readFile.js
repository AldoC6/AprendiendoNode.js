const fs = require('node:fs')
// const { promisify } = require('node:util') // nos permite crear la version de promesas de una que no sea de promesas

// es una forma de transformar de callback a promesas

console.log('Leyendo el primer archivo...')

fs.readFile('./archivos.txt', 'utf-8', (texto) => {
  console.log('Primer texto: ', texto)
})

// sin el utf-8 nos regresaria un buffer que no entenderiamos, este acepta
// 3 parametros, el nombre archivo, tipo de codificacion y el callback!!

console.log('Haciendo cosas mientras lee el archivo') // esto se ejecuta antes que devolver la info del primer texto

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivos2.txt', 'utf-8', (texto2) => {
  console.log('Segundo texto: ', texto2)
})
