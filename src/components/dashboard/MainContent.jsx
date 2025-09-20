import { motion } from 'framer-motion';
import CodingActivity from './CodingActivity';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import PerformanceChart from './PerformanceChart';

const mainContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.2 } }
};

function MainContent({ stats }) {
    return (
        <motion.main variants={mainContentVariants} className="w-full space-y-6">
            <StatsCards stats={stats} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <CodingActivity 
                        submissionActivity={stats.submissionActivity} 
                        totalSubmissions={stats.totalSubmissions} 
                    />
                </div>
                <div className="xl:col-span-1">
                    <PerformanceChart data={stats.performanceData} />
                </div>
            </div>
            <RecentActivity activities={stats.recentActivity} />
        </motion.main>
    );
}

export default MainContent;