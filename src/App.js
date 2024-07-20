import { useEffect } from "react";
import "./App.css";

import { inject } from "@vercel/analytics";
import AppManager from "./espinaco/apps/manager/AppManager";

export default function App() {
  useEffect(() => {
    inject();
  }, []);
  return <AppManager id={0} />;
}
