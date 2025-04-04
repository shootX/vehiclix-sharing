
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import Insurance from "./pages/Insurance";
import ApiIntegration from "./pages/ApiIntegration";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import ProviderManager from "./pages/ProviderManager";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/vehicles" element={<Layout><Vehicles /></Layout>} />
        <Route path="/vehicles/:id" element={<Layout><VehicleDetail /></Layout>} />
        <Route path="/insurance" element={<Layout><Insurance /></Layout>} />
        <Route path="/api-integration" element={<Layout><ApiIntegration /></Layout>} />
        <Route path="/providers" element={<Layout><ProviderManager /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
