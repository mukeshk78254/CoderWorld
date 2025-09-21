import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, LogOut, Settings, UserCircle, Code, Trophy, Users, MessageSquare, Bell, Shield, RefreshCw, Activity, AlertTriangle, X } from 'lucide-react';
import { logoutUser } from '../../authSlice';
import ProblemPicker from '../ProblemPicker';
import NotificationBox from '../NotificationBox';
import AdminNotificationPanel from '../admin/AdminNotificationPanel';
import { useState, useEffect, useRef } from 'react';

function Header({ user, problem, refreshing, onRefresh }) {
    // If user is passed as prop, use it; otherwise get from Redux store
    const reduxUser = useSelector(state => state.auth.user);
    const currentUser = user || reduxUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProblemPicker, setShowProblemPicker] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
        setIsDropdownOpen(false); // Close dropdown when showing confirmation
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        handleLogout();
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
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

    const handleNavigation = (path) => {
        console.log('Navigating to:', path);
        console.log('Current user:', currentUser);
        console.log('User role:', currentUser?.role);
        navigate(path);
        setIsDropdownOpen(false);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('Click outside detected, dropdown open:', isDropdownOpen);
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log('Clicking outside dropdown, closing it');
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

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
                        {/* Refresh Button - Only show on dashboard */}
                        {onRefresh && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onRefresh}
                                disabled={refreshing}
                                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                                title="Refresh Dashboard Data"
                            >
                                <motion.div
                                    animate={refreshing ? { rotate: 360 } : {}}
                                    transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                                >
                                    <RefreshCw size={18} />
                                </motion.div>
                            </motion.button>
                        )}
                        
                        {/* Real-time Status Indicator */}
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400 font-medium">Live</span>
                        </div>
                        
                        {/* Notification System */}
                        <NotificationBox />
                        
                        {/* Admin Notification Panel (only for admins) */}
                        <AdminNotificationPanel />
                        
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
                        <div ref={dropdownRef} className="relative">
                            <div 
                                tabIndex={0} 
                                role="button" 
                                className="flex items-center space-x-2 cursor-pointer hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
                                onClick={() => {
                                    console.log('Profile clicked, current state:', isDropdownOpen);
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
                            >
                                <div className="avatar">
                                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 transition-all ${
                                        isDropdownOpen ? 'ring-cyan-400 bg-cyan-500/20' : 'ring-cyan-500'
                                    }`}>
                                       <span className="text-sm md:text-lg font-bold flex items-center justify-center h-full">{currentUser?.firstname?.charAt(0).toUpperCase() || '?'}</span>
                                    </div>
                                </div>
                                {/* Debug indicator */}
                                {isDropdownOpen && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                )}
                            </div>
                            {isDropdownOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div 
                                        className="fixed inset-0 z-[59] bg-black/20"
                                        onClick={() => {
                                            console.log('Backdrop clicked, closing dropdown');
                                            setIsDropdownOpen(false);
                                        }}
                                    />
                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-4 z-[60] w-64 overflow-hidden rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl">
                                <div className="p-4 bg-slate-800/50">
                                    <p className="font-bold text-white text-lg truncate">{currentUser?.firstname || 'Valued User'}</p>
                                    <p className="text-sm text-slate-400 truncate">{currentUser?.emailId || 'Welcome!'}</p>
                                </div>
                                <div className="h-px bg-slate-700" />
                                <div className="p-2 space-y-1">
                                     {currentUser?.role === 'admin' && (
                                        <button 
                                            onClick={() => {
                                                console.log('Admin button clicked');
                                                handleNavigation('/admin');
                                            }}
                                            className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200"
                                        >
                                            <Shield size={18} />
                                            <span>Admin Panel</span>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => {
                                            console.log('Dashboard button clicked');
                                            handleNavigation('/dashboard');
                                        }}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </button>
                                    <button 
                                        onClick={() => handleNavigation('/profile')}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        <UserCircle size={18} />
                                        <span>My Profile</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            console.log('Settings button clicked');
                                            handleNavigation('/settings');
                                        }}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                    >
                                        <Settings size={18} />
                                        <span>Settings</span>
                                    </button>
                                    {/* <button 
                                    
                                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                                        <Bell size={18} />
                                        <span>Notifications</span>
                                    </button> */}
                                    <div className="h-px bg-slate-700/50 my-1" />
                                    <button onClick={handleLogoutClick} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                                    </div>
                                </>
                            )}
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

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={cancelLogout}
                        />
                        
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full mx-4"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Confirm Sign Out</h3>
                                        <p className="text-sm text-slate-400">Are you sure you want to sign out?</p>
                                    </div>
                                </div>
                                <button
                                    onClick={cancelLogout}
                                    className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-slate-300 mb-6">
                                    You will be signed out of your account and redirected to the login page. 
                                    Any unsaved changes may be lost.
                                </p>
                                
                                {/* User Info */}
                                <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-white">
                                                {currentUser?.firstname?.charAt(0).toUpperCase() || '?'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{currentUser?.firstname || 'User'}</p>
                                            <p className="text-sm text-slate-400">{currentUser?.emailId || 'user@example.com'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={cancelLogout}
                                        className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmLogout}
                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all font-medium shadow-lg shadow-red-500/25"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;