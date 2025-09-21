import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, XCircle, History, Clock, Tag, Trophy, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import ProblemStats from './ProblemStats';

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

// A helper function to format time in a "time ago" format
const TimeAgo = ({ date }) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
};

function RecentActivity({ activities, solvedStats = {} }) {
    const [selectedProblem, setSelectedProblem] = useState(null);

    return (
        <motion.div
            variants={cardVariants}
            className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl"                                                             
            whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}  
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <History className="text-cyan-400" size={20} />
                    <h3 className="font-black text-white text-lg">🕒 Recent Activity</h3>       
                </div>
                <div className="text-xs text-gray-400">
                    {activities?.length || 0} activities
                </div>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">      
                {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <motion.div
                            key={activity._id}
                            className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}                                                                
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`mt-1 h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center ${activity.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>                    
                                   {activity.status === 'accepted'
                                       ? <CheckCircle2 size={20} />
                                       : <XCircle size={20} />
                                   }
                                </div>
                                
                                <div className="flex-1">
                                    {/* Problem Title and Description */}
                                    <div className="mb-2">
                                        <div className="flex items-center gap-3">
                                            <NavLink 
                                                to={`/problem/${activity.problemId}`} 
                                                className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline text-lg"
                                            >                   
                                                {activity.problemTitle}
                                            </NavLink>
                                            {activity.status === 'accepted' && (
                                                <motion.button
                                                    onClick={() => setSelectedProblem(activity.problemId)}
                                                    className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <BarChart3 size={12} />
                                                    Stats
                                                </motion.button>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-300 mt-1">
                                            {activity.status === 'accepted' ? 'Successfully solved' : 'Attempted to solve'} this problem
                                        </div>
                                    </div>

                                    {/* Timing and Status */}
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock size={14} />
                                            <TimeAgo date={activity.timestamp} />
                                        </div>
                                        
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            activity.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                                            activity.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                        }`}>
                                            {activity.difficulty?.charAt(0).toUpperCase() + activity.difficulty?.slice(1)}
                                        </div>

                                        {activity.language && (
                                            <div className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                                                {activity.language}
                                            </div>
                                        )}
                                    </div>

                                    {/* Solved Skills Progress */}
                                    {activity.status === 'accepted' && (
                                        <div className="bg-gray-700/30 rounded-lg p-3 mt-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Trophy size={16} className="text-yellow-400" />
                                                <span className="text-sm font-medium text-yellow-400">Skill Progress</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400">Easy:</span>
                                                    <span className="text-green-400 font-semibold">
                                                        {solvedStats.easy || 0} solved
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400">Medium:</span>
                                                    <span className="text-yellow-400 font-semibold">
                                                        {solvedStats.medium || 0} solved
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400">Hard:</span>
                                                    <span className="text-red-400 font-semibold">
                                                        {solvedStats.hard || 0} solved
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-400">Total:</span>
                                                    <span className="text-cyan-400 font-semibold">
                                                        {(solvedStats.easy || 0) + (solvedStats.medium || 0) + (solvedStats.hard || 0)} solved
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/30 rounded-full flex items-center justify-center">
                            <History className="text-gray-500" size={24} />
                        </div>
                        <p className="text-slate-500 text-lg mb-2">No recent activity</p>                                                                           
                        <p className="text-sm text-slate-600">Start solving problems to see your activity here!</p>                                                              
                    </div>
                )}
            </div>
            
            {/* Problem Stats Modal */}
            {selectedProblem && (
                <ProblemStats 
                    selectedProblem={selectedProblem}
                    onClose={() => setSelectedProblem(null)}
                    recentActivity={activities}
                />
            )}
        </motion.div>
    );
}

export default RecentActivity;