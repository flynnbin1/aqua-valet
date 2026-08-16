import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import FullValet from "../content/FullValet";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FullValet root="../../" />
  </StrictMode>,
);
