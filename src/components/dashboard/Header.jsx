import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Settings, UserCircle, Code, Trophy, Users, MessageSquare, Bell, Shield } from 'lucide-react';
import { logoutUser } from '../../authSlice';
import ProblemPicker from '../ProblemPicker';
import { NotificationBell } from '../NotificationSystem';
import { useState } from 'react';

function Header({ user, problem }) {
    // If user is passed as prop, use it; otherwise get from Redux store
    const reduxUser = useSelector(state => state.auth.user);
    const currentUser = user || reduxUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProblemPicker, setShowProblemPicker] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (problem) {
            // If we're on a problem page, show problem picker
            setShowProblemPicker(true);
        } else {
            // Otherwise navigate to problems page
            navigate('/problems');
        }
    };

    const handleSelectProblem = (selectedProblem) => {
        navigate(`/problem/${selectedProblem._id}`);
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-slate-800">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogoClick}
                            className="flex items-center gap-3 min-w-0 group"
                        >
                            {/* Enhanced Logo Icon */}
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/20 group-hover:shadow-cyan-500/40 transition-all duration-300"
                            >
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="w-8 h-8 md:w-9 md:h-9"
                                >
                                    <img 
                                        src="/src/pages/2896418.png" 
                                        alt="CoderWorld Logo" 
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            </motion.div>
                            
                            {/* Logo Text */}
                            <div className="flex flex-col">
                                <span className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 truncate" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    CoderWorld
                                </span>
                                <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors duration-300 hidden md:block" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                    Code • Learn • Solve
                                </span>
                            </div>
                        </motion.button>
                        
                        {/* Problem Title Display */}
                        {problem && (
                            <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <Code size={16} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white truncate max-w-xs">
                                        {problem.title}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                            problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                                        </span>
                                        {problem.tags && (
                                            <span className="text-xs text-slate-400 truncate max-w-32">
                                                {Array.isArray(problem.tags) ? problem.tags[0] : problem.tags}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                                <nav className="hidden lg:flex items-center space-x-6">
                                    <NavLink to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                        <LayoutDashboard size={18} />
                                        Dashboard
                        </NavLink>
                            <NavLink to="/problems" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <Code size={18} />
                                Problems
                            </NavLink>
                            <NavLink to="/contests" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <Trophy size={18} />
                                Contests
                            </NavLink>
                            <NavLink to="/discuss" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <MessageSquare size={18} />
                                Discuss
                            </NavLink>
                            <NavLink to="/leaderboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <Users size={18} />
                                Leaderboard
                            </NavLink>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Notification Bell */}
                        <NotificationBell user={currentUser} />
                        
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm text-slate-400 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                                    <div tabIndex={0} className="dropdown-content mt-2 z-[60] w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl">
                                        <div className="p-2 space-y-1">
                                            <NavLink to="/dashboard" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                                <LayoutDashboard size={18} />
                                                Dashboard
                                            </NavLink>
                                            <NavLink to="/problems" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                                <Code size={18} />
                                                Problems
                                            </NavLink>
                                            <NavLink to="/contests" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                                <Trophy size={18} />
                                                Contests
                                            </NavLink>
                                            <NavLink to="/discuss" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                                <MessageSquare size={18} />
                                                Discuss
                                            </NavLink>
                                            <NavLink to="/leaderboard" className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                                <Users size={18} />
                                                Leaderboard
                                            </NavLink>
                                        </div>
                                    </div>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center space-x-2 cursor-pointer hover:bg-slate-800/50 rounded-lg p-2 transition-colors">
                                <div className="avatar">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 ring-cyan-500">
                                       <span className="text-sm md:text-lg font-bold flex items-center justify-center h-full">{currentUser?.firstname?.charAt(0).toUpperCase() || '?'}</span>
                                    </div>
                                </div>
                            </div>
                            <div tabIndex={0} className="dropdown-content mt-4 z-[60] w-64 overflow-hidden rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 shadow-2xl">
                                <div className="p-4 bg-slate-800/50">
                                    <p className="font-bold text-white text-lg truncate">{currentUser?.firstname || 'Valued User'}</p>
                                    <p className="text-sm text-slate-400 truncate">{currentUser?.emailId || 'Welcome!'}</p>
                                </div>
                                <div className="h-px bg-slate-700" />
                                <div className="p-2 space-y-1">
                                     {currentUser?.role === 'admin' && (
                                                      <NavLink to="/admin" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
                                            <Shield size={18} />
                                                        <span>Admin Panel</span>
                                                      </NavLink>
                                                    )}
                                    <NavLink 
                                        to="/dashboard" 
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </NavLink>
                                    <NavLink 
                                        to="/profile" 
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        <UserCircle size={18} />
                                        <span>My Profile</span>
                                    </NavLink>
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                        <Settings size={18} />
                                        <span>Settings</span>
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                        <Bell size={18} />
                                        <span>Notifications</span>
                                    </button>
                                    <div className="h-px bg-slate-700/50 my-1" />
                                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Problem Picker Modal */}
            <ProblemPicker
                isOpen={showProblemPicker}
                onClose={() => setShowProblemPicker(false)}
                onSelectProblem={handleSelectProblem}
                currentProblemId={problem?._id}
            />
        </header>
    );
}

export default Header;