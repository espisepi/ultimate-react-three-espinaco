import { useUIStore } from "../store/UIStore";

export const UIMenu2 = () => {
  const { screen2 } = useUIStore((state) => state.screens);
  return (
    <>
      <div className={`menu-container menu-2 ${screen2 ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
