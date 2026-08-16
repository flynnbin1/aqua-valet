import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import Contact from "../content/Contact";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Contact root="../" />
  </StrictMode>,
);
