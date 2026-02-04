
import React, { useState, useEffect } from 'react';
import { getRacingAdvice } from '../services/geminiService';

interface AICoachProps {
  currentSpeed: number;
  topSpeed: number;
  carInfo: string;
}

export const AICoach: React.FC<AICoachProps> = ({ currentSpeed, topSpeed, carInfo }) => {
  const [advice, setAdvice] = useState<string>("Analyzing your telemetry...");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      setIsLoading(true);
      const text = await getRacingAdvice(currentSpeed, topSpeed, carInfo);
      setAdvice(text || "Eyes up, focus on the apex.");
      setIsLoading(false);
    };

    const interval = setInterval(fetchAdvice, 30000); // Update every 30s
    fetchAdvice();

    return () => clearInterval(interval);
  }, [topSpeed, carInfo]); // Trigger update when top speed changes

  return (
    <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Pit Crew AI</span>
      </div>
      <p className={`text-sm italic text-blue-100 leading-relaxed transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        "{advice}"
      </p>
    </div>
  );
};
