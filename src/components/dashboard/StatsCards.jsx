import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const StatCard = ({ title, value, total, colorClass, children }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 backdrop-blur-sm flex-1">
        <div className="flex items-start justify-between">
            <div>
                <p className={`font-semibold ${colorClass}`}>{title}</p>
                <p className="text-4xl font-bold text-white mt-1">{value}</p>
                {total && <p className="text-xs text-gray-500">/ {total}</p>}
            </div>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

function StatsCards({ stats }) {
    // Add default values to prevent errors
    const { 
        solvedStats = { easy: 0, medium: 0, hard: 0 }, 
        totalStats = { easy: 0, medium: 0, hard: 0 }, 
        solvedCount = 0 
    } = stats || {};

    return (
        <motion.div 
            className="flex flex-col md:flex-row gap-6 mb-6"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={cardVariants} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 backdrop-blur-sm flex-1">
                <div className="flex items-center justify-between text-lg font-semibold text-white">
                    <span>Solved</span>
                    <span>{solvedCount} / {totalStats.easy + totalStats.medium + totalStats.hard}</span>
                </div>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-emerald-400">Easy</span>
                        <span className="font-mono">{solvedStats.easy}/{totalStats.easy}</span>
                    </div>
                    <progress className="progress progress-success" value={solvedStats.easy} max={totalStats.easy}></progress>
                    
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-amber-400">Medium</span>
                        <span className="font-mono">{solvedStats.medium}/{totalStats.medium}</span>
                    </div>
                    <progress className="progress progress-warning" value={solvedStats.medium} max={totalStats.medium}></progress>
                    
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-red-400">Hard</span>
                        <span className="font-mono">{solvedStats.hard}/{totalStats.hard}</span>
                    </div>
                    <progress className="progress progress-error" value={solvedStats.hard} max={totalStats.hard}></progress>
                </div>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 backdrop-blur-sm flex-1">
                <h3 className="font-semibold text-white">Badges</h3>
                <div className="mt-4 flex items-center justify-center">
                    <img src="https://assets.leetcode.com/static_assets/public/images/badges/50-days-badge-2022.png" alt="50 Days Badge" className="w-32 h-32" />
                </div>
                <p className="text-center text-sm mt-2">Most Recent Badge: <span className="font-semibold text-white">50 Days Badge 2025</span></p>
            </motion.div>
        </motion.div>
    );
}

export default StatsCards;