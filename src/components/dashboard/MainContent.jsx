import { motion } from 'framer-motion';
import CodingActivity from './CodingActivity';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import PerformanceChart from './PerformanceChart';
import SolvedSkills from './SolvedSkills';
import Badges from './Badges';
import SkillGrowth from './SkillGrowth';

const mainContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.2 } }
};

function MainContent({ stats }) {
    // Add null check to prevent errors
    if (!stats) {
        return (
            <motion.main variants={mainContentVariants} className="w-full space-y-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-cyan-400"></div>
                        <p className="text-slate-400 mt-4">Loading dashboard data...</p>
                    </div>
                </div>
            </motion.main>
        );
    }

    return (
        <motion.main variants={mainContentVariants} className="w-full space-y-8">
            {/* Stats Cards Section */}
            <div className="mb-8">
                <StatsCards stats={stats} />
            </div>
            
            {/* Full-width sections with better spacing */}
            <div className="space-y-8">
                <CodingActivity 
                    submissionActivity={stats.submissionActivity || []} 
                    totalSubmissions={stats.totalSubmissions || 0}
                    streak={stats.longestStreak || 0}
                />
                
                <SkillGrowth 
                    solvedTags={stats.solvedTags || []} 
                    solvedStats={stats.solvedStats || {}}
                />
                
                <Badges stats={stats} />
                
                <SolvedSkills 
                    solvedTags={stats.solvedTags || []} 
                    solvedStats={stats.solvedStats || {}}
                />
            </div>
            
            {/* Bottom section - Performance and Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
                <PerformanceChart data={stats.performanceData || []} />
                <RecentActivity activities={stats.recentActivity || []} solvedStats={stats.solvedStats || {}} />
            </div>
        </motion.main>
    );
}

export default MainContent;