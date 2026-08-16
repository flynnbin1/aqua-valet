import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import CarWash from "../content/CarWash";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarWash root="../../" />
  </StrictMode>,
);
