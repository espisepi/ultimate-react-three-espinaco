import "./AppGrid.css";

const products = [];

for (let i = 0; i < 20; i++) {
  products.push({
    id: i,
    name: "product " + (i + 1),
  });
}

// Número de columnas del grid
const COLUMNS = 4;
const TOTAL_CELLS = products.length; // Número total de productos

const editorialBlocks = [
  {
    id: "editorial-1",
    name: "Editorial 1",
    showIn: 6, // Casilla 6 → Fila 2, Columna 2
    size: 2, // Ocupa 2 columnas
  },
  {
    id: "editorial-2",
    name: "Editorial 2",
    showIn: 9, // Casilla 9 → Fila 3, Columna 1
    size: 3, // Ocupa 3 columnas
  },
  {
    id: "editorial-3",
    name: "Editorial 3",
    showIn: 25, // Casilla 25 → Está fuera del rango y NO debe renderizarse
    size: 2, // Ocupa 2 columnas (pero no importa porque se filtra)
  },
];

export const AppGrid = () => {
  return (
    <div className="app-grid grid">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <h1>{product.name}</h1>
        </div>
      ))}
      {editorialBlocks
        .filter((editorialBlock) => editorialBlock.showIn <= TOTAL_CELLS) // Evita los fuera de rango
        .map((editorialBlock) => {
          const adjustedIndex = editorialBlock.showIn - 1;
          const row = Math.floor(adjustedIndex / COLUMNS) + 1;
          const col = (adjustedIndex % COLUMNS) + 1;

          return (
            <div
              key={editorialBlock.id}
              className="editorial-card"
              style={{
                gridRow: row,
                gridColumn: `${col} / span ${editorialBlock.size}`,
              }}
            >
              <h1>{editorialBlock.name}</h1>
            </div>
          );
        })}
    </div>
  );
};

export default AppGrid;