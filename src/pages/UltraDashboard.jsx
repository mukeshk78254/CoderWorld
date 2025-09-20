import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Trophy, Crown, Star, Flame, Zap, Target, 
    TrendingUp, BarChart3, Code, Clock, Award,
    Diamond, Sparkles, Rocket, Brain, Users,
    CheckCircle, XCircle, Calendar, BookOpen
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';
import AIChatAssistant from '../components/AIChatAssistant';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Floating Badge System
const FloatingBadge = ({ type, count, delay = 0 }) => {
    const badgeRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(badgeRef.current,
            { scale: 0, rotation: -180, opacity: 0 },
            {
                scale: 1, rotation: 0, opacity: 1,
                duration: 1.5,
                delay: delay,
                ease: "elastic.out(1, 0.3)"
            }
        );

        // Continuous floating animation
        gsap.to(badgeRef.current, {
            y: -10,
            duration: 2 + delay,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }, [delay]);

    const getBadgeConfig = (type) => {
        switch (type) {
            case 'streak':
                return {
                    icon: Flame,
                    color: 'from-orange-500 to-red-500',
                    text: 'Day Streak',
                    glowColor: 'shadow-orange-500/50'
                };
            case 'solved':
                return {
                    icon: CheckCircle,
                    color: 'from-emerald-500 to-green-500',
                    text: 'Problems Solved',
                    glowColor: 'shadow-emerald-500/50'
                };
            case 'submissions':
                return {
                    icon: Rocket,
                    color: 'from-cyan-500 to-blue-500',
                    text: 'Total Submissions',
                    glowColor: 'shadow-cyan-500/50'
                };
            case 'rank':
                return {
                    icon: Crown,
                    color: 'from-yellow-500 to-amber-500',
                    text: 'Global Rank',
                    glowColor: 'shadow-yellow-500/50'
                };
            default:
                return {
                    icon: Trophy,
                    color: 'from-purple-500 to-pink-500',
                    text: 'Achievement',
                    glowColor: 'shadow-purple-500/50'
                };
        }
    };

    const config = getBadgeConfig(type);

    return (
        <motion.div
            ref={badgeRef}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`relative p-6 bg-gradient-to-br ${config.color} rounded-3xl shadow-2xl ${config.glowColor} hover:shadow-3xl transition-all duration-500`}
        >
            <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <config.icon size={32} className="text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">{count}</div>
                <div className="text-sm text-white/80 font-medium">{config.text}</div>
            </div>
            
            {/* Floating particles around badge */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                            left: `${20 + i * 10}%`,
                            top: `${20 + i * 5}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: -1,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

// Enhanced Stats Card with Advanced Animations
const UltraStatsCard = ({ icon, title, value, subtitle, color = "cyan", delay = 0, index = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0, scale: 0.5, rotation: -20 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1.2,
                delay: delay,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Continuous floating animation
        gsap.to(cardRef.current, {
            y: -8,
            duration: 3 + index * 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
        });

        // Glow effect
        gsap.to(cardRef.current, {
            boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    }, [delay, index]);

    const colorClasses = {
        cyan: "from-cyan-500 to-blue-500",
        purple: "from-purple-500 to-pink-500",
        emerald: "from-emerald-500 to-green-500",
        amber: "from-amber-500 to-orange-500",
        red: "from-red-500 to-pink-500"
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}
            className="group relative p-8 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-700 overflow-hidden"
        >
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${colorClasses[color]} rounded-3xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-2xl`}>
                        {icon}
                    </div>
                    <div>
                        <div className="text-5xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                            {value}
                        </div>
                        <div className="text-xl text-slate-400 font-bold">{title}</div>
                        {subtitle && <div className="text-sm text-slate-500 font-medium">{subtitle}</div>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Progress Ring
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = "cyan" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const colorClasses = {
        cyan: "stroke-cyan-500",
        purple: "stroke-purple-500",
        emerald: "stroke-emerald-500",
        amber: "stroke-amber-500"
    };

    return (
        <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-slate-800"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{progress}%</span>
            </div>
        </div>
    );
};

// Enhanced Activity Feed
const UltraActivityFeed = ({ activities }) => {
    const feedRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(feedRef.current?.children,
            { x: -100, opacity: 0, scale: 0.8 },
            {
                x: 0, opacity: 1, scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: feedRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [activities]);

    return (
        <div ref={feedRef} className="space-y-6">
            {activities?.map((activity, index) => (
                <motion.div
                    key={activity.id}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group relative flex items-center gap-6 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        activity.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    } group-hover:scale-110 transition-transform duration-300`}>
                        {activity.status === 'Accepted' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    </div>
                    
                    <div className="flex-grow">
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {activity.title}
                        </h4>
                        <p className="text-slate-400 text-lg">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {activity.time}
                            </span>
                            <span className="flex items-center gap-1">
                                <Star size={16} />
                                {activity.points} points
                            </span>
                        </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                        activity.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                        activity.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                    } group-hover:scale-105 transition-transform duration-300`}>
                        {activity.difficulty}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Main Ultra Dashboard Component
function UltraDashboard() {
    const { user } = useSelector(state => state.auth);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [badges, setBadges] = useState([]);
    const [activities, setActivities] = useState([]);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const { data } = await axiosClient.get(`/user/${user.id}/dashboard-pro`);
                setStats(data);
                
                // Generate mock badges based on stats
                setBadges([
                    { type: 'streak', count: data.currentStreak || 0 },
                    { type: 'solved', count: data.solvedCount || 0 },
                    { type: 'submissions', count: data.totalSubmissions || 0 },
                    { type: 'rank', count: data.rank || 'N/A' }
                ]);

                // Generate mock activities
                setActivities([
                    {
                        id: 1,
                        title: "Two Sum Problem",
                        description: "Successfully solved the classic two sum problem",
                        status: "Accepted",
                        difficulty: "Easy",
                        time: "2 hours ago",
                        points: 10
                    },
                    {
                        id: 2,
                        title: "Binary Tree Traversal",
                        description: "Completed binary tree inorder traversal",
                        status: "Accepted",
                        difficulty: "Medium",
                        time: "1 day ago",
                        points: 20
                    },
                    {
                        id: 3,
                        title: "Dynamic Programming",
                        description: "Solved longest common subsequence problem",
                        status: "Accepted",
                        difficulty: "Hard",
                        time: "3 days ago",
                        points: 50
                    }
                ]);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <div className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
                    <p className="text-3xl text-slate-400 font-bold">Loading your epic dashboard...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Dashboard Error</h1>
                    <p className="text-xl text-slate-400 mb-8">Failed to load dashboard data. Please try again.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn btn-primary text-lg px-8 py-4"
                    >
                        Retry
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Please Log In</h1>
                    <p className="text-xl text-slate-400 mb-8">You need to be logged in to view your dashboard.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header />
            <AIChatAssistant />
            
            <main className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
                        Welcome Back, {user.firstname}!
                    </h1>
                    <p className="text-2xl text-slate-400 max-w-4xl mx-auto">
                        Ready to continue your coding journey? Let's see how you're doing! 🚀
                    </p>
                </motion.div>

                {/* Badges Section */}
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {badges.map((badge, index) => (
                        <FloatingBadge
                            key={badge.type}
                            type={badge.type}
                            count={badge.count}
                            delay={index * 0.2}
                        />
                    ))}
                </motion.div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <UltraStatsCard
                        icon={<Code size={40} className="text-white" />}
                        title="Problems Solved"
                        value={stats?.solvedCount || 0}
                        subtitle="Total solved"
                        color="cyan"
                        delay={0}
                        index={0}
                    />
                    <UltraStatsCard
                        icon={<Flame size={40} className="text-white" />}
                        title="Current Streak"
                        value={stats?.currentStreak || 0}
                        subtitle="Days in a row"
                        color="purple"
                        delay={0.2}
                        index={1}
                    />
                    <UltraStatsCard
                        icon={<Target size={40} className="text-white" />}
                        title="Accuracy Rate"
                        value={`${Math.round((stats?.solvedCount || 0) / Math.max(stats?.totalSubmissions || 1, 1) * 100)}%`}
                        subtitle="Success rate"
                        color="emerald"
                        delay={0.4}
                        index={2}
                    />
                    <UltraStatsCard
                        icon={<Crown size={40} className="text-white" />}
                        title="Global Rank"
                        value={`#${stats?.rank || 'N/A'}`}
                        subtitle="World ranking"
                        color="amber"
                        delay={0.6}
                        index={3}
                    />
                </div>

                {/* Progress and Activity Section */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Progress Section */}
                    <motion.div
                        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <TrendingUp size={32} className="text-cyan-400" />
                            Your Progress
                        </h3>
                        
                        <div className="space-y-8">
                            <div className="text-center">
                                <ProgressRing 
                                    progress={Math.round((stats?.solvedCount || 0) / Math.max(stats?.totalSubmissions || 1, 1) * 100)} 
                                    size={150}
                                    color="cyan"
                                />
                                <p className="text-xl text-slate-400 mt-4 font-bold">Overall Success Rate</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-slate-300">Easy Problems</span>
                                    <span className="text-2xl font-bold text-emerald-400">
                                        {stats?.solvedStats?.easy || 0} / {stats?.totalStats?.easy || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-4">
                                    <div 
                                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                                        style={{ width: `${((stats?.solvedStats?.easy || 0) / Math.max(stats?.totalStats?.easy || 1, 1)) * 100}%` }}
                                    />
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-slate-300">Medium Problems</span>
                                    <span className="text-2xl font-bold text-amber-400">
                                        {stats?.solvedStats?.medium || 0} / {stats?.totalStats?.medium || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-4">
                                    <div 
                                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                                        style={{ width: `${((stats?.solvedStats?.medium || 0) / Math.max(stats?.totalStats?.medium || 1, 1)) * 100}%` }}
                                    />
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-slate-300">Hard Problems</span>
                                    <span className="text-2xl font-bold text-red-400">
                                        {stats?.solvedStats?.hard || 0} / {stats?.totalStats?.hard || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-4">
                                    <div 
                                        className="bg-gradient-to-r from-red-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                                        style={{ width: `${((stats?.solvedStats?.hard || 0) / Math.max(stats?.totalStats?.hard || 1, 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Activity Feed */}
                    <motion.div
                        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                            <Clock size={32} className="text-cyan-400" />
                            Recent Activity
                        </h3>
                        <UltraActivityFeed activities={activities} />
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default UltraDashboard;




















