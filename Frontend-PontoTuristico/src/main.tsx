import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./Components/ui/toaster";
import { LocalNovoPontoProvider } from "./Context/localizacaoNovoPonto.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalNovoPontoProvider>
        <App />
        <Toaster />
      </LocalNovoPontoProvider>
    </QueryClientProvider>
  </StrictMode>
);
