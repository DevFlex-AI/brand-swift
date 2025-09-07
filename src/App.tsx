import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import IdeaSubmission from "./pages/IdeaSubmission";
import BrandGeneratorPage from "./pages/BrandGenerator";
import LandingPageBuilderPage from "./pages/LandingPageBuilder";
import PitchDeck from "./pages/PitchDeck";
import LegalKit from "./pages/LegalKit";
import SocialMedia from "./pages/SocialMedia";
import MVPRoadmap from "./pages/MVPRoadmap";
import Analytics from "./pages/Analytics";
import MarketValidation from "./pages/MarketValidation";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import AICoaching from "./pages/AICoaching";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit" element={<IdeaSubmission />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand" element={<BrandGeneratorPage />} />
          <Route path="/landing" element={<LandingPageBuilderPage />} />
          <Route path="/pitch" element={<PitchDeck />} />
          <Route path="/legal" element={<LegalKit />} />
          <Route path="/social" element={<SocialMedia />} />
          <Route path="/roadmap" element={<MVPRoadmap />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/validation" element={<MarketValidation />} />
          <Route path="/competitors" element={<CompetitorAnalysis />} />
          <Route path="/coaching" element={<AICoaching />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
