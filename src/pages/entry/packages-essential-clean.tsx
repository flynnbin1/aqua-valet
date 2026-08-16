import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import EssentialClean from "../content/EssentialClean";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EssentialClean root="../../" />
  </StrictMode>,
);
