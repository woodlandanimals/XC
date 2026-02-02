import React from 'react';
import { SiteForecast } from '../types/weather';

interface WeeklyViewProps {
  forecasts: SiteForecast[];
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ forecasts }) => {
  // Generate 7 days starting from today in Pacific timezone
  // This must match the weatherService which uses Pacific time for forecast dates
  const getPacificDate = (daysOffset: number) => {
    const now = new Date();
    const date = new Date(now);
    date.setDate(date.getDate() + daysOffset);

    // Get the date components in Pacific timezone
    const pacificDateStr = date.toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });

    // Parse "Sun, 02/02/2026" format
    const [weekday, dateStr] = pacificDateStr.split(', ');
    const [month, day] = dateStr.split('/');

    return {
      dayOfWeek: weekday,
      monthDay: `${parseInt(month)}/${parseInt(day)}`
    };
  };

  const dates = Array.from({ length: 7 }, (_, i) => getPacificDate(i));

  const getScoreColor = (soaring: string, thermal: string) => {
    if (soaring === 'good' || thermal === 'good') return 'bg-green-100 border-green-400';
    if (soaring === 'marginal' || thermal === 'marginal') return 'bg-yellow-100 border-yellow-400';
    return 'bg-red-100 border-red-400';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-neutral-900">
            <th className="text-left p-4 font-mono text-xs uppercase tracking-wider text-neutral-900 sticky left-0 bg-neutral-50 z-10">
              Site
            </th>
            {dates.map((date, i) => (
              <th key={i} className="p-4 font-mono text-xs uppercase tracking-wider text-neutral-900 min-w-[120px]">
                <div className="text-center">
                  <div className="font-bold">{date.dayOfWeek}</div>
                  <div className="text-[10px] text-neutral-500 mt-1">{date.monthDay}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forecasts.map((siteForecast) => (
            <tr key={siteForecast.site.id} className="border-b border-neutral-200 hover:bg-neutral-50">
              <td className="p-4 sticky left-0 bg-white z-10 border-r border-neutral-200">
                <div>
                  <div className="font-mono text-sm font-bold text-neutral-900">
                    {siteForecast.site.name}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-500 mt-1">
                    {siteForecast.site.elevation}' · {siteForecast.site.orientation}
                  </div>
                </div>
              </td>
              {dates.map((date, dayIndex) => {
                const forecast = siteForecast.forecast[dayIndex];
                if (!forecast) {
                  return (
                    <td key={dayIndex} className="p-4">
                      <div className="text-center font-mono text-[10px] text-neutral-400">
                        N/A
                      </div>
                    </td>
                  );
                }

                const getFlyabilityLabel = (flyability: string) => {
                  if (flyability === 'good') return 'Good';
                  if (flyability === 'marginal') return 'Moderate';
                  return 'Stable';
                };

                return (
                  <td key={dayIndex} className="p-4">
                    <div className={`border-l-2 pl-3 ${getScoreColor(forecast.soaringFlyability, forecast.thermalFlyability)}`}>
                      <div className="font-mono text-xs">
                        <div className="flex gap-2 mb-1">
                          <span className="text-neutral-500">S:</span>
                          <span className={forecast.soaringFlyability === 'good' ? 'text-green-700 font-bold' : 'text-neutral-600'}>
                            {getFlyabilityLabel(forecast.soaringFlyability)}
                          </span>
                        </div>
                        <div className="flex gap-2 mb-1">
                          <span className="text-neutral-500">T:</span>
                          <span className={forecast.thermalFlyability === 'good' ? 'text-green-700 font-bold' : 'text-neutral-600'}>
                            {getFlyabilityLabel(forecast.thermalFlyability)}
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-600 mt-2">
                          {forecast.windSpeed}-{forecast.windGust} mph
                        </div>
                        <div className="text-[10px] text-neutral-500">
                          {forecast.launchTime}
                        </div>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyView;
