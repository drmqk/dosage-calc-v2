import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Droplets, Info } from 'lucide-react';

export const RenalGuidelineView: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Evidence-Based Clinical Practice
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-0.5">
          Renal Safety, CI-AKI & NSF Risk Guidelines
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Synthesized from ACR Manual on Contrast Media v2024 and ESUR Guidelines 10.0
        </p>
      </div>

      {/* 1. CT Contrast-Induced AKI (CI-AKI) Risk Thresholds */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-600" />
          1. Iodinated Contrast & Renal Risk Stratification (CT)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Green: eGFR >= 45 */}
          <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-sm">eGFR ≥ 45</span>
              <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-semibold">
                NORMAL / MILD
              </span>
            </div>
            <p className="text-emerald-800">
              Negligible risk of CI-AKI. Routine IV hydration is not required. Voluntary oral fluid intake encouraged.
            </p>
            <div className="text-[11px] text-emerald-700 font-medium pt-1 border-t border-emerald-200">
              Action: Proceed with standard contrast volume.
            </div>
          </div>

          {/* Yellow: eGFR 30 - 44 */}
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-sm">eGFR 30 – 44</span>
              <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-semibold">
                RELATIVE RISK
              </span>
            </div>
            <p className="text-amber-800">
              ACR threshold of potential risk. If multiple comorbidities (diabetes, heart failure, sepsis) coexist, consider IV volume expansion.
            </p>
            <div className="text-[11px] text-amber-800 font-medium pt-1 border-t border-amber-200">
              Action: Consider isotonic saline pre-hydration; reduce contrast volume or use iso-osmolar agent (Visipaque).
            </div>
          </div>

          {/* Red: eGFR < 30 or AKI */}
          <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900 text-sm">eGFR &lt; 30 or AKI</span>
              <span className="text-[10px] font-mono bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-semibold">
                HIGH RISK
              </span>
            </div>
            <p className="text-rose-800">
              Clinically meaningful risk of Contrast-Induced Acute Kidney Injury. Evaluate risk vs diagnostic benefit.
            </p>
            <div className="text-[11px] text-rose-900 font-medium pt-1 border-t border-rose-200">
              Action: Mandatory IV saline hydration if urgent; postpone if non-emergent; consider non-contrast or ultrasound.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Intravenous Hydration Regimens */}
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          ACR / ESUR Recommended Intravenous Hydration Regimens
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-1">Standard Inpatient Protocol</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>0.9% Normal Saline @ 1.0 mL/kg/hour</li>
              <li>Administer for 3 to 12 hours before contrast</li>
              <li>Continue for 6 to 12 hours post-procedure</li>
              <li>Monitor for fluid overload in CHF patients</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-1">Accelerated Outpatient Protocol</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>0.9% Normal Saline @ 3.0 mL/kg/hour for 1 hour pre-exam</li>
              <li>0.9% Normal Saline @ 1.0–1.5 mL/kg/hour for 4 hours post-exam</li>
              <li>Encourage oral fluids (500 mL water) 2h prior</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. MRI Nephrogenic Systemic Fibrosis (NSF) Classification */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          2. Gadolinium Agents & NSF Risk Classification (MRI)
        </h3>

        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-2.5 text-left">NSF Category</th>
                <th className="px-4 py-2.5 text-left">Agents Included</th>
                <th className="px-4 py-2.5 text-left">Safety Profile & ACR Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="bg-emerald-50/30">
                <td className="px-4 py-3 font-bold text-emerald-800">
                  Group II (Macrocyclic)
                  <span className="block text-[10px] text-emerald-600 font-normal">Lowest / Negligible Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-slate-900">
                  <div>Gadobutrol (Gadavist / Gadovist)</div>
                  <div>Gadoterate meglumine (Dotarem / Clariscan)</div>
                  <div>Gadoteridol (ProHance)</div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Zero or unconfounded cases of NSF. <strong>Safe to administer even with eGFR &lt; 30 mL/min or on dialysis</strong> when clinically indicated. Routine eGFR screening is not strictly mandatory for Group II.
                </td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="px-4 py-3 font-bold text-amber-800">
                  Group III (Hepatobiliary)
                  <span className="block text-[10px] text-amber-600 font-normal">Low / Intermediate Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-slate-900">
                  <div>Gadoxetate disodium (Eovist / Primovist)</div>
                  <div>Gadobenate dimeglumine (MultiHance)</div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Data suggests low risk, but fewer exposures than Group II. Use with caution in eGFR &lt; 30 mL/min; use lowest effective dose.
                </td>
              </tr>
              <tr className="bg-rose-50/40">
                <td className="px-4 py-3 font-bold text-rose-800">
                  Group I (Linear Chelates)
                  <span className="block text-[10px] text-rose-600 font-normal">High NSF Risk</span>
                </td>
                <td className="px-4 py-3 font-mono text-slate-900">
                  <div>Gadopentetate dimeglumine (Magnevist)</div>
                  <div>Gadodiamide (Omniscan)</div>
                  <div>Gadoversetamide (OptiMARK)</div>
                </td>
                <td className="px-4 py-3 text-rose-800 font-medium">
                  <strong>CONTRAINDICATED in patients with eGFR &lt; 30 mL/min/1.73m² or on dialysis</strong>. Vast majority of historical NSF cases occurred with these linear agents. Replace with Group II agent.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Metformin Management Rules */}
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2 text-xs">
        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          3. Metformin (Glucophage) Management Policy (CT Contrast)
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Metformin is not inherently nephrotoxic, but if contrast-induced acute renal failure occurs, metformin can accumulate and precipitate potentially fatal <strong>lactic acidosis</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="font-semibold text-slate-800 block mb-1">
              Category 1: eGFR ≥ 30 & No Acute Kidney Injury
            </span>
            <p className="text-slate-600">
              No need to discontinue metformin prior to or following contrast administration. No need to re-check renal function.
            </p>
          </div>
          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="font-semibold text-rose-700 block mb-1">
              Category 2: eGFR &lt; 30, AKI, or Arterial Catheterization
            </span>
            <p className="text-slate-600">
              Withhold metformin at the time of or prior to the study. Withhold for 48 hours post-procedure. Restart ONLY after checking serum creatinine to ensure renal function remains stable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
