import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import PickupMobile from "../content/PickupMobile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PickupMobile root="../../" />
  </StrictMode>,
);
