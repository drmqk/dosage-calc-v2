import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Droplets, Info } from 'lucide-react';

export const RenalGuidelineView: React.FC = () => {
  return (
    <div className="bg-[#111827] text-slate-100 rounded-xl border border-slate-800 p-6 space-y-6 max-w-5xl mx-auto shadow-sm">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
          Evidence-Based Clinical Practice
        </div>
        <h2 className="text-xl font-bold text-white mt-0.5 font-display">
          Renal Safety, CI-AKI & NSF Risk Guidelines
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Synthesized from ACR Manual on Contrast Media v2024 and ESUR Guidelines 10.0
        </p>
      </div>

      {/* 1. CT Contrast-Induced AKI (CI-AKI) Risk Thresholds */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <Droplets className="w-4 h-4 text-teal-400" />
          1. Iodinated Contrast & Renal Risk Stratification (CT)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Green: eGFR >= 45 */}
          <div className="p-4 rounded-lg border border-emerald-800/60 bg-emerald-950/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 text-sm font-mono">eGFR ≥ 45</span>
              <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-700/50">
                NORMAL / MILD
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Negligible risk of CI-AKI. Routine IV hydration is not required. Voluntary oral fluid intake encouraged.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold pt-1 border-t border-emerald-900/60">
              Action: Proceed with standard contrast volume.
            </div>
          </div>

          {/* Yellow: eGFR 30 - 44 */}
          <div className="p-4 rounded-lg border border-amber-800/60 bg-amber-950/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 text-sm font-mono">eGFR 30 – 44</span>
              <span className="text-[10px] font-mono bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-700/50">
                RELATIVE RISK
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              ACR threshold of potential risk. If multiple comorbidities (diabetes, heart failure, sepsis) coexist, consider IV volume expansion.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold pt-1 border-t border-amber-900/60">
              Action: Consider isotonic saline pre-hydration; reduce contrast volume or use iso-osmolar agent (Visipaque).
            </div>
          </div>

          {/* Red: eGFR < 30 or AKI */}
          <div className="p-4 rounded-lg border border-rose-800/60 bg-rose-950/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-300 text-sm font-mono">eGFR &lt; 30 / AKI</span>
              <span className="text-[10px] font-mono bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded font-semibold border border-rose-700/50">
                HIGH RISK
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Clinically meaningful risk of Contrast-Induced Acute Kidney Injury. Evaluate risk vs diagnostic benefit.
            </p>
            <div className="text-[11px] text-rose-400 font-semibold pt-1 border-t border-rose-900/60">
              Action: Mandatory IV saline hydration if urgent; postpone if non-emergent; consider non-contrast alternative.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Intravenous Hydration Regimens */}
      <div className="border border-slate-800 rounded-lg p-4 bg-[#0a0f1a] space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-display">
          ACR / ESUR Recommended Intravenous Hydration Regimens
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <h4 className="font-bold text-teal-300 mb-1 font-display">Standard Inpatient Protocol</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>0.9% Normal Saline @ 1.0 mL/kg/hour</li>
              <li>Administer for 3 to 12 hours before contrast</li>
              <li>Continue for 6 to 12 hours post-procedure</li>
              <li>Monitor for fluid overload in CHF patients</li>
            </ul>
          </div>
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <h4 className="font-bold text-teal-300 mb-1 font-display">Accelerated Outpatient Protocol</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>0.9% Normal Saline @ 3.0 mL/kg/hour for 1 hour pre-exam</li>
              <li>0.9% Normal Saline @ 1.0–1.5 mL/kg/hour for 4 hours post-exam</li>
              <li>Encourage oral fluids (500 mL water) 2h prior</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. MRI Nephrogenic Systemic Fibrosis (NSF) Classification */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          2. Gadolinium Agents & NSF Risk Classification (MRI)
        </h3>

        <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-[#0a0f1a] font-bold text-slate-300 font-display">
              <tr>
                <th className="px-4 py-2.5 text-left">NSF Category</th>
                <th className="px-4 py-2.5 text-left">Agents Included</th>
                <th className="px-4 py-2.5 text-left">Safety Profile & ACR Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-[#111827]">
              <tr className="bg-emerald-950/20">
                <td className="px-4 py-3 font-bold text-emerald-400">
                  Group II (Macrocyclic)
                  <span className="block text-[10px] text-emerald-500 font-normal">Lowest / Negligible Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-white">
                  <div>Gadobutrol (Gadavist / Gadovist)</div>
                  <div>Gadoterate meglumine (Dotarem / Clariscan)</div>
                  <div>Gadoteridol (ProHance)</div>
                </td>
                <td className="px-4 py-3 text-slate-300 leading-relaxed">
                  Zero or unconfounded cases of NSF. <strong>Safe to administer even with eGFR &lt; 30 mL/min or on dialysis</strong> when clinically indicated. Routine eGFR screening is not strictly mandatory for Group II.
                </td>
              </tr>
              <tr className="bg-amber-950/20">
                <td className="px-4 py-3 font-bold text-amber-400">
                  Group III (Hepatobiliary)
                  <span className="block text-[10px] text-amber-500 font-normal">Low / Intermediate Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-white">
                  <div>Gadoxetate disodium (Eovist / Primovist)</div>
                  <div>Gadobenate dimeglumine (MultiHance)</div>
                </td>
                <td className="px-4 py-3 text-slate-300 leading-relaxed">
                  Data suggests low risk, but fewer exposures than Group II. Use with caution in eGFR &lt; 30 mL/min; use lowest effective dose.
                </td>
              </tr>
              <tr className="bg-rose-950/30">
                <td className="px-4 py-3 font-bold text-rose-400">
                  Group I (Linear Chelates)
                  <span className="block text-[10px] text-rose-500 font-normal">High NSF Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-white">
                  <div>Gadopentetate dimeglumine (Magnevist)</div>
                  <div>Gadodiamide (Omniscan)</div>
                  <div>Gadoversetamide (OptiMARK)</div>
                </td>
                <td className="px-4 py-3 text-rose-300 font-medium leading-relaxed">
                  <strong>CONTRAINDICATED in patients with eGFR &lt; 30 mL/min/1.73m² or on dialysis</strong>. Vast majority of historical NSF cases occurred with these linear agents. Replace with Group II macrocyclic agent.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Metformin Management Rules */}
      <div className="border border-slate-800 rounded-lg p-4 bg-[#0a0f1a] space-y-2 text-xs">
        <h3 className="font-bold text-white uppercase tracking-wider text-[11px] font-display">
          3. Metformin (Glucophage) Management Policy (CT Contrast)
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Metformin is not inherently nephrotoxic, but if contrast-induced acute renal failure occurs, metformin can accumulate and precipitate potentially fatal <strong>lactic acidosis</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">
              Category 1: eGFR ≥ 30 & No Acute Kidney Injury
            </span>
            <p className="text-slate-300">
              No need to discontinue metformin prior to or following contrast administration. No need to re-check renal function.
            </p>
          </div>
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <span className="font-bold text-rose-400 block mb-1">
              Category 2: eGFR &lt; 30, AKI, or Arterial Catheterization
            </span>
            <p className="text-slate-300">
              Withhold metformin at the time of or prior to the study. Withhold for 48 hours post-procedure. Restart ONLY after checking serum creatinine to ensure renal function remains stable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
