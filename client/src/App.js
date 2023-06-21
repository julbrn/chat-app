import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat"
import AvatarSettings from "./pages/AvatarSettings"
export default function App() {
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("chat-user")) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/avatar" element={<ProtectedRoute><AvatarSettings /></ProtectedRoute>}></Route>
      <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>}></Route>
    </Routes>

  </BrowserRouter>
}
