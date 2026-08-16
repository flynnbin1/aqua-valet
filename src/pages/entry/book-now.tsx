import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import BookNow from "../content/BookNow";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookNow root="../" />
  </StrictMode>,
);
