export interface UIMenu3Props {
  visibility: boolean;
}

export const UIMenu3 = ({ visibility = true }: UIMenu3Props) => {
  return (
    <>
      <div className={`menu-container menu-3 ${visibility ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
