
import React, { useState, useEffect, useCallback } from 'react';
import { Speedometer } from './components/Speedometer';
import { Leaderboard } from './components/Leaderboard';
import { SafetyModal } from './components/SafetyModal';
import { ProfileSetup } from './components/ProfileSetup';
import { AdSpace } from './components/AdSpace';
import { AICoach } from './components/AICoach';
import { UserProfile, SpeedEntry, Unit } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('v_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isPassengerConfirmed, setIsPassengerConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState<'track' | 'leaderboard' | 'buddies' | 'profile'>('track');
  const [unit, setUnit] = useState<Unit>('MPH');
  const [dailyTopSpeed, setDailyTopSpeed] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  
  // Mock data for leaderboard
  const [leaderboardData, setLeaderboardData] = useState<SpeedEntry[]>([]);

  // Daily Reset Logic
  useEffect(() => {
    const lastReset = localStorage.getItem('v_last_reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      setDailyTopSpeed(0);
      localStorage.setItem('v_last_reset', today);
      localStorage.setItem('v_daily_top', '0');
    } else {
      const savedTop = localStorage.getItem('v_daily_top');
      if (savedTop) setDailyTopSpeed(parseFloat(savedTop));
    }
  }, []);

  // Update Daily Top Speed
  useEffect(() => {
    if (currentSpeed > dailyTopSpeed) {
      setDailyTopSpeed(currentSpeed);
      localStorage.setItem('v_daily_top', currentSpeed.toString());
    }
  }, [currentSpeed, dailyTopSpeed]);

  // Geolocation Tracking
  useEffect(() => {
    if (!isPassengerConfirmed) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (position.coords.speed !== null) {
          // speed is in m/s
          const rawSpeed = position.coords.speed;
          const convertedSpeed = unit === 'MPH' ? rawSpeed * 2.23694 : rawSpeed * 3.6;
          setCurrentSpeed(Math.max(0, Math.floor(convertedSpeed)));
        }
      },
      (error) => console.error("GPS Error:", error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isPassengerConfirmed, unit]);

  const handleProfileSave = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('v_profile', JSON.stringify(newProfile));
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-950 shadow-2xl overflow-hidden relative border-x border-slate-800">
      {/* Header */}
      <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-2xl font-black font-racing italic tracking-tighter text-blue-500 neon-glow">VELOCITY</h1>
        <button 
          onClick={() => setUnit(u => u === 'MPH' ? 'KMH' : 'MPH')}
          className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold border border-slate-700 hover:bg-slate-700 transition-colors"
        >
          {unit}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {!profile ? (
          <ProfileSetup onSave={handleProfileSave} />
        ) : !isPassengerConfirmed ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-900/20">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Ready to Track?</h2>
            <p className="text-slate-400 mb-8">Confirm you are a passenger or securely mounted to begin the daily speed challenge.</p>
            <button 
              onClick={() => setIsPassengerConfirmed(true)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-transform active:scale-95 shadow-lg shadow-blue-900/40"
            >
              I AM A PASSENGER
            </button>
            <p className="mt-4 text-xs text-slate-500 italic">Never use your phone while operating a vehicle.</p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {activeTab === 'track' && (
              <>
                <Speedometer currentSpeed={currentSpeed} unit={unit} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Daily Max</p>
                    <p className="text-3xl font-racing font-black text-white">{dailyTopSpeed} <span className="text-sm font-normal text-slate-400">{unit}</span></p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Global Avg</p>
                    <p className="text-3xl font-racing font-black text-white">74 <span className="text-sm font-normal text-slate-400">{unit}</span></p>
                  </div>
                </div>

                <AICoach currentSpeed={currentSpeed} topSpeed={dailyTopSpeed} carInfo={`${profile.carMake} ${profile.carModel}`} />
                
                <AdSpace />
              </>
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard type="global" userTopSpeed={dailyTopSpeed} unit={unit} />
            )}

            {activeTab === 'buddies' && (
              <Leaderboard type="buddies" userTopSpeed={dailyTopSpeed} unit={unit} />
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                 <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
                    <img src={profile.avatar} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500" alt="Avatar" />
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-slate-400">{profile.carMake} {profile.carModel}</p>
                 </div>
                 <button 
                  onClick={() => {
                    localStorage.removeItem('v_profile');
                    setProfile(null);
                  }}
                  className="w-full bg-red-900/20 text-red-500 py-3 rounded-xl border border-red-900/50"
                 >
                   Reset Profile
                 </button>
                 <AdSpace />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <NavButton active={activeTab === 'track'} icon="gauge" onClick={() => setActiveTab('track')} label="Live" />
        <NavButton active={activeTab === 'leaderboard'} icon="trophy" onClick={() => setActiveTab('leaderboard')} label="Global" />
        <NavButton active={activeTab === 'buddies'} icon="users" onClick={() => setActiveTab('buddies')} label="Buddies" />
        <NavButton active={activeTab === 'profile'} icon="user" onClick={() => setActiveTab('profile')} label="Me" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: string; onClick: () => void; label: string }> = ({ active, icon, onClick, label }) => {
  // Fix: Use React.ReactElement instead of JSX.Element to resolve namespace issue
  const icons: Record<string, React.ReactElement> = {
    gauge: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    trophy: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    users: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    user: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  };

  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-blue-500' : 'text-slate-500'}`}>
      <div className={`p-1 rounded-lg ${active ? 'bg-blue-500/10' : ''}`}>{icons[icon]}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
};

export default App;
