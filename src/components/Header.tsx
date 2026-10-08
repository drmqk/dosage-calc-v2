import React from 'react';
import { Sparkles, Printer, Smartphone } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface HeaderProps {
  activeTab: 'calculator' | 'worksheet' | 'renal' | 'premed' | 'catalog';
  setActiveTab: (tab: 'calculator' | 'worksheet' | 'renal' | 'premed' | 'catalog') => void;
  onOpenPresets: () => void;
  onOpenInstall: () => void;
  onPrint: () => void;
  modality: 'CT' | 'MRI';
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPresets,
  onOpenInstall,
  onPrint,
  modality
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c1220]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with the Dosage Calc icon */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('calculator');
            }}
            className="flex items-center gap-2.5 group"
          >
            <AppIcon size={36} className="transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white font-display uppercase leading-tight">
                Dosage Calc
              </span>
              <span className="text-[10px] font-mono tracking-wider text-teal-400 font-semibold leading-none">
                RadContrast Suite
              </span>
            </div>
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
            {modality} Dosing & Timing
          </span>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors py-1.5 ${
              activeTab === 'calculator'
                ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                : 'hover:text-white'
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`transition-colors py-1.5 ${
              activeTab === 'worksheet'
                ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                : 'hover:text-white'
            }`}
          >
            Injector Worksheet
          </button>
          <button
            onClick={() => setActiveTab('renal')}
            className={`transition-colors py-1.5 ${
              activeTab === 'renal'
                ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                : 'hover:text-white'
            }`}
          >
            Renal Safety & NSF
          </button>
          <button
            onClick={() => setActiveTab('premed')}
            className={`transition-colors py-1.5 ${
              activeTab === 'premed'
                ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                : 'hover:text-white'
            }`}
          >
            Premed & Reactions
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors py-1.5 ${
              activeTab === 'catalog'
                ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                : 'hover:text-white'
            }`}
          >
            Agent Library
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Download APK / Install on Phone Button */}
          <button
            onClick={onOpenInstall}
            className="px-3 py-1.5 text-xs font-semibold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/50 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm"
            title="Download Android APK file or Install App"
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Download APK</span>
            <span className="sm:hidden">APK</span>
          </button>

          <button
            onClick={onOpenPresets}
            className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap hidden lg:flex items-center gap-1.5 shadow-2xs"
            title="Load clinical case presets"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Presets</span>
          </button>

          <button
            onClick={onPrint}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Print Technologist Sheet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 px-2 py-1.5 text-xs font-medium bg-[#080d16] text-slate-400 overflow-x-auto">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'calculator' ? 'text-teal-400 font-bold' : ''}`}
        >
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'worksheet' ? 'text-teal-400 font-bold' : ''}`}
        >
          Worksheet
        </button>
        <button
          onClick={() => setActiveTab('renal')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'renal' ? 'text-teal-400 font-bold' : ''}`}
        >
          Renal / NSF
        </button>
        <button
          onClick={() => setActiveTab('premed')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'premed' ? 'text-teal-400 font-bold' : ''}`}
        >
          Premed
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2.5 py-1 whitespace-nowrap ${activeTab === 'catalog' ? 'text-teal-400 font-bold' : ''}`}
        >
          Agents
        </button>
      </div>
    </header>
  );
};
