/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PatientProfile, Modality } from './types/contrast';
import { CONTRAST_AGENTS } from './data/agents';
import { STUDY_PROTOCOLS } from './data/protocols';
import { calculateContrastProtocol } from './utils/clinicalCalculations';
import { Header } from './components/Header';
import { PatientInputPanel } from './components/PatientInputPanel';
import { StudySelector } from './components/StudySelector';
import { ResultsHUD } from './components/ResultsHUD';
import { PhaseTimeline } from './components/PhaseTimeline';
import { SafetyAlertBanner } from './components/SafetyAlertBanner';
import { TechnologistWorksheet } from './components/TechnologistWorksheet';
import { RenalGuidelineView } from './components/RenalGuidelineView';
import { PremedicationGuideView } from './components/PremedicationGuideView';
import { AgentCatalogView } from './components/AgentCatalogView';
import { PresetModal } from './components/PresetModal';
import { ClinicalPreset } from './data/presets';
import { Sparkles, FileSpreadsheet, ShieldAlert, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'worksheet' | 'renal' | 'premed' | 'catalog'>('calculator');
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);

  // Initial Clinical Patient Profile
  const [profile, setProfile] = useState<PatientProfile>({
    age: 58,
    gender: 'male',
    weight: 74,
    weightUnit: 'kg',
    height: 175,
    heightUnit: 'cm',
    serumCreatinine: 0.9,
    creatinineUnit: 'mg/dL',
    isDialysis: false,
    isAKI: false,
    hasMetformin: false,
    allergyHistory: 'none',
    ivGauge: '20G',
    ctKvp: 120,
    useLeanBodyWeight: true,
    selectedProtocolId: 'ct-chest-ctpa',
    selectedAgentId: 'isovue-370'
  });

  // Resolve selected protocol and agent
  const currentProtocol = useMemo(() => {
    return STUDY_PROTOCOLS.find((p) => p.id === profile.selectedProtocolId) || STUDY_PROTOCOLS[0];
  }, [profile.selectedProtocolId]);

  const currentAgent = useMemo(() => {
    return CONTRAST_AGENTS.find((a) => a.id === profile.selectedAgentId) || CONTRAST_AGENTS[0];
  }, [profile.selectedAgentId]);

  // Master clinical calculation result
  const result = useMemo(() => {
    return calculateContrastProtocol(profile, currentAgent, currentProtocol);
  }, [profile, currentAgent, currentProtocol]);

  const handleProfileChange = (updated: Partial<PatientProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleModalityChange = (newModality: Modality) => {
    if (newModality === 'CT') {
      const firstCT = STUDY_PROTOCOLS.find((p) => p.modality === 'CT');
      const firstAgent = CONTRAST_AGENTS.find((a) => a.modality === 'CT');
      setProfile((prev) => ({
        ...prev,
        selectedProtocolId: firstCT ? firstCT.id : prev.selectedProtocolId,
        selectedAgentId: firstAgent ? firstAgent.id : prev.selectedAgentId,
        customConcentration: undefined
      }));
    } else {
      const firstMRI = STUDY_PROTOCOLS.find((p) => p.modality === 'MRI');
      const firstAgent = CONTRAST_AGENTS.find((a) => a.modality === 'MRI');
      setProfile((prev) => ({
        ...prev,
        selectedProtocolId: firstMRI ? firstMRI.id : prev.selectedProtocolId,
        selectedAgentId: firstAgent ? firstAgent.id : prev.selectedAgentId,
        customConcentration: undefined
      }));
    }
  };

  const handleSelectPreset = (preset: ClinicalPreset) => {
    setProfile((prev) => ({
      ...prev,
      ...preset.profile
    }));
  };

  const handlePrint = () => {
    setActiveTab('worksheet');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Bar adhering to 3-zone contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPresets={() => setIsPresetModalOpen(true)}
        onPrint={handlePrint}
        modality={currentProtocol.modality}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Quick Context Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded ${
                  currentProtocol.modality === 'CT' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {currentProtocol.modality}
                </span>
                <div>
                  <h1 className="text-sm font-bold text-slate-900">
                    {currentProtocol.name}
                  </h1>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                    <span>{currentProtocol.bodyPartName}</span>
                    <span>·</span>
                    <span>{currentAgent.brandName} ({currentAgent.concentrationValue} {currentAgent.concentrationUnit})</span>
                    <span>·</span>
                    <span className="font-mono">
                      {result.contrastVolumeMl} mL @ {result.flowRateMlPerSec.toFixed(1)} mL/s
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPresetModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Clinical Scenarios</span>
                </button>
                <button
                  onClick={() => setActiveTab('worksheet')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Injector Worksheet</span>
                </button>
              </div>
            </div>

            {/* Asymmetric Split Workstation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Input Parameters & Patient Selection (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <StudySelector
                  modality={currentProtocol.modality}
                  onModalityChange={handleModalityChange}
                  selectedProtocolId={profile.selectedProtocolId}
                  onProtocolSelect={(id) => handleProfileChange({ selectedProtocolId: id })}
                  selectedAgentId={profile.selectedAgentId}
                  onAgentSelect={(id) => handleProfileChange({ selectedAgentId: id })}
                  customConcentration={profile.customConcentration}
                  onCustomConcentrationChange={(val) => handleProfileChange({ customConcentration: val })}
                />

                <PatientInputPanel
                  profile={profile}
                  onChange={handleProfileChange}
                  result={result}
                  modality={currentProtocol.modality}
                />
              </div>

              {/* Right Column: High-Impact Telemetry HUD, Alerts, and Protocol Timeline (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Primary Metric Telemetry Grid */}
                <ResultsHUD
                  result={result}
                  agent={currentAgent}
                  protocol={currentProtocol}
                  modality={currentProtocol.modality}
                />

                {/* Safety & Risk Alerts */}
                <SafetyAlertBanner alerts={result.clinicalAlerts} />

                {/* Dual-Head Injector & Acquisition Delays Timeline */}
                <PhaseTimeline protocol={currentProtocol} result={result} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'worksheet' && (
          <TechnologistWorksheet
            profile={profile}
            agent={currentAgent}
            protocol={currentProtocol}
            result={result}
            onPrint={() => window.print()}
          />
        )}

        {activeTab === 'renal' && <RenalGuidelineView />}

        {activeTab === 'premed' && <PremedicationGuideView />}

        {activeTab === 'catalog' && <AgentCatalogView />}
      </main>

      {/* Clinical Reference Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">RadContrast Dosing Suite</span>
              <span>·</span>
              <span>ACR Manual on Contrast Media v2024</span>
              <span>·</span>
              <span>ESUR Guidelines 10.0</span>
            </div>
            <div className="text-slate-400">
              For professional use by radiologic technologists and radiologists.
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Disclaimer: Dosages, flow rates, and timing recommendations are calculated according to established radiological literature and manufacturer labeling. Clinical judgment, departmental SOPs, and supervising radiologist approval must supersede automated calculation in all individual patient circumstances.
          </p>
        </div>
      </footer>

      {/* Case Presets Modal */}
      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
