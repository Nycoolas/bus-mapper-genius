import 'leaflet/dist/leaflet.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Favoritos from "./pages/Favoritos";
import Pesquisa from "./pages/Pesquisa";
import Alertas from "./pages/Alertas";
import Linhas from "./pages/Linhas";
import NotFound from "./pages/NotFound";

// Adicionar framer-motion
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/linhas" element={<Linhas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
