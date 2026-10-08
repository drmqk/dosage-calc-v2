import React from 'react';
import { StudyProtocol, CalculationResult } from '../types/contrast';
import { Play, Timer, Crosshair, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PhaseTimelineProps {
  protocol: StudyProtocol;
  result: CalculationResult;
}

export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ protocol, result }) => {
  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-white font-display">
            Injection & Scan Phase Acquisition Timeline
          </h3>
        </div>
        <span className="text-xs text-teal-400 font-mono font-semibold">
          Total Injection: {(result.injectionDurationSec + result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
        </span>
      </div>

      {/* Injector Execution Sequence (Dual-head power injector) */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-[11px] font-display">
          1. Power Injector Dual-Head Programming
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Phase A: Contrast Bolus */}
          <div className="p-3.5 bg-teal-950/40 border border-teal-800/60 rounded-lg">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-teal-300 flex items-center gap-1.5 font-display">
                <span className="w-4 h-4 rounded-full bg-teal-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px]">
                  A
                </span>
                Contrast Bolus
              </span>
              <span className="font-mono text-teal-300 font-bold text-xs">
                {result.injectionDurationSec.toFixed(1)}s
              </span>
            </div>
            <div className="text-sm font-extrabold font-mono text-white mt-1">
              {result.contrastVolumeMl} mL{' '}
              <span className="text-xs font-normal text-slate-300">
                @ {result.flowRateMlPerSec.toFixed(1)} mL/s
              </span>
            </div>
            <div className="text-[11px] text-teal-400/80 mt-1">Syringe A (Contrast media)</div>
          </div>

          {/* Phase B: Saline Chaser */}
          <div className="p-3.5 bg-cyan-950/40 border border-cyan-800/60 rounded-lg">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 font-display">
                <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px]">
                  B
                </span>
                Saline Chaser
              </span>
              <span className="font-mono text-cyan-300 font-bold text-xs">
                {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
              </span>
            </div>
            <div className="text-sm font-extrabold font-mono text-white mt-1">
              {result.salineVolumeMl} mL{' '}
              <span className="text-xs font-normal text-slate-300">
                @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s
              </span>
            </div>
            <div className="text-[11px] text-cyan-400/80 mt-1">Syringe B (0.9% NaCl flush)</div>
          </div>

          {/* Pressure & IV Safety Limit */}
          <div className="p-3.5 bg-[#0a0f1a] border border-slate-800 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-300 mb-1 font-display">Pressure Limit</div>
              <div className="text-sm font-extrabold font-mono text-white">
                300 PSI{' '}
                <span className="text-xs font-normal text-slate-400">(20.7 bar)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Pre-test: Flush 10 mL saline @ {result.flowRateMlPerSec.toFixed(1)} mL/s to verify vein
            </div>
          </div>
        </div>
      </div>

      {/* Scan Timing & Phase Breakdown */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider text-[11px] font-display">
          2. Diagnostic Image Acquisition Phases
        </h4>

        <div className="space-y-2">
          {protocol.phases.map((phase, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-800 bg-[#0a0f1a] hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-teal-950 text-teal-400 border border-teal-800/60 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">{phase.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {phase.timingMethod}
                  </span>
                  {phase.delaySeconds !== undefined && (
                    <span className="text-xs font-mono font-bold text-teal-400">
                      T + {phase.delaySeconds}s delay
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">{phase.description}</p>

              {(phase.triggerHU !== undefined || phase.roiLocation) && (
                <div className="flex flex-wrap items-center gap-3 p-2.5 bg-[#0e1526] rounded border border-slate-800 text-xs text-slate-300 font-mono">
                  {phase.roiLocation && (
                    <div className="flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-teal-400" />
                      <span>ROI Target: <strong className="font-semibold text-white">{phase.roiLocation}</strong></span>
                    </div>
                  )}
                  {phase.triggerHU !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      <span>Trigger: <strong className="font-bold text-teal-400">{phase.triggerHU} HU</strong></span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Pearls & Caveats */}
      {protocol.clinicalCaveats.length > 0 && (
        <div className="p-3.5 bg-amber-950/30 border border-amber-800/50 rounded-lg text-xs text-amber-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-300 font-display">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            Radiologist / Technologist Protocol Notes:
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-amber-200/90 text-[11px]">
            {protocol.clinicalCaveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
