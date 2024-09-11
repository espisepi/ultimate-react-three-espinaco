import { useUIStore } from "../store/UIStore";

export const UIMenu3 = () => {
  const { screen3 } = useUIStore((state) => state.screens);

  return (
    <>
      <div className={`menu-container menu-3 ${screen3 ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
