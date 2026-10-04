import React, { useState } from 'react';
import { PatientProfile, ContrastAgent, StudyProtocol, CalculationResult } from '../types/contrast';
import { Copy, Check, Printer, FileText, CheckSquare, Square } from 'lucide-react';

interface TechnologistWorksheetProps {
  profile: PatientProfile;
  agent: ContrastAgent;
  protocol: StudyProtocol;
  result: CalculationResult;
  onPrint: () => void;
}

export const TechnologistWorksheet: React.FC<TechnologistWorksheetProps> = ({
  profile,
  agent,
  protocol,
  result,
  onPrint
}) => {
  const [patientId, setPatientId] = useState('MRN-902148');
  const [patientName, setPatientName] = useState('PATIENT, CLINICAL');
  const [copied, setCopied] = useState(false);
  const [ivSite, setIvSite] = useState('Right Antecubital Fossa');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    idVerified: true,
    ivPatencyVerified: true,
    renalChecked: true,
    allergyScreened: true,
    clarityConfirmed: true
  });

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = () => {
    const text = `
=== RADIOLOGY INJECTION PROTOCOL & CONTRAST LOG ===
Study: ${protocol.name} (${protocol.modality})
Date/Time: ${new Date().toLocaleString()}
Patient: ${patientName} | MRN: ${patientId}
Demographics: ${profile.age}yo ${profile.gender.toUpperCase()} | Weight: ${result.weightKg} kg (Effective: ${result.effectiveDosingWeightKg} kg) | BMI: ${result.bmi}
Renal Clearance: eGFR ${result.eGFR ?? 'Not tested'} mL/min/1.73m² (${result.ckdStage})
IV Access: ${profile.ivGauge} in ${ivSite}

INJECTION PARAMETERS (Dual-Head Power Injector):
- Contrast: ${agent.brandName} (${agent.genericName} ${agent.concentrationValue} ${agent.concentrationUnit})
- Volume: ${result.contrastVolumeMl} mL @ ${result.flowRateMlPerSec.toFixed(1)} mL/s (Duration: ${result.injectionDurationSec.toFixed(1)}s)
- Saline Flush: ${result.salineVolumeMl} mL 0.9% NaCl @ ${result.salineFlowRateMlPerSec.toFixed(1)} mL/s
- Total Active Load: ${result.totalActiveSubstance} ${result.activeSubstanceUnit} (${result.dosePerKgActual} ${result.dosePerKgUnit})
- Peak Pressure Limit: 300 PSI
- Vial Used: ${result.vialPackaging.vialCount} x ${result.vialPackaging.vialSize} mL (Waste: ${result.vialPackaging.wasteVolumeMl} mL)

ACQUISITION TIMING:
${protocol.phases
  .map(
    (p, i) =>
      `  [Phase ${i + 1}] ${p.name} | Timing: ${p.timingMethod}${
        p.delaySeconds ? ` (+${p.delaySeconds}s delay)` : ''
      }${p.roiLocation ? ` | ROI: ${p.roiLocation} @ ${p.triggerHU} HU` : ''}`
  )
  .join('\n')}

SAFETY VERIFICATION:
- Two Patient Identifiers Verified: YES
- IV Patency Verified with Saline Test Flush: YES
- Adverse Event / Extravasation: None noted
Technologist Signature: ______________________
===================================================
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 max-w-4xl mx-auto shadow-xs">
      {/* Worksheet Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Department of Radiology & Medical Imaging
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Technologist Contrast Media Injection Card
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dual-Head Injector Worksheet & PACS/RIS Documentation Log
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy PACS / RIS Note</span>
              </>
            )}
          </button>
          <button
            onClick={onPrint}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Patient & Study Identification */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-0.5">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-2.5 py-1 font-mono font-semibold text-slate-900 bg-white border border-slate-200 rounded text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-0.5">MRN / Accession #</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-2.5 py-1 font-mono font-semibold text-slate-900 bg-white border border-slate-200 rounded text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-500 block mb-0.5">IV Venipuncture Site</label>
          <input
            type="text"
            value={ivSite}
            onChange={(e) => setIvSite(e.target.value)}
            className="w-full px-2.5 py-1 font-medium text-slate-900 bg-white border border-slate-200 rounded text-xs"
          />
        </div>
      </div>

      {/* Core Protocol Summary Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-100 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-2.5 text-left">Parameter</th>
              <th className="px-4 py-2.5 text-left">Clinical Specification</th>
              <th className="px-4 py-2.5 text-left">Technologist Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Study / Protocol</td>
              <td className="px-4 py-2.5 font-semibold text-blue-600">{protocol.name}</td>
              <td className="px-4 py-2.5 text-slate-500">{protocol.bodyPartName} ({protocol.modality})</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Contrast Media</td>
              <td className="px-4 py-2.5 font-mono">
                {agent.brandName} ({agent.genericName}) — {agent.concentrationValue} {agent.concentrationUnit}
              </td>
              <td className="px-4 py-2.5 text-slate-500">
                Check vial clarity, lot & expiration
              </td>
            </tr>
            <tr className="bg-blue-50/30">
              <td className="px-4 py-2.5 font-bold text-slate-900">Syringe A: Contrast Volume</td>
              <td className="px-4 py-2.5 font-mono font-bold text-blue-700 text-sm">
                {result.contrastVolumeMl} mL
              </td>
              <td className="px-4 py-2.5 text-slate-600 font-mono">
                Load {result.vialPackaging.vialCount} × {result.vialPackaging.vialSize} mL vial
              </td>
            </tr>
            <tr className="bg-blue-50/30">
              <td className="px-4 py-2.5 font-bold text-slate-900">Syringe A: Injection Rate</td>
              <td className="px-4 py-2.5 font-mono font-bold text-blue-700 text-sm">
                {result.flowRateMlPerSec.toFixed(1)} mL/s
              </td>
              <td className="px-4 py-2.5 text-slate-600 font-mono">
                Duration: {result.injectionDurationSec.toFixed(1)} seconds
              </td>
            </tr>
            <tr className="bg-cyan-50/30">
              <td className="px-4 py-2.5 font-bold text-slate-900">Syringe B: Saline Chaser</td>
              <td className="px-4 py-2.5 font-mono font-bold text-cyan-700 text-sm">
                {result.salineVolumeMl} mL
              </td>
              <td className="px-4 py-2.5 text-slate-600 font-mono">
                @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s (Duration: {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Pressure Limit</td>
              <td className="px-4 py-2.5 font-mono">300 PSI (20.7 bar)</td>
              <td className="px-4 py-2.5 text-slate-500">Auto-stop on pressure occlusion</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Total Active Substance</td>
              <td className="px-4 py-2.5 font-mono">
                {result.totalActiveSubstance} {result.activeSubstanceUnit}
              </td>
              <td className="px-4 py-2.5 text-slate-500 font-mono">
                {result.dosePerKgActual} {result.dosePerKgUnit}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-900">Renal Clearance / eGFR</td>
              <td className="px-4 py-2.5 font-mono">
                {result.eGFR !== null ? `${result.eGFR} mL/min/1.73m²` : 'None documented'}
              </td>
              <td className="px-4 py-2.5">
                <span className={`font-semibold capitalize ${
                  result.renalRiskLevel === 'safe'
                    ? 'text-emerald-700'
                    : result.renalRiskLevel === 'moderate-risk'
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}>
                  {result.renalRiskLevel.replace('-', ' ')}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Phase Timing Matrix */}
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Image Acquisition Delays & Scanner Triggers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {protocol.phases.map((ph, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                <span>Phase {idx + 1}: {ph.name}</span>
                <span className="font-mono text-blue-600">
                  {ph.delaySeconds !== undefined ? `+${ph.delaySeconds}s` : ph.timingMethod}
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">{ph.description}</p>
              {ph.roiLocation && (
                <div className="mt-1 text-[11px] font-mono text-slate-700">
                  ROI: <strong>{ph.roiLocation}</strong> {ph.triggerHU ? `@ ${ph.triggerHU} HU` : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technologist 5-Point Safety Checklist */}
      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Technologist Pre-Injection Safety Verification Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <label
            onClick={() => toggleCheck('idVerified')}
            className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-slate-200 hover:border-slate-300"
          >
            {checkedItems.idVerified ? (
              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>Two patient identifiers verified (Name & DOB)</span>
          </label>

          <label
            onClick={() => toggleCheck('renalChecked')}
            className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-slate-200 hover:border-slate-300"
          >
            {checkedItems.renalChecked ? (
              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>Renal status & eGFR verified against protocol</span>
          </label>

          <label
            onClick={() => toggleCheck('ivPatencyVerified')}
            className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-slate-200 hover:border-slate-300"
          >
            {checkedItems.ivPatencyVerified ? (
              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>IV line patency verified with rapid manual 10 mL flush</span>
          </label>

          <label
            onClick={() => toggleCheck('allergyScreened')}
            className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-slate-200 hover:border-slate-300"
          >
            {checkedItems.allergyScreened ? (
              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>Contrast allergy screen & premedication verified</span>
          </label>

          <label
            onClick={() => toggleCheck('clarityConfirmed')}
            className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded border border-slate-200 hover:border-slate-300 sm:col-span-2"
          >
            {checkedItems.clarityConfirmed ? (
              <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <span>Contrast bottle lot, expiration, and lack of particulate matter confirmed</span>
          </label>
        </div>

        {/* Signature lines for physical prints */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-6 text-xs text-slate-600">
          <div>
            <div className="h-8 border-b border-slate-300"></div>
            <div className="mt-1">Technologist Name & Registry #</div>
          </div>
          <div>
            <div className="h-8 border-b border-slate-300"></div>
            <div className="mt-1">Date & Time of Injection</div>
          </div>
        </div>
      </div>
    </div>
  );
};
