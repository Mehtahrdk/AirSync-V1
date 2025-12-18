import React from 'react';

const Navbar = ({ user, onOpenAuth, onLogout }) => {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold tracking-tighter text-white">
                    AIR<span className="text-sky-400">SYNC</span>
                </div>
            </div>

            {/* Auth Buttons */}
            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-slate-300 hidden md:block">Hello, <span className="text-white font-bold">{user}</span></span>
                        <button 
                            onClick={onLogout}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-lg transition-all text-sm font-bold backdrop-blur-md"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={onOpenAuth}
                        className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-2 rounded-lg transition-all font-bold shadow-lg shadow-sky-500/20"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;