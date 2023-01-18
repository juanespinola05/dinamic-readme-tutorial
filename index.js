import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import ejs from 'ejs'
import getVideosFromAPI from './utils/videos.js'

// Creamos nuestras rutas a nuestros archivos
const TEMPLATE_PATH = resolve('template.ejs')
const README_PATH = resolve('README.md')

// Leemos el contenido del archivo de
// plantilla y lo guardamos en template
const template = readFileSync(TEMPLATE_PATH)

// Creamos el objeto con la información que vamos a necesitar
const data = {
  videos: await getVideosFromAPI() // llamamos a nuestra función
}

// Transformamos nuestra plantilla a un string
const templateString = template.toString()

// Utilizamos la función render del módulo ejs
// y le enviamos nuestra información para que genere
// el nuevo texto
const renderedText = ejs.render(templateString, data)

// Guardamos el texto creado en nuestro archivo
writeFileSync(README_PATH, renderedText)
