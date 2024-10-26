import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CVApp from "./CVApp.jsx";
import "./assets/styles.css";
import generateCVData from "./data.jsx";

var cvData = generateCVData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CVApp data={cvData} />
  </StrictMode>,
);
