import { useEffect } from "react";
import "./App.css";

import App1 from "./espinaco/apps/app1/App1";

import { inject } from "@vercel/analytics";

export default function App() {
  useEffect(() => {
    inject();
  }, []);
  return <App1 />;
}
