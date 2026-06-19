import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#1A1A1A",
              border: "1px solid #E4E2DB",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);