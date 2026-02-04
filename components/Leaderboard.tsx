
import React from 'react';
import { SpeedEntry, Unit } from '../types';

interface LeaderboardProps {
  type: 'global' | 'buddies';
  userTopSpeed: number;
  unit: Unit;
}

const MOCK_LEADERBOARD: SpeedEntry[] = [
  { userId: '1', userName: 'NitroX', carInfo: 'Nissan GT-R', topSpeed: 184, timestamp: Date.now() },
  { userId: '2', userName: 'SpeedDemon', carInfo: 'Porsche 911', topSpeed: 162, timestamp: Date.now() },
  { userId: '3', userName: 'Redline', carInfo: 'BMW M4', topSpeed: 155, timestamp: Date.now() },
  { userId: '4', userName: 'CircuitKing', carInfo: 'Audi RS6', topSpeed: 142, timestamp: Date.now() },
  { userId: '5', userName: 'TurboT', carInfo: 'Tesla Model S', topSpeed: 138, timestamp: Date.now() },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ type, userTopSpeed, unit }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold font-racing uppercase">{type === 'global' ? 'Global Open' : 'Buddy League'}</h2>
        <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest border border-blue-500/20">Active Now</span>
      </div>

      <div className="space-y-3">
        {MOCK_LEADERBOARD.map((entry, idx) => (
          <div 
            key={entry.userId}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-slate-900 border-slate-800'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
              {idx + 1}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{entry.userName}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{entry.carInfo}</p>
            </div>
            <div className="text-right">
              <p className="font-racing font-bold text-lg leading-tight">{entry.topSpeed}</p>
              <p className="text-[10px] text-slate-500">{unit}</p>
            </div>
          </div>
        ))}

        {/* Current User Entry placeholder */}
        <div className="mt-8 pt-4 border-t border-slate-800">
           <div className="flex items-center gap-4 p-4 rounded-2xl border bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-900/10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-blue-500 text-white italic">
              YOU
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Your Best Today</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Live Session</p>
            </div>
            <div className="text-right">
              <p className="font-racing font-bold text-lg leading-tight text-blue-400">{userTopSpeed}</p>
              <p className="text-[10px] text-slate-500">{unit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
