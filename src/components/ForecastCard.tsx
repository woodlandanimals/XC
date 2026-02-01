import { useState } from 'react';
import type { SiteForecast, WeatherCondition } from '../types/weather';
import { getWindDirection } from '../services/weather';

interface Props {
    siteForecast: SiteForecast;
}

export const ForecastCard = ({ siteForecast }: Props) => {
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const { site, forecast } = siteForecast;
    const currentForecast = forecast[selectedDayIndex];

    if (!currentForecast) return null;

    const getStatusColor = (status: 'good' | 'marginal' | 'poor') => {
        switch (status) {
            case 'good': return 'status-good';
            case 'marginal': return 'status-marginal';
            case 'poor': return 'status-poor';
            default: return '';
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00'); // Ensure local date processing
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className={`forecast-card ${getStatusColor(currentForecast.flyability)}`}>
            <div className="card-header">
                <div>
                    <h2>{site.name}</h2>
                    <span className="elevation">{site.elevation}ft · {site.orientation}</span>
                </div>
                <div className="flyability-badge">
                    {currentForecast.flyability.toUpperCase()}
                </div>
            </div>

            <div className="day-selector">
                {forecast.map((f: WeatherCondition, idx: number) => (
                    <button
                        key={f.date}
                        className={`day-btn ${idx === selectedDayIndex ? 'active' : ''}`}
                        onClick={() => setSelectedDayIndex(idx)}
                    >
                        {formatDate(f.date)}
                    </button>
                ))}
            </div>

            <div className="card-body">
                <div className="primary-stats">
                    <div className="stat-row">
                        <span className="label">Best Time</span>
                        <span className="value highlight">{currentForecast.launchTime}</span>
                    </div>
                    <p className="conditions-text">"{currentForecast.conditions}"</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="label">Wind</span>
                        <span className="value">
                            {currentForecast.windSpeed}-{currentForecast.windGust} <small>mph</small>
                        </span>
                        <span className="sub-value">{getWindDirection(currentForecast.windDirection)} ({currentForecast.windDirection}°)</span>
                    </div>

                    <div className="stat-item">
                        <span className="label">Thermal</span>
                        <span className="value">{currentForecast.thermalStrength}<small>/10</small></span>
                        <span className="sub-value">Strength</span>
                    </div>

                    <div className="stat-item">
                        <span className="label">Ceiling</span>
                        <span className="value">{(currentForecast.topOfLift / 1000).toFixed(1)}k</span>
                        <span className="sub-value">Top of Lift</span>
                    </div>

                    <div className="stat-item">
                        <span className="label">Temp</span>
                        <span className="value">{currentForecast.temperature}°</span>
                        <span className="sub-value">T.Con: {currentForecast.tcon}°</span>
                    </div>
                </div>

                <div className="details-section">
                    {currentForecast.rainInfo && (
                        <div className="rain-alert">
                            ⚠️ {currentForecast.rainInfo}
                        </div>
                    )}
                    <div className="detail-row">
                        <span>Cloud Cover: {currentForecast.cloudCover}%</span>
                        <span>CAPE: {currentForecast.cape}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
