import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import ValetingWork from "../content/ValetingWork";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ValetingWork root="../" />
  </StrictMode>,
);
