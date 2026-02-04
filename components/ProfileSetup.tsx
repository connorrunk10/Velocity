
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileSetupProps {
  onSave: (profile: UserProfile) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !make) return;
    
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      name,
      carMake: make,
      carModel: model,
      avatar: `https://picsum.photos/seed/${name}/200`
    });
  };

  return (
    <div className="p-8 animate-in zoom-in duration-300">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black font-racing italic tracking-tighter mb-2 text-white">JOIN THE FLEET</h2>
        <p className="text-slate-400">Set up your profile to compete globally.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Driver Alias</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. SpeedKing99"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Car Make</label>
            <input 
              type="text" 
              required
              value={make}
              onChange={e => setMake(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Porsche"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Model</label>
            <input 
              type="text" 
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="911"
            />
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full bg-white text-slate-950 font-black py-4 rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/5 uppercase tracking-widest"
          >
            Start Racing
          </button>
        </div>
      </form>
    </div>
  );
};
