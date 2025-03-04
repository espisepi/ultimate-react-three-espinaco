import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const AppVideoPoints = lazy(() =>
  import("../features/react-three-drei-espinaco/apps/videopoints/AppVideoPoints")
);
const AppBooks = lazy(() =>
  import("../features/react-three-drei-espinaco/apps/books/AppBooks")
);

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AppVideoPoints />
            </Suspense>
          }
        />
        <Route
          path="/books"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AppBooks />
            </Suspense>
          }
        />
        <Route
          path="/videopoints"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AppVideoPoints />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};