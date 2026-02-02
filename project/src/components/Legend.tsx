import React from 'react';

const Legend: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 p-4">
      <div className="flex flex-wrap items-center gap-8">
        {/* Status indicators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">Marginal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-600">Poor</span>
          </div>
        </div>

        <div className="h-4 w-px bg-neutral-200" />

        {/* Type indicators */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            Soar = Ridge/Wind
          </span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
            Therm = Thermal
          </span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
