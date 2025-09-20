import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Award, BarChart, FileText, GitBranch, Star } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

const Card = ({ children, className }) => (
    <motion.div
        variants={cardVariants}
        className={`bg-slate-900/60 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl ${className}`}
        whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
    >
        {children}
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
        <aside className="w-full space-y-6 sticky top-24">
            <Card>
                <div className="flex flex-col items-center text-center">
                    <div className="avatar mb-4">
                        <div className="w-24 h-24 rounded-full ring-2 ring-offset-4 ring-offset-slate-900 ring-cyan-400 flex items-center justify-center bg-slate-700">
                           <span className="text-5xl font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{userName}</h2>
                    <p className="text-sm text-slate-400">Rank: N/A</p>
                    <NavLink to="/profile" className="btn btn-sm btn-outline btn-cyan w-full mt-5">
                      View Public Profile
                    </NavLink>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-white mb-3 text-center">Daily Streak</h3>
                <div className="text-center">
                    <p className="text-7xl font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">
                        {currentStreak}
                    </p>
                    <p className="text-sm text-slate-400">Consecutive Days</p>
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