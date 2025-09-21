import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Award, BarChart, FileText, GitBranch, Star } from 'lucide-react';
import ProfileCircle from './ProfileCircle';

const cardVariants = {
    hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

const Card = ({ children, className }) => (
    <motion.div
        variants={cardVariants}
        className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-xl shadow-2xl relative overflow-hidden ${className}`}
        whileHover={{ y: -8, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-xl"></div>
        
        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
);

function ProfileSidebar({ user, stats }) {
    const userName = user?.firstname || 'User';
    const navigate = useNavigate();
    
    // Add default values to prevent errors
    const currentStreak = stats?.currentStreak || 0;
    const solvedTags = stats?.solvedTags || [];

    const handleTagClick = (tag) => {
        navigate('/', { state: { filterTag: tag } });
    };

    return (
        <aside className="w-full space-y-6 sticky top-24 h-fit">
            <Card>
                <div className="flex flex-col items-center text-center">
                    <ProfileCircle user={user} onImageUpdate={(file) => {
                        // Handle image update here
                        console.log('Image updated:', file);
                        // The ProfileCircle component now handles Redux state updates internally
                        // This callback is kept for any additional side effects if needed
                    }} />
                    <NavLink to="/profile" className="btn btn-sm btn-outline btn-cyan w-full mt-5">
                      View Public Profile
                    </NavLink>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-white mb-4 text-center text-lg">🔥 Daily Streak</h3>
                <div className="text-center relative">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15,
                            delay: 0.2 
                        }}
                        className="relative"
                    >
                        <motion.p 
                            className="text-8xl font-black text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)] relative z-10"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                textShadow: [
                                    "0 0 20px rgba(251,146,60,0.8)",
                                    "0 0 30px rgba(251,146,60,1)",
                                    "0 0 20px rgba(251,146,60,0.8)"
                                ]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
                        {currentStreak}
                        </motion.p>
                        
                        {/* Animated background glow */}
                        <motion.div
                            className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl"
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        />
                        
                        {/* Streak status indicator */}
                        <motion.div
                            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
                            <span className="text-white text-xs font-bold">🔥</span>
                        </motion.div>
                    </motion.div>
                    
                    <motion.p 
                        className="text-sm text-slate-400 mt-2 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Consecutive Days
                    </motion.p>
                    
                    {/* Streak motivation text */}
                    <motion.div
                        className="mt-3 text-xs text-orange-300 font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {currentStreak >= 30 ? "🏆 LEGENDARY!" :
                         currentStreak >= 14 ? "⚡ EPIC STREAK!" :
                         currentStreak >= 7 ? "🔥 ON FIRE!" :
                         currentStreak >= 3 ? "💪 Keep it up!" :
                         currentStreak > 0 ? "🚀 Building momentum!" : "🎯 Start your streak!"}
                    </motion.div>
                </div>
            </Card>
            
            {/* User Info Card */}
            <Card>
                <h3 className="font-bold text-white mb-4 text-center">👤 User Information</h3>
                <div className="space-y-3">
                    <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Email ID</div>
                        <div className="text-sm text-cyan-400 font-medium break-all">
                            {user?.emailId || user?.email || 'No email available'}
                        </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">User ID</div>
                        <div className="text-sm text-white font-mono">
                            #{user?.id || 'N/A'}
                        </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Role</div>
                        <div className="text-sm text-green-400 font-medium capitalize">
                            {user?.role || 'Member'}
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-white mb-4">Solved Skills</h3>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
                    {solvedTags.length > 0 ? (
                        solvedTags.map(tag => (
                            <motion.button
                                key={tag}
                                className="bg-slate-700/50 text-xs px-3 py-1.5 rounded-full capitalize"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </motion.button>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">Solve problems to see your skills!</p>
                    )}
                </div>
            </Card>
        </aside>
    );
}

export default ProfileSidebar;