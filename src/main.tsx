// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <InvoiceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </InvoiceProvider>,
);
