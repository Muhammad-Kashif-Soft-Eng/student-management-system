import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { ToastProvider } from "./components/ui/toast.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
    </ToastProvider>
  </StrictMode>
);