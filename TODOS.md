

TODO: Movimiento modo dios vr con joystick
TODO: boton quitar poner ruido montaña rusa
TODO: Movimiento velocidad rollercoaster en vr o sin vr



TODO: Crear ionic app android ios

TODO: Crear electron app mac windows linux

TODO: Crear opcion VR / XR / ¿AR?

EMPIEZO CON TODO: Crear control (a parte de orbitcontrols) rail con camara en movimiento con videopoints => https://threejs.org/examples/?q=vr#webxr_vr_rollercoaster


===========================================

- TODO: Hacer Webcomponent con params:
 - TODO: showUI = true o false (mostrar/nomostrar la ui, normalmente no mostrarla)
 - TODO: url = "https:..." (url del video a reproducir)
 - TODO: orbit = true o false (activar/desactivar orbitcontrols)
 - TODO: scene = "1", "2" ... (mostrar la escena)

 - Poner en portada mis redes sociales

 - TODO: Poner para descargar el canvas en video mp4 con chatgpt. (ya esta buscado)

 - Subir a la redes sociales videos grabados con el movil/ordenador de los videoclips uno por uno poquito a poco

 - OK: Poner buscador que filtre por palabras que contiene el texto que se esta introduciendo (.includes())

 - OK: Poner en desktop los botones fuera de la barra de scroll del listado de canciones

 - Btoton de alante h atras para ir avanzando por letra abecedario (preguntar chatgpt como hacerlo)

 - OK: Poner numero total de videos que se muestra

 - TODO: Hacer un clean code de todo el proyecto para poder trabajar en el mundo laboral con esta tecnologia

- TODO: Añadir un chat en vivo

- TODO: Subir cada semana un videoclip de videopoints nuevo de los que tengo.

- TODO: Crear Range para desplazar por el eje z los vertices de los videopoints para los videos de mas resolucion ponerle mas desplazamiento

- TODO: ordenar los videos de más vistos a menos vistos (y viceversa). Para ello crear un atributo contador de visualizaciones para cada video que aumentara cuando un usuario haga una peticion a ese video. (mapearlo por el nombre del video)

- TODO: Añadir reproduccion aleatoria cuando termina un video. Y alternar entre esta opcion o la del bucle

- TODO: poner reproduccion de video: bucle (ya implementado), por orden y aleatorio.

- TODO: Poner zoom en video sin videopoints (poner el target del orbitcontrols a 0 y no en la posicion de la camara)

- TODO: Se muestran distintos videos para distintas contraseñas

- TODO: Gestionar toda la funcionalidad en zustand. Y los componentes react solo se dedican a llamar a funciones y leer atributos de zustand, pero no se escribe ninguna logica en los componentes react.

- TODO: sepinaco.com/trapani y muestra el primer video que encuentre que contenga en el titulo (string includes) la palabra trapani

- OK:
      // TODO: Crear listado de resoluciones (https://www.jvs-informatica.com/blog/que-es-la-resolucion-de-pantalla-y-cuales-son-las-mas-usadas/)
      // junto con la opcion de resolucion original (que seria la que trae el video por defecto)
      // TODO: Cambiar el range que modifica la scale del videopoints por un range que modifique la resolution del video, es decir su videoWidth y videoHeight
      // TODO: Cambiar o añadir un Range para modificar la posicion en el eje z hacia delante y hacia atras de la camara
      // const videoWidth = video.videoWidth;
      // const videoHeight = video.videoHeight;
      // const videoWidth = 1920;
      // const videoHeight = 1080;