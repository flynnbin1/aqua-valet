import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import CarValeting from "../content/CarValeting";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarValeting root="../../" />
  </StrictMode>,
);
