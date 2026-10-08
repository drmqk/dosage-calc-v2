import React, { useState } from 'react';
import { CONTRAST_AGENTS } from '../data/agents';
import { Search, Droplet, ShieldCheck, ExternalLink } from 'lucide-react';

export const AgentCatalogView: React.FC = () => {
  const [filterModality, setFilterModality] = useState<'ALL' | 'CT' | 'MRI'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = CONTRAST_AGENTS.filter((agent) => {
    const matchesMod = filterModality === 'ALL' || agent.modality === filterModality;
    const matchesSearch =
      agent.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMod && matchesSearch;
  });

  return (
    <div className="bg-[#111827] text-slate-100 rounded-xl border border-slate-800 p-6 space-y-6 max-w-6xl mx-auto shadow-sm">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold">
            Pharmaceutical Formulary & Physical Properties
          </div>
          <h2 className="text-xl font-bold text-white mt-0.5 font-display">
            CT & MRI Contrast Media Reference Library
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official pharmaceutical specifications, osmolalities, viscosities, and NSF classification
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#090d16] border border-slate-700/80 rounded-lg text-xs">
            <button
              onClick={() => setFilterModality('ALL')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filterModality === 'ALL' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({CONTRAST_AGENTS.length})
            </button>
            <button
              onClick={() => setFilterModality('CT')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filterModality === 'CT' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              CT Iodinated ({CONTRAST_AGENTS.filter((a) => a.modality === 'CT').length})
            </button>
            <button
              onClick={() => setFilterModality('MRI')}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filterModality === 'MRI' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              MRI Gadolinium ({CONTRAST_AGENTS.filter((a) => a.modality === 'MRI').length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search agent name, vendor..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#090d16] text-white border border-slate-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="border border-slate-800 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-xs">
          <thead className="bg-[#0a0f1a] font-bold text-slate-300 font-display">
            <tr>
              <th className="px-4 py-2.5 text-left">Agent & Brand</th>
              <th className="px-4 py-2.5 text-left">Modality</th>
              <th className="px-4 py-2.5 text-left">Concentration</th>
              <th className="px-4 py-2.5 text-left">Osmolality</th>
              <th className="px-4 py-2.5 text-left">Viscosity (37°C)</th>
              <th className="px-4 py-2.5 text-left">Structure & Ionicity</th>
              <th className="px-4 py-2.5 text-left">Safety / NSF Group</th>
              <th className="px-4 py-2.5 text-left">Standard Vials</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-[#111827]">
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-bold text-white text-sm">{agent.brandName}</div>
                  <div className="text-slate-400 text-[11px]">
                    {agent.genericName} · {agent.manufacturer}
                  </div>
                  {agent.notes && (
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {agent.notes}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    agent.modality === 'CT'
                      ? 'bg-teal-950 text-teal-300 border border-teal-800/50'
                      : 'bg-purple-950 text-purple-300 border border-purple-800/50'
                  }`}>
                    {agent.modality}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-white">
                  {agent.concentrationValue} {agent.concentrationUnit}
                </td>
                <td className="px-4 py-3 font-mono">
                  <span className={agent.osmolality === 290 ? 'text-emerald-400 font-bold' : 'text-slate-200'}>
                    {agent.osmolality} mOsm/kg
                  </span>
                  <div className="text-[10px] text-teal-400 capitalize">{agent.osmolarityType}</div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-300">
                  {agent.viscosity37} mPa·s
                </td>
                <td className="px-4 py-3 capitalize text-slate-300">
                  <div className="text-white font-medium">{agent.structure}</div>
                  <div className="text-[10px] text-slate-400">{agent.ionicity}</div>
                </td>
                <td className="px-4 py-3">
                  {agent.nsfGroup ? (
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                        agent.nsfGroup === 'Group II'
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50'
                          : agent.nsfGroup === 'Group III'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/50'
                          : 'bg-rose-950/60 text-rose-300 border-rose-800/50'
                      }`}
                    >
                      {agent.nsfGroup}
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">N/A (Iodinated)</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                  {agent.vialSizes.map((s) => `${s}mL`).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
