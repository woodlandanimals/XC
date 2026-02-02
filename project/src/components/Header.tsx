import React from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  lastUpdated: Date;
  onRefresh: () => void;
  isLoading: boolean;
  view: 'today' | 'weekly';
  onViewChange: (view: 'today' | 'weekly') => void;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, isLoading, view, onViewChange }) => {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - TE inspired minimal type */}
          <div className="flex items-baseline gap-3">
            <h1 className="font-mono text-xl font-bold tracking-tight text-neutral-900">
              XC–FORECAST
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              California
            </span>
          </div>

          {/* Center - View Toggle */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="inline-flex border border-neutral-300 bg-white">
              <button
                onClick={() => onViewChange('today')}
                className={`px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  view === 'today'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => onViewChange('weekly')}
                className={`px-6 py-2 font-mono text-xs uppercase tracking-wider transition-all border-l border-neutral-300 ${
                  view === 'weekly'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Right side - data readout style */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                Last Update
              </div>
              <div className="font-mono text-sm font-medium text-neutral-900 tabular-nums">
                {lastUpdated.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}
              </div>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="w-10 h-10 flex items-center justify-center border border-neutral-300
                       hover:border-neutral-900 hover:bg-neutral-900 hover:text-white
                       disabled:opacity-50 transition-all duration-150"
              aria-label="Refresh forecasts"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
