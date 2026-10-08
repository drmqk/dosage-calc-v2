import React from 'react';
import { Pill, AlertOctagon, HeartPulse, Flame, CheckCircle } from 'lucide-react';

export const PremedicationGuideView: React.FC = () => {
  return (
    <div className="bg-[#111827] text-slate-100 rounded-xl border border-slate-800 p-6 space-y-6 max-w-5xl mx-auto shadow-sm">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
          ACR Emergency Protocols & Patient Safety
        </div>
        <h2 className="text-xl font-bold text-white mt-0.5 font-display">
          Contrast Reaction Premedication & Extravasation Management
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Standardized clinical protocols for prophylaxis, acute adverse reactions, and IV extravasation
        </p>
      </div>

      {/* 1. Premedication Regimens */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <Pill className="w-4 h-4 text-teal-400" />
          1. Premedication Protocols for Prior Contrast Hypersensitivity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 13-Hour Elective Oral Protocol */}
          <div className="p-4 rounded-lg border border-teal-800/60 bg-teal-950/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-300 text-sm font-display">
                13-Hour Elective Oral Regimen (ACR Preferred)
              </span>
              <span className="text-[10px] font-mono bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded font-semibold border border-teal-700/50">
                GOLD STANDARD
              </span>
            </div>
            <p className="text-slate-300">
              Proven most effective in reducing recurring moderate-to-severe anaphylactoid reactions.
            </p>
            <div className="space-y-2 font-mono text-slate-200 bg-[#090d16] p-3 rounded border border-slate-800">
              <div className="flex items-center justify-between">
                <span>13 Hours Prior:</span>
                <strong className="text-white">Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>7 Hours Prior:</span>
                <strong className="text-white">Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Hour Prior:</span>
                <strong className="text-white">Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between text-teal-300 font-bold border-t border-slate-800 pt-1.5">
                <span>1 Hour Prior (Antihistamine):</span>
                <span>Diphenhydramine 50 mg PO/IM</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              *Pediatric dosing: Prednisone 0.5–0.7 mg/kg (max 50 mg) + Diphenhydramine 1.0 mg/kg (max 50 mg).
            </p>
          </div>

          {/* 4-Hour Emergency IV Protocol */}
          <div className="p-4 rounded-lg border border-amber-800/60 bg-amber-950/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 text-sm font-display">
                Accelerated 4-Hour IV Regimen
              </span>
              <span className="text-[10px] font-mono bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-700/50">
                URGENT / EMERGENCY
              </span>
            </div>
            <p className="text-slate-300">
              For urgent inpatient/ED patients who cannot wait 13 hours and contrast exam cannot be postponed.
            </p>
            <div className="space-y-2 font-mono text-slate-200 bg-[#090d16] p-3 rounded border border-slate-800">
              <div className="flex items-center justify-between">
                <span>4 Hours Prior:</span>
                <strong className="text-white">Methylprednisolone 32 mg IV</strong>
              </div>
              <div className="text-[10px] text-slate-400 pl-2">
                (or Hydrocortisone 200 mg IV)
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-1">
                <span>1 Hour Prior:</span>
                <strong className="text-white">Methylprednisolone 32 mg IV</strong>
              </div>
              <div className="flex items-center justify-between text-amber-300 font-bold border-t border-slate-800 pt-1.5">
                <span>1 Hour Prior (Antihistamine):</span>
                <span>Diphenhydramine 50 mg IV</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              *Note: Efficacy is lower than the 13-hour protocol due to delayed gene transcription of corticosteroid receptors.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Acute Contrast Reaction Treatment Matrix */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
          <HeartPulse className="w-4 h-4 text-rose-400" />
          2. Acute Contrast Reaction Severity & Emergency Treatment
        </h3>

        <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-[#0a0f1a] font-bold text-slate-300 font-display">
              <tr>
                <th className="px-4 py-2.5 text-left">Severity</th>
                <th className="px-4 py-2.5 text-left">Signs & Symptoms</th>
                <th className="px-4 py-2.5 text-left">First-Line Medical Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#111827]">
              <tr>
                <td className="px-4 py-3 font-bold text-emerald-400">
                  Mild Reaction
                </td>
                <td className="px-4 py-3 text-slate-300">
                  Scattered hives, mild pruritus, sneezing, nasal congestion, diaphoresis.
                </td>
                <td className="px-4 py-3 text-slate-300">
                  Observation and reassurance for 20-30 min. If itching is bothersome: <strong>Diphenhydramine 25–50 mg PO or IV</strong>. Vital signs monitoring.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-amber-400">
                  Moderate Reaction
                </td>
                <td className="px-4 py-3 text-slate-300">
                  Diffuse erythema, facial or periorbital edema, mild wheezing/bronchospasm, persistent vomiting.
                </td>
                <td className="px-4 py-3 text-slate-300 space-y-1">
                  <div>• Oxygen via face mask (6–10 L/min).</div>
                  <div>• <strong>Albuterol inhaler (2–3 puffs)</strong> for wheezing.</div>
                  <div>• <strong>Diphenhydramine 50 mg IV/IM</strong>.</div>
                  <div>• If symptoms accelerate: <strong>Epinephrine 1:1000 (0.3 mg) IM</strong> anterolateral thigh.</div>
                </td>
              </tr>
              <tr className="bg-rose-950/30">
                <td className="px-4 py-3 font-bold text-rose-400">
                  Severe / Anaphylactoid
                </td>
                <td className="px-4 py-3 text-rose-200">
                  Laryngeal stridor, severe bronchospasm, profound hypotension (systolic &lt; 90), hypoxia, arrhythmia, loss of consciousness.
                </td>
                <td className="px-4 py-3 text-rose-200 space-y-1">
                  <div className="font-bold text-white">1. CALL RAPID RESPONSE / CODE BLUE IMMEDIATELY.</div>
                  <div>2. <strong>Epinephrine (1:1000 = 1 mg/mL) 0.3 mg (0.3 mL) IM</strong> into anterolateral thigh. Repeat every 5–15 min as needed.</div>
                  <div>3. High-flow 100% Oxygen (10–15 L/min non-rebreather mask).</div>
                  <div>4. Rapid IV hydration: <strong>0.9% Normal Saline 1,000 mL wide open</strong>.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Contrast Extravasation Protocol */}
      <div className="border border-slate-800 rounded-lg p-4 bg-[#0a0f1a] space-y-3 text-xs">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          3. Extravasation Emergency Management Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <h4 className="font-bold text-teal-300 mb-1 font-display">Immediate Actions</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Stop power injection immediately.</li>
              <li>Aspirate as much extravasated contrast as possible through cannula before removal.</li>
              <li>Elevate the affected extremity above heart level to promote lymphatic resorption.</li>
            </ul>
          </div>
          <div className="p-3.5 bg-[#0e1628] rounded border border-slate-800">
            <h4 className="font-bold text-teal-300 mb-1 font-display">Cold vs Warm Compresses</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Apply <strong>cold compresses (ice pack)</strong> for 15–30 minutes, 3 to 4 times daily for 24–48 hours.</li>
              <li>Cold reduces local inflammation and edema.</li>
            </ul>
          </div>
          <div className="p-3.5 bg-[#0e1628] rounded border border-rose-800/60 bg-rose-950/20">
            <h4 className="font-bold text-rose-400 mb-1 font-display">Surgical Consultation Triggers</h4>
            <ul className="list-disc list-inside text-rose-300 space-y-1">
              <li><strong>Volume &gt; 100 mL</strong> (or &gt; 15 mL in small child).</li>
              <li>Signs of Compartment Syndrome (tense edema, progressive pain).</li>
              <li>Sensory deficit (numbness/paresthesias) or motor weakness.</li>
              <li>Skin ulceration or blistering.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
