import React from 'react';
import { CalculationResult, ContrastAgent, StudyProtocol, Modality } from '../types/contrast';
import { Droplets, Clock, Activity, Shield, Package, Syringe } from 'lucide-react';

interface ResultsHUDProps {
  result: CalculationResult;
  agent: ContrastAgent;
  protocol: StudyProtocol;
  modality: Modality;
}

export const ResultsHUD: React.FC<ResultsHUDProps> = ({
  result,
  agent,
  protocol,
  modality
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Hero Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* Metric 1: Contrast Volume */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 relative overflow-hidden shadow-sm group hover:border-teal-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Droplets className="w-3.5 h-3.5 text-teal-400" />
              Calculated Contrast Volume
            </span>
            <span className="font-mono text-[10px] text-teal-300/80 bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-800/40">
              {agent.brandName}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {result.contrastVolumeMl}
            </span>
            <span className="text-base font-mono font-medium text-teal-400 ml-1.5">mL</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Package className="w-3 h-3 text-teal-400" />
              {result.vialPackaging.vialCount} × {result.vialPackaging.vialSize} mL vial
            </span>
            <span className="font-mono text-slate-400">
              {result.vialPackaging.wasteVolumeMl > 0
                ? `${result.vialPackaging.wasteVolumeMl} mL waste`
                : 'Zero waste'}
            </span>
          </div>
        </div>

        {/* Metric 2: Flow Rate */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 relative overflow-hidden shadow-sm group hover:border-teal-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              Injection Flow Rate
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
              result.ivCompatibility.safe
                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                : 'text-rose-400 bg-rose-950/60 border-rose-800/40'
            }`}>
              {result.ivCompatibility.safe ? 'IV Compatible' : 'Exceeds Line Limit'}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {result.flowRateMlPerSec.toFixed(1)}
            </span>
            <span className="text-base font-mono font-medium text-teal-400 ml-1.5">mL / sec</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-slate-300">Minimum line: {protocol.minGaugeRecommended}</span>
            <span className="font-mono text-slate-400">Dual-head injector</span>
          </div>
        </div>

        {/* Metric 3: Saline Flush */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 relative overflow-hidden shadow-sm group hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Syringe className="w-3.5 h-3.5 text-cyan-400" />
              Saline Chaser (Flush)
            </span>
            <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
              0.9% NaCl
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {result.salineVolumeMl}
            </span>
            <span className="text-base font-mono font-medium text-cyan-400 ml-1.5">mL</span>
            <span className="text-xs font-mono text-slate-400 ml-2">
              @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-slate-300">Tightens bolus wavefront</span>
            <span className="font-mono text-slate-400">Clears dead space</span>
          </div>
        </div>

        {/* Metric 4: Total Injection Duration */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Contrast Bolus Duration
            </span>
            <span className="font-mono text-[10px] text-slate-400">Volume / Flow</span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {result.injectionDurationSec.toFixed(1)}
            </span>
            <span className="text-sm font-mono font-medium text-teal-400 ml-1.5">seconds</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-slate-300">+ Saline flush duration</span>
            <span className="font-mono text-teal-300">
              {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Metric 5: Active Substance & Dose Factor */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              {modality === 'CT' ? 'Total Iodine Mass' : 'Total Gadolinium Dose'}
            </span>
            <span className="font-mono text-[10px] text-teal-300">
              {result.dosePerKgActual} {result.dosePerKgUnit}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-extrabold font-mono tabular-nums text-white tracking-tight">
              {result.totalActiveSubstance}
            </span>
            <span className="text-sm font-mono font-medium text-teal-400 ml-1.5">
              {result.activeSubstanceUnit}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-slate-300">Dosing Wt: {result.effectiveDosingWeightKg} kg</span>
            <span className="font-mono text-slate-400">
              {(result.totalActiveSubstance / result.effectiveDosingWeightKg).toFixed(2)} / kg
            </span>
          </div>
        </div>

        {/* Metric 6: Renal Risk Status */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-4 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-display">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Renal Clearance (eGFR)
            </span>
            <span className="font-mono text-[10px] text-slate-400">CKD-EPI 2021</span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className={`text-3xl font-extrabold font-mono tabular-nums tracking-tight ${
              result.eGFR === null
                ? 'text-slate-500'
                : result.eGFR < 30
                ? 'text-rose-400'
                : result.eGFR < 60
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}>
              {result.eGFR !== null ? result.eGFR : 'N/A'}
            </span>
            {result.eGFR !== null && (
              <span className="text-xs font-mono font-medium text-slate-400 ml-1.5">
                mL/min/1.73m²
              </span>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate text-slate-300">{result.ckdStage}</span>
            <span className={`font-bold capitalize font-mono text-[10px] px-1.5 py-0.5 rounded ${
              result.renalRiskLevel === 'safe'
                ? 'text-emerald-400 bg-emerald-950/60'
                : result.renalRiskLevel === 'moderate-risk'
                ? 'text-amber-400 bg-amber-950/60'
                : 'text-rose-400 bg-rose-950/60'
            }`}>
              {result.renalRiskLevel.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
