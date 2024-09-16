import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App0 from "../app-module/apps/app0/App0";
import App1 from "../features/react-three-drei-espinaco/apps/videopoints-app/App1";
import App2 from "../app-module/apps/app2/App2";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App1 />} />
        <Route path="/app0" element={<App0 />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </Router>
  );
};
