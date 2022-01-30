import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Settings from "../Settings";

export interface RouterProps {}
export default function Router(props: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="home" element={<Home />} />
      <Route path="settings" element={<Settings />} />
      <Route path="auth/spotify" element={<Navigate replace to="/home" />} />
    </Routes>
  );
}
