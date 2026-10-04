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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Metric 1: Contrast Volume */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Calculated Contrast Volume
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {agent.brandName}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
              {result.contrastVolumeMl}
            </span>
            <span className="text-sm font-mono font-medium text-slate-500 ml-1.5">mL</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3 text-slate-400" />
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
        <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Injection Flow Rate
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
              result.ivCompatibility.safe ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
            }`}>
              {result.ivCompatibility.safe ? 'IV Compatible' : 'Rate Exceeds Gauge'}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
              {result.flowRateMlPerSec.toFixed(1)}
            </span>
            <span className="text-sm font-mono font-medium text-slate-500 ml-1.5">mL / sec</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Minimum line: {protocol.minGaugeRecommended}</span>
            <span className="font-mono text-slate-400">Dual-head injector</span>
          </div>
        </div>

        {/* Metric 3: Saline Flush */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Syringe className="w-3.5 h-3.5 text-cyan-600" />
              Saline Chaser (Flush)
            </span>
            <span className="text-[10px] font-mono text-slate-400">0.9% NaCl</span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-4xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
              {result.salineVolumeMl}
            </span>
            <span className="text-sm font-mono font-medium text-slate-500 ml-1.5">mL</span>
            <span className="text-xs font-mono text-slate-400 ml-2">
              @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Tightens bolus wavefront</span>
            <span className="font-mono text-slate-400">Clears dead space</span>
          </div>
        </div>

        {/* Metric 4: Total Injection Duration */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Contrast Bolus Duration
            </span>
            <span className="font-mono text-[10px] text-slate-400">Volume / Flow</span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
              {result.injectionDurationSec.toFixed(1)}
            </span>
            <span className="text-sm font-mono font-medium text-slate-500 ml-1.5">seconds</span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>+ Saline flush duration</span>
            <span className="font-mono text-slate-600">
              {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Metric 5: Active Substance & Dose Factor */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              {modality === 'CT' ? 'Total Iodine Mass' : 'Total Gadolinium Dose'}
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {result.dosePerKgActual} {result.dosePerKgUnit}
            </span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
              {result.totalActiveSubstance}
            </span>
            <span className="text-sm font-mono font-medium text-slate-500 ml-1.5">
              {result.activeSubstanceUnit}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Dosing Weight: {result.effectiveDosingWeightKg} kg</span>
            <span className="font-mono text-slate-400">
              {(result.totalActiveSubstance / result.effectiveDosingWeightKg).toFixed(2)} / kg
            </span>
          </div>
        </div>

        {/* Metric 6: Renal Risk Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Renal Clearance (eGFR)
            </span>
            <span className="font-mono text-[10px] text-slate-400">CKD-EPI 2021</span>
          </div>

          <div className="flex items-baseline mt-2">
            <span className={`text-3xl font-bold font-mono tabular-nums tracking-tight ${
              result.eGFR === null
                ? 'text-slate-400'
                : result.eGFR < 30
                ? 'text-rose-600'
                : result.eGFR < 60
                ? 'text-amber-600'
                : 'text-emerald-700'
            }`}>
              {result.eGFR !== null ? result.eGFR : 'N/A'}
            </span>
            {result.eGFR !== null && (
              <span className="text-xs font-mono font-medium text-slate-500 ml-1.5">
                mL/min/1.73m²
              </span>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">{result.ckdStage}</span>
            <span className={`font-semibold capitalize ${
              result.renalRiskLevel === 'safe'
                ? 'text-emerald-700'
                : result.renalRiskLevel === 'moderate-risk'
                ? 'text-amber-700'
                : 'text-rose-700'
            }`}>
              {result.renalRiskLevel.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
