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
    showIn: 9, // Casilla 10 → Fila 3, Columna 2
    size: 3, // Ocupa 3 columnas
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
      {editorialBlocks.map((editorialBlock) => {
        // Ajustamos para que showIn = 1 corresponda a la primera celda
        const adjustedIndex = editorialBlock.showIn - 1;
        const row = Math.floor(adjustedIndex / COLUMNS) + 1; // Calcula fila
        const col = (adjustedIndex % COLUMNS) + 1; // Calcula columna

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