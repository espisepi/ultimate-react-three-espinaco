import { useEffect, useState } from "react";
import "./App.css";

import { inject } from "@vercel/analytics";
import AppManager from "./espinaco/apps/manager/AppManager";

export default function App() {
  useEffect(() => {
    inject();
  }, []);
  const [appId, setAppId] = useState(0);

  return <AppManager id={appId} />;
}
