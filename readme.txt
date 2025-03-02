
- Se ha copiado la carpeta public del proyecto phy js github en su commit f94dd25
-- Commit f94dd25
-- https://github.com/lo-th/phy/commit/f94dd254d876df01a66112d69b9d6b76f8bcb9fe


- El error de phy.load(["models/buggy.glb", ...maps], onComplete, "./");
Era porque para decodificar el buggy.glb se llama al decoder draco_wasm_wrapper.js y en network
vi que la referencia adraco_wasm_wrapper.js se hacia desde una ruta src/libs/draco/draco_wasm_wrapper.js
y no existia ningun fichero en esa ruta, por eso tenia el error del parseo:
Uncaught SyntaxError: Unexpected token '<'
    at handleError (http://localhost:3000/static/js/bundle.js:127993:58)
    at http://localhost:3000/static/js/bundle.js:128012:7

Este error ocurria porque se llamaba (lo vi mirando la pestaña network en herramientas desarrollador en chrome)
al archivo src/libs/draco/draco_wasm_wrapper.js y no existia. Lo que hice fue copiar ese archivo (desde la libreria oficial github de phy js)
y pegarla en la carpeta public de este proyecto. Esa es la explicacion de que exista la carpeta src con todos los archivos en
la carpeta public de este proyecto. Porque esos archvivos son archivos que usa la libreria phy-engine internamente.

