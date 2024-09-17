import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppVideoPoints } from "../features/react-three-drei-espinaco/apps/videopoints/AppVideoPoints";
import App0 from "../apps/app0/App0";
import App2 from "../apps/app2/App2";
import { AppBooks } from "../features/react-three-drei-espinaco/apps/books/AppBooks";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppVideoPoints />} />
        <Route path="/books" element={<AppBooks />} />
        <Route path="/videopoints" element={<AppVideoPoints />} />
        <Route path="/app0" element={<App0 />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </Router>
  );
};
