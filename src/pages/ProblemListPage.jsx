import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
    Code, Search, Filter, Star, Clock, Users, 
    ChevronRight, ChevronDown, Zap, Target, 
    Trophy, Flame, Brain, Rocket, Sparkles,
    ArrowLeft, SortAsc, SortDesc
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Simple Problem Card for List View - No Transitions
const ProblemListCard = ({ problem, onSolve }) => {
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
                    
                    {/* Tags from backend */}
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

// Enhanced Search and Filter Bar
const ProblemSearchBar = ({ searchTerm, setSearchTerm, difficultyFilter, setDifficultyFilter, sortBy, setSortBy, uniqueTags, tagFilter, setTagFilter }) => {
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
                        placeholder="Search problems by title or description..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-lg"
                    />
                </div>

                {/* Difficulty Filter */}
                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-lg"
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Tag Filter */}
                <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-lg"
                >
                    <option value="">All Tags</option>
                    {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                {/* Sort By */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-lg"
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

// Enhanced Stats Overview with Tag Counts
const ProblemStatsOverview = ({ stats }) => {
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

    // Get top tags by count
    const topTags = stats?.tagCounts ? 
        Object.entries(stats.tagCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 4) : [];

    return (
        <div className="space-y-8 mb-8">
            {/* Main Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Problems', value: stats?.totalProblems || 0, icon: Code, color: 'from-cyan-500 to-blue-500' },
                    { label: 'Easy', value: stats?.easy || 0, icon: Target, color: 'from-emerald-500 to-green-500' },
                    { label: 'Medium', value: stats?.medium || 0, icon: Zap, color: 'from-amber-500 to-orange-500' },
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

            {/* Tag-based Stats */}
            {topTags.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
                >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        <Sparkles size={24} className="text-cyan-400" />
                        Problems by Tags
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {topTags.map(([tag, count], index) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center group hover:border-cyan-400/50 transition-all duration-300"
                            >
                                <div className="text-2xl font-bold text-cyan-400 group-hover:text-white transition-colors duration-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                    {count}
                                </div>
                                <div className="text-sm text-slate-400 mt-1 capitalize" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                                    {tag}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// Main Problem List Page Component
function ProblemListPage() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [stats, setStats] = useState({});

    const headerRef = useRef(null);
    const titleRef = useRef(null);

    // Fetch problems data
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/problem/getallproblem');
                setProblems(response.data || []);
                
                // Calculate stats including tag-based counts
                const allProblems = response.data || [];
                const tagCounts = {};
                
                allProblems.forEach(problem => {
                    let problemTags = [];
                    if (Array.isArray(problem.tags)) {
                        problemTags = problem.tags;
                    } else if (typeof problem.tags === 'string') {
                        problemTags = problem.tags.split(',').map(t => t.trim());
                    }
                    
                    problemTags.forEach(tag => {
                        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    });
                });

                const problemStats = {
                    totalProblems: allProblems.length,
                    easy: allProblems.filter(p => p.difficulty === 'easy').length,
                    medium: allProblems.filter(p => p.difficulty === 'medium').length,
                    hard: allProblems.filter(p => p.difficulty === 'hard').length,
                    tagCounts: tagCounts
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
                    },
                    {
                        _id: '5',
                        title: 'Longest Palindromic Substring',
                        description: 'Given a string s, return the longest palindromic substring in s.',
                        difficulty: 'medium',
                        tags: ['string', 'dynamic programming']
                    },
                    {
                        _id: '6',
                        title: 'ZigZag Conversion',
                        description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows.',
                        difficulty: 'medium',
                        tags: ['string']
                    }
                ];
                setProblems(mockProblems);
                
                // Calculate tag counts for mock data
                const tagCounts = {};
                mockProblems.forEach(problem => {
                    let problemTags = [];
                    if (Array.isArray(problem.tags)) {
                        problemTags = problem.tags;
                    } else if (typeof problem.tags === 'string') {
                        problemTags = problem.tags.split(',').map(t => t.trim());
                    }
                    
                    problemTags.forEach(tag => {
                        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    });
                });

                setStats({
                    totalProblems: mockProblems.length,
                    easy: mockProblems.filter(p => p.difficulty === 'easy').length,
                    medium: mockProblems.filter(p => p.difficulty === 'medium').length,
                    hard: mockProblems.filter(p => p.difficulty === 'hard').length,
                    tagCounts: tagCounts
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // Auto-update stats when problems change
    useEffect(() => {
        if (problems.length > 0) {
            const tagCounts = {};
            
            problems.forEach(problem => {
                let problemTags = [];
                if (Array.isArray(problem.tags)) {
                    problemTags = problem.tags;
                } else if (typeof problem.tags === 'string') {
                    problemTags = problem.tags.split(',').map(t => t.trim());
                }
                
                problemTags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });

            const newStats = {
                totalProblems: problems.length,
                easy: problems.filter(p => p.difficulty === 'easy').length,
                medium: problems.filter(p => p.difficulty === 'medium').length,
                hard: problems.filter(p => p.difficulty === 'hard').length,
                tagCounts: tagCounts
            };
            setStats(newStats);
        }
    }, [problems]);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title typing effect
            gsap.to(titleRef.current, {
                text: "All Problems",
                duration: 2,
                ease: "none",
                delay: 0.5
            });

            // Header animation
            gsap.fromTo(headerRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Filter and sort problems
    const filteredProblems = problems.filter(problem => {
        const matchSearch = searchTerm === '' || 
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
        
        let problemTags = [];
        if (Array.isArray(problem.tags)) {
            problemTags = problem.tags.map(t => t.toLowerCase());
        } else if (typeof problem.tags === 'string') {
            problemTags = problem.tags.split(',').map(t => t.trim().toLowerCase());
        }
        const matchTag = !tagFilter || problemTags.includes(tagFilter);
        
        return matchSearch && matchDifficulty && matchTag;
    }).sort((a, b) => {
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

    const uniqueTags = Array.from(new Set(
        problems.flatMap(problem => 
            Array.isArray(problem.tags) ? problem.tags : 
            typeof problem.tags === 'string' ? problem.tags.split(',').map(t => t.trim()) : []
        )
    )).sort();

    const handleSolveProblem = (problem) => {
        navigate(`/problem/${problem._id}`);
    };

    // Function to refresh stats (can be called when new problems are added)
    const refreshStats = () => {
        const allProblems = problems;
        const tagCounts = {};
        
        allProblems.forEach(problem => {
            let problemTags = [];
            if (Array.isArray(problem.tags)) {
                problemTags = problem.tags;
            } else if (typeof problem.tags === 'string') {
                problemTags = problem.tags.split(',').map(t => t.trim());
            }
            
            problemTags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const newStats = {
            totalProblems: allProblems.length,
            easy: allProblems.filter(p => p.difficulty === 'easy').length,
            medium: allProblems.filter(p => p.difficulty === 'medium').length,
            hard: allProblems.filter(p => p.difficulty === 'hard').length,
            tagCounts: tagCounts
        };
        setStats(newStats);
    };

    // Function to add a new problem (for when new problems are created)
    const addNewProblem = (newProblem) => {
        setProblems(prev => [...prev, newProblem]);
        // Stats will be automatically updated when problems state changes
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
                            animation: 'gradientShift 3s ease-in-out infinite'
                        }}
                    >
                        {/* Text will be filled by GSAP */}
                    </motion.h1>
                    
                </motion.div>

                {/* Stats Overview */}
                <ProblemStatsOverview stats={stats} />

                {/* Search and Filter */}
                <ProblemSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    difficultyFilter={difficultyFilter}
                    setDifficultyFilter={setDifficultyFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    uniqueTags={uniqueTags}
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                />

                {/* Problems List - Vertical Layout, No Transitions */}
                <div className="space-y-4">
                    {filteredProblems.map((problem) => (
                            <ProblemListCard
                                key={problem._id}
                                problem={problem}
                                onSolve={handleSolveProblem}
                            />
                        ))}
                </div>

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

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </div>
    );
}

export default ProblemListPage;

