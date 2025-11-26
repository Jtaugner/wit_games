import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Privacy from "./Privacy/Privacy";
import TermsofService from "./Privacy/TermsofService";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<TermsofService />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
