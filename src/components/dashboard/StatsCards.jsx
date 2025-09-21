import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Code, 
  Award, 
  Zap, 
  Flame, 
  Star
} from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const StatCard = ({ title, value, total, colorClass, children, gradient, description }) => (
    <motion.div 
        className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex-1 relative overflow-hidden"
        whileHover={{ y: -8, scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {/* Background gradient overlay */}
        {gradient && (
            <div className={`absolute inset-0 opacity-10 ${gradient} rounded-2xl`}></div>
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/3 to-transparent"></div>
        
        <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <p className={`font-bold text-sm uppercase tracking-wider ${colorClass} mb-2`}>{title}</p>
                    <p className="text-5xl font-black text-white mb-2">{value}</p>
                    {total && <p className="text-sm text-slate-400">/ {total}</p>}
                    {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
                </div>
                <div className="text-slate-400 p-3 rounded-xl bg-slate-700/30 backdrop-blur-sm">
                    {children}
                </div>
            </div>
        </div>
    </motion.div>
);

// Helper functions for enhanced analytics
const getStreakStatus = (currentStreak) => {
    if (currentStreak === 0) return { status: 'broken', color: 'text-red-400', bgColor: 'bg-red-500/10' };
    if (currentStreak >= 30) return { status: 'legendary', color: 'text-purple-400', bgColor: 'bg-purple-500/10' };
    if (currentStreak >= 14) return { status: 'epic', color: 'text-pink-400', bgColor: 'bg-pink-500/10' };
    if (currentStreak >= 7) return { status: 'fire', color: 'text-orange-400', bgColor: 'bg-orange-500/10' };
    if (currentStreak >= 3) return { status: 'good', color: 'text-green-400', bgColor: 'bg-green-500/10' };
    return { status: 'building', color: 'text-blue-400', bgColor: 'bg-blue-500/10' };
};

const getPerformanceGrade = (solvedCount, totalSubmissions) => {
    const successRate = totalSubmissions > 0 ? (solvedCount / totalSubmissions) * 100 : 0;
    if (successRate >= 80) return { grade: 'A+', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    if (successRate >= 70) return { grade: 'A', color: 'text-green-300', bgColor: 'bg-green-500/15' };
    if (successRate >= 60) return { grade: 'B+', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
    if (successRate >= 50) return { grade: 'B', color: 'text-yellow-300', bgColor: 'bg-yellow-500/15' };
    if (successRate >= 40) return { grade: 'C+', color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
    if (successRate >= 30) return { grade: 'C', color: 'text-orange-300', bgColor: 'bg-orange-500/15' };
    return { grade: 'D', color: 'text-red-400', bgColor: 'bg-red-500/20' };
};

function StatsCards({ stats }) {
    // Add default values to prevent errors
    const { 
        solvedStats = { easy: 0, medium: 0, hard: 0 }, 
        totalStats = { easy: 0, medium: 0, hard: 0 }, 
        solvedCount = 0,
        currentStreak = 0,
        totalSubmissions = 0,
        successfulSubmissions = 0,
        longestStreak = 0
    } = stats || {};

    const streakStatus = getStreakStatus(currentStreak);
    const performanceGrade = getPerformanceGrade(solvedCount, totalSubmissions);

    return (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
            }}
            initial="hidden"
            animate="visible"
        >
            {/* Problems Solved Card */}
            <StatCard
                title="Problems Solved"
                value={solvedCount}
                total={totalStats ? Object.values(totalStats).reduce((a, b) => a + b, 0) : 0}
                colorClass="text-cyan-400"
                gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
                description="Total problems completed"
            >
                <CheckCircle className="w-8 h-8 text-cyan-400" />
            </StatCard>

            {/* Current Streak Card */}
            <StatCard
                title="Current Streak"
                value={currentStreak}
                colorClass={streakStatus.color}
                gradient="bg-gradient-to-br from-orange-500/20 to-red-500/20"
                description={streakStatus.status === 'legendary' ? '🏆 Legendary!' : 
                           streakStatus.status === 'epic' ? '⚡ Epic streak!' : 
                           streakStatus.status === 'fire' ? '🔥 On fire!' : 
                           streakStatus.status === 'good' ? 'Keep it up!' : 
                           streakStatus.status === 'building' ? 'Building momentum' : 'Start coding!'}
            >
                {streakStatus.status === 'legendary' ? (
                    <Trophy className={`w-8 h-8 ${streakStatus.color}`} />
                ) : streakStatus.status === 'epic' ? (
                    <Star className={`w-8 h-8 ${streakStatus.color}`} />
                ) : streakStatus.status === 'fire' ? (
                    <Flame className={`w-8 h-8 ${streakStatus.color}`} />
                ) : (
                    <Zap className={`w-8 h-8 ${streakStatus.color}`} />
                )}
            </StatCard>

            {/* Total Submissions Card */}
            <StatCard
                title="Total Submissions"
                value={totalSubmissions}
                colorClass="text-blue-400"
                gradient="bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
                description={totalSubmissions > 0 ? 
                    `${Math.round((successfulSubmissions / totalSubmissions) * 100)}% success rate` 
                    : 'No submissions yet'}
            >
                <Code className="w-8 h-8 text-blue-400" />
            </StatCard>

            {/* Performance Grade Card */}
            <StatCard
                title="Performance Grade"
                value={performanceGrade.grade}
                colorClass={performanceGrade.color}
                gradient="bg-gradient-to-br from-green-500/20 to-yellow-500/20"
                description={totalSubmissions > 0 ? 
                    `${Math.round((successfulSubmissions / totalSubmissions) * 100)}% accuracy` 
                    : 'No data yet'}
            >
                <Award className={`w-8 h-8 ${performanceGrade.color}`} />
            </StatCard>
        </motion.div>
    );
}

export default StatsCards;