TODO:

- Crear servidor web casero con raspberry y alojar ahi mi aplicacion con todos los videos: (Hacerlo con nodejs el servidor) https://pedropablomoral.com/raspberrypi/proyectos/servidor-casero/
  -- Poner en .gitignore la carpeta con todas las canciones para no subirlas a github (que hay archivos de mas de 100mb y github falla)
  https://www.adslzone.net/como-se-hace/internet/nube-almacenamiento-personal/

1- Crear app nativa con ionic y todas las canciones: https://ionicframework.com/docs/react/adding-ionic-react-to-an-existing-react-project

1 - Poner todas las canciones en una carpeta en public
2 - analizar todos los archivos de esa carpeta y obtener su url por medio de js. (ionic para crear app nativa para que funcione sin internet)
3 - subirlo todo a un servidor estático para que tenga almacenamiento para guardar la carpeta con todas las canciones (no puede ser github porque hay archivos de mas de 100mb)

- poner miniatura de video para poder darle palante o patras a la cancion
- Poner boton para restaurar la posicion inicial de la camara
- Cambiar tipo de visualizacion del shader con un boton en la ui
- Crear escena de videopoints infinitos creados con instancedMesh
- Crear una lista de reproduccion para canciones de promociones, que me paguen por subirse en esa lista (a parte de la lista de mis canciones, que esa lista no se toca ni se prostituye con ningun tipo de cancion que no sea que yo escuche o haya escuchado bastantes veces y me gusten para ponerlas)

- añadir que en un tiempo exacto de la cancion empiece a rotar y a dejar de rotar

- Para grabar la patalla en obs, tener en cuenta:
  -- NO MOSTRAR CURSOR cuando se elija la fuente "Captura de Pantalla de macOS"
  -- Eliminar punto verde de grabacion: Poniendo una fuente de "origen de color", con color negro por encima de la fuente de "captura de pantalla de macOS" para tapar el punto verde, todo esto se hace en el apartado "Fuentes".
  -- Bajar el volumen de Captura de Pantalla de macOS 2 en apartado "Mezclador de audio", para que no sature el sonido, bajarlo a -2.0 dB
  -- Bajar al minimo el sonido de Mic/Aux (microfono del mac) en apartado "Mezclador de audio"

- Pasos de grabacion obs a video pulido
  -- Grabar videoclip threejs con obs
  -- Recortar el principio y final del video
  -- Eliminar el punto verde de la esquina superior derecha (poniendo un punto negro con davinci resolve)
  -- (Opcional) Poner con davinci resolve el audio original de la canción encima del video y quitar el audio del video grabado
  -- (Ya tendriamos el video pulido) -> Subir video a Youtube

- Para subir los videos a aws s3: Crear bucket, darle permiso acceso "Todo el mundo (acceso público)" en lectura en objetos y acl del objeto, y en cors poner la siguiente configuracion sacada de aqui https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html :

[
{
"AllowedHeaders": [
"*"
],
"AllowedMethods": [
"GET",
"PUT",
"POST",
"DELETE"
],
"AllowedOrigins": [
"https://www.sepinaco.com"
],
"ExposeHeaders": []
},
{
"AllowedHeaders": [],
"AllowedMethods": [
"GET"
],
"AllowedOrigins": [
"*"
],
"ExposeHeaders": []
}
]
