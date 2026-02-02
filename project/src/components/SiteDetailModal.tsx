import React from 'react';
import { SiteForecast } from '../types/weather';
import { getWindDirection } from '../services/weatherService';
import { X } from 'lucide-react';

interface SiteDetailModalProps {
  siteForecast: SiteForecast;
  onClose: () => void;
}

const SiteDetailModal: React.FC<SiteDetailModalProps> = ({ siteForecast, onClose }) => {
  const { site, forecast } = siteForecast;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'marginal': return 'bg-amber-500';
      default: return 'bg-neutral-300';
    }
  };

  const getConditionBorder = (day: typeof forecast[0]) => {
    if (day.soaringFlyability === 'good' || day.thermalFlyability === 'good') {
      return 'border-l-green-500';
    }
    if (day.soaringFlyability === 'marginal' || day.thermalFlyability === 'marginal') {
      return 'border-l-amber-500';
    }
    return 'border-l-neutral-300';
  };

  const getDayLabel = (index: number) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return `Day ${index + 1}`;
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-lg font-bold text-neutral-900 tracking-tight">
              {site.name.toUpperCase()}
            </h2>
            <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
              {site.elevation.toLocaleString()}′ MSL · {site.orientation} · Max {site.maxWind}mph
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-neutral-300
                     hover:border-neutral-900 hover:bg-neutral-900 hover:text-white
                     transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Days */}
        <div className="p-6 space-y-6">
          {forecast.map((day, index) => (
            <div
              key={day.date}
              className={`border-l-4 ${getConditionBorder(day)} bg-neutral-50 p-5`}
            >
              {/* Day header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="font-mono text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    {getDayLabel(index)}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    {formatDate(day.date)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${getStatusColor(day.soaringFlyability)}`} />
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Soar</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${getStatusColor(day.thermalFlyability)}`} />
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">Therm</div>
                  </div>
                  <div className="pl-3 border-l border-neutral-300">
                    <div className={`font-mono text-[10px] uppercase tracking-wider ${day.windDirectionMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {day.windDirectionMatch ? '✓ Wind OK' : '✗ Cross'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions summary */}
              <div className="font-mono text-[11px] text-neutral-700 mb-4 p-3 bg-white border border-neutral-200">
                {day.conditions}
                {day.rainInfo && (
                  <span className="text-blue-600 ml-2">↓ {day.rainInfo}</span>
                )}
              </div>

              {/* Best Launch */}
              <div className="mb-5 p-3 bg-green-50 border border-green-200">
                <div className="font-mono text-[9px] uppercase tracking-wider text-green-600 mb-1">
                  Best Launch Time
                </div>
                <div className="font-mono text-xl font-bold text-green-700">
                  {day.launchTime}
                </div>
              </div>

              {/* Data grid - instrument panel style */}
              <div className="grid grid-cols-4 gap-4">
                {/* Wind */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Wind</div>
                  <div className="data-value">{day.windSpeed}</div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    {getWindDirection(day.windDirection)} G{day.windGust}
                  </div>
                </div>

                {/* Temperature */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Temp</div>
                  <div className="data-value">{day.temperature}°</div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    TCON {day.tcon}°
                  </div>
                </div>

                {/* Thermals */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Thermal</div>
                  <div className="data-value">{day.thermalStrength}<span className="data-unit">/10</span></div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    CAPE {day.cape}
                  </div>
                </div>

                {/* Top of Lift */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Ceiling</div>
                  <div className="data-value">{(day.topOfLift / 1000).toFixed(1)}<span className="data-unit">k′</span></div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    {day.topOfLift > site.elevation
                      ? `+${((day.topOfLift - site.elevation) / 1000).toFixed(1)}k AGL`
                      : 'At launch'}
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Humidity</div>
                  <div className="data-value">{day.relativeHumidity}<span className="data-unit">%</span></div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    Dew {day.dewPoint}°
                  </div>
                </div>

                {/* Clouds */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">Clouds</div>
                  <div className="data-value">{day.cloudCover}<span className="data-unit">%</span></div>
                </div>

                {/* Lifted Index */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">LI</div>
                  <div className="data-value">{day.liftedIndex}</div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    {day.liftedIndex && day.liftedIndex < -2 ? 'Unstable' : day.liftedIndex && day.liftedIndex > 2 ? 'Stable' : 'Neutral'}
                  </div>
                </div>

                {/* Spread */}
                <div className="bg-white p-3 border border-neutral-200">
                  <div className="data-label">T–Dew</div>
                  <div className="data-value">{day.temperature - day.dewPoint}°</div>
                  <div className="font-mono text-[10px] text-neutral-500">
                    Spread
                  </div>
                </div>
              </div>

              {/* Upper winds if available */}
              {(day.wind850mb || day.wind700mb) && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 mb-3">
                    Upper Winds
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {day.wind850mb && (
                      <div className="bg-white p-3 border border-neutral-200">
                        <div className="data-label">850mb (~5k′)</div>
                        <div className="data-value">{day.wind850mb}<span className="data-unit">mph</span></div>
                        <div className="font-mono text-[10px] text-neutral-500">
                          {day.windDir850mb ? getWindDirection(day.windDir850mb) : '—'}
                        </div>
                      </div>
                    )}
                    {day.wind700mb && (
                      <div className="bg-white p-3 border border-neutral-200">
                        <div className="data-label">700mb (~10k′)</div>
                        <div className="data-value">{day.wind700mb}<span className="data-unit">mph</span></div>
                        <div className="font-mono text-[10px] text-neutral-500">
                          {day.windDir700mb ? getWindDirection(day.windDir700mb) : '—'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Reference */}
          <div className="border-t border-neutral-200 pt-4">
            <div className="font-mono text-[9px] text-neutral-400 space-y-1">
              <p>TCON = Trigger temp for thermals · CAPE = Convective energy · LI = Lifted Index (negative = unstable)</p>
              <p>Data via Open-Meteo. Optimized for 12:00 launch. Always verify conditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetailModal;
