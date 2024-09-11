import useUIManagerStore from "../store/UIManagerStore";

export const UIMenu3 = () => {
  const { screen3 } = useUIManagerStore((state) => state.screens);

  return (
    <>
      <div className={`menu-container menu-3 ${screen3 ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
