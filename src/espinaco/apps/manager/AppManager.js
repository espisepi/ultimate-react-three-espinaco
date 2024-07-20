import App1 from "../app1/App1";
import App2 from "../app2/App2";

export default function AppManager({ id = 0 }) {
  return (
    <>
      {(() => {
        switch (id) {
          case 0:
            return <App1 />;
          case 1:
            return <App2 />;
          default:
            alert("No se ha definido la App elegida, App: " + id);
            return null;
        }
      })()}
    </>
  );
}
