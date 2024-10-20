import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppVideoPoints } from "../features/react-three-drei-espinaco/apps/videopoints/AppVideoPoints";
import { AppBooks } from "../features/react-three-drei-espinaco/apps/books/AppBooks";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppVideoPoints />} />
        <Route path="/books" element={<AppBooks />} />
        <Route path="/videopoints" element={<AppVideoPoints />} />
      </Routes>
    </Router>
  );
};
