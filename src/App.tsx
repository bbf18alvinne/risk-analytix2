import React, { useState } from 'react';
import { ShieldCheck, LayoutDashboard, FileText, Info, Menu, X, Github, ExternalLink } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import RiskDashboard from './components/RiskDashboard';
import About from './components/About';
import { cn } from './lib/utils';

type Section = 'predict' | 'dashboard' | 'about';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('predict');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'predict', label: 'Risk Predictor', icon: ShieldCheck },
    { id: 'dashboard', label: 'Insights Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Credit<span className="text-emerald-600">Analytix</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    activeSection === item.id 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left font-medium flex items-center gap-3",
                  activeSection === item.id 
                    ? "bg-emerald-50 text-emerald-700" 
                    : "text-slate-600"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Powered by Gemini 2.0 Flash
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Next-Gen <span className="text-emerald-600">Credit Risk</span> Assessment
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Leverage advanced AI to analyze applicant data and predict creditworthiness with high precision. 
            Built for modern financial institutions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeSection === 'predict' && <PredictionForm />}
        {activeSection === 'dashboard' && <RiskDashboard />}
        {activeSection === 'about' && <About />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 w-6 h-6" />
              <span className="text-lg font-bold tracking-tight">CreditAnalytix</span>
            </div>
            
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">API Reference</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            </div>

            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Github className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
            © 2026 CreditAnalytix System. Developed with Google AI Studio & Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
}
