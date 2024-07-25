import App0 from "../app0/App0";
import App1 from "../app1/App1";
import App2 from "../app2/App2";
import useAppManagerStore from "./store/AppManagerStore";

export default function AppManager() {
  const appId = useAppManagerStore((state) => state.appId);
  return (
    <>
      {(() => {
        switch (appId) {
          case 0:
            return <App0 />;
          case 1:
            return <App1 />;
          case 2:
            return <App2 />;
          default:
            console.error("No se ha definido la App elegida, App: " + appId);
            return (
              <h1> No existe una App con el id que has pasado, id: {appId} </h1>
            );
        }
      })()}
    </>
  );
}
