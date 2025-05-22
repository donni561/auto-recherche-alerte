
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchForm from "./pages/SearchForm";
import Confirmation from "./pages/Confirmation";
import HowItWorksPage from "./pages/HowItWorks";
import Professional from "./pages/Professional";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminExtranet from "./pages/AdminExtranet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recherche" element={<SearchForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
          <Route path="/professionnels" element={<Professional />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/extranet" element={<AdminExtranet />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
