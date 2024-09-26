import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Alert from "./pages/Alert.jsx";
import { DataProvider } from "./context/DataContext.jsx";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" exact element={<LoginPage />}></Route>
              <Route path="/register" exact element={<RegisterPage />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/" exact element={<Home />}></Route>
                <Route path="/alerts" exact element={<Alert />}></Route>
                <Route path="/profile" exact element={<h1>Profile</h1>}></Route>
                <Route path="/dashboard" exact element={<Dashboard />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}
