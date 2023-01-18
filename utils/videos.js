// Importamos la función fetch del paquete node-fetch
import fetch from 'node-fetch'
// Importamos config del módulo dotenv que instalamos
import { config } from 'dotenv'
// Lo ejecutamos para que RAPID_API_KEY esté disponible
// en el ambiente
config()

// Creamos una constante para almacenar el ID de nuestro canal
const CHANNEL_ID = 'UCaw6pZKpqHpK-I0spCw0eeQ'
// Creamos la URL a la que apuntaremos
// Los parametros que tienen indican:
//  maxResults=3 Traer solo 3 videos
//  part=snippet,id Traer el ID del video y sus detalles
//  order=date ordenarlos por fecha
const FETCH_URL = `https://youtube-v31.p.rapidapi.com/search?channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`
// Creamos las opciones necesarias para nuestra petición
const options = {
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
}
// Creamos la función que hará el trabajo de la petición
async function getVideosFromAPI () {
  // El try/catch nos permitirá interceptar errores si es que ocurren
  try {
    // Hacemos la petición con fetch()
    const response = await fetch(FETCH_URL, options)
    // Convertimos la respuesta a un objeto
    const data = await response.json()

    // La API nos responde con varios detalles sobre el video
    // Nosotros necesitamos unos pocos, asi que vamos a obtener
    // lo necesario con la función formatData que vamos a crear
    // debajo
    return formatData(data)
  } catch (error) {
    console.log(error)
    return []
  }
}

// Esta función recibe el cuerpo de la respuesta
// y devuelve un array de los videos con la información
// que necesitamos
function formatData (data) {
  // Extraemos los items (array) del cuerpo
  const { items } = data
  // Mapeamos nuestro array para obtener lo que necesitamos
  const videos = items.map(item => ({
    id: item.id.videoId,
    thumbnail: item.snippet.thumbnails.medium.url,
    title: item.snippet.title,
    url: 'https://youtube.com/watch?v=' + item.id.videoId
  }))
  // retornamos el nuevo array
  return videos
}

// Exportamos esta función para poder usarla desde otros ficheros
export default getVideosFromAPI
