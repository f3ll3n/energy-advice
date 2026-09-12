import { Routes, Route } from "react-router-dom";
import PrankFlow from "./components/PrankFlow.jsx";
import AdminPage from "./components/AdminPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrankFlow />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
