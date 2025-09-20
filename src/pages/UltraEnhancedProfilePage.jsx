import { useEffect, useState, useRef } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    User, Mail, Calendar, MapPin, Award, Trophy, Star, 
    Code, Clock, Target, TrendingUp, BarChart3, 
    Edit3, Save, X, Github, Linkedin, Twitter,
    CheckCircle, XCircle, Zap, BookOpen, Users,
    Crown, Medal, Flame, Sparkles, Rocket, Diamond
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Floating Particles Component
const FloatingParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const particleCount = 30;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            container.appendChild(particle);
            particles.push(particle);
        }

        // Animate particles
        particles.forEach((particle, index) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2 + 0.5,
            });

            gsap.to(particle, {
                x: `+=${Math.random() * 200 - 100}`,
                y: `+=${Math.random() * 200 - 100}`,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: index * 0.1,
            });

            gsap.to(particle, {
                rotation: 360,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                ease: "none",
                delay: index * 0.1,
            });
        });

        return () => {
            particles.forEach(particle => particle.remove());
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

// Enhanced Profile Header with Advanced Animations
const UltraProfileHeader = ({ user, stats, isOwnProfile }) => {
    const headerRef = useRef(null);
    const avatarRef = useRef(null);
    const nameRef = useRef(null);
    const statsRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        // Initial setup
        gsap.set([avatarRef.current, nameRef.current, statsRef.current], { opacity: 0 });
        
        // Avatar entrance with morphing effect
        tl.fromTo(avatarRef.current, 
            { scale: 0, rotation: -180, opacity: 0 },
            { 
                scale: 1, 
                rotation: 0, 
                opacity: 1, 
                duration: 1.5, 
                ease: "elastic.out(1, 0.3)",
                transformOrigin: "center center"
            }
        )
        // Name typing effect
        .to(nameRef.current, {
            text: user?.firstname + ' ' + (user?.lastname || ''),
            duration: 2,
            ease: "none",
            delay: 0.5
        })
        // Stats cascade animation
        .fromTo(statsRef.current.children,
            { y: 100, opacity: 0, scale: 0.8 },
            { 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                duration: 0.8, 
                stagger: 0.15, 
                ease: "back.out(1.7)" 
            },
            "-=1"
        );

        // Continuous floating animation for avatar
        gsap.to(avatarRef.current, {
            y: -10,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });

        // Glow effect for stats
        gsap.to(statsRef.current.children, {
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.2
        });

    }, [user]);

    return (
        <div ref={headerRef} className="relative overflow-hidden min-h-[80vh] flex items-center">
            <FloatingParticles />
            
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/20 to-pink-900/30" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Enhanced Avatar Section */}
                    <div className="flex-shrink-0">
                        <motion.div
                            ref={avatarRef}
                            className="relative group"
                            whileHover={{ scale: 1.1 }}
                        >
                            {/* Outer glow ring */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Main avatar */}
                            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-2">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-6xl font-bold text-white relative overflow-hidden">
                                    <span className="relative z-10">{user?.firstname?.charAt(0)?.toUpperCase() || 'U'}</span>
                                    {/* Animated background pattern */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-pulse" />
                                </div>
                            </div>

                            {/* Floating badges around avatar */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                                <Crown size={16} className="text-white" />
                            </div>
                            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                                <Flame size={16} className="text-white" />
                            </div>

                            {isOwnProfile && (
                                <motion.button
                                    whileHover={{ scale: 1.2, rotate: 45 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl"
                                >
                                    <Edit3 size={20} />
                                </motion.button>
                            )}
                        </motion.div>
                    </div>

                    {/* Enhanced Profile Info */}
                    <div className="flex-grow text-center lg:text-left">
                        <motion.h1 
                            ref={nameRef}
                            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4"
                            style={{ 
                                backgroundSize: '200% 200%',
                                animation: 'gradientShift 3s ease-in-out infinite'
                            }}
                        >
                            {/* Text will be filled by GSAP */}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-2xl text-slate-300 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, duration: 0.8 }}
                        >
                            @{user?.username || user?.firstname?.toLowerCase()}
                        </motion.p>
                        
                        <motion.p 
                            className="text-xl text-slate-400 mb-8 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 0.8 }}
                        >
                            {user?.bio || "🚀 Passionate developer on an epic journey to master coding challenges and build revolutionary solutions that change the world! 💻✨"}
                        </motion.p>

                        {/* Enhanced Social Links */}
                        <motion.div 
                            className="flex justify-center lg:justify-start gap-6 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3.5, duration: 0.8 }}
                        >
                            {[
                                { icon: Github, href: `https://github.com/${user?.github}`, color: 'hover:text-white hover:bg-slate-700' },
                                { icon: Linkedin, href: `https://linkedin.com/in/${user?.linkedin}`, color: 'hover:text-blue-400 hover:bg-blue-500/20' },
                                { icon: Twitter, href: `https://twitter.com/${user?.twitter}`, color: 'hover:text-cyan-400 hover:bg-cyan-500/20' }
                            ].map((social, index) => (
                                <motion.a
                                    key={social.icon.name}
                                    whileHover={{ scale: 1.2, y: -5, rotate: 360 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 backdrop-blur-sm border border-slate-700`}
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <social.icon size={24} />
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Enhanced Quick Stats */}
                        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Solved', value: stats?.solvedCount || 0, icon: CheckCircle, color: 'from-emerald-500 to-green-500' },
                                { label: 'Streak', value: stats?.currentStreak || 0, icon: Flame, color: 'from-orange-500 to-red-500' },
                                { label: 'Submissions', value: stats?.totalSubmissions || 0, icon: Rocket, color: 'from-cyan-500 to-blue-500' },
                                { label: 'Rank', value: `#${stats?.rank || 'N/A'}`, icon: Trophy, color: 'from-yellow-500 to-amber-500' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="relative p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                                                <stat.icon size={20} className="text-white" />
                                            </div>
                                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                                        </div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
};

// Enhanced Stats Card with Advanced Animations
const UltraStatsCard = ({ icon, title, value, subtitle, color = "cyan", delay = 0, index = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0, scale: 0.5, rotation: -10 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1,
                delay: delay,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Continuous hover animation
        gsap.to(cardRef.current, {
            y: -5,
            duration: 2 + index * 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
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
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
            }}
            className="group relative p-8 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {value}
                        </div>
                        <div className="text-lg text-slate-400 font-medium">{title}</div>
                        {subtitle && <div className="text-sm text-slate-500">{subtitle}</div>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Problem History with Morphing Animations
const UltraProblemHistory = ({ problems, isLoading }) => {
    const historyRef = useRef(null);

    useEffect(() => {
        if (problems?.length > 0) {
            gsap.fromTo(historyRef.current?.children,
                { x: -100, opacity: 0, scale: 0.8 },
                {
                    x: 0, opacity: 1, scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: historyRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, [problems]);

    if (isLoading) {
        return (
            <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-slate-800/50 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div ref={historyRef} className="space-y-4">
            {problems?.length > 0 ? (
                problems.map((problem, index) => (
                    <motion.div
                        key={problem._id}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="group relative flex items-center gap-6 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            problem.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        } group-hover:scale-110 transition-transform duration-300`}>
                            {problem.status === 'Accepted' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                        </div>
                        
                        <div className="flex-grow">
                            <NavLink 
                                to={`/problem/${problem.problemId}`}
                                className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
                            >
                                {problem.problemTitle}
                            </NavLink>
                            <div className="text-sm text-slate-400 mt-1">
                                {new Date(problem.timestamp).toLocaleDateString()}
                            </div>
                        </div>
                        
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            problem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                            problem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                        } group-hover:scale-105 transition-transform duration-300`}>
                            {problem.difficulty}
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Code size={80} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-2xl font-bold text-white mb-4">No Problems Solved Yet</h3>
                        <p className="text-slate-400">Start your coding journey today!</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

// Enhanced Skills Section with Morphing Effects
const UltraSkillsSection = ({ skills }) => {
    const skillsRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(skillsRef.current?.children,
            { scale: 0, opacity: 0, rotation: -180 },
            {
                scale: 1, opacity: 1, rotation: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [skills]);

    return (
        <div ref={skillsRef} className="flex flex-wrap gap-4">
            {skills?.map((skill, index) => (
                <motion.span
                    key={skill}
                    whileHover={{ 
                        scale: 1.2, 
                        y: -5, 
                        rotate: 5,
                        boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-lg font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-pointer"
                >
                    {skill}
                </motion.span>
            ))}
        </div>
    );
};

// Main Ultra Enhanced Profile Page Component
function UltraEnhancedProfilePage() {
    const { user: currentUser } = useSelector(state => state.auth);
    const { userId } = useParams();
    const navigate = useNavigate();
    
    const [profileUser, setProfileUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [recentProblems, setRecentProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const isOwnProfile = !userId || userId === currentUser?.id;

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const targetUserId = userId || currentUser?.id;
                
                if (!targetUserId) {
                    navigate('/login');
                    return;
                }

                // Fetch user profile
                const userRes = await axiosClient.get(`/user/${targetUserId}`);
                setProfileUser(userRes.data);

                // Fetch dashboard stats
                const statsRes = await axiosClient.get(`/user/${targetUserId}/dashboard-pro`);
                setStats(statsRes.data);

                // Fetch recent problems
                const problemsRes = await axiosClient.get(`/user/${targetUserId}/recent-problems`);
                setRecentProblems(problemsRes.data || []);

            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userId, currentUser?.id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-2xl text-slate-400 font-medium">Loading your epic profile...</p>
                </motion.div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Profile Not Found</h1>
                    <p className="text-xl text-slate-400 mb-8">The user you're looking for doesn't exist in our universe.</p>
                    <NavLink to="/" className="btn btn-primary text-lg px-8 py-4">Return to Home</NavLink>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BarChart3 size={24} /> },
        { id: 'problems', label: 'Problems', icon: <Code size={24} /> },
        { id: 'achievements', label: 'Achievements', icon: <Trophy size={24} /> },
        { id: 'activity', label: 'Activity', icon: <Clock size={24} /> }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header />
            
            <main>
                <UltraProfileHeader 
                    user={profileUser} 
                    stats={stats} 
                    isOwnProfile={isOwnProfile}
                />

                <div className="container mx-auto px-4 py-12">
                    {/* Enhanced Tab Navigation */}
                    <motion.div 
                        className="flex flex-wrap gap-4 mb-12 border-b border-slate-800"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {tabs.map(tab => (
                            <motion.button
                                key={tab.id}
                                whileHover={{ y: -3, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-t-2xl font-bold text-lg transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-slate-800 text-cyan-400 border-b-4 border-cyan-400 shadow-lg'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Enhanced Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        >
                            {activeTab === 'overview' && (
                                <div className="space-y-12">
                                    {/* Enhanced Stats Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        <UltraStatsCard
                                            icon={<Code size={32} className="text-white" />}
                                            title="Problems Solved"
                                            value={stats?.solvedCount || 0}
                                            subtitle="Total solved"
                                            color="cyan"
                                            delay={0}
                                            index={0}
                                        />
                                        <UltraStatsCard
                                            icon={<Flame size={32} className="text-white" />}
                                            title="Current Streak"
                                            value={stats?.currentStreak || 0}
                                            subtitle="Days in a row"
                                            color="purple"
                                            delay={0.2}
                                            index={1}
                                        />
                                        <UltraStatsCard
                                            icon={<Target size={32} className="text-white" />}
                                            title="Accuracy"
                                            value={`${Math.round((stats?.solvedCount || 0) / Math.max(stats?.totalSubmissions || 1, 1) * 100)}%`}
                                            subtitle="Success rate"
                                            color="emerald"
                                            delay={0.4}
                                            index={2}
                                        />
                                        <UltraStatsCard
                                            icon={<Crown size={32} className="text-white" />}
                                            title="Global Rank"
                                            value={`#${stats?.rank || 'N/A'}`}
                                            subtitle="World ranking"
                                            color="amber"
                                            delay={0.6}
                                            index={3}
                                        />
                                    </div>

                                    {/* Enhanced Skills Section */}
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                            <BookOpen size={32} className="text-cyan-400" />
                                            Mastered Skills
                                        </h3>
                                        <UltraSkillsSection skills={stats?.solvedTags || []} />
                                    </div>

                                    {/* Enhanced Performance Chart */}
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                            <TrendingUp size={32} className="text-cyan-400" />
                                            Performance Analytics
                                        </h3>
                                        <div className="h-80 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                                                className="text-center"
                                            >
                                                <BarChart3 size={80} className="mx-auto mb-4 text-cyan-400" />
                                                <p className="text-2xl text-slate-400">Advanced analytics coming soon...</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'problems' && (
                                <div className="space-y-8">
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                            <Code size={32} className="text-cyan-400" />
                                            Problem Solving History
                                        </h3>
                                        <UltraProblemHistory problems={recentProblems} isLoading={loading} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'achievements' && (
                                <div className="space-y-8">
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                            <Trophy size={32} className="text-cyan-400" />
                                            Achievements & Badges
                                        </h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {/* Achievement cards would go here */}
                                            <motion.div 
                                                className="text-center py-16"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                            >
                                                <Trophy size={80} className="mx-auto mb-6 text-amber-400" />
                                                <h4 className="text-2xl font-bold text-white mb-4">Achievement System</h4>
                                                <p className="text-slate-400">Epic achievements coming soon...</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="space-y-8">
                                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                                            <Clock size={32} className="text-cyan-400" />
                                            Activity Timeline
                                        </h3>
                                        <motion.div 
                                            className="text-center py-16"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                        >
                                            <Users size={80} className="mx-auto mb-6 text-cyan-400" />
                                            <h4 className="text-2xl font-bold text-white mb-4">Activity Feed</h4>
                                            <p className="text-slate-400">Real-time activity tracking coming soon...</p>
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

export default UltraEnhancedProfilePage;

