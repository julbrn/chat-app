import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat"
import AvatarSettings from "./pages/AvatarSettings";
import { ColorContext } from "./colorContext";

export default function App() {
  const [colorScheme, setColorScheme] = React.useState("green");
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("chat-user")) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return <BrowserRouter>
    <ColorContext.Provider value={colorScheme}>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/avatar" element={<ProtectedRoute><AvatarSettings /></ProtectedRoute>}></Route>
        <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>}></Route>
      </Routes>
    </ColorContext.Provider>
  </BrowserRouter>
}
