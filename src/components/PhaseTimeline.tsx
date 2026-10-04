import React from 'react';
import { StudyProtocol, CalculationResult } from '../types/contrast';
import { Play, Timer, Crosshair, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PhaseTimelineProps {
  protocol: StudyProtocol;
  result: CalculationResult;
}

export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ protocol, result }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Injection & Scan Phase Acquisition Timeline
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          Total Injection: {(result.injectionDurationSec + result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
        </span>
      </div>

      {/* Injector Execution Sequence (Dual-head power injector) */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
          1. Power Injector Dual-Head Programming
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Phase A: Contrast Bolus */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  A
                </span>
                Contrast Bolus
              </span>
              <span className="font-mono text-blue-700 font-semibold text-xs">
                {result.injectionDurationSec.toFixed(1)}s
              </span>
            </div>
            <div className="text-sm font-bold font-mono text-slate-900">
              {result.contrastVolumeMl} mL{' '}
              <span className="text-xs font-normal text-slate-600">
                @ {result.flowRateMlPerSec.toFixed(1)} mL/s
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Syringe A (Contrast media)</div>
          </div>

          {/* Phase B: Saline Chaser */}
          <div className="p-3 bg-cyan-50/70 border border-cyan-200/80 rounded-lg">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-cyan-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">
                  B
                </span>
                Saline Chaser
              </span>
              <span className="font-mono text-cyan-700 font-semibold text-xs">
                {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
              </span>
            </div>
            <div className="text-sm font-bold font-mono text-slate-900">
              {result.salineVolumeMl} mL{' '}
              <span className="text-xs font-normal text-slate-600">
                @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Syringe B (0.9% NaCl flush)</div>
          </div>

          {/* Pressure & IV Safety Limit */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1">Injector Pressure Limit</div>
              <div className="text-sm font-bold font-mono text-slate-900">
                300 PSI{' '}
                <span className="text-xs font-normal text-slate-500">(20.7 bar)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Pre-test: Flush 10 mL saline @ {result.flowRateMlPerSec.toFixed(1)} mL/s to verify vein
            </div>
          </div>
        </div>
      </div>

      {/* Scan Timing & Phase Breakdown */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
          2. Diagnostic Image Acquisition Phases
        </h4>

        <div className="space-y-2">
          {protocol.phases.map((phase, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">{phase.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                    {phase.timingMethod}
                  </span>
                  {phase.delaySeconds !== undefined && (
                    <span className="text-xs font-mono font-bold text-blue-600">
                      T + {phase.delaySeconds}s delay
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-2">{phase.description}</p>

              {(phase.triggerHU !== undefined || phase.roiLocation) && (
                <div className="flex flex-wrap items-center gap-3 p-2 bg-slate-50 rounded border border-slate-100 text-xs text-slate-700 font-mono">
                  {phase.roiLocation && (
                    <div className="flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-blue-600" />
                      <span>ROI Target: <strong className="font-semibold text-slate-900">{phase.roiLocation}</strong></span>
                    </div>
                  )}
                  {phase.triggerHU !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>Trigger Threshold: <strong className="font-semibold text-blue-600">{phase.triggerHU} HU</strong></span>
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
        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs text-amber-900 space-y-1">
          <div className="font-semibold flex items-center gap-1.5 text-amber-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            Radiologist / Technologist Protocol Notes:
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-amber-800 text-[11px]">
            {protocol.clinicalCaveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
