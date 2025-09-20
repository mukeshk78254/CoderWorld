import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    Code, Trophy, Users, TrendingUp, Target, Zap, Flame, 
    CheckCircle, Clock, MessageSquare, Eye, Star, Award,
    Calendar, BarChart3, Activity, Filter, Search, Plus, X, Heart
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animated Background Component
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    opacity: Math.random() * 0.6 + 0.4,
                    color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
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

// Problem Card Component with Solved Status
const ProblemCard = ({ problem, isSolved, onSolve, onStartDiscussion }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { y: 50, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }
        );
    }, []);

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
        <motion.div
            ref={cardRef}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative group bg-slate-900/60 border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${
                isSolved ? 'border-green-500/50 bg-green-500/5' : 'border-slate-800 hover:border-cyan-400/50'
            }`}
        >
            {/* Solved Badge */}
            {isSolved && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                </div>
            )}

            <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        isSolved ? 'text-green-400' : 'text-white group-hover:text-cyan-400'
                    }`}>
                        {problem.title}
                    </h3>
                    {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tagsArray.slice(0, 3).map((tag, tagIndex) => (
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

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{Math.floor(Math.random() * 500) + 50} solved</span>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => onSolve(problem)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            isSolved 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
                        }`}
                    >
                        {isSolved ? 'Solved' : 'Solve'}
                    </button>
                    <button
                        onClick={() => onStartDiscussion(problem)}
                        className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-colors"
                    >
                        Discuss
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Discussion Modal Component
const DiscussionModal = ({ isOpen, onClose, problem, onPost }) => {
    const [discussionText, setDiscussionText] = useState('');
    const [discussions, setDiscussions] = useState([
        {
            id: 1,
            user: 'CodeMaster123',
            text: 'Great problem! I used dynamic programming approach.',
            timestamp: '2 hours ago',
            likes: 5
        },
        {
            id: 2,
            user: 'AlgoNinja',
            text: 'Alternative solution using greedy algorithm works too.',
            timestamp: '1 hour ago',
            likes: 3
        }
    ]);

    const handlePost = () => {
        if (discussionText.trim()) {
            const newDiscussion = {
                id: discussions.length + 1,
                user: 'You',
                text: discussionText,
                timestamp: 'Just now',
                likes: 0
            };
            setDiscussions([newDiscussion, ...discussions]);
            setDiscussionText('');
            onPost(newDiscussion);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Discussion: {problem?.title}</h3>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                {/* Post New Discussion */}
                <div className="mb-6">
                    <textarea
                        value={discussionText}
                        onChange={(e) => setDiscussionText(e.target.value)}
                        placeholder="Share your thoughts, approach, or ask questions..."
                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 resize-none"
                        rows={3}
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handlePost}
                            disabled={!discussionText.trim()}
                            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                        >
                            Post Discussion
                        </button>
                    </div>
                </div>

                {/* Discussions List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {discussions.map((discussion) => (
                        <div key={discussion.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">
                                            {discussion.user.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{discussion.user}</div>
                                        <div className="text-slate-400 text-sm">{discussion.timestamp}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors">
                                        <Heart size={16} />
                                        <span className="text-sm">{discussion.likes}</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-slate-300">{discussion.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Leaderboard Component
const Leaderboard = ({ users, currentUser }) => {
    return (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Leaderboard</h3>
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-slate-400" />
                    <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-white text-sm">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {users.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                            user.id === currentUser?.id 
                                ? 'bg-cyan-500/20 border border-cyan-500/30' 
                                : 'bg-slate-800/50 hover:bg-slate-800/70'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0 ? 'bg-yellow-500 text-black' :
                                index === 1 ? 'bg-gray-400 text-black' :
                                index === 2 ? 'bg-orange-500 text-white' :
                                'bg-slate-600 text-white'
                            }`}>
                                {index + 1}
                            </div>
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="text-white font-medium">{user.name}</div>
                                <div className="text-slate-400 text-sm">{user.company}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-cyan-400 font-bold">{user.score} pts</div>
                            <div className="text-slate-400 text-sm">{user.problemsSolved} problems</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Main Dashboard Component
function EnhancedDashboard() {
    const { user: currentUser } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('problems');
    const [showDiscussion, setShowDiscussion] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');

    const [leaderboardUsers, setLeaderboardUsers] = useState([
        { id: 1, name: 'CodeMaster', company: 'Google', score: 2450, problemsSolved: 156 },
        { id: 2, name: 'AlgoNinja', company: 'Amazon', score: 2380, problemsSolved: 142 },
        { id: 3, name: 'DataStruct', company: 'Microsoft', score: 2290, problemsSolved: 138 },
        { id: 4, name: 'BinaryTree', company: 'Apple', score: 2150, problemsSolved: 125 },
        { id: 5, name: 'QuickSort', company: 'Meta', score: 2080, problemsSolved: 118 },
        { id: 6, name: currentUser?.firstname || 'You', company: 'Your Company', score: 1950, problemsSolved: 95 }
    ]);

    const [stats, setStats] = useState({
        problemsSolved: 95,
        currentStreak: 5,
        maxStreak: 34,
        rank: 1081203,
        reputation: 1,
        views: 107,
        solutions: 3,
        discussions: 0
    });

    // Fetch problems data
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get('/problem/getallproblem');
                setProblems(response.data || []);
                
                // Mock some solved problems
                const mockSolved = new Set(['1', '2', '3']);
                setSolvedProblems(mockSolved);
            } catch (error) {
                console.error('Error fetching problems:', error);
                // Mock data
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
                setSolvedProblems(new Set(['1', '2']));
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".dashboard-section",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
            );
        });

        return () => ctx.revert();
    }, [activeTab]);

    const handleSolveProblem = (problem) => {
        navigate(`/problem/${problem._id}`);
    };

    const handleStartDiscussion = (problem) => {
        setSelectedProblem(problem);
        setShowDiscussion(true);
    };

    const handlePostDiscussion = (discussion) => {
        // Update leaderboard based on discussion activity
        setLeaderboardUsers(prev => 
            prev.map(user => 
                user.id === currentUser?.id 
                    ? { ...user, score: user.score + 5 } // Award points for discussion
                    : user
            )
        );
    };

    const filteredProblems = problems.filter(problem => {
        const matchSearch = searchTerm === '' || problem.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
        return matchSearch && matchDifficulty;
    });

    const tabs = [
        { id: 'problems', label: 'Problems', icon: Code },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'stats', label: 'Statistics', icon: BarChart3 }
    ];

    const renderProblems = () => (
        <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
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
                </div>
            </div>

            {/* Problems Grid */}
            <div className="grid gap-4">
                {filteredProblems.map((problem) => (
                    <ProblemCard
                        key={problem._id}
                        problem={problem}
                        isSolved={solvedProblems.has(problem._id)}
                        onSolve={handleSolveProblem}
                        onStartDiscussion={handleStartDiscussion}
                    />
                ))}
            </div>
        </div>
    );

    const renderStats = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Problems Solved', value: stats.problemsSolved, icon: CheckCircle, color: 'green' },
                    { label: 'Current Streak', value: stats.currentStreak, icon: Flame, color: 'orange' },
                    { label: 'Global Rank', value: `#${stats.rank.toLocaleString()}`, icon: Trophy, color: 'yellow' },
                    { label: 'Reputation', value: stats.reputation, icon: Star, color: 'purple' }
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800/50 rounded-xl p-6 text-center"
                    >
                        <div className={`w-12 h-12 bg-${stat.color}-500 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                            <stat.icon size={24} className="text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Activity Overview</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Views', value: stats.views, change: '+0' },
                        { label: 'Solutions', value: stats.solutions, change: '+0' },
                        { label: 'Discussions', value: stats.discussions, change: '+0' },
                        { label: 'Max Streak', value: stats.maxStreak, change: '' }
                    ].map((item, index) => (
                        <div key={item.label} className="text-center">
                            <div className="text-2xl font-bold text-white">{item.value}</div>
                            <div className="text-slate-400 text-sm">{item.label}</div>
                            {item.change && (
                                <div className="text-green-400 text-xs">{item.change}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
            <AnimatedBackground />
            <Header />
            
            <main className="container mx-auto px-4 py-8 relative z-10">
                {/* Dashboard Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                            <p className="text-slate-400">Track your progress and compete with others</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-cyan-400">#{stats.rank.toLocaleString()}</div>
                            <div className="text-slate-400 text-sm">Global Rank</div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="dashboard-section">
                    <AnimatePresence mode="wait">
                        {activeTab === 'problems' && (
                            <motion.div
                                key="problems"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {renderProblems()}
                            </motion.div>
                        )}
                        {activeTab === 'leaderboard' && (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Leaderboard users={leaderboardUsers} currentUser={currentUser} />
                            </motion.div>
                        )}
                        {activeTab === 'stats' && (
                            <motion.div
                                key="stats"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {renderStats()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Discussion Modal */}
            <DiscussionModal
                isOpen={showDiscussion}
                onClose={() => setShowDiscussion(false)}
                problem={selectedProblem}
                onPost={handlePostDiscussion}
            />
        </div>
    );
}

export default EnhancedDashboard;
