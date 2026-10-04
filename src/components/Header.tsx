import React from 'react';
import { Sparkles, Printer, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'worksheet' | 'renal' | 'premed' | 'catalog';
  setActiveTab: (tab: 'calculator' | 'worksheet' | 'renal' | 'premed' | 'catalog') => void;
  onOpenPresets: () => void;
  onPrint: () => void;
  modality: 'CT' | 'MRI';
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPresets,
  onPrint,
  modality
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('calculator');
            }}
            className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            RadContrast
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 border-l border-slate-200 pl-3">
            {modality} Protocol Suite
          </span>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors py-1 ${
              activeTab === 'calculator'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`transition-colors py-1 ${
              activeTab === 'worksheet'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Injector Worksheet
          </button>
          <button
            onClick={() => setActiveTab('renal')}
            className={`transition-colors py-1 ${
              activeTab === 'renal'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Renal Safety & NSF
          </button>
          <button
            onClick={() => setActiveTab('premed')}
            className={`transition-colors py-1 ${
              activeTab === 'premed'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Premed & Reactions
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors py-1 ${
              activeTab === 'catalog'
                ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                : 'hover:text-slate-900'
            }`}
          >
            Agent Library
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPresets}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
            title="Load clinical case presets"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Clinical Presets</span>
          </button>
          <button
            onClick={onPrint}
            className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
            title="Print Technologist Sheet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Protocol</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 px-2 py-1.5 text-xs font-medium bg-slate-50 text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'calculator' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'worksheet' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Worksheet
        </button>
        <button
          onClick={() => setActiveTab('renal')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'renal' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Renal / NSF
        </button>
        <button
          onClick={() => setActiveTab('premed')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'premed' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Premed
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'catalog' ? 'text-blue-600 font-semibold' : ''}`}
        >
          Agents
        </button>
      </div>
    </header>
  );
};
