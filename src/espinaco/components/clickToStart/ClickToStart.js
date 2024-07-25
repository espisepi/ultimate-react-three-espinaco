import { useState } from "react";

export function ClickToStart({ password = "", children }) {
  // Se muestra el children cuando clicked = true
  const [clicked, setClicked] = useState(false);

  // Mecanismo de password
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value === password) {
      setClicked(true);
    }
  };

  if (clicked) {
    return <>{children}</>;
  } else if (password === "") {
    return (
      <>
        <div
          className="background-initial"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            color: "white",
            backgroundColor: "#500050",
            backgroundImage: 'url("images/portada.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => setClicked(true)}
        >
          <h1 style={{ cursor: "hover" }}>Click to Start</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="background-initial"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            color: "white",
            backgroundColor: "#500050",
            backgroundImage: 'url("images/portada.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <h1 style={{ cursor: "hover" }}>Click to Start</h1> */}
          <h1 style={{ cursor: "hover" }}>Enter Password</h1>
          <input type="text" value={inputValue} onChange={handleChange} />
        </div>
      </>
    );
  }
}
