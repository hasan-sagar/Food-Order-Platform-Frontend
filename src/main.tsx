import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import "./global.css";
import Auth0ProviderNavigate from "./auth/Auth0ProviderNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderNavigate>
          <AppRoutes />
        </Auth0ProviderNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
