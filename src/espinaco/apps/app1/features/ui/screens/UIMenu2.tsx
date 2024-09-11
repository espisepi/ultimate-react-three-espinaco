import useUIManagerStore from "../store/UIManagerStore";

export const UIMenu2 = () => {
  const { screen2 } = useUIManagerStore((state) => state.screens);
  return (
    <>
      <div className={`menu-container menu-2 ${screen2 ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
