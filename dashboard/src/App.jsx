
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Threshold from "./pages/Threshold";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman yang membutuhkan autentikasi */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/threshold" element={<Threshold />} />
          </Route>
        </Route>

        {/* Halaman awal */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Jika halaman tidak ditemukan */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;