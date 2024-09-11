export interface UIMenu2Props {
  visibility: boolean;
}

export const UIMenu2 = ({ visibility = true }: UIMenu2Props) => {
  return (
    <>
      <div className={`menu-container menu-2 ${visibility ? "active" : ""}`}>
        <h1>OYEEEEEEEEEE</h1>
      </div>
    </>
  );
};
