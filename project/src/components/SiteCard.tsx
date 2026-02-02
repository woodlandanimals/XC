import React from 'react';
import { SiteForecast } from '../types/weather';
import { getWindDirection } from '../services/weatherService';

interface SiteCardProps {
  siteForecast: SiteForecast;
  onClick?: () => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ siteForecast, onClick }) => {
  const { site, forecast } = siteForecast;
  const today = forecast[0];

  // Determine best condition between soaring and thermal
  const getBestCondition = () => {
    if (today.soaringFlyability === 'good' || today.thermalFlyability === 'good') return 'good';
    if (today.soaringFlyability === 'marginal' || today.thermalFlyability === 'marginal') return 'marginal';
    return 'poor';
  };

  const condition = getBestCondition();

  const getConditionClass = () => {
    switch (condition) {
      case 'good': return 'condition-good';
      case 'marginal': return 'condition-marginal';
      default: return 'condition-poor';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'marginal': return 'bg-amber-500';
      default: return 'bg-neutral-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'marginal': return 'text-amber-600';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div
      className={`${getConditionClass()} p-4 cursor-pointer hover:shadow-md transition-shadow duration-150`}
      onClick={onClick}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-mono text-base font-bold text-neutral-900 tracking-tight">
            {site.name.toUpperCase()}
          </h3>
          <div className="font-mono text-[10px] text-neutral-400 tracking-wide">
            {site.elevation.toLocaleString()}′ · {site.orientation}
          </div>
        </div>

        {/* Condition indicators */}
        <div className="flex gap-3">
          <div className="text-center">
            <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-1 ${getStatusColor(today.soaringFlyability)}`} />
            <div className={`font-mono text-[9px] uppercase tracking-wider ${getStatusText(today.soaringFlyability)}`}>
              Soar
            </div>
          </div>
          <div className="text-center">
            <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-1 ${getStatusColor(today.thermalFlyability)}`} />
            <div className={`font-mono text-[9px] uppercase tracking-wider ${getStatusText(today.thermalFlyability)}`}>
              Therm
            </div>
          </div>
        </div>
      </div>

      {/* Data grid - 4 columns, industrial instrument style */}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {/* Wind */}
        <div>
          <div className="data-label">Wind</div>
          <div className="data-value">{today.windSpeed}</div>
          <div className="font-mono text-[10px] text-neutral-500">
            {getWindDirection(today.windDirection)} G{today.windGust}
          </div>
        </div>

        {/* Thermals */}
        <div>
          <div className="data-label">Thermal</div>
          <div className="data-value">{today.thermalStrength}<span className="data-unit">/10</span></div>
        </div>

        {/* Top of Lift */}
        <div>
          <div className="data-label">Ceiling</div>
          <div className="data-value">{(today.topOfLift / 1000).toFixed(1)}<span className="data-unit">k′</span></div>
        </div>

        {/* Launch Time */}
        <div>
          <div className="data-label">Launch</div>
          <div className="font-mono text-base font-semibold text-neutral-900">
            {today.launchTime.replace(' ', '').replace(':00', '')}
          </div>
        </div>
      </div>

      {/* Conditions text */}
      <div className="font-mono text-[11px] text-neutral-600 leading-relaxed mb-2 line-clamp-2">
        {today.conditions}
      </div>

      {/* Rain warning if present */}
      {today.rainInfo && (
        <div className="font-mono text-[11px] text-blue-600 font-medium">
          ↓ {today.rainInfo}
        </div>
      )}

      {/* Tomorrow preview - subtle */}
      {forecast.length > 1 && (
        <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400">
            Tomorrow
          </span>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(forecast[1].soaringFlyability)}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(forecast[1].thermalFlyability)}`} />
            <span className="font-mono text-[10px] text-neutral-500 tabular-nums">
              {forecast[1].windSpeed}mph · {forecast[1].launchTime.replace(' ', '').replace(':00', '')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteCard;
