import React, { useEffect } from 'react';

const UltraglobeComponent = () => {
  useEffect(() => {
    // Cargar el script de manera dinámica
    const script = document.createElement('script');
    script.src = 'index.js';
    script.async = true;

    // Añadir el script al cuerpo del documento
    document.body.appendChild(script);

    // Limpieza para eliminar el script cuando el componente se desmonta
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      id="screen" 
      onContextMenu={(e) => e.preventDefault()} 
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}>
    </div>
  );
};

export default UltraglobeComponent;
