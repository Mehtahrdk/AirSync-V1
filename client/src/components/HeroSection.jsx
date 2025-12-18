import React, { useState } from 'react';
import FlightResult from './FlightResult';
import { API_BASE_URL } from '../config'; // Ensure this file exists in the same folder

const HeroSection = () => {
  // State for managing the API call
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [latency, setLatency] = useState(0);

  // The Search Function
  const handleSearch = async () => {
    setLoading(true);
    const start = performance.now(); // Start timer to measure speed

    try {
        // CALL THE BACKEND (Ensure port 3000 is running)
        // We use hardcoded indices (0-3) for this demo to hit the Segment Tree
        const response = await fetch(`${API_BASE_URL}/flights/cheapest?startIndex=0&endIndex=3`);
        const data = await response.json();
        
        const end = performance.now(); // Stop timer
        setLatency((end - start).toFixed(2));
        
        if(data.data) {
            setResult(data.data.minPrice);
        }
    } catch (error) {
        console.error("Connection Failed", error);
        alert("Backend not connected! Is your Node server running on port 3000?");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
      {/* --- BACKGROUND LAYER (The Big Animation) --- */}
      <div className="absolute inset-0 z-0">
        {/* The Image: High-res airplane wing/sky view */}
        <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Airplane Wing" 
            className="w-full h-full object-cover animate-ken-burns opacity-60"
        />
        {/* Overlay Gradient: Makes text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-5xl px-6">
        
        {/* Main Heading */}
        <div className="text-center mb-16">
            <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white drop-shadow-2xl mb-4">
              AIR<span className="text-sky-400">SYNC</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide">
              The next generation of flight engineering.
            </p>
        </div>

        {/* Glassmorphism Search Bar */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Input 1 */}
                <div className="relative group">
                    <label className="text-xs text-sky-300 uppercase font-bold tracking-wider ml-1">From</label>
                    <input type="text" placeholder="DEL (Delhi)" className="w-full bg-black/40 text-white text-lg p-4 rounded-xl outline-none focus:ring-2 ring-sky-400 transition-all border border-transparent group-hover:border-white/10"/>
                </div>

                {/* Input 2 */}
                <div className="relative group">
                    <label className="text-xs text-sky-300 uppercase font-bold tracking-wider ml-1">To</label>
                    <input type="text" placeholder="MUM (Mumbai)" className="w-full bg-black/40 text-white text-lg p-4 rounded-xl outline-none focus:ring-2 ring-sky-400 transition-all border border-transparent group-hover:border-white/10"/>
                </div>

                {/* Search Button (Updated with Click Handler) */}
                <div className="flex items-end">
                    <button 
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg p-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-sky-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Scanning..." : "Search Flights"}
                    </button>
                </div>
            </div>
        </div>

        {/* --- NEW: Result Display Area --- */}
        <div className="max-w-md mx-auto mt-8 relative z-20">
            <FlightResult price={result} latency={latency} />
        </div>

        {/* Tech Badges (Resume Flex) */}
        <div className="flex justify-center gap-6 mt-12 opacity-80">
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono">Segment Tree Active</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-xs font-mono">Redis Lock Ready</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;