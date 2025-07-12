const path = require('node:path')

//barra separadora segun SO
console.log(path.sep)

//unir rutas con path join 
const filePhat = path.join('content', 'subfolder', 'test.txt')
console.log(filePhat)

//Otorga el nombre del fichero junto con su extension 'password.txt'
const base = path.basename('/tmp/midu-secret-file/password.txt')
console.log(base)

//Otorga el nombre del fichero sin su extension 'password'
const fileName = path.basename('/tmp/midu-secret-file/password.txt', '.txt')
console.log(fileName)

//Otorga la extension 
const extension = path.extname('image.jpg')
console.log(extension)

