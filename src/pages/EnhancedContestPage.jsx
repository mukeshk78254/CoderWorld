import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import {
    Trophy, Clock, Users, Star, Zap, Target, Crown, Medal,
    Calendar, Play, Pause, RotateCcw, Award, Flame, Rocket,
    ChevronRight, ChevronDown, ArrowLeft, Settings, Bell,
    Timer, CheckCircle, XCircle, AlertCircle, Sparkles
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Enhanced Coding-Themed Animated Background
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let codeParticles = [];
        let binaryStreams = [];
        let circuitLines = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createCodeParticles = () => {
            codeParticles = [];
            const codeSymbols = ['{', '}', '(', ')', '[', ']', '<', '>', ';', '=', '+', '-', '*', '/'];
            
            for (let i = 0; i < 80; i++) {
                codeParticles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 20 + 12,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        };

        const createBinaryStreams = () => {
            binaryStreams = [];
            for (let i = 0; i < 15; i++) {
                binaryStreams.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    length: Math.random() * 200 + 100,
                    speed: Math.random() * 2 + 1,
                    direction: Math.random() * Math.PI * 2,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
                });
            }
        };

        const createCircuitLines = () => {
            circuitLines = [];
            for (let i = 0; i < 8; i++) {
                circuitLines.push({
                    startX: Math.random() * canvas.width,
                    startY: Math.random() * canvas.height,
                    endX: Math.random() * canvas.width,
                    endY: Math.random() * canvas.height,
                    progress: 0,
                    speed: Math.random() * 0.02 + 0.01,
                    opacity: Math.random() * 0.3 + 0.1,
                    color: `hsl(${Math.random() * 60 + 160}, 80%, 60%)`
                });
            }
        };

        const drawCodeSymbol = (x, y, symbol, size, color, opacity, rotation) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.font = `${size}px 'Courier New', monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.fillText(symbol, 0, 0);
            ctx.restore();
        };

        const drawBinaryStream = (stream) => {
            ctx.save();
            ctx.globalAlpha = stream.opacity;
            ctx.strokeStyle = stream.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = stream.color;
            
            const dx = Math.cos(stream.direction) * stream.speed;
            const dy = Math.sin(stream.direction) * stream.speed;
            
            ctx.beginPath();
            ctx.moveTo(stream.x, stream.y);
            ctx.lineTo(stream.x + dx * stream.length, stream.y + dy * stream.length);
            ctx.stroke();
            
            // Add binary digits along the line
            for (let i = 0; i < stream.length / 20; i++) {
                const digitX = stream.x + dx * i * 20;
                const digitY = stream.y + dy * i * 20;
                ctx.fillStyle = stream.color;
                ctx.font = '12px monospace';
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', digitX, digitY);
            }
            
            ctx.restore();
        };

        const drawCircuitLine = (line) => {
            ctx.save();
            ctx.globalAlpha = line.opacity;
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 8;
            ctx.shadowColor = line.color;
            
            const currentX = line.startX + (line.endX - line.startX) * line.progress;
            const currentY = line.startY + (line.endY - line.startY) * line.progress;
            
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            // Add circuit nodes
            if (line.progress > 0.1 && line.progress < 0.9) {
                ctx.fillStyle = line.color;
                ctx.beginPath();
                ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            // Draw circuit lines
            circuitLines.forEach(line => {
                drawCircuitLine(line);
                line.progress += line.speed;
                if (line.progress >= 1) {
                    line.progress = 0;
                    line.startX = Math.random() * canvas.width;
                    line.startY = Math.random() * canvas.height;
                    line.endX = Math.random() * canvas.width;
                    line.endY = Math.random() * canvas.height;
                }
            });

            // Draw binary streams
            binaryStreams.forEach(stream => {
                drawBinaryStream(stream);
                stream.x += Math.cos(stream.direction) * stream.speed;
                stream.y += Math.sin(stream.direction) * stream.speed;
                
                if (stream.x < -stream.length || stream.x > canvas.width + stream.length ||
                    stream.y < -stream.length || stream.y > canvas.height + stream.length) {
                    stream.x = Math.random() * canvas.width;
                    stream.y = Math.random() * canvas.height;
                    stream.direction = Math.random() * Math.PI * 2;
                }
            });

            // Draw code particles
            codeParticles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;

                if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
                if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
                if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
                if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

                drawCodeSymbol(particle.x, particle.y, particle.symbol, particle.size, particle.color, particle.opacity, particle.rotation);
            });

            // Add pulsing background effect
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
            );
            gradient.addColorStop(0, `hsla(200, 50%, 10%, ${0.1 + Math.sin(time) * 0.05})`);
            gradient.addColorStop(1, 'hsla(220, 60%, 5%, 0.8)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createCodeParticles();
        createBinaryStreams();
        createCircuitLines();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createCodeParticles();
            createBinaryStreams();
            createCircuitLines();
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
                background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease-in-out infinite'
            }}
        />
    );
};

// Contest Card Component
const ContestCard = ({ contest, index, onJoin }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0, scale: 0.8, rotation: -10 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1.2,
                delay: index * 0.2,
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
            y: -5,
            duration: 4 + index * 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    }, [index]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'live': return 'from-red-500 to-pink-500';
            case 'upcoming': return 'from-blue-500 to-cyan-500';
            case 'ended': return 'from-slate-500 to-gray-500';
            default: return 'from-purple-500 to-indigo-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'live': return <Play size={20} className="text-red-400" />;
            case 'upcoming': return <Clock size={20} className="text-blue-400" />;
            case 'ended': return <CheckCircle size={20} className="text-slate-400" />;
            default: return <Trophy size={20} className="text-purple-400" />;
        }
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ 
                y: -20, 
                scale: 1.05,
                boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
                rotateY: 5,
                rotateX: 5
            }}
            whileTap={{ scale: 0.98 }}
            className="contest-card group relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 overflow-hidden cursor-pointer transform-gpu"
            onClick={() => onJoin(contest)}
            style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
            }}
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getStatusColor(contest.status)} text-white flex items-center gap-2`}>
                                {getStatusIcon(contest.status)}
                                {contest.status.toUpperCase()}
                            </div>
                            {contest.isPremium && (
                                <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1">
                                    <Crown size={14} />
                                    PREMIUM
                                </div>
                            )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-3" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif", fontWeight: 700 }}>
                            {contest.title}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-4" style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 400 }}>
                            {contest.description}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Clock size={18} />
                            <div>
                                <div className="text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Duration</div>
                                <div className="font-semibold text-white" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 600 }}>{contest.duration}</div>
                            </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Users size={18} />
                        <div>
                            <div className="text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Participants</div>
                            <div className="font-semibold text-white" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 600 }}>{contest.participants.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Target size={18} />
                        <div>
                            <div className="text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Problems</div>
                            <div className="font-semibold text-white" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 600 }}>{contest.problemCount}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Trophy size={18} />
                        <div>
                            <div className="text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Prize</div>
                            <div className="font-semibold text-white" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 600 }}>{contest.prize}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {contest.tags.map((tag, tagIndex) => (
                            <motion.span
                                key={tag}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: tagIndex * 0.1 }}
                                className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-sm font-medium"
                                style={{ fontFamily: "'Source Code Pro', 'Fira Code', monospace", fontWeight: 500 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                            contest.status === 'live' 
                                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                                : contest.status === 'upcoming'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                                : 'bg-gradient-to-r from-slate-500 to-gray-500 cursor-not-allowed'
                        }`}
                        style={{ fontFamily: "'Orbitron', 'Inter', sans-serif", fontWeight: 700 }}
                        disabled={contest.status === 'ended'}
                    >
                        {contest.status === 'live' ? 'Join Now' : 
                         contest.status === 'upcoming' ? 'Register' : 'Ended'}
                    </motion.button>
                </div>
            </div>

            {/* Enhanced floating particles around card */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                        style={{
                            left: `${10 + i * 10}%`,
                            top: `${15 + i * 10}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.sin(i) * 10, 0],
                            opacity: [0.2, 1, 0.2],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: 4 + i * 0.2,
                            repeat: -1,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                
                {/* Special code symbols floating around */}
                {['{', '}', '(', ')'].map((symbol, i) => (
                    <motion.div
                        key={`symbol-${i}`}
                        className="absolute text-cyan-400/20 font-mono text-lg"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${25 + i * 12}%`,
                        }}
                        animate={{
                            y: [0, -25, 0],
                            rotate: [0, 360, 0],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: -1,
                            delay: i * 0.8,
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
const ContestStatsOverview = ({ stats }) => {
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
                { label: 'Total Contests', value: stats?.totalContests || 0, icon: Trophy, color: 'from-cyan-500 to-blue-500' },
                { label: 'Live Now', value: stats?.liveContests || 0, icon: Play, color: 'from-red-500 to-pink-500' },
                { label: 'Upcoming', value: stats?.upcomingContests || 0, icon: Clock, color: 'from-blue-500 to-cyan-500' },
                { label: 'My Rank', value: `#${stats?.myRank || 0}`, icon: Crown, color: 'from-purple-500 to-pink-500' }
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

// Main Enhanced Contest Page Component
function EnhancedContestPage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [filter, setFilter] = useState('all');

    const headerRef = useRef(null);
    const titleRef = useRef(null);

    // Handle contest join/end navigation
    const handleContestAction = (contest) => {
        if (contest.status === 'upcoming') {
            navigate('/contest/opening-soon');
        } else if (contest.status === 'ended') {
            navigate('/contest/ended');
        } else if (contest.status === 'live') {
            // For live contests, you could navigate to the actual contest page
            navigate('/contest/opening-soon'); // For now, using the same page
        }
    };

    // Mock data for contests
    useEffect(() => {
        const mockContests = [
            {
                id: 1,
                title: 'Weekly Coding Challenge',
                description: 'Solve 5 algorithmic problems in 2 hours. Test your skills against the best programmers!',
                status: 'live',
                duration: '2 hours',
                participants: 1250,
                problemCount: 5,
                prize: '$500',
                tags: ['algorithms', 'data structures', 'competitive programming'],
                isPremium: false,
                startTime: new Date(),
                endTime: new Date(Date.now() + 2 * 60 * 60 * 1000)
            },
            {
                id: 2,
                title: 'Data Structures Mastery',
                description: 'Advanced data structures contest with complex problem solving challenges.',
                status: 'upcoming',
                duration: '3 hours',
                participants: 890,
                problemCount: 7,
                prize: '$750',
                tags: ['data structures', 'trees', 'graphs'],
                isPremium: true,
                startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
                endTime: new Date(Date.now() + 27 * 60 * 60 * 1000)
            },
            {
                id: 3,
                title: 'Algorithm Olympics',
                description: 'The ultimate test of algorithmic thinking and problem-solving skills.',
                status: 'ended',
                duration: '4 hours',
                participants: 2100,
                problemCount: 10,
                prize: '$1000',
                tags: ['algorithms', 'dynamic programming', 'greedy'],
                isPremium: false,
                startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
                endTime: new Date(Date.now() - 44 * 60 * 60 * 1000)
            },
            {
                id: 4,
                title: 'Beginner Friendly Contest',
                description: 'Perfect for newcomers to competitive programming. Easy to medium problems.',
                status: 'upcoming',
                duration: '1.5 hours',
                participants: 450,
                problemCount: 4,
                prize: '$200',
                tags: ['beginner', 'arrays', 'strings'],
                isPremium: false,
                startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000)
            }
        ];

        setContests(mockContests);
        setStats({
            totalContests: mockContests.length,
            liveContests: mockContests.filter(c => c.status === 'live').length,
            upcomingContests: mockContests.filter(c => c.status === 'upcoming').length,
            myRank: 156
        });
        setLoading(false);
    }, []);

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
                text: "Contest Arena",
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

    const filteredContests = contests.filter(contest => {
        if (filter === 'all') return true;
        return contest.status === filter;
    });

    const handleJoinContest = (contest) => {
        handleContestAction(contest);
    };

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
                    <p className="text-2xl text-slate-400 font-medium">Loading contests...</p>
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
                        Compete with the best programmers and win amazing prizes! 🏆
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <div className="content-section">
                    <ContestStatsOverview stats={stats} />
                </div>

                {/* Filter Tabs */}
                <motion.div 
                    className="content-section flex justify-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-2 backdrop-blur-sm">
                        {[
                            { key: 'all', label: 'All Contests', icon: Trophy },
                            { key: 'live', label: 'Live Now', icon: Play },
                            { key: 'upcoming', label: 'Upcoming', icon: Clock },
                            { key: 'ended', label: 'Ended', icon: CheckCircle }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                                    filter === tab.key
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                                style={{ fontFamily: "'Orbitron', 'Inter', sans-serif", fontWeight: 600 }}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Contests Grid */}
                <motion.div 
                    className="content-section grid grid-cols-1 lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                >
                    <AnimatePresence>
                        {filteredContests.map((contest, index) => (
                            <ContestCard
                                key={contest.id}
                                contest={contest}
                                index={index}
                                onJoin={handleJoinContest}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredContests.length === 0 && (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Trophy size={80} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-2xl font-bold text-white mb-4">No Contests Found</h3>
                        <p className="text-slate-400">Try adjusting your filter criteria.</p>
                    </motion.div>
                )}
            </main>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes codeGlow {
                    0%, 100% { 
                        text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff;
                    }
                    50% { 
                        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .contest-card {
                    animation: float 6s ease-in-out infinite;
                }
                
                .contest-card:nth-child(even) {
                    animation-delay: -3s;
                }
                
                .glow-text {
                    animation: codeGlow 3s ease-in-out infinite;
                }
                
                .pulse-element {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default EnhancedContestPage;