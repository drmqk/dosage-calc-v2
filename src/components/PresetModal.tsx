import React from 'react';
import { CLINICAL_PRESETS, ClinicalPreset } from '../data/presets';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: ClinicalPreset) => void;
}

export const PresetModal: React.FC<PresetModalProps> = ({ isOpen, onClose, onSelectPreset }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111827] text-slate-100 rounded-2xl border border-slate-800 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1a]">
          <div className="flex items-center gap-3">
            <AppIcon size={36} />
            <div>
              <h3 className="text-base font-bold text-white font-display">Clinical Case Presets</h3>
              <p className="text-xs text-slate-400">
                Instantly load real-world diagnostic protocols and patient risk scenarios
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {CLINICAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="w-full p-4 rounded-xl border border-slate-800 bg-[#090d16] hover:border-teal-500 hover:bg-teal-950/20 transition-all text-left group flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors font-display">
                    {preset.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-semibold border border-slate-700">
                    {preset.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{preset.subtitle}</p>
              </div>

              <div className="w-7 h-7 rounded-full bg-slate-800 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-all shrink-0 ml-3">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
