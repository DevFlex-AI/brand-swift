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
import StartupAccelerator from "./pages/StartupAccelerator";
import InvestorMatching from "./pages/InvestorMatching";
import TeamCollaboration from "./pages/TeamCollaboration";
import AIContentGenerator from "./pages/AIContentGenerator";
import FundraisingToolkit from "./pages/FundraisingToolkit";
import GrowthHacking from "./pages/GrowthHacking";
import AutomationWorkflows from "./pages/AutomationWorkflows";
import CustomerFeedback from "./pages/CustomerFeedback";
import APIMarketplace from "./pages/APIMarketplace";
import CommunityHub from "./pages/CommunityHub";

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
          <Route path="/accelerator" element={<StartupAccelerator />} />
          <Route path="/investors" element={<InvestorMatching />} />
          <Route path="/team" element={<TeamCollaboration />} />
          <Route path="/content" element={<AIContentGenerator />} />
          <Route path="/fundraising" element={<FundraisingToolkit />} />
          <Route path="/growth" element={<GrowthHacking />} />
          <Route path="/automation" element={<AutomationWorkflows />} />
          <Route path="/feedback" element={<CustomerFeedback />} />
          <Route path="/marketplace" element={<APIMarketplace />} />
          <Route path="/community" element={<CommunityHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
