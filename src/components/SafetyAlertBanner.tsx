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
        let borderClass = 'border-blue-200 bg-blue-50/70 text-blue-900';
        let Icon = Info;
        let iconColor = 'text-blue-600';

        if (alert.severity === 'danger') {
          borderClass = 'border-rose-300 bg-rose-50/90 text-rose-950';
          Icon = AlertOctagon;
          iconColor = 'text-rose-600';
        } else if (alert.severity === 'warning') {
          borderClass = 'border-amber-300 bg-amber-50/90 text-amber-950';
          Icon = AlertTriangle;
          iconColor = 'text-amber-600';
        } else if (alert.severity === 'success') {
          borderClass = 'border-emerald-200 bg-emerald-50 text-emerald-950';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-600';
        }

        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${borderClass} flex items-start gap-3 transition-all`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold leading-tight tracking-tight">{alert.title}</h4>
              <p className="text-xs leading-relaxed opacity-90">{alert.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
