import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter, Code, Target, Zap, Flame } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const ProblemPicker = ({ isOpen, onClose, onSelectProblem, currentProblemId }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchProblems();
        }
    }, [isOpen]);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/problem/getallproblem');
            setProblems(response.data || []);
        } catch (error) {
            console.error('Error fetching problems:', error);
            // Fallback mock data
            setProblems([
                {
                    _id: '1',
                    title: 'Two Sum',
                    difficulty: 'easy',
                    tags: ['array', 'hash table']
                },
                {
                    _id: '2',
                    title: 'Add Two Numbers',
                    difficulty: 'medium',
                    tags: ['linked list', 'math']
                },
                {
                    _id: '3',
                    title: 'Median of Two Sorted Arrays',
                    difficulty: 'hard',
                    tags: ['array', 'binary search']
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProblems = problems.filter(problem => {
        const matchSearch = searchTerm === '' || 
            problem.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDifficulty = difficultyFilter === '' || 
            problem.difficulty === difficultyFilter;
        const matchTag = tagFilter === '' || 
            (Array.isArray(problem.tags) ? problem.tags.includes(tagFilter) : 
             problem.tags?.toLowerCase().includes(tagFilter.toLowerCase()));
        
        return matchSearch && matchDifficulty && matchTag;
    });

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'easy': return <Target size={16} className="text-green-400" />;
            case 'medium': return <Zap size={16} className="text-yellow-400" />;
            case 'hard': return <Flame size={16} className="text-red-400" />;
            default: return <Code size={16} className="text-slate-400" />;
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-500/20 text-green-400';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400';
            case 'hard': return 'bg-red-500/20 text-red-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const uniqueTags = [...new Set(problems.flatMap(p => 
        Array.isArray(p.tags) ? p.tags : [p.tags]
    ))].filter(Boolean);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                    <div
                        className="absolute inset-4 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Problem Picker</h2>
                                <p className="text-slate-400">Choose a problem to solve</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="p-6 border-b border-slate-800">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search problems..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                                        />
                                    </div>
                                </div>

                                {/* Difficulty Filter */}
                                <div className="lg:w-48">
                                    <select
                                        value={difficultyFilter}
                                        onChange={(e) => setDifficultyFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                                    >
                                        <option value="">All Difficulties</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>

                                {/* Tag Filter */}
                                <div className="lg:w-48">
                                    <select
                                        value={tagFilter}
                                        onChange={(e) => setTagFilter(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                                    >
                                        <option value="">All Tags</option>
                                        {uniqueTags.map(tag => (
                                            <option key={tag} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Problems List */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredProblems.map((problem) => (
                                        <div
                                            key={problem._id}
                                            onClick={() => {
                                                onSelectProblem(problem);
                                                onClose();
                                            }}
                                            className={`p-4 bg-slate-800/50 border rounded-xl cursor-pointer transition-all duration-200 ${
                                                problem._id === currentProblemId 
                                                    ? 'border-cyan-500 bg-cyan-500/10' 
                                                    : 'border-slate-700 hover:border-cyan-400/50'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    {getDifficultyIcon(problem.difficulty)}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                                        {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                                                    </span>
                                                </div>
                                                {problem._id === currentProblemId && (
                                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                                )}
                                            </div>
                                            
                                            <h3 className="text-white font-semibold mb-2 line-clamp-2">
                                                {problem.title}
                                            </h3>
                                            
                                            {problem.tags && (
                                                <div className="flex flex-wrap gap-1">
                                                    {(Array.isArray(problem.tags) ? problem.tags : [problem.tags])
                                                        .slice(0, 2)
                                                        .map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!loading && filteredProblems.length === 0 && (
                                <div className="text-center py-12">
                                    <Code size={64} className="mx-auto mb-4 text-slate-600" />
                                    <h3 className="text-xl font-semibold text-white mb-2">No Problems Found</h3>
                                    <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProblemPicker;
