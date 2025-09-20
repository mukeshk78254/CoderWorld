import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Code, Play, CheckCircle, XCircle, Clock, Star, 
    Zap, Target, Trophy, Flame, Brain, Rocket,
    ChevronRight, ChevronLeft, RotateCcw, Save,
    Eye, EyeOff, Maximize, Minimize, Settings,
    Search, Filter, SortAsc, SortDesc, Plus, Users
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Floating Code Particles
const CodeParticles = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const particles = [];
        const codeSymbols = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/'];

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute text-cyan-400/20 font-mono text-sm pointer-events-none';
            particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            container.appendChild(particle);
            particles.push(particle);
        }

        particles.forEach((particle, index) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 1.5 + 0.5,
                rotation: Math.random() * 360,
            });

            gsap.to(particle, {
                x: `+=${Math.random() * 400 - 200}`,
                y: `+=${Math.random() * 400 - 200}`,
                rotation: `+=${Math.random() * 720 - 360}`,
                duration: Math.random() * 15 + 10,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                delay: index * 0.2,
            });
        });

        return () => {
            particles.forEach(particle => particle.remove());
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
};

// Enhanced Problem Card with Advanced Animations
const UltraProblemCard = ({ problem, index, onSolve }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 100, opacity: 0, scale: 0.8, rotation: -10 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1,
                delay: index * 0.1,
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
            duration: 3 + index * 0.1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.1
        });
    }, [index]);

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
            case 'easy': return <CheckCircle size={20} className="text-emerald-400" />;
            case 'medium': return <Target size={20} className="text-amber-400" />;
            case 'hard': return <Flame size={20} className="text-red-400" />;
            default: return <Code size={20} className="text-slate-400" />;
        }
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 overflow-hidden cursor-pointer"
            onClick={() => onSolve(problem)}
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                            {problem.title}
                        </h3>
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                            {problem.description}
                        </p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white flex items-center gap-1`}>
                        {getDifficultyIcon(problem.difficulty)}
                        {problem.difficulty}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{Math.floor(Math.random() * 30) + 5} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={16} />
                            <span>{Math.floor(Math.random() * 5) + 1}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{Math.floor(Math.random() * 1000) + 100} solved</span>
                        </div>
                    </div>
                    
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ChevronRight size={20} className="text-cyan-400" />
                    </motion.div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {problem.tags?.map((tag, tagIndex) => (
                        <motion.span
                            key={tag}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: tagIndex * 0.1 }}
                            className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-xs font-medium"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Search and Filter Bar
const UltraSearchBar = ({ searchTerm, setSearchTerm, difficultyFilter, setDifficultyFilter, sortBy, setSortBy }) => {
    const searchRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(searchRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <motion.div
            ref={searchRef}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm mb-8"
        >
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search problems..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                    />
                </div>

                {/* Difficulty Filter */}
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Sort By */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="difficulty">By Difficulty</option>
                    <option value="popularity">Most Popular</option>
                </select>
            </div>
        </motion.div>
    );
};

// Enhanced Stats Overview
const UltraStatsOverview = ({ stats }) => {
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
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
                { label: 'Total Problems', value: stats?.totalProblems || 0, icon: Code, color: 'from-cyan-500 to-blue-500' },
                { label: 'Easy', value: stats?.easy || 0, icon: CheckCircle, color: 'from-emerald-500 to-green-500' },
                { label: 'Medium', value: stats?.medium || 0, icon: Target, color: 'from-amber-500 to-orange-500' },
                { label: 'Hard', value: stats?.hard || 0, icon: Flame, color: 'from-red-500 to-pink-500' }
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
                                <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Main Ultra Homepage Component
function UltraHomepage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [stats, setStats] = useState({});

    // Fetch problems data
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/problem/getall');
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

    // Filter and sort problems
    const filteredProblems = problems
        .filter(problem => {
            const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                problem.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'difficulty':
                    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                case 'popularity':
                    return Math.random() - 0.5; // Mock popularity
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    const handleSolveProblem = (problem) => {
        navigate(`/problem/${problem._id}`);
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
                    <p className="text-2xl text-slate-400 font-medium">Loading problems...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <CodeParticles />
                
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
                        Coding Problems
                    </h1>
                    <p className="text-2xl text-slate-400 max-w-4xl mx-auto">
                        Master your coding skills with our curated collection of algorithmic challenges! 🚀
                    </p>
                </motion.div>

                {/* Stats Overview */}
                <UltraStatsOverview stats={stats} />

                {/* Search and Filter */}
                <UltraSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    difficultyFilter={difficultyFilter}
                    setDifficultyFilter={setDifficultyFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Problems Grid */}
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <AnimatePresence>
                        {filteredProblems.map((problem, index) => (
                            <UltraProblemCard
                                key={problem._id}
                                problem={problem}
                                index={index}
                                onSolve={handleSolveProblem}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProblems.length === 0 && (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Code size={80} className="mx-auto mb-6 text-slate-600" />
                        <h3 className="text-2xl font-bold text-white mb-4">No Problems Found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default UltraHomepage;
