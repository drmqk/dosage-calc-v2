import React from 'react';
import { CalculationResult } from '../types/contrast';
import { AlertTriangle, AlertOctagon, Info, CheckCircle2 } from 'lucide-react';

interface SafetyAlertBannerProps {
  alerts: CalculationResult['clinicalAlerts'];
}

export const SafetyAlertBanner: React.FC<SafetyAlertBannerProps> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((alert, idx) => {
        let borderClass = 'border-teal-800/60 bg-teal-950/30 text-teal-200';
        let Icon = Info;
        let iconColor = 'text-teal-400';

        if (alert.severity === 'danger') {
          borderClass = 'border-rose-800/70 bg-rose-950/40 text-rose-200';
          Icon = AlertOctagon;
          iconColor = 'text-rose-400';
        } else if (alert.severity === 'warning') {
          borderClass = 'border-amber-800/70 bg-amber-950/40 text-amber-200';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (alert.severity === 'success') {
          borderClass = 'border-emerald-800/70 bg-emerald-950/40 text-emerald-200';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        }

        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${borderClass} flex items-start gap-3 transition-all shadow-xs`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold leading-tight tracking-tight text-white font-display">
                {alert.title}
              </h4>
              <p className="text-xs leading-relaxed opacity-95">{alert.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
