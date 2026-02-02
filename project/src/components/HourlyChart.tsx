import React from 'react';
import { HourlyDataPoint } from '../types/weather';
import { getWindDirection } from '../services/weatherService';

interface HourlyChartProps {
  hourlyData: HourlyDataPoint[];
  siteElevation: number;
  maxWind: number;
}

const HourlyChart: React.FC<HourlyChartProps> = ({ hourlyData, siteElevation, maxWind }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  // Chart dimensions
  const width = 100; // percentage-based for responsiveness
  const tempChartHeight = 100;
  const windChartHeight = 60;
  const padding = { top: 15, right: 10, bottom: 25, left: 35 };

  // Calculate scales
  const temps = hourlyData.map(d => d.temperature);
  const tcons = hourlyData.map(d => d.tcon);
  const allTemps = [...temps, ...tcons];
  const minTemp = Math.min(...allTemps) - 5;
  const maxTemp = Math.max(...allTemps) + 5;
  const tempRange = maxTemp - minTemp;

  const maxWindSpeed = Math.max(...hourlyData.map(d => Math.max(d.windSpeed, d.windGust)), maxWind);

  // Helper functions
  const getX = (index: number) => {
    const usableWidth = 100 - padding.left - padding.right;
    return padding.left + (index / (hourlyData.length - 1)) * usableWidth;
  };

  const getTempY = (temp: number) => {
    return padding.top + ((maxTemp - temp) / tempRange) * tempChartHeight;
  };

  const getWindY = (speed: number) => {
    const windTop = padding.top + tempChartHeight + 30;
    return windTop + windChartHeight - (speed / maxWindSpeed) * windChartHeight;
  };

  const getWindColor = (speed: number) => {
    const ratio = speed / maxWind;
    if (ratio > 0.9) return '#ef4444'; // red
    if (ratio > 0.6) return '#f59e0b'; // amber
    return '#22c55e'; // green
  };

  const formatHour = (hour: number) => {
    if (hour === 12) return '12p';
    if (hour > 12) return `${hour - 12}p`;
    return `${hour}a`;
  };

  // Generate path for temperature line
  const tempPath = hourlyData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getTempY(d.temperature)}`)
    .join(' ');

  // Generate path for TCON line
  const tconPath = hourlyData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getTempY(d.tcon)}`)
    .join(' ');

  // Find thermal trigger point (where temp crosses tcon)
  const thermalTriggerIndex = hourlyData.findIndex((d, i) => {
    if (i === 0) return false;
    const prevD = hourlyData[i - 1];
    return prevD.temperature < prevD.tcon && d.temperature >= d.tcon;
  });

  const windTop = padding.top + tempChartHeight + 30;
  const totalHeight = windTop + windChartHeight + padding.bottom;
  const barWidth = (100 - padding.left - padding.right) / hourlyData.length * 0.7;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 100 ${totalHeight}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Temperature Section Background */}
        <rect
          x={padding.left}
          y={padding.top}
          width={100 - padding.left - padding.right}
          height={tempChartHeight}
          fill="#fafafa"
          stroke="#e5e5e5"
          strokeWidth="0.3"
        />

        {/* Cloud cover background */}
        {hourlyData.map((d, i) => (
          <rect
            key={`cloud-${i}`}
            x={getX(i) - barWidth / 2}
            y={padding.top}
            width={barWidth}
            height={tempChartHeight}
            fill={`rgba(150, 150, 150, ${d.cloudCover / 100 * 0.25})`}
          />
        ))}

        {/* Thermal active zone - green fill where temp >= tcon */}
        {hourlyData.map((d, i) => {
          if (d.temperature >= d.tcon && i > 0) {
            const prevD = hourlyData[i - 1];
            const x1 = getX(i - 1);
            const x2 = getX(i);
            const y1 = Math.min(getTempY(prevD.temperature), getTempY(prevD.tcon));
            const y2 = padding.top + tempChartHeight;
            return (
              <rect
                key={`thermal-${i}`}
                x={x1}
                y={y1}
                width={x2 - x1}
                height={y2 - y1}
                fill="rgba(34, 197, 94, 0.1)"
              />
            );
          }
          return null;
        })}

        {/* Temperature grid lines */}
        {[0, 0.5, 1].map((ratio, i) => {
          const temp = minTemp + ratio * tempRange;
          const y = getTempY(temp);
          return (
            <g key={`grid-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={100 - padding.right}
                y2={y}
                stroke="#e5e5e5"
                strokeWidth="0.2"
              />
              <text
                x={padding.left - 2}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-neutral-400"
                style={{ fontSize: '2.5px', fontFamily: 'monospace' }}
              >
                {Math.round(temp)}°
              </text>
            </g>
          );
        })}

        {/* TCON line (dashed green) */}
        <path
          d={tconPath}
          fill="none"
          stroke="#22c55e"
          strokeWidth="0.6"
          strokeDasharray="1.5,1"
        />

        {/* Temperature line (solid black) */}
        <path
          d={tempPath}
          fill="none"
          stroke="#171717"
          strokeWidth="0.8"
        />

        {/* Temperature data points */}
        {hourlyData.map((d, i) => (
          <circle
            key={`temp-point-${i}`}
            cx={getX(i)}
            cy={getTempY(d.temperature)}
            r="1"
            fill={d.temperature >= d.tcon ? '#22c55e' : '#171717'}
          />
        ))}

        {/* Thermal trigger indicator */}
        {thermalTriggerIndex > 0 && (
          <g>
            <line
              x1={getX(thermalTriggerIndex)}
              y1={padding.top}
              x2={getX(thermalTriggerIndex)}
              y2={padding.top + tempChartHeight}
              stroke="#22c55e"
              strokeWidth="0.4"
              strokeDasharray="1,1"
            />
            <text
              x={getX(thermalTriggerIndex)}
              y={padding.top - 2}
              textAnchor="middle"
              className="fill-green-600"
              style={{ fontSize: '2.2px', fontFamily: 'monospace' }}
            >
              Thermals
            </text>
          </g>
        )}

        {/* Section labels */}
        <text
          x={padding.left}
          y={padding.top - 4}
          className="fill-neutral-500"
          style={{ fontSize: '2.5px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          TEMP / TCON
        </text>

        {/* Legend */}
        <g transform={`translate(${100 - padding.right - 20}, ${padding.top - 5})`}>
          <line x1="0" y1="1" x2="4" y2="1" stroke="#171717" strokeWidth="0.6" />
          <text x="5" y="2" className="fill-neutral-600" style={{ fontSize: '2px', fontFamily: 'monospace' }}>Temp</text>
          <line x1="0" y1="4" x2="4" y2="4" stroke="#22c55e" strokeWidth="0.6" strokeDasharray="1,0.5" />
          <text x="5" y="5" className="fill-neutral-600" style={{ fontSize: '2px', fontFamily: 'monospace' }}>TCON</text>
        </g>

        {/* Wind Section */}
        <text
          x={padding.left}
          y={windTop - 4}
          className="fill-neutral-500"
          style={{ fontSize: '2.5px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          WIND
        </text>

        {/* Wind section background */}
        <rect
          x={padding.left}
          y={windTop}
          width={100 - padding.left - padding.right}
          height={windChartHeight}
          fill="#fafafa"
          stroke="#e5e5e5"
          strokeWidth="0.3"
        />

        {/* Max wind threshold line */}
        <line
          x1={padding.left}
          y1={getWindY(maxWind)}
          x2={100 - padding.right}
          y2={getWindY(maxWind)}
          stroke="#ef4444"
          strokeWidth="0.3"
          strokeDasharray="1,1"
        />
        <text
          x={100 - padding.right + 1}
          y={getWindY(maxWind)}
          dominantBaseline="middle"
          className="fill-red-500"
          style={{ fontSize: '2px', fontFamily: 'monospace' }}
        >
          Max
        </text>

        {/* Wind bars */}
        {hourlyData.map((d, i) => {
          const x = getX(i);
          const barHeight = (d.windSpeed / maxWindSpeed) * windChartHeight;
          const gustHeight = (d.windGust / maxWindSpeed) * windChartHeight;

          return (
            <g key={`wind-${i}`}>
              {/* Gust extension (lighter) */}
              {d.windGust > d.windSpeed && (
                <rect
                  x={x - barWidth / 2}
                  y={windTop + windChartHeight - gustHeight}
                  width={barWidth}
                  height={gustHeight - barHeight}
                  fill={getWindColor(d.windGust)}
                  opacity={0.3}
                />
              )}
              {/* Main wind bar */}
              <rect
                x={x - barWidth / 2}
                y={windTop + windChartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill={getWindColor(d.windSpeed)}
              />
              {/* Wind direction indicator */}
              <text
                x={x}
                y={windTop + windChartHeight + 5}
                textAnchor="middle"
                className="fill-neutral-500"
                style={{ fontSize: '2px', fontFamily: 'monospace' }}
              >
                {getWindDirection(d.windDirection)}
              </text>
            </g>
          );
        })}

        {/* Time labels */}
        {hourlyData.map((d, i) => {
          // Only show every other label if many hours
          if (hourlyData.length > 8 && i % 2 !== 0) return null;
          return (
            <text
              key={`time-${i}`}
              x={getX(i)}
              y={windTop + windChartHeight + 12}
              textAnchor="middle"
              className="fill-neutral-600"
              style={{ fontSize: '2.5px', fontFamily: 'monospace' }}
            >
              {formatHour(d.hour)}
            </text>
          );
        })}

        {/* Wind scale */}
        <text
          x={padding.left - 2}
          y={windTop}
          textAnchor="end"
          dominantBaseline="hanging"
          className="fill-neutral-400"
          style={{ fontSize: '2px', fontFamily: 'monospace' }}
        >
          {Math.round(maxWindSpeed)}
        </text>
        <text
          x={padding.left - 2}
          y={windTop + windChartHeight}
          textAnchor="end"
          dominantBaseline="baseline"
          className="fill-neutral-400"
          style={{ fontSize: '2px', fontFamily: 'monospace' }}
        >
          0
        </text>
      </svg>
    </div>
  );
};

export default HourlyChart;
