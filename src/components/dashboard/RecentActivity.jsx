import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, XCircle, History } from 'lucide-react';

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

function RecentActivity({ activities }) {
    return (
        <motion.div
            variants={cardVariants}
            className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl"
            whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <History className="text-cyan-400" size={20} />
                <h3 className="font-bold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <motion.div
                            key={activity._id}
                            className="flex items-start space-x-4"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
                        >
                            <div className={`mt-1 h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center ${activity.status === 'Accepted' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                               {activity.status === 'Accepted' 
                                   ? <CheckCircle2 size={18} /> 
                                   : <XCircle size={18} />
                               }
                            </div>
                            <div>
                                <p className="text-sm text-slate-300">
                                    You submitted a 
                                    <span className={`font-semibold mx-1 ${activity.status === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>
                                        {activity.status}
                                    </span>
                                    solution to 
                                    <NavLink to={`/problems/${activity.problemId}`} className="font-bold text-cyan-400 hover:underline ml-1">
                                        {activity.problemTitle}
                                    </NavLink>.
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    <TimeAgo date={activity.timestamp} />
                                </p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-500">No recent activity to show.</p>
                        <p className="text-sm text-slate-600">Submit a problem to get started!</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default RecentActivity;