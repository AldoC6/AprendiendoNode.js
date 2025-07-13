// fs = file system  = sistema de archivos

const fs = require('node:fs') // a partir de node 16 se recomienda poner 'node: --'

const stats = fs.statSync('archivos.txt') // es sincrono

console.log(
  stats.isFile(), // si es un fichero
  stats.isDirectory(), // si es un directorio
  stats.isSymbolicLink(), // si es un enlace simbolico
  stats.size // tamaño bytes
)
