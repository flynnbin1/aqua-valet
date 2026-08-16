import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import PackagesHub from "../content/PackagesHub";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PackagesHub root="../" />
  </StrictMode>,
);
