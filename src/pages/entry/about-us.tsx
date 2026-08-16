import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import AboutUs from "../content/AboutUs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AboutUs root="../" />
  </StrictMode>,
);
