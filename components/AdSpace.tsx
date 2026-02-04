
import React from 'react';

export const AdSpace: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900/50 rounded-2xl border border-slate-800/50 p-4 text-center overflow-hidden">
      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-3">Sponsored Racing Partner</p>
      <div className="relative group cursor-pointer">
        <img 
          src={`https://picsum.photos/seed/adsense-${Math.random()}/600/250`} 
          className="w-full h-32 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
          alt="Ad"
        />
        <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors rounded-xl" />
        <div className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white">Visit Website</div>
      </div>
      <p className="mt-3 text-[10px] text-slate-500 italic">Fuel your drive with premium performance lubricants.</p>
    </div>
  );
};
