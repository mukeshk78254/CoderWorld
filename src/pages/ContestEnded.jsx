import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Clock, Trophy, Users, Calendar, Star, Zap, 
    ArrowLeft, Share2, Target, Award, Crown,
    Sparkles, Rocket, Timer, CheckCircle, XCircle,
    BarChart3, Medal, TrendingUp, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Animated Background Component
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let stars = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStars = () => {
            stars = [];
            for (let i = 0; i < 80; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.6 + 0.2,
                    twinkle: Math.random() * 0.01 + 0.005
                });
            }
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.4 + 0.1,
                    color: Math.random() > 0.5 ? '#ef4444' : '#f59e0b'
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => {
                star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
                star.opacity = Math.max(0.1, Math.min(0.7, star.opacity));
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });

            // Draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createStars();
        createParticles();
        animate();

        const handleResize = () => {
            resizeCanvas();
            createStars();
            createParticles();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #2d1b1b 50%, #0f0f23 100%)' }}
        />
    );
};

// Contest Ended Page
function ContestEnded() {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        // Hero section animations
        gsap.fromTo(heroRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );

        // Title typing animation
        gsap.fromTo(titleRef.current,
            { opacity: 0 },
            { 
                opacity: 1, 
                duration: 0.5,
                onComplete: () => {
                    gsap.to(titleRef.current, {
                        text: "Contest Already Ended",
                        duration: 2,
                        ease: "none"
                    });
                }
            }
        );

        // Subtitle animation
        gsap.fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
        );

        // Staggered animations for cards
        gsap.fromTo(".contest-card",
            { opacity: 0, y: 50, scale: 0.8 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".contest-cards",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Floating animation for icons
        gsap.to(".floating-icon", {
            y: -10,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3
        });

    }, []);

    const contestInfo = {
        title: "Weekly Coding Challenge",
        endDate: "January 15, 2024",
        duration: "2 hours",
        problems: "4 problems",
        participants: "2,847",
        prize: "$500",
        difficulty: ["Easy", "Medium", "Medium", "Hard"]
    };

    const leaderboard = [
        { rank: 1, name: "Alex Chen", score: 850, country: "🇺🇸" },
        { rank: 2, name: "Sarah Kim", score: 820, country: "🇰🇷" },
        { rank: 3, name: "Raj Patel", score: 795, country: "🇮🇳" },
        { rank: 4, name: "Emma Wilson", score: 780, country: "🇬🇧" },
        { rank: 5, name: "David Lee", score: 765, country: "🇨🇦" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <AnimatedBackground />
            <Header />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
                {/* Hero Section */}
                <motion.section 
                    ref={heroRef}
                    className="text-center py-16 mb-16"
                >
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    >
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 floating-icon">
                            <XCircle size={40} className="text-white" />
                        </div>
                    </motion.div>

                    <h1 
                        ref={titleRef}
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 mb-6"
                        style={{ 
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite'
                        }}
                    >
                        Contest Already Ended
                    </h1>
                    
                    <p 
                        ref={subtitleRef}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
                    >
                        This contest has already concluded. Check out the results and stay tuned for upcoming contests!
                    </p>

                    {/* Contest End Info */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Clock size={24} className="text-red-400" />
                            <span className="text-lg font-semibold text-white">Contest Ended</span>
                        </div>
                        <div className="text-2xl font-bold text-red-400 mb-2">{contestInfo.endDate}</div>
                        <div className="text-slate-400">Final Results Available</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                        >
                            <BarChart3 size={20} />
                            View Results
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all duration-300"
                        >
                            <Calendar size={20} />
                            Upcoming Contests
                        </motion.button>
                    </div>
                </motion.section>

                {/* Contest Results Cards */}
                <section className="contest-cards mb-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Contest Results</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Contest Summary Card */}
                        <motion.div className="contest-card bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center floating-icon">
                                    <Trophy size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Contest Summary</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Title:</span>
                                    <span className="text-white font-medium">{contestInfo.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Duration:</span>
                                    <span className="text-white font-medium">{contestInfo.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Problems:</span>
                                    <span className="text-white font-medium">{contestInfo.problems}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Prize:</span>
                                    <span className="text-cyan-400 font-bold">{contestInfo.prize}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Participants Card */}
                        <motion.div className="contest-card bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center floating-icon">
                                    <Users size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Final Participants</h3>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400 mb-2">
                                    {contestInfo.participants}
                                </div>
                                <p className="text-slate-400">Total participants</p>
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <TrendingUp size={16} className="text-green-400" />
                                    <span className="text-slate-400 text-sm">Great turnout!</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Difficulty Card */}
                        <motion.div className="contest-card bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center floating-icon">
                                    <Target size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Problems Solved</h3>
                            </div>
                            <div className="space-y-2">
                                {contestInfo.difficulty.map((level, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${
                                                level === 'Easy' ? 'bg-green-500' :
                                                level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}></div>
                                            <span className="text-white">Problem {index + 1}</span>
                                        </div>
                                        <span className="text-slate-400 text-sm">{level}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Leaderboard */}
                <motion.section 
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Crown size={24} className="text-yellow-400" />
                        Top Performers
                    </h2>
                    
                    <div className="space-y-4">
                        {leaderboard.map((participant, index) => (
                            <motion.div
                                key={participant.rank}
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                        participant.rank === 1 ? 'bg-yellow-500 text-white' :
                                        participant.rank === 2 ? 'bg-gray-400 text-white' :
                                        participant.rank === 3 ? 'bg-orange-600 text-white' :
                                        'bg-slate-600 text-slate-300'
                                    }`}>
                                        {participant.rank}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{participant.country}</span>
                                        <div>
                                            <div className="text-white font-medium">{participant.name}</div>
                                            <div className="text-slate-400 text-sm">Score: {participant.score}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {participant.rank <= 3 && (
                                    <div className="flex items-center gap-2">
                                        <Medal size={20} className={
                                            participant.rank === 1 ? 'text-yellow-400' :
                                            participant.rank === 2 ? 'text-gray-400' :
                                            'text-orange-500'
                                        } />
                                        <span className="text-slate-400 text-sm">
                                            {participant.rank === 1 ? 'Gold' :
                                             participant.rank === 2 ? 'Silver' : 'Bronze'}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Next Contest Info */}
                <motion.section 
                    className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Sparkles size={24} className="text-cyan-400" />
                        Don't Miss the Next Contest!
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        Stay tuned for our next exciting coding challenge. Follow us for updates and be the first to know when registration opens!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300"
                        >
                            <Bell size={18} />
                            Get Notified
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all duration-300"
                        >
                            <Share2 size={18} />
                            Share Results
                        </motion.button>
                    </div>
                </motion.section>

                {/* Back Button */}
                <div className="text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contests')}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg flex items-center gap-2 mx-auto transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        Back to Contests
                    </motion.button>
                </div>
            </main>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}

export default ContestEnded;

