const os = require('node:os')

console.log('Informacion del sistema operativo')

console.log('----------------------------------')

console.log('Nombre del sistema operativo', os.platform())

console.log('Version del sistema operativo', os.release())

console.log('Arquitectuta', os.arch())

console.log('CPUs', os.cpus())

console.log('Memoria Libre', os.freemem / 1024 / 1024)

console.log('Memoria Total', os.totalmem / 1024 / 1024)

console.log('uptime', os.uptime() / 60 / 60)
