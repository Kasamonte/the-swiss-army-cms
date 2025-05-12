
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import PagesPage from "./pages/PagesPage";
import BlogPage from "./pages/BlogPage";
import MediaPage from "./pages/MediaPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import CMSSidebar from "./components/CMSSidebar";

const queryClient = new QueryClient();

// This can be customized when installing on different websites
const themeConfig = {
  siteName: 'Admin CMS',
  accentColor: 'hsl(var(--primary))',
  // logoUrl: 'path/to/custom-logo.svg',
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider initialTheme={themeConfig}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="cms-container">
            <CMSSidebar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pages" element={<PagesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
