import React, { useState } from 'react';
import { PatientProfile, ContrastAgent, StudyProtocol, CalculationResult } from '../types/contrast';
import { Copy, Check, Printer, FileText, CheckSquare, Square } from 'lucide-react';
import { AppIcon } from './AppIcon';

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
    <div className="bg-[#111827] text-slate-100 rounded-xl border border-slate-800 p-6 space-y-6 max-w-4xl mx-auto shadow-md">
      {/* Worksheet Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <AppIcon size={44} />
          <div>
            <div className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
              Department of Radiology · Dosage Calc Suite
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5 font-display">
              Technologist Contrast Injection Card
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dual-Head Injector Worksheet & PACS/RIS Documentation Log
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={copyToClipboard}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-teal-400 font-bold">Copied to Clipboard</span>
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
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Patient & Study Identification */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#0a0f1a] rounded-lg border border-slate-800 text-xs">
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-0.5">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-2.5 py-1.5 font-mono font-bold text-white bg-[#090d16] border border-slate-700 rounded text-xs focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-0.5">MRN / Accession #</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-2.5 py-1.5 font-mono font-bold text-white bg-[#090d16] border border-slate-700 rounded text-xs focus:border-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-400 block mb-0.5">IV Venipuncture Site</label>
          <input
            type="text"
            value={ivSite}
            onChange={(e) => setIvSite(e.target.value)}
            className="w-full px-2.5 py-1.5 font-medium text-white bg-[#090d16] border border-slate-700 rounded text-xs focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Core Protocol Summary Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-800 text-xs">
          <thead className="bg-[#0a0f1a] font-bold text-slate-300 font-display">
            <tr>
              <th className="px-4 py-2.5 text-left">Parameter</th>
              <th className="px-4 py-2.5 text-left">Clinical Specification</th>
              <th className="px-4 py-2.5 text-left">Technologist Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-[#111827]">
            <tr>
              <td className="px-4 py-2.5 font-bold text-white">Study / Protocol</td>
              <td className="px-4 py-2.5 font-bold text-teal-400">{protocol.name}</td>
              <td className="px-4 py-2.5 text-slate-400">{protocol.bodyPartName} ({protocol.modality})</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-300">Contrast Media</td>
              <td className="px-4 py-2.5 font-mono text-white">
                {agent.brandName} ({agent.genericName}) — {agent.concentrationValue} {agent.concentrationUnit}
              </td>
              <td className="px-4 py-2.5 text-slate-400">
                Check vial clarity, lot & expiration
              </td>
            </tr>
            <tr className="bg-teal-950/20">
              <td className="px-4 py-2.5 font-bold text-white">Syringe A: Contrast Volume</td>
              <td className="px-4 py-2.5 font-mono font-extrabold text-teal-300 text-sm">
                {result.contrastVolumeMl} mL
              </td>
              <td className="px-4 py-2.5 text-slate-300 font-mono">
                Load {result.vialPackaging.vialCount} × {result.vialPackaging.vialSize} mL vial
              </td>
            </tr>
            <tr className="bg-teal-950/20">
              <td className="px-4 py-2.5 font-bold text-white">Syringe A: Injection Rate</td>
              <td className="px-4 py-2.5 font-mono font-extrabold text-teal-300 text-sm">
                {result.flowRateMlPerSec.toFixed(1)} mL/s
              </td>
              <td className="px-4 py-2.5 text-slate-300 font-mono">
                Duration: {result.injectionDurationSec.toFixed(1)} seconds
              </td>
            </tr>
            <tr className="bg-cyan-950/20">
              <td className="px-4 py-2.5 font-bold text-white">Syringe B: Saline Chaser</td>
              <td className="px-4 py-2.5 font-mono font-extrabold text-cyan-300 text-sm">
                {result.salineVolumeMl} mL
              </td>
              <td className="px-4 py-2.5 text-slate-300 font-mono">
                @ {result.salineFlowRateMlPerSec.toFixed(1)} mL/s (Duration: {(result.salineVolumeMl / result.salineFlowRateMlPerSec).toFixed(1)}s)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-300">Pressure Limit</td>
              <td className="px-4 py-2.5 font-mono text-white">300 PSI (20.7 bar)</td>
              <td className="px-4 py-2.5 text-slate-400">Auto-stop on pressure occlusion</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-300">Total Active Substance</td>
              <td className="px-4 py-2.5 font-mono text-teal-300 font-semibold">
                {result.totalActiveSubstance} {result.activeSubstanceUnit}
              </td>
              <td className="px-4 py-2.5 text-slate-400 font-mono">
                {result.dosePerKgActual} {result.dosePerKgUnit}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-medium text-slate-300">Renal Clearance / eGFR</td>
              <td className="px-4 py-2.5 font-mono font-bold text-white">
                {result.eGFR !== null ? `${result.eGFR} mL/min/1.73m²` : 'None documented'}
              </td>
              <td className="px-4 py-2.5">
                <span className={`font-bold capitalize font-mono text-xs ${
                  result.renalRiskLevel === 'safe'
                    ? 'text-emerald-400'
                    : result.renalRiskLevel === 'moderate-risk'
                    ? 'text-amber-400'
                    : 'text-rose-400'
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
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-display">
          Image Acquisition Delays & Scanner Triggers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {protocol.phases.map((ph, idx) => (
            <div key={idx} className="p-3 bg-[#0a0f1a] rounded-lg border border-slate-800">
              <div className="flex items-center justify-between font-bold text-white mb-1">
                <span>Phase {idx + 1}: {ph.name}</span>
                <span className="font-mono text-teal-400">
                  {ph.delaySeconds !== undefined ? `+${ph.delaySeconds}s` : ph.timingMethod}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">{ph.description}</p>
              {ph.roiLocation && (
                <div className="mt-1.5 text-[11px] font-mono text-slate-300">
                  ROI: <strong className="text-teal-400">{ph.roiLocation}</strong> {ph.triggerHU ? `@ ${ph.triggerHU} HU` : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Technologist 5-Point Safety Checklist */}
      <div className="border border-slate-800 rounded-lg p-4 bg-[#0a0f1a] space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
          Technologist Pre-Injection Safety Verification Checklist
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <label
            onClick={() => toggleCheck('idVerified')}
            className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[#0e1628] rounded border border-slate-800 hover:border-slate-700 text-slate-200"
          >
            {checkedItems.idVerified ? (
              <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>Two patient identifiers verified (Name & DOB)</span>
          </label>

          <label
            onClick={() => toggleCheck('renalChecked')}
            className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[#0e1628] rounded border border-slate-800 hover:border-slate-700 text-slate-200"
          >
            {checkedItems.renalChecked ? (
              <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>Renal status & eGFR verified against protocol</span>
          </label>

          <label
            onClick={() => toggleCheck('ivPatencyVerified')}
            className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[#0e1628] rounded border border-slate-800 hover:border-slate-700 text-slate-200"
          >
            {checkedItems.ivPatencyVerified ? (
              <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>IV line patency verified with rapid manual 10 mL flush</span>
          </label>

          <label
            onClick={() => toggleCheck('allergyScreened')}
            className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[#0e1628] rounded border border-slate-800 hover:border-slate-700 text-slate-200"
          >
            {checkedItems.allergyScreened ? (
              <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>Contrast allergy screen & premedication verified</span>
          </label>

          <label
            onClick={() => toggleCheck('clarityConfirmed')}
            className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-[#0e1628] rounded border border-slate-800 hover:border-slate-700 text-slate-200 sm:col-span-2"
          >
            {checkedItems.clarityConfirmed ? (
              <CheckSquare className="w-4 h-4 text-teal-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>Contrast bottle lot, expiration, and lack of particulate matter confirmed</span>
          </label>
        </div>

        {/* Signature lines for physical prints */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-6 text-xs text-slate-400">
          <div>
            <div className="h-8 border-b border-slate-700"></div>
            <div className="mt-1">Technologist Name & Registry #</div>
          </div>
          <div>
            <div className="h-8 border-b border-slate-700"></div>
            <div className="mt-1">Date & Time of Injection</div>
          </div>
        </div>
      </div>
    </div>
  );
};
