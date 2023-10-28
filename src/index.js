import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./style.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter basename="/" >
    <App />
  </HashRouter>
);
