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
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Pharmaceutical Formulary & Physical Properties
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            CT & MRI Contrast Media Reference Library
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official pharmaceutical specifications, osmolalities, viscosities, and NSF classification
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setFilterModality('ALL')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                filterModality === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({CONTRAST_AGENTS.length})
            </button>
            <button
              onClick={() => setFilterModality('CT')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                filterModality === 'CT' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              CT Iodinated ({CONTRAST_AGENTS.filter((a) => a.modality === 'CT').length})
            </button>
            <button
              onClick={() => setFilterModality('MRI')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                filterModality === 'MRI' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-100 font-semibold text-slate-700">
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
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900 text-sm">{agent.brandName}</div>
                  <div className="text-slate-500 text-[11px]">
                    {agent.genericName} · {agent.manufacturer}
                  </div>
                  {agent.notes && (
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                      {agent.notes}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    agent.modality === 'CT'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {agent.modality}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-slate-900">
                  {agent.concentrationValue} {agent.concentrationUnit}
                </td>
                <td className="px-4 py-3 font-mono">
                  <span className={agent.osmolality === 290 ? 'text-emerald-700 font-bold' : 'text-slate-800'}>
                    {agent.osmolality} mOsm/kg
                  </span>
                  <div className="text-[10px] text-slate-400 capitalize">{agent.osmolarityType}</div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-800">
                  {agent.viscosity37} mPa·s
                </td>
                <td className="px-4 py-3 capitalize text-slate-700">
                  <div>{agent.structure}</div>
                  <div className="text-[10px] text-slate-400">{agent.ionicity}</div>
                </td>
                <td className="px-4 py-3">
                  {agent.nsfGroup ? (
                    <span
                      className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                        agent.nsfGroup === 'Group II'
                          ? 'bg-emerald-100 text-emerald-800'
                          : agent.nsfGroup === 'Group III'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {agent.nsfGroup}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">N/A (Iodinated)</span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-slate-600 text-[11px]">
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
