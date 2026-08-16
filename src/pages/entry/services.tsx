import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import ServicesHub from "../content/ServicesHub";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ServicesHub root="../" />
  </StrictMode>,
);
