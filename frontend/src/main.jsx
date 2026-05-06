import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const rootElement = document.getElementById("root");

if (!clerkPublishableKey) {
  createRoot(rootElement).render(
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      Missing VITE_CLERK_PUBLISHABLE_KEY
    </div>,
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>,
  );
}
