
import React from 'react';
import { Unit } from '../types';

interface SpeedometerProps {
  currentSpeed: number;
  unit: Unit;
}

export const Speedometer: React.FC<SpeedometerProps> = ({ currentSpeed, unit }) => {
  const maxSafe = unit === 'MPH' ? 85 : 140;
  const progress = Math.min(100, (currentSpeed / 120) * 100);
  const isHigh = currentSpeed > maxSafe;

  return (
    <div className="relative flex flex-col items-center justify-center py-10">
      <div className="relative w-64 h-64 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900/30 overflow-hidden group shadow-inner">
        {/* Simple Progress Ring simulation via background */}
        <div 
            className="absolute inset-0 transition-all duration-300" 
            style={{ 
                background: `conic-gradient(from 180deg, ${isHigh ? '#ef4444' : '#3b82f6'} ${progress}%, transparent ${progress}%)`,
                opacity: 0.2
            }}
        />
        
        <div className="text-center z-10">
          <p className={`text-7xl font-racing font-black transition-colors ${isHigh ? 'text-red-500 animate-danger' : 'text-white'}`}>
            {currentSpeed}
          </p>
          <p className="text-slate-500 font-bold tracking-widest text-sm uppercase">{unit}</p>
        </div>

        {/* Decorative ticks */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-3 bg-slate-700" 
            style={{ transform: `rotate(${i * 30}deg) translateY(-118px)` }}
          />
        ))}
      </div>
      
      {isHigh && (
        <div className="mt-4 bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-xs font-bold border border-red-500/30">
          STAY ALERT! HIGH SPEED DETECTED
        </div>
      )}
    </div>
  );
};
