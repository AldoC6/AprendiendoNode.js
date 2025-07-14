const { readFile } = require('node:fs/promises')

// Async normal
async function start () {
  console.log('Leyendo el primer archivo')
  const text = await readFile('archivos.txt', 'utf-8')

  console.log('Primer Texto: ', text)

  console.log('Hacer cosas mientras lee el archivo')
  const text2 = await readFile('archivos2.txt', 'utf-8')

  console.log('Segundo texto: ', text2)
}

start()

// IIFE - Inmediatly Invoked Function Expression
// FUNCION AUTOINVOCADA, INVESTIGAR!!!! = Funcion que se invoca justo cuando se esta creando
;( // punto y coma importante o sale error jeje
  async () => {
    console.log('Leyendo el primer archivo')
    const text = await readFile('archivos.txt', 'utf-8')

    console.log('Primer Texto: ', text)

    console.log('Hacer cosas mientras lee el archivo')
    const text2 = await readFile('archivos2.txt', 'utf-8')

    console.log('Segundo texto: ', text2)
  }

)()
