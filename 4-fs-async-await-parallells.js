import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('archivos.txt', 'utf-8'),
  readFile('archivos2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('Primer texto:', text)
  console.log('Segundo texto:', text2)
})
