import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ContractDetail from "./pages/ContactDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
// import Layout from "./components/Layout.jsx" ;

function RequireAuth({ children }) {
const token = localStorage.getItem("mock_jwt");
if (!token) return <Navigate to="/login" replace />;
return children;
}


export default function App() {
return (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard/>
            </RequireAuth>
          }
        />
        <Route
          path="/contracts/:id"
          element={
            <RequireAuth>
              <ContractDetail />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
}
