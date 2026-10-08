import React, { useState } from 'react';
import { Modality, ContrastAgent, StudyProtocol } from '../types/contrast';
import { CONTRAST_AGENTS } from '../data/agents';
import { STUDY_PROTOCOLS } from '../data/protocols';
import { Layers, Droplet, Search, ShieldCheck, AlertCircle } from 'lucide-react';

interface StudySelectorProps {
  modality: Modality;
  onModalityChange: (modality: Modality) => void;
  selectedProtocolId: string;
  onProtocolSelect: (protocolId: string) => void;
  selectedAgentId: string;
  onAgentSelect: (agentId: string) => void;
  customConcentration?: number;
  onCustomConcentrationChange: (val: number | undefined) => void;
}

export const StudySelector: React.FC<StudySelectorProps> = ({
  modality,
  onModalityChange,
  selectedProtocolId,
  onProtocolSelect,
  selectedAgentId,
  onAgentSelect,
  customConcentration,
  onCustomConcentrationChange
}) => {
  const [protocolSearch, setProtocolSearch] = useState('');
  const [selectedBodyPartFilter, setSelectedBodyPartFilter] = useState<string>('all');
  const [isCustomAgent, setIsCustomAgent] = useState(false);

  // Protocols filtered by current modality
  const modalityProtocols = STUDY_PROTOCOLS.filter((p) => p.modality === modality);

  // Body parts present in this modality
  const bodyParts = Array.from(
    new Set(modalityProtocols.map((p) => JSON.stringify({ id: p.bodyPartId, name: p.bodyPartName })))
  ).map((str) => JSON.parse(str) as { id: string; name: string });

  // Filtered protocols
  const filteredProtocols = modalityProtocols.filter((p) => {
    const matchesPart = selectedBodyPartFilter === 'all' || p.bodyPartId === selectedBodyPartFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(protocolSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(protocolSearch.toLowerCase()) ||
      p.clinicalIndications.some((ind) => ind.toLowerCase().includes(protocolSearch.toLowerCase()));
    return matchesPart && matchesSearch;
  });

  // Agents filtered by modality
  const modalityAgents = CONTRAST_AGENTS.filter((a) => a.modality === modality);
  const currentAgent = modalityAgents.find((a) => a.id === selectedAgentId) || modalityAgents[0];
  const currentProtocol = STUDY_PROTOCOLS.find((p) => p.id === selectedProtocolId);

  return (
    <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 space-y-5 shadow-sm">
      {/* Top Row: Modality Segmented Switcher & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        {/* Modality Tabs */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">Imaging Modality</label>
          <div className="flex items-center gap-1 p-1 bg-[#090d16] border border-slate-700/80 rounded-lg">
            <button
              type="button"
              onClick={() => {
                onModalityChange('CT');
                setSelectedBodyPartFilter('all');
                const firstCT = STUDY_PROTOCOLS.find((p) => p.modality === 'CT');
                if (firstCT) onProtocolSelect(firstCT.id);
                const firstCTAgent = CONTRAST_AGENTS.find((a) => a.modality === 'CT');
                if (firstCTAgent) onAgentSelect(firstCTAgent.id);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors font-display ${
                modality === 'CT'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Computed Tomography (CT)
            </button>
            <button
              type="button"
              onClick={() => {
                onModalityChange('MRI');
                setSelectedBodyPartFilter('all');
                const firstMRI = STUDY_PROTOCOLS.find((p) => p.modality === 'MRI');
                if (firstMRI) onProtocolSelect(firstMRI.id);
                const firstMRIAgent = CONTRAST_AGENTS.find((a) => a.modality === 'MRI');
                if (firstMRIAgent) onAgentSelect(firstMRIAgent.id);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors font-display ${
                modality === 'MRI'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Magnetic Resonance (MRI)
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="sm:w-64">
          <label className="text-xs font-medium text-slate-400 block mb-1">Search Protocols</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={protocolSearch}
              onChange={(e) => setProtocolSearch(e.target.value)}
              placeholder="Search PE, HCC, Aorta..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Body Part Filter Buttons */}
      <div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedBodyPartFilter('all')}
            className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors font-medium ${
              selectedBodyPartFilter === 'all'
                ? 'bg-teal-600 text-white font-semibold'
                : 'bg-[#090d16] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            All Regions ({modalityProtocols.length})
          </button>
          {bodyParts.map((part) => {
            const count = modalityProtocols.filter((p) => p.bodyPartId === part.id).length;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => setSelectedBodyPartFilter(part.id)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors font-medium ${
                  selectedBodyPartFilter === part.id
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'bg-[#090d16] text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {part.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol Selection Dropdown / Grid */}
      <div>
        <label className="block text-xs font-bold text-white mb-1.5 flex items-center gap-1.5 font-display">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          Clinical Study Protocol
        </label>
        <select
          value={selectedProtocolId}
          onChange={(e) => onProtocolSelect(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-[#090d16] border border-slate-700 rounded-lg font-semibold text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        >
          {filteredProtocols.map((p) => (
            <option key={p.id} value={p.id} className="bg-[#0f172a] text-white">
              [{p.bodyPartName}] {p.name} — ({p.standardFlowRate} mL/s)
            </option>
          ))}
        </select>

        {currentProtocol && (
          <div className="mt-2 text-xs text-slate-300 bg-[#0a0f1a] p-3 rounded-lg border border-slate-800">
            <p className="font-semibold text-white mb-1">{currentProtocol.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
              <span className="font-bold text-teal-400">Indications:</span>
              {currentProtocol.clinicalIndications.slice(0, 3).map((ind, i) => (
                <span key={i} className="inline-block text-slate-300">
                  {ind}
                  {i < Math.min(2, currentProtocol.clinicalIndications.length - 1) ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contrast Agent Selector */}
      <div className="border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
            <Droplet className="w-3.5 h-3.5 text-teal-400" />
            Contrast Media Brand & Concentration
          </label>
          <button
            type="button"
            onClick={() => {
              setIsCustomAgent(!isCustomAgent);
              if (isCustomAgent) {
                onCustomConcentrationChange(undefined);
              } else {
                onCustomConcentrationChange(currentAgent ? currentAgent.concentrationValue : 350);
              }
            }}
            className="text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            {isCustomAgent ? '← Back to standard library' : '+ Custom concentration override'}
          </button>
        </div>

        {!isCustomAgent ? (
          <div className="space-y-2">
            <select
              value={selectedAgentId}
              onChange={(e) => onAgentSelect(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#090d16] border border-slate-700 rounded-lg font-semibold text-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              {modalityAgents.map((agent) => (
                <option key={agent.id} value={agent.id} className="bg-[#0f172a] text-white">
                  {agent.brandName} ({agent.genericName}) — {agent.concentrationValue} {agent.concentrationUnit}
                  {agent.nsfGroup ? ` [${agent.nsfGroup}]` : ` [${agent.osmolality} mOsm/kg]`}
                </option>
              ))}
            </select>

            {currentAgent && (
              <div className="p-3 bg-[#0a0f1a] border border-slate-800 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Concentration</span>
                  <span className="font-mono font-bold text-white">
                    {currentAgent.concentrationValue} {currentAgent.concentrationUnit}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Osmolality</span>
                  <span className="font-mono font-bold text-white">
                    {currentAgent.osmolality} <span className="text-[10px] text-slate-400">mOsm/kg</span>
                  </span>
                  <span className="text-[9px] text-teal-400 block capitalize">{currentAgent.osmolarityType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Viscosity (37°C)</span>
                  <span className="font-mono font-bold text-white">
                    {currentAgent.viscosity37} <span className="text-[10px] text-slate-400">mPa·s</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {modality === 'MRI' ? 'NSF Classification' : 'Structure / Ionicity'}
                  </span>
                  {modality === 'MRI' ? (
                    <span
                      className={`font-semibold font-mono ${
                        currentAgent.nsfGroup === 'Group II'
                          ? 'text-emerald-400'
                          : currentAgent.nsfGroup === 'Group III'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {currentAgent.nsfGroup}
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-200 capitalize">
                      {currentAgent.structure} · {currentAgent.ionicity}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 bg-teal-950/30 border border-teal-800/60 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-teal-300">Custom Contrast Formulation</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {modality === 'CT' ? 'Iodine Concentration (mg I/mL)' : 'Gadolinium Concentration (mmol/mL)'}
                </label>
                <input
                  type="number"
                  step={modality === 'CT' ? 10 : 0.05}
                  value={customConcentration || (modality === 'CT' ? 350 : 0.5)}
                  onChange={(e) => onCustomConcentrationChange(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-sm bg-[#090d16] text-white border border-slate-700 rounded-lg font-mono focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div className="text-xs text-slate-400 flex flex-col justify-center">
                <span>Dose will automatically scale based on this precise active ingredient density.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
