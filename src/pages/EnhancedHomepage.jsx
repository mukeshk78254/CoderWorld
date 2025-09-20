import { useEffect, useState, useMemo, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Code, Search, Filter, Star, Clock, Users, 
    ChevronRight, Trophy, MessageSquare, Zap, Target, 
    Flame, Brain, Rocket, Sparkles, TrendingUp, Award,
    CheckCircle, ArrowRight, Play, BookOpen, Shield,
    Globe, Smartphone, Laptop, Database, Cpu
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Animated Background Component
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let stars = [];
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStars = () => {
            stars = [];
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    opacity: Math.random() * 0.6 + 0.4,
                    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw stars
            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;

                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });

            // Draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Add glow effect
                ctx.shadowBlur = 20;
                ctx.shadowColor = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createStars();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createStars();
            createParticles();
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
            style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}
        />
    );
};

// Simple Problem Card without transitions
const SimpleProblemCard = ({ problem, index, onSolve }) => {

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'from-emerald-500 to-green-500';
            case 'medium': return 'from-amber-500 to-orange-500';
            case 'hard': return 'from-red-500 to-pink-500';
            default: return 'from-slate-500 to-gray-500';
        }
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return <Target size={16} className="text-emerald-400" />;
            case 'medium': return <Zap size={16} className="text-amber-400" />;
            case 'hard': return <Flame size={16} className="text-red-400" />;
            default: return <Code size={16} className="text-slate-400" />;
        }
    };

    const tagsArray = Array.isArray(problem.tags) ? problem.tags : 
                     typeof problem.tags === 'string' ? problem.tags.split(',').map(t => t.trim()) : [];

    return (
        <div
            className="group bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-cyan-400/50 cursor-pointer"
            onClick={() => onSolve(problem)}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 mb-2">
                        {problem.title}
                    </h3>
                    {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tagsArray.map((tag, tagIndex) => (
                                <span
                                    key={`${problem._id}-${tag}-${tagIndex}`}
                                    className="px-2 py-1 bg-slate-800 text-cyan-400 rounded-md text-xs font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white flex items-center gap-1 ml-4`}>
                    {getDifficultyIcon(problem.difficulty)}
                    {problem.difficulty}
                </div>
            </div>
        </div>
    );
};

// Simple Search Bar Component
const SimpleSearchBar = ({ searchTerm, setSearchTerm, difficultyFilter, setDifficultyFilter, uniqueTags, tagFilter, setTagFilter }) => {
    return (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search problems..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                </div>
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                    <option value="">All Tags</option>
                    {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

// Main Homepage Component
function EnhancedHomepage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [stats, setStats] = useState({});

    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    // GSAP Hero Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title typing effect
            gsap.to(titleRef.current, {
                text: "Master Coding with CodeFlow",
                duration: 2,
                ease: "none",
                delay: 0.5
            });

            // Subtitle animation
            gsap.fromTo(subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" }
            );

            // Hero elements animation
            gsap.fromTo(heroRef.current?.children,
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Fetch problems data
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/problem/getallproblem');
                setProblems(response.data || []);
                
                // Calculate stats
                const problemStats = {
                    totalProblems: response.data?.length || 0,
                    easy: response.data?.filter(p => p.difficulty === 'easy').length || 0,
                    medium: response.data?.filter(p => p.difficulty === 'medium').length || 0,
                    hard: response.data?.filter(p => p.difficulty === 'hard').length || 0
                };
                setStats(problemStats);
            } catch (error) {
                console.error('Error fetching problems:', error);
                // Mock data for development
                const mockProblems = [
                    {
                        _id: '1',
                        title: 'Two Sum',
                        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
                        difficulty: 'easy',
                        tags: ['array', 'hash table']
                    },
                    {
                        _id: '2',
                        title: 'Add Two Numbers',
                        description: 'You are given two non-empty linked lists representing two non-negative integers.',
                        difficulty: 'medium',
                        tags: ['linked list', 'math']
                    },
                    {
                        _id: '3',
                        title: 'Longest Substring Without Repeating Characters',
                        description: 'Given a string s, find the length of the longest substring without repeating characters.',
                        difficulty: 'medium',
                        tags: ['hash table', 'string', 'sliding window']
                    },
                    {
                        _id: '4',
                        title: 'Median of Two Sorted Arrays',
                        description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
                        difficulty: 'hard',
                        tags: ['array', 'binary search', 'divide and conquer']
                    }
                ];
                setProblems(mockProblems);
                setStats({
                    totalProblems: mockProblems.length,
                    easy: mockProblems.filter(p => p.difficulty === 'easy').length,
                    medium: mockProblems.filter(p => p.difficulty === 'medium').length,
                    hard: mockProblems.filter(p => p.difficulty === 'hard').length
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // Filter problems
    const filteredProblems = useMemo(() => {
        return problems.filter(problem => {
            const matchSearch = searchTerm === '' || problem.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
            
            let problemTags = [];
            if (Array.isArray(problem.tags)) {
                problemTags = problem.tags.map(t => t.toLowerCase());
            } else if (typeof problem.tags === 'string') {
                problemTags = problem.tags.split(',').map(t => t.trim().toLowerCase());
            }
            const matchTag = !tagFilter || problemTags.includes(tagFilter);
            
            return matchSearch && matchDifficulty && matchTag;
        });
    }, [problems, searchTerm, difficultyFilter, tagFilter]);

    const uniqueTags = useMemo(() => {
        const tags = new Set();
        problems.forEach(problem => {
            if (Array.isArray(problem.tags)) {
                problem.tags.forEach(tag => tags.add(tag.toLowerCase()));
            } else if (typeof problem.tags === 'string') {
                problem.tags.split(',').forEach(tag => tags.add(tag.trim().toLowerCase()));
            }
        });
        return Array.from(tags).sort();
    }, [problems]);

    const handleSolveProblem = (problem) => {
        navigate(`/problem/${problem._id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-slate-400">Loading problems...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <AnimatedBackground />
            <Header />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
                {/* Hero Section */}
                <motion.section 
                    ref={heroRef}
                    className="text-center py-16"
                >
                    <motion.h1 
                        ref={titleRef}
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6"
                        style={{ 
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 3s ease-in-out infinite'
                        }}
                    >
                        {/* Text will be filled by GSAP */}
                    </motion.h1>
                    <motion.p 
                        ref={subtitleRef}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
                    >
                        Solve thousands of problems, learn from experts, and ace your next interview. Join over 2 million developers worldwide.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <button
                            onClick={() => document.getElementById('problem-list')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-lg flex items-center gap-3 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        >
                            <Code size={24} />
                            Start Coding for Free
                        </button>
                        <button
                            onClick={() => navigate('/contests')}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl text-lg flex items-center gap-3 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                        >
                            <Trophy size={24} />
                            Join Contests
                        </button>
                    </motion.div>

                    {/* Social Proof - Company Logos */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mb-16"
                    >
                        <p className="text-slate-400 text-sm mb-6">Trusted by developers at top tech companies</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                            <div className="text-2xl font-bold text-white">Google</div>
                            <div className="text-2xl font-bold text-white">Amazon</div>
                            <div className="text-2xl font-bold text-white">Microsoft</div>
                            <div className="text-2xl font-bold text-white">Apple</div>
                            <div className="text-2xl font-bold text-white">Meta</div>
                            <div className="text-2xl font-bold text-white">Netflix</div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Key Features Section */}
                <section className="py-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Why Choose CodeFlow?
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Code,
                                title: 'Interactive Problem Sets',
                                description: 'Sharpen your skills with a vast library of coding challenges from easy to expert level.',
                                color: 'from-cyan-500 to-blue-500'
                            },
                            {
                                icon: BookOpen,
                                title: 'Guided Learning Paths',
                                description: 'Follow structured courses on data structures, algorithms, and popular programming languages.',
                                color: 'from-purple-500 to-pink-500'
                            },
                            {
                                icon: Trophy,
                                title: 'Live Contests',
                                description: 'Test your skills in weekly coding competitions and see how you rank against other developers.',
                                color: 'from-yellow-500 to-orange-500'
                            },
                            {
                                icon: Users,
                                title: 'Community Support',
                                description: 'Connect with a global community of developers, ask questions, and share solutions.',
                                color: 'from-green-500 to-emerald-500'
                            },
                            {
                                icon: Shield,
                                title: 'Interview Preparation',
                                description: 'Practice with real interview questions from top tech companies and get ready for your next role.',
                                color: 'from-red-500 to-pink-500'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Progress Tracking',
                                description: 'Monitor your improvement with detailed analytics and personalized recommendations.',
                                color: 'from-indigo-500 to-purple-500'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Stats Overview */}
                <section className="py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Problems', value: stats?.totalProblems || 0, icon: Code, color: 'from-cyan-500 to-blue-500' },
                            { label: 'Easy', value: stats?.easy || 0, icon: Target, color: 'from-emerald-500 to-green-500' },
                            { label: 'Medium', value: stats?.medium || 0, icon: Zap, color: 'from-amber-500 to-orange-500' },
                            { label: 'Hard', value: stats?.hard || 0, icon: Flame, color: 'from-red-500 to-pink-500' }
                        ].map((stat, index) => (
                            <motion.div 
                                key={stat.label} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl text-center"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                                    <stat.icon size={24} className="text-white" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Search and Filter */}
                <SimpleSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    difficultyFilter={difficultyFilter}
                    setDifficultyFilter={setDifficultyFilter}
                    uniqueTags={uniqueTags}
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                />

                {/* Problems List */}
                <section id="problem-list" className="space-y-4 mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Featured Problems</h2>
                    {filteredProblems.map((problem, index) => (
                        <SimpleProblemCard
                            key={problem._id}
                            problem={problem}
                            index={index}
                            onSolve={handleSolveProblem}
                        />
                    ))}
                </section>

                {filteredProblems.length === 0 && (
                    <div className="text-center py-16">
                        <Code size={64} className="mx-auto mb-4 text-slate-600" />
                        <h3 className="text-xl font-bold text-white mb-2">No Problems Found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                    </div>
                )}

                {/* Testimonials Section */}
                <section className="py-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Success Stories
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Chen',
                                role: 'Software Engineer at Google',
                                content: 'CodeFlow helped me land my dream job at Google. The problems are challenging and the explanations are top-notch. I went from struggling with basic algorithms to solving complex problems confidently.',
                                rating: 5
                            },
                            {
                                name: 'Michael Rodriguez',
                                role: 'Senior Developer at Amazon',
                                content: 'The structured learning paths and real interview questions were game-changers for my career. I recommend CodeFlow to anyone serious about improving their coding skills.',
                                rating: 5
                            },
                            {
                                name: 'Emily Johnson',
                                role: 'Full Stack Developer at Microsoft',
                                content: 'The community support and live contests kept me motivated throughout my learning journey. CodeFlow made coding fun and helped me build a strong foundation.',
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-300 mb-4 italic">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-sm text-cyan-400">{testimonial.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contests Section */}
                <section className="py-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Upcoming Contests
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Weekly Challenge #1',
                                description: 'Solve 5 problems in 2 hours',
                                date: '2024-01-15',
                                participants: 1250,
                                difficulty: 'Medium',
                                prize: '$500'
                            },
                            {
                                title: 'Algorithm Masters',
                                description: 'Advanced algorithmic problems',
                                date: '2024-01-20',
                                participants: 890,
                                difficulty: 'Hard',
                                prize: '$1000'
                            },
                            {
                                title: 'Beginner Friendly',
                                description: 'Perfect for new coders',
                                date: '2024-01-18',
                                participants: 2100,
                                difficulty: 'Easy',
                                prize: '$250'
                            }
                        ].map((contest, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">{contest.title}</h3>
                                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                                        {contest.difficulty}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-4">{contest.description}</p>
                                <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                                    <span>{contest.date}</span>
                                    <span>{contest.participants} participants</span>
                                </div>
                                <div className="text-cyan-400 font-semibold">Prize: {contest.prize}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Leaderboard Section */}
                <section className="py-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-bold text-white text-center mb-12"
                    >
                        Top Performers
                    </motion.h2>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                        <div className="space-y-4">
                            {[
                                { rank: 1, name: 'CodeMaster', score: 2450, problems: 156, company: 'Google' },
                                { rank: 2, name: 'AlgoNinja', score: 2380, problems: 142, company: 'Amazon' },
                                { rank: 3, name: 'DataStruct', score: 2290, problems: 138, company: 'Microsoft' },
                                { rank: 4, name: 'BinaryTree', score: 2150, problems: 125, company: 'Apple' },
                                { rank: 5, name: 'QuickSort', score: 2080, problems: 118, company: 'Meta' }
                            ].map((user) => (
                                <div key={user.rank} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                            user.rank === 1 ? 'bg-yellow-500 text-black' :
                                            user.rank === 2 ? 'bg-gray-400 text-black' :
                                            user.rank === 3 ? 'bg-orange-500 text-white' :
                                            'bg-slate-600 text-white'
                                        }`}>
                                            {user.rank}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{user.name}</div>
                                            <div className="text-xs text-slate-400">{user.company}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-cyan-400 font-semibold">{user.score} pts</div>
                                        <div className="text-slate-400 text-sm">{user.problems} problems</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Become a Better Coder?</h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                            Join over 2 million developers who are already improving their skills with our platform. Start your coding journey today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/problems')}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-lg flex items-center gap-3 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                            >
                                <Code size={24} />
                                Explore Problems
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/signup')}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl text-lg flex items-center gap-3 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                            >
                                <ArrowRight size={24} />
                                Join Now
                            </motion.button>
                        </div>
                    </motion.div>
                </section>
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

export default EnhancedHomepage;