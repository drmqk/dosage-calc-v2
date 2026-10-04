import React from 'react';
import { Pill, AlertOctagon, HeartPulse, Flame, CheckCircle } from 'lucide-react';

export const PremedicationGuideView: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          ACR Emergency Protocols & Patient Safety
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-0.5">
          Contrast Reaction Premedication & Extravasation Management
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Standardized clinical protocols for prophylaxis, acute adverse reactions, and IV extravasation
        </p>
      </div>

      {/* 1. Premedication Regimens */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Pill className="w-4 h-4 text-blue-600" />
          1. Premedication Protocols for Prior Contrast Hypersensitivity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* 13-Hour Elective Oral Protocol */}
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 text-sm">
                13-Hour Elective Oral Regimen (ACR Preferred)
              </span>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                GOLD STANDARD
              </span>
            </div>
            <p className="text-slate-600">
              Proven most effective in reducing recurring moderate-to-severe anaphylactoid reactions.
            </p>
            <div className="space-y-1.5 font-mono text-slate-800 bg-white p-3 rounded border border-blue-100">
              <div className="flex items-center justify-between">
                <span>13 Hours Prior:</span>
                <strong>Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>7 Hours Prior:</span>
                <strong>Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>1 Hour Prior:</span>
                <strong>Prednisone 50 mg PO</strong>
              </div>
              <div className="flex items-center justify-between text-blue-700 font-bold border-t border-slate-100 pt-1">
                <span>1 Hour Prior (Antihistamine):</span>
                <span>Diphenhydramine 50 mg PO/IM</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              *Pediatric dosing: Prednisone 0.5–0.7 mg/kg (max 50 mg) + Diphenhydramine 1.0 mg/kg (max 50 mg).
            </p>
          </div>

          {/* 4-Hour Emergency IV Protocol */}
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-sm">
                Accelerated 4-Hour IV Regimen
              </span>
              <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                URGENT / EMERGENCY
              </span>
            </div>
            <p className="text-slate-600">
              For urgent inpatient/ED patients who cannot wait 13 hours and contrast exam cannot be postponed.
            </p>
            <div className="space-y-1.5 font-mono text-slate-800 bg-white p-3 rounded border border-amber-100">
              <div className="flex items-center justify-between">
                <span>4 Hours Prior:</span>
                <strong>Methylprednisolone 32 mg IV</strong>
              </div>
              <div className="text-[10px] text-slate-500 pl-2">
                (or Hydrocortisone 200 mg IV)
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-1">
                <span>1 Hour Prior:</span>
                <strong>Methylprednisolone 32 mg IV</strong>
              </div>
              <div className="flex items-center justify-between text-amber-800 font-bold border-t border-slate-100 pt-1">
                <span>1 Hour Prior (Antihistamine):</span>
                <span>Diphenhydramine 50 mg IV</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              *Note: Efficacy is lower than the 13-hour protocol due to delayed gene transcription of corticosteroid receptors.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Acute Contrast Reaction Treatment Matrix */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-600" />
          2. Acute Contrast Reaction Severity & Emergency Treatment
        </h3>

        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100 font-semibold text-slate-700">
              <tr>
                <th className="px-4 py-2.5 text-left">Severity</th>
                <th className="px-4 py-2.5 text-left">Signs & Symptoms</th>
                <th className="px-4 py-2.5 text-left">First-Line Medical Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="px-4 py-3 font-bold text-emerald-800">
                  Mild Reaction
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Scattered hives, mild pruritus, sneezing, nasal congestion, diaphoresis.
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Observation and reassurance for 20-30 min. If itching is bothersome: <strong>Diphenhydramine 25–50 mg PO or IV</strong>. Vital signs monitoring.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-amber-800">
                  Moderate Reaction
                </td>
                <td className="px-4 py-3 text-slate-700">
                  Diffuse erythema, facial or periorbital edema, mild wheezing/bronchospasm, persistent vomiting.
                </td>
                <td className="px-4 py-3 text-slate-700 space-y-1">
                  <div>• Oxygen via face mask (6–10 L/min).</div>
                  <div>• <strong>Albuterol inhaler (2–3 puffs)</strong> for wheezing.</div>
                  <div>• <strong>Diphenhydramine 50 mg IV/IM</strong>.</div>
                  <div>• If symptoms accelerate: <strong>Epinephrine 1:1000 (0.3 mg) IM</strong> anterolateral thigh.</div>
                </td>
              </tr>
              <tr className="bg-rose-50/50">
                <td className="px-4 py-3 font-bold text-rose-900">
                  Severe / Anaphylactoid
                </td>
                <td className="px-4 py-3 text-rose-900">
                  Laryngeal stridor, severe bronchospasm, profound hypotension (systolic &lt; 90), hypoxia, arrhythmia, loss of consciousness.
                </td>
                <td className="px-4 py-3 text-rose-900 space-y-1">
                  <div className="font-bold text-rose-950">1. CALL RAPID RESPONSE / CODE BLUE IMMEDIATELY.</div>
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
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3 text-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          3. Extravasation Emergency Management Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-1">Immediate Actions</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Stop power injection immediately.</li>
              <li>Aspirate as much extravasated contrast as possible through cannula before removal.</li>
              <li>Elevate the affected extremity above the level of the heart to promote lymphatic resorption.</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-1">Cold vs Warm Compresses</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Apply <strong>cold compresses (ice pack)</strong> for 15–30 minutes, 3 to 4 times daily for 24–48 hours.</li>
              <li>Cold reduces local inflammation and edema. (Warm compresses only if preferred for comfort after acute phase).</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded border border-rose-200 bg-rose-50/30">
            <h4 className="font-bold text-rose-900 mb-1">Surgical Consultation Triggers</h4>
            <ul className="list-disc list-inside text-rose-800 space-y-1">
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
