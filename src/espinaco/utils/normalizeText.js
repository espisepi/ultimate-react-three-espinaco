

// Función para eliminar tildes y diacríticos
export const normalizeText = text =>
  text
    .normalize("NFD") // Descompone los caracteres en la forma de normalización de descomposición canónica
    .replace(/[\u0300-\u036f]/g, "") // Elimina las marcas diacríticas usando una expresión regular
    .toLowerCase(); // Convierte el texto a minúsculas para hacer la búsqueda insensible a mayúsculas