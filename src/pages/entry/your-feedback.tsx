import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import YourFeedback from "../content/YourFeedback";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <YourFeedback root="../" />
  </StrictMode>,
);
