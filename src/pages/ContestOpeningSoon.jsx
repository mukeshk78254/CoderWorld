import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Clock, Trophy, Users, Calendar, Star, Zap, 
    ArrowLeft, Bell, Share2, Target, Award, Crown,
    Sparkles, Rocket, Timer, CheckCircle
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
            for (let i = 0; i < 100; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * 0.02 + 0.01
                });
            }
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => {
                star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
                star.opacity = Math.max(0.1, Math.min(0.9, star.opacity));
                
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
            style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}
        />
    );
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                    key={unit}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                        {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-slate-400 text-sm uppercase tracking-wide">
                        {unit}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Contest Opening Soon Page
function ContestOpeningSoon() {
    const navigate = useNavigate();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const heroRef = useRef(null);

    // Contest starts in 2 days - create a fixed future date
    const contestStartDate = new Date();
    contestStartDate.setDate(contestStartDate.getDate() + 2);
    contestStartDate.setHours(18, 0, 0, 0); // 6 PM

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
                        text: "Contest Opening Soon!",
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
        description: "Join our weekly coding contest featuring algorithmic problems of varying difficulty levels. Compete with developers worldwide and climb the leaderboard!",
        duration: "2 hours",
        problems: "4 problems",
        participants: "2,500+",
        prize: "$500",
        difficulty: ["Easy", "Medium", "Medium", "Hard"]
    };

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
                        <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 floating-icon">
                            <Trophy size={40} className="text-white" />
                        </div>
                    </motion.div>

                    <h1 
                        ref={titleRef}
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
                        style={{ 
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite'
                        }}
                    >
                        Contest Opening Soon!
                    </h1>
                    
                    <p 
                        ref={subtitleRef}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
                    >
                        Get ready for an exciting coding challenge! The contest will begin soon with amazing prizes and recognition.
                    </p>

                    {/* Countdown Timer */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-white mb-6">Contest Starts In:</h3>
                        <CountdownTimer targetDate={contestStartDate.getTime()} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                        >
                            <Bell size={20} />
                            Set Reminder
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all duration-300"
                        >
                            <Share2 size={20} />
                            Share Contest
                        </motion.button>
                    </div>
                </motion.section>

                {/* Contest Information Cards */}
                <section className="contest-cards mb-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Contest Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Contest Info Card */}
                        <motion.div className="contest-card bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center floating-icon">
                                    <Calendar size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Contest Info</h3>
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
                                <h3 className="text-xl font-bold text-white">Participants</h3>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400 mb-2">
                                    {contestInfo.participants}
                                </div>
                                <p className="text-slate-400">Expected participants</p>
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <Star size={16} className="text-yellow-400" />
                                    <span className="text-slate-400 text-sm">Global competition</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Difficulty Card */}
                        <motion.div className="contest-card bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center floating-icon">
                                    <Target size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Difficulty</h3>
                            </div>
                            <div className="space-y-2">
                                {contestInfo.difficulty.map((level, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${
                                            level === 'Easy' ? 'bg-green-500' :
                                            level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}></div>
                                        <span className="text-white">Problem {index + 1}: {level}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contest Description */}
                <motion.section 
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Sparkles size={24} className="text-cyan-400" />
                        About This Contest
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {contestInfo.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <CheckCircle size={20} className="text-green-400" />
                                What to Expect
                            </h3>
                            <ul className="space-y-2 text-slate-300">
                                <li>• Algorithmic problem solving</li>
                                <li>• Real-time leaderboard</li>
                                <li>• Detailed problem explanations</li>
                                <li>• Community discussions</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Award size={20} className="text-yellow-400" />
                                Rewards
                            </h3>
                            <ul className="space-y-2 text-slate-300">
                                <li>• Cash prizes for top performers</li>
                                <li>• Recognition on leaderboard</li>
                                <li>• Achievement badges</li>
                                <li>• Interview opportunities</li>
                            </ul>
                        </div>
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

export default ContestOpeningSoon;
