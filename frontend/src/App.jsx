import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <h1 className="p-8 text-center text-xl">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
