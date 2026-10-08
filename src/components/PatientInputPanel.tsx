import React from 'react';
import {
  PatientProfile,
  CalculationResult,
  Modality,
  IVGauge,
  AllergySeverity
} from '../types/contrast';
import { User, Activity, AlertTriangle, ShieldAlert, Zap, Scale } from 'lucide-react';

interface PatientInputPanelProps {
  profile: PatientProfile;
  onChange: (updated: Partial<PatientProfile>) => void;
  result: CalculationResult;
  modality: Modality;
}

export const PatientInputPanel: React.FC<PatientInputPanelProps> = ({
  profile,
  onChange,
  result,
  modality
}) => {
  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-teal-400" />
          <h2 className="text-sm font-bold text-white tracking-tight font-display">
            Patient Demographics & Risk Profile
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-teal-300 font-medium">{profile.age < 18 ? 'Pediatric Protocol' : 'Adult Protocol'}</span>
          <span>·</span>
          <span className="font-mono text-slate-300">BMI {result.bmi} kg/m²</span>
        </div>
      </div>

      {/* Basic Demographics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Age */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Age (years)
          </label>
          <input
            type="number"
            min={0}
            max={120}
            value={profile.age}
            onChange={(e) => onChange({ age: Math.max(0, parseInt(e.target.value) || 0) })}
            className="w-full px-3 py-1.5 text-sm bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-mono tabular-nums"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Biological Sex
          </label>
          <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#090d16] border border-slate-700/80 rounded-lg">
            <button
              type="button"
              onClick={() => onChange({ gender: 'male' })}
              className={`py-1 text-xs font-semibold rounded-md transition-colors ${
                profile.gender === 'male'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => onChange({ gender: 'female' })}
              className={`py-1 text-xs font-semibold rounded-md transition-colors ${
                profile.gender === 'female'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Weight */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-300">Weight</label>
            <div className="flex items-center text-[10px] text-slate-400">
              <button
                type="button"
                onClick={() => onChange({ weightUnit: 'kg' })}
                className={`px-1 rounded ${profile.weightUnit === 'kg' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
              >
                kg
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onChange({ weightUnit: 'lbs' })}
                className={`px-1 rounded ${profile.weightUnit === 'lbs' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
              >
                lbs
              </button>
            </div>
          </div>
          <input
            type="number"
            min={1}
            max={300}
            step={0.5}
            value={profile.weight}
            onChange={(e) => onChange({ weight: Math.max(1, parseFloat(e.target.value) || 1) })}
            className="w-full px-3 py-1.5 text-sm bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-mono tabular-nums"
          />
        </div>

        {/* Height */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-slate-300">Height</label>
            <div className="flex items-center text-[10px] text-slate-400">
              <button
                type="button"
                onClick={() => onChange({ heightUnit: 'cm' })}
                className={`px-1 rounded ${profile.heightUnit === 'cm' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
              >
                cm
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onChange({ heightUnit: 'in' })}
                className={`px-1 rounded ${profile.heightUnit === 'in' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
              >
                in
              </button>
            </div>
          </div>
          <input
            type="number"
            min={30}
            max={250}
            step={0.5}
            value={profile.height}
            onChange={(e) => onChange({ height: Math.max(30, parseFloat(e.target.value) || 30) })}
            className="w-full px-3 py-1.5 text-sm bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-mono tabular-nums"
          />
        </div>
      </div>

      {/* Calculated Body Metrics Ribbon */}
      <div className="p-3 bg-[#0a0f1a] border border-slate-800 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Calculated BMI</span>
          <span className="font-mono font-bold text-white text-sm">
            {result.bmi} <span className="text-[10px] text-slate-400">kg/m²</span>
          </span>
          <span className="block text-[10px] text-slate-400">
            {result.bmi < 18.5 ? 'Underweight' : result.bmi < 25 ? 'Normal weight' : result.bmi < 30 ? 'Overweight' : 'Class I-III Obese'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Body Surface Area (BSA)</span>
          <span className="font-mono font-bold text-white text-sm">
            {result.bsa} <span className="text-[10px] text-slate-400">m²</span>
          </span>
          <span className="block text-[10px] text-slate-400">Mosteller formula</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Lean Body Wt (LBW)</span>
          <span className="font-mono font-bold text-white text-sm">
            {result.leanBodyWeightKg} <span className="text-[10px] text-slate-400">kg</span>
          </span>
          <span className="block text-[10px] text-slate-400">James formula</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">Effective Dosing Wt</span>
          <span className="font-mono font-bold text-teal-400 text-sm">
            {result.effectiveDosingWeightKg} <span className="text-[10px] text-teal-500">kg</span>
          </span>
          <span className="block text-[10px] text-slate-400">
            {result.effectiveDosingWeightKg !== result.weightKg ? 'Adjusted for adipose' : 'Direct weight'}
          </span>
        </div>
      </div>

      {/* CT-Specific Optimization: Lean Body Weight & Tube Voltage */}
      {modality === 'CT' && (
        <div className="border border-slate-800 rounded-lg p-3.5 space-y-3 bg-[#0a0f1a]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              CT Scan Optimization Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tube Voltage kVp */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tube Potential (kVp)
              </label>
              <div className="grid grid-cols-4 gap-1 p-0.5 bg-[#090d16] border border-slate-700/80 rounded-lg">
                {([80, 100, 120, 140] as const).map((kvp) => (
                  <button
                    key={kvp}
                    type="button"
                    onClick={() => onChange({ ctKvp: kvp })}
                    className={`py-1 text-xs font-semibold rounded-md transition-colors ${
                      profile.ctKvp === kvp
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {kvp} kVp
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {profile.ctKvp <= 100
                  ? 'Lower kVp exploits Iodine k-edge (33.2 keV), enabling 18-30% contrast reduction.'
                  : profile.ctKvp === 120
                  ? 'Standard baseline adult operating potential.'
                  : 'High kVp for bariatric patients (attenuates less, needs higher iodine load).'}
              </p>
            </div>

            {/* LBW Dosing Toggle */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Body Composition Dosing
              </label>
              <div className="flex items-start gap-2.5 mt-1.5">
                <input
                  type="checkbox"
                  id="lbw-toggle"
                  checked={profile.useLeanBodyWeight}
                  onChange={(e) => onChange({ useLeanBodyWeight: e.target.checked })}
                  className="mt-0.5 h-4 w-4 text-teal-500 rounded border-slate-700 bg-slate-900 focus:ring-teal-500"
                />
                <label htmlFor="lbw-toggle" className="text-xs text-slate-200 leading-tight">
                  <span className="font-semibold block text-white">Use Lean Body Weight (LBW) for BMI ≥ 30</span>
                  <span className="text-[11px] text-slate-400">
                    Prevents excessive iodine dose by excluding excess poorly-vascularized adipose tissue.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IV Access Gauge Selection */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            Vascular Access / IV Catheter Gauge
          </label>
          <span className="text-[11px] font-mono text-teal-400 font-semibold">
            Selected: {profile.ivGauge}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {(
            [
              { gauge: '18G', label: '18G (Green)', max: '5.5 mL/s', desc: 'Optimal for CTA' },
              { gauge: '20G', label: '20G (Pink)', max: '4.0 mL/s', desc: 'Standard body CT' },
              { gauge: '22G', label: '22G (Blue)', max: '2.5 mL/s', desc: 'Routine / Slow' },
              { gauge: '24G', label: '24G (Yellow)', max: '1.5 mL/s', desc: 'Pediatric / Fragile' },
              { gauge: 'CVC_PICC', label: 'Port / PICC', max: '2.0 mL/s', desc: 'Check power rating' }
            ] as const
          ).map((item) => (
            <button
              key={item.gauge}
              type="button"
              onClick={() => onChange({ ivGauge: item.gauge as IVGauge })}
              className={`p-2 text-left rounded-lg border transition-all ${
                profile.ivGauge === item.gauge
                  ? 'border-teal-400 bg-teal-950/50 text-white ring-1 ring-teal-400'
                  : 'border-slate-800 bg-[#090d16] hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs text-white">{item.label}</div>
              <div className="text-[10px] text-teal-400 font-mono">Max {item.max}</div>
              <div className="text-[9px] text-slate-500 mt-0.5 truncate">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Renal Assessment & Safety Screen */}
      <div className="border border-slate-800 rounded-lg p-4 space-y-3.5 bg-[#0a0f1a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white font-display">Renal Function & Drug Screening</h3>
          </div>
          {result.eGFR !== null && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">eGFR:</span>
              <span className={`font-bold ${result.eGFR < 30 ? 'text-rose-400' : result.eGFR < 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {result.eGFR} mL/min/1.73m²
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Serum Creatinine */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">Serum Creatinine</label>
              <div className="flex items-center text-[10px] text-slate-400">
                <button
                  type="button"
                  onClick={() => onChange({ creatinineUnit: 'mg/dL' })}
                  className={`px-1 rounded ${profile.creatinineUnit === 'mg/dL' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
                >
                  mg/dL
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => onChange({ creatinineUnit: 'umol/L' })}
                  className={`px-1 rounded ${profile.creatinineUnit === 'umol/L' ? 'font-bold text-teal-400' : 'hover:text-white'}`}
                >
                  µmol/L
                </button>
              </div>
            </div>
            <input
              type="number"
              min={0.1}
              max={25}
              step={0.1}
              value={profile.serumCreatinine}
              onChange={(e) => onChange({ serumCreatinine: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-1.5 text-sm bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-mono tabular-nums"
              placeholder="e.g. 0.9"
            />
          </div>

          {/* Dialysis Checkbox */}
          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={profile.isDialysis}
                onChange={(e) => onChange({ isDialysis: e.target.checked })}
                className="h-4 w-4 text-teal-500 rounded border-slate-700 bg-slate-900 focus:ring-teal-500"
              />
              <span className="font-semibold text-white">Dialysis Dependent (ESRD)</span>
            </label>
            <span className="text-[10px] text-slate-400 ml-6">Hemodialysis or peritoneal</span>
          </div>

          {/* AKI Checkbox */}
          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-rose-300">
              <input
                type="checkbox"
                checked={profile.isAKI}
                onChange={(e) => onChange({ isAKI: e.target.checked })}
                className="h-4 w-4 text-rose-500 rounded border-slate-700 bg-slate-900 focus:ring-rose-500"
              />
              <span className="font-semibold text-rose-400">Acute Kidney Injury (AKI)</span>
            </label>
            <span className="text-[10px] text-slate-400 ml-6">Unstable fluctuating creatinine</span>
          </div>
        </div>

        {/* Metformin & Allergy Check */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={profile.hasMetformin}
                onChange={(e) => onChange({ hasMetformin: e.target.checked })}
                className="h-4 w-4 text-teal-500 rounded border-slate-700 bg-slate-900 focus:ring-teal-500"
              />
              <span className="font-semibold text-white">Taking Metformin / Glucophage</span>
            </label>
            <span className="text-[10px] text-slate-400 ml-6 block">
              ACR rules: withhold if eGFR &lt; 30 or AKI (risk of lactic acidosis).
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Prior Contrast Reaction History
            </label>
            <select
              value={profile.allergyHistory}
              onChange={(e) => onChange({ allergyHistory: e.target.value as AllergySeverity })}
              className="w-full px-2.5 py-1 text-xs bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="none">No prior contrast reaction</option>
              <option value="mild">Mild (Urticaria, pruritus, sneezing)</option>
              <option value="moderate">Moderate (Facial edema, wheezing, emesis)</option>
              <option value="severe">Severe (Anaphylactoid, laryngeal edema, shock)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
