import { useEffect, useState } from "react";
import "./App.css";

import { inject } from "@vercel/analytics";
import AppManager from "./espinaco/apps/manager/AppManager";
import useAppStore from "./espinaco/apps/store/AppStore";

export default function App() {

  useEffect(() => {
    inject();
  }, []);

  const appId = useAppStore(state => state.appId);

  if ( appId <= 2 ) { return <AppManager id={appId} />; }

  else { return (
    <>
      <h1> No existe una App con el id que has pasado, id: {appId} </h1>    
    </>
  )}

  
}
