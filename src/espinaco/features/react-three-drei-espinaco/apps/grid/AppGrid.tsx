import "./AppGrid.css";

const products = [];

for (let i = 0; i < 20; i++) {
  products.push({
    name: "product " + (i + 1),
  });
}

const editorialBlock = {
  name: "Editorial X",
  showIn: 3,
  size: 1,
};

const editorialBlocks = [editorialBlock];

export const AppGrid = () => {
  return (
    <>
      <div className="app-grid grid">
        {products.map((product) => (
          <>
            <div className="product-card">
              <h1>{product.name}</h1>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default AppGrid;
