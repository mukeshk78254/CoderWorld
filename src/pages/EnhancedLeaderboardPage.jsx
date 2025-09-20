import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    Trophy, Crown, Medal, Star, Zap, Target, Flame, Rocket,
    Users, Award, TrendingUp, BarChart3, Calendar, Clock,
    ChevronRight, ChevronDown, ArrowLeft, Settings, Bell,
    CheckCircle, XCircle, AlertCircle, Sparkles, Diamond,
    Filter, Search, SortAsc, SortDesc, Eye, EyeOff
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Enhanced Trophy & Achievement-Themed Animated Background
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let trophyIcons = [];
        let medalParticles = [];
        let achievementRings = [];
        let starField = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createTrophyIcons = () => {
            trophyIcons = [];
            const trophyTypes = ['🏆', '🥇', '🥈', '🥉', '⭐', '💎', '👑', '🎖️'];
            
            for (let i = 0; i < 25; i++) {
                trophyIcons.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    icon: trophyTypes[Math.floor(Math.random() * trophyTypes.length)],
                    size: Math.random() * 30 + 20,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    opacity: Math.random() * 0.4 + 0.1,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.01,
                    color: `hsl(${Math.random() * 60 + 40}, 80%, 60%)`
                });
            }
        };

        const createMedalParticles = () => {
            medalParticles = [];
            for (let i = 0; i < 60; i++) {
                medalParticles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 4 + 2,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: `hsl(${Math.random() * 60 + 30}, 90%, 70%)`,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        };

        const createAchievementRings = () => {
            achievementRings = [];
            for (let i = 0; i < 12; i++) {
                achievementRings.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 150 + 50,
                    maxRadius: Math.random() * 200 + 100,
                    progress: 0,
                    speed: Math.random() * 0.02 + 0.01,
                    opacity: Math.random() * 0.2 + 0.05,
                    color: `hsl(${Math.random() * 60 + 50}, 70%, 50%)`
                });
            }
        };

        const createStarField = () => {
            starField = [];
            for (let i = 0; i < 100; i++) {
                starField.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * Math.PI * 2,
                    color: `hsl(${Math.random() * 60 + 200}, 100%, 80%)`
                });
            }
        };

        const drawTrophyIcon = (x, y, icon, size, color, opacity, rotation) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;
            ctx.font = `${size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.fillText(icon, 0, 0);
            ctx.restore();
        };

        const drawMedalParticle = (particle) => {
            ctx.save();
            ctx.globalAlpha = particle.opacity + Math.sin(particle.pulse) * 0.2;
            ctx.fillStyle = particle.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = particle.color;
            
            // Draw medal shape (circle with inner circle)
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = particle.opacity * 0.5;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const drawAchievementRing = (ring) => {
            ctx.save();
            ctx.globalAlpha = ring.opacity;
            ctx.strokeStyle = ring.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ring.color;
            
            const currentRadius = ring.radius + (ring.maxRadius - ring.radius) * ring.progress;
            
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, currentRadius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add achievement sparkles
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const sparkleX = ring.x + Math.cos(angle) * currentRadius;
                const sparkleY = ring.y + Math.sin(angle) * currentRadius;
                
                ctx.fillStyle = ring.color;
                ctx.beginPath();
                ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        };

        const drawStar = (star) => {
            ctx.save();
            ctx.globalAlpha = star.opacity + Math.sin(star.twinkle + time * 2) * 0.3;
            ctx.fillStyle = star.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            // Draw star field
            starField.forEach(star => {
                drawStar(star);
                star.twinkle += 0.02;
            });

            // Draw achievement rings
            achievementRings.forEach(ring => {
                drawAchievementRing(ring);
                ring.progress += ring.speed;
                if (ring.progress >= 1) {
                    ring.progress = 0;
                    ring.x = Math.random() * canvas.width;
                    ring.y = Math.random() * canvas.height;
                }
            });

            // Draw medal particles
            medalParticles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.pulse += 0.05;

                if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
                if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
                if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
                if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

                drawMedalParticle(particle);
            });

            // Draw trophy icons
            trophyIcons.forEach(trophy => {
                trophy.x += trophy.vx;
                trophy.y += trophy.vy;
                trophy.rotation += trophy.rotationSpeed;

                if (trophy.x < -trophy.size) trophy.x = canvas.width + trophy.size;
                if (trophy.x > canvas.width + trophy.size) trophy.x = -trophy.size;
                if (trophy.y < -trophy.size) trophy.y = canvas.height + trophy.size;
                if (trophy.y > canvas.height + trophy.size) trophy.y = -trophy.size;

                drawTrophyIcon(trophy.x, trophy.y, trophy.icon, trophy.size, trophy.color, trophy.opacity, trophy.rotation);
            });

            // Add golden glow effect
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, `hsla(45, 50%, 15%, ${0.1 + Math.sin(time * 0.5) * 0.05})`);
            gradient.addColorStop(1, 'hsla(30, 60%, 8%, 0.9)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createTrophyIcons();
        createMedalParticles();
        createAchievementRings();
        createStarField();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createTrophyIcons();
            createMedalParticles();
            createAchievementRings();
            createStarField();
        });

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ 
                background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1b13 25%, #3d2818 50%, #1a0f0a 75%, #2d1b13 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 10s ease-in-out infinite'
            }}
        />
    );
};

// Leaderboard Entry Component
const LeaderboardEntry = ({ user, rank, index, isCurrentUser }) => {
    const entryRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(entryRef.current,
            { x: -100, opacity: 0, scale: 0.8 },
            {
                x: 0, opacity: 1, scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: entryRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, [index]);

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown size={24} className="text-yellow-400" />;
        if (rank === 2) return <Medal size={24} className="text-gray-400" />;
        if (rank === 3) return <Award size={24} className="text-amber-600" />;
        return <Trophy size={20} className="text-slate-400" />;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-500 to-orange-500';
        if (rank === 2) return 'from-gray-400 to-slate-500';
        if (rank === 3) return 'from-amber-600 to-orange-600';
        return 'from-slate-600 to-gray-600';
    };

    const getRankBadge = (rank) => {
        if (rank <= 3) return 'top-3';
        if (rank <= 10) return 'top-10';
        return 'regular';
    };

    return (
        <motion.div
            ref={entryRef}
            whileHover={{ 
                x: 15, 
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                rotateY: 3
            }}
            whileTap={{ scale: 0.98 }}
            className={`leaderboard-entry group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 transform-gpu ${
                isCurrentUser 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50' 
                    : 'bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50'
            }`}
            style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(rank)} flex items-center justify-center text-white font-bold text-lg`}>
                            {rank}
                        </div>
                        <div className="flex items-center">
                            {getRankIcon(rank)}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif", fontWeight: 700 }}>
                                            {user.name}
                                        </h3>
                                        {user.isVerified && (
                                            <CheckCircle size={18} className="text-cyan-400" />
                                        )}
                                        {isCurrentUser && (
                                            <div className="px-2 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 600 }}>
                                                YOU
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-400 text-sm" style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 400 }}>
                                        <span>Level {user.level}</span>
                                        <span>•</span>
                                        <span>{user.country}</span>
                                    </div>
                                </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 700 }}>
                                {user.problemsSolved.toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Problems</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 700 }}>
                                {user.rating.toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Rating</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 700 }}>
                                {user.contests}
                            </div>
                            <div className="text-sm text-slate-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Contests</div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                        {user.badges.map((badge, badgeIndex) => (
                            <motion.div
                                key={badge}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: badgeIndex * 0.1 }}
                                className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
                            >
                                <Star size={16} className="text-white" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2" style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 400 }}>
                        <span>Progress to next level</span>
                        <span>{user.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <motion.div
                            className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${user.progress}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                    </div>
                </div>
            </div>

            {/* Enhanced floating particles around entry */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + i * 12}%`,
                        }}
                        animate={{
                            y: [0, -25, 0],
                            x: [0, Math.cos(i) * 8, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [0.5, 1.8, 0.5],
                        }}
                        transition={{
                            duration: 4 + i * 0.3,
                            repeat: -1,
                            delay: i * 0.6,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Special trophy/medal symbols floating around */}
                {['🏆', '🥇', '⭐', '💎'].map((symbol, i) => (
                    <motion.div
                        key={`symbol-${i}`}
                        className="absolute text-yellow-400/20 text-lg"
                        style={{
                            left: `${25 + i * 12}%`,
                            top: `${30 + i * 8}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.5, 0.1],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 5,
                            repeat: -1,
                            delay: i * 1.2,
                            ease: "easeInOut"
                        }}
                    >
                        {symbol}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// Stats Overview Component
const LeaderboardStatsOverview = ({ stats }) => {
    const statsRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(statsRef.current?.children,
            { y: 50, opacity: 0, scale: 0.8 },
            { 
                y: 0, opacity: 1, scale: 1, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: "back.out(1.7)" 
            }
        );
    }, [stats]);

    return (
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'from-cyan-500 to-blue-500' },
                { label: 'Your Rank', value: `#${stats?.yourRank || 0}`, icon: Trophy, color: 'from-yellow-500 to-orange-500' },
                { label: 'Top Rating', value: stats?.topRating || 0, icon: Crown, color: 'from-purple-500 to-pink-500' },
                { label: 'Active Today', value: stats?.activeToday || 0, icon: Zap, color: 'from-green-500 to-emerald-500' }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-sm group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 700 }}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{stat.label}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Filter and Sort Bar
const LeaderboardFilterBar = ({ timeFilter, setTimeFilter, sortBy, setSortBy }) => {
    const filterRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(filterRef.current,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    return (
        <motion.div
            ref={filterRef}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mb-8"
        >
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Time Filter */}
                <div className="flex gap-2">
                    {[
                        { key: 'all', label: 'All Time', icon: Calendar },
                        { key: 'monthly', label: 'This Month', icon: TrendingUp },
                        { key: 'weekly', label: 'This Week', icon: BarChart3 },
                        { key: 'daily', label: 'Today', icon: Clock }
                    ].map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setTimeFilter(filter.key)}
                            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                                timeFilter === filter.key
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                            }`}
                            style={{ fontFamily: "'Orbitron', 'Inter', sans-serif", fontWeight: 600 }}
                        >
                            <filter.icon size={18} />
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Sort By */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                    style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 500 }}
                >
                    <option value="rating">By Rating</option>
                    <option value="problems">By Problems Solved</option>
                    <option value="contests">By Contests</option>
                    <option value="recent">Recently Active</option>
                </select>
            </div>
        </motion.div>
    );
};

// Main Enhanced Leaderboard Page Component
function EnhancedLeaderboardPage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('rating');
    const [stats, setStats] = useState({});

    const headerRef = useRef(null);
    const titleRef = useRef(null);

    // Mock data for leaderboard
    useEffect(() => {
        const mockLeaderboard = [
            {
                id: 1,
                name: 'Alex Chen',
                isVerified: true,
                level: 15,
                country: 'USA',
                problemsSolved: 1247,
                rating: 2456,
                contests: 89,
                badges: ['Gold', 'Platinum', 'Diamond'],
                progress: 85
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                isVerified: true,
                level: 14,
                country: 'Canada',
                problemsSolved: 1189,
                rating: 2389,
                contests: 76,
                badges: ['Gold', 'Platinum'],
                progress: 92
            },
            {
                id: 3,
                name: 'David Kim',
                isVerified: true,
                level: 13,
                country: 'South Korea',
                problemsSolved: 1156,
                rating: 2312,
                contests: 82,
                badges: ['Gold', 'Silver'],
                progress: 67
            },
            {
                id: 4,
                name: 'Emma Wilson',
                isVerified: false,
                level: 12,
                country: 'UK',
                problemsSolved: 1098,
                rating: 2256,
                contests: 71,
                badges: ['Gold'],
                progress: 43
            },
            {
                id: 5,
                name: 'Michael Brown',
                isVerified: true,
                level: 11,
                country: 'Australia',
                problemsSolved: 1034,
                rating: 2189,
                contests: 65,
                badges: ['Silver', 'Bronze'],
                progress: 78
            },
            {
                id: 6,
                name: 'Lisa Zhang',
                isVerified: true,
                level: 10,
                country: 'China',
                problemsSolved: 987,
                rating: 2123,
                contests: 58,
                badges: ['Silver'],
                progress: 56
            },
            {
                id: 7,
                name: 'James Smith',
                isVerified: false,
                level: 9,
                country: 'USA',
                problemsSolved: 923,
                rating: 2056,
                contests: 52,
                badges: ['Bronze'],
                progress: 34
            },
            {
                id: 8,
                name: 'Anna Garcia',
                isVerified: true,
                level: 8,
                country: 'Spain',
                problemsSolved: 876,
                rating: 1989,
                contests: 47,
                badges: ['Bronze'],
                progress: 89
            }
        ];

        // Add current user to leaderboard
        const currentUser = {
            id: 999,
            name: user?.firstname + ' ' + user?.lastname || 'You',
            isVerified: true,
            level: 7,
            country: 'India',
            problemsSolved: 456,
            rating: 1856,
            contests: 23,
            badges: ['Bronze'],
            progress: 67
        };

        const allUsers = [...mockLeaderboard, currentUser];
        allUsers.sort((a, b) => b.rating - a.rating);
        
        // Add rank to each user
        const rankedUsers = allUsers.map((user, index) => ({
            ...user,
            rank: index + 1
        }));

        setLeaderboard(rankedUsers);
        setStats({
            totalUsers: allUsers.length,
            yourRank: rankedUsers.find(u => u.id === 999)?.rank || 0,
            topRating: Math.max(...allUsers.map(u => u.rating)),
            activeToday: Math.floor(Math.random() * 500) + 200
        });
        setLoading(false);
    }, [user]);

    // Enhanced GSAP Animations with Page Transitions
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Page entrance animation
            gsap.fromTo("body", 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
            );

            // Title typing effect with enhanced styling
            gsap.to(titleRef.current, {
                text: "Leaderboard",
                duration: 2.5,
                ease: "none",
                delay: 0.8
            });

            // Header animation with stagger
            gsap.fromTo(headerRef.current,
                { y: -100, opacity: 0, scale: 0.8 },
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 1.2, 
                    ease: "back.out(1.7)",
                    delay: 0.3
                }
            );

            // Animated background entrance
            gsap.fromTo(".animated-bg",
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.2 }
            );

            // Staggered content animation
            gsap.fromTo(".content-section",
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.2, 
                    ease: "power3.out",
                    delay: 1.2
                }
            );

            // Continuous floating animation for main container
            gsap.to(".main-container", {
                y: -10,
                duration: 6,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });

        }, headerRef);

        return () => ctx.revert();
    }, []);

    const filteredLeaderboard = leaderboard.sort((a, b) => {
        switch (sortBy) {
            case 'problems':
                return b.problemsSolved - a.problemsSolved;
            case 'contests':
                return b.contests - a.contests;
            case 'recent':
                return Math.random() - 0.5; // Mock recent activity
            default:
                return b.rating - a.rating;
        }
    });

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
                    <p className="text-2xl text-slate-400 font-medium">Loading leaderboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <div className="animated-bg">
                <AnimatedBackground />
            </div>
            <Header />
            
            <main className="main-container container mx-auto px-4 py-8 relative z-10">
                {/* Back Button */}
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-lg">Back</span>
                    </button>
                </motion.div>

                {/* Header */}
                <motion.div 
                    ref={headerRef}
                    className="text-center mb-12"
                >
                    <motion.h1 
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
                        style={{ 
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite',
                            fontFamily: "'Orbitron', 'Inter', sans-serif",
                            fontWeight: 900,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        {/* Text will be filled by GSAP */}
                    </motion.h1>
                    
                    <p className="text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 400 }}>
                        See how you stack up against the best programmers! 🏆
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <div className="content-section">
                    <LeaderboardStatsOverview stats={stats} />
                </div>

                {/* Filter and Sort */}
                <div className="content-section">
                    <LeaderboardFilterBar
                        timeFilter={timeFilter}
                        setTimeFilter={setTimeFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>

                {/* Leaderboard */}
                <motion.div 
                    className="content-section space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <AnimatePresence>
                        {filteredLeaderboard.map((user, index) => (
                            <LeaderboardEntry
                                key={user.id}
                                user={user}
                                rank={user.rank}
                                index={index}
                                isCurrentUser={user.id === 999}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes trophyGlow {
                    0%, 100% { 
                        text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700;
                    }
                    50% { 
                        text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700;
                    }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .leaderboard-entry {
                    animation: bounce 4s ease-in-out infinite;
                }
                
                .leaderboard-entry:nth-child(even) {
                    animation-delay: -2s;
                }
                
                .trophy-text {
                    animation: trophyGlow 4s ease-in-out infinite;
                }
                
                .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                }
                
                .shimmer-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </div>
    );
}

export default EnhancedLeaderboardPage;