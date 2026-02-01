import { useEffect, useState } from 'react';
import { getWeatherForecast } from './services/weather';
import type { SiteForecast } from './types/weather';
import { ForecastCard } from './components/ForecastCard';
import './index.css';

function App() {
  const [forecasts, setForecasts] = useState<SiteForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherForecast();
        setForecasts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load forecast data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HighFly California</h1>
        <p className="subtitle">HRRR-based Paragliding Forecasts</p>
      </header>

      <main>
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Analyzing thermal models...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="forecast-grid">
            {forecasts.map((siteForecast) => (
              <ForecastCard key={siteForecast.site.name} siteForecast={siteForecast} />
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Forecasts based on HRRR models. Fly at your own risk. Always check local conditions.</p>
      </footer>
    </div>
  );
}

export default App;
