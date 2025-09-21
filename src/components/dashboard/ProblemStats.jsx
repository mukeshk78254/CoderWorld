import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Clock, 
  Cpu, 
  Database, 
  TrendingUp, 
  Users, 
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

// Function to generate your problem URL
const getProblemUrl = (problemId) => {
  if (!problemId) return "#";
  return `/problem/${problemId}`;
};

// Function to get problem stats from backend data
const getProblemStats = (problemId, recentActivity = []) => {
  // Find the problem in recent activity
  const problem = recentActivity.find(activity => 
    activity.problemId === problemId && activity.status === 'accepted'
  );
  
  if (!problem) {
    return {
      title: "Unknown Problem",
      difficulty: "Unknown",
      yourSolution: {
        runtime: "N/A",
        memory: "N/A",
        language: "N/A"
      },
      comparison: {
        betterThan: 0,
        averageRuntime: "N/A",
        averageMemory: "N/A"
      },
      problemLink: getProblemUrl(problemId),
      tags: [],
      attempts: 0,
      solvedOn: "N/A"
    };
  }
  
  return {
    title: problem.problemTitle || "Unknown Problem",
    difficulty: problem.difficulty || "Unknown",
    yourSolution: {
      runtime: problem.runtime || "N/A",
      memory: problem.memory || "N/A",
      language: problem.language || "N/A"
    },
    comparison: {
      betterThan: problem.betterThan || 0,
      averageRuntime: problem.averageRuntime || "N/A",
      averageMemory: problem.averageMemory || "N/A"
    },
    problemLink: getProblemUrl(problemId),
    tags: problem.tags || [],
    attempts: problem.attempts || 1,
    solvedOn: problem.solvedOn || "N/A"
  };
};

function ProblemStats({ selectedProblem, onClose, recentActivity = [] }) {
  const [activeTab, setActiveTab] = useState('performance');
  
  if (!selectedProblem) return null;

  // Add error handling
  if (typeof selectedProblem !== 'string' && typeof selectedProblem !== 'number') {
    console.error('ProblemStats: selectedProblem should be a string or number');
    return null;
  }

  // Get real problem stats from backend data
  const stats = getProblemStats(selectedProblem, recentActivity);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    if (percentage >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">{stats.title}</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(stats.difficulty)}`}>
                  {stats.difficulty}
                </span>
                <div className="flex items-center gap-1 text-sm text-slate-400">
                  <CheckCircle size={16} />
                  Solved in {stats.attempts} attempt{stats.attempts !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <XCircle size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'performance', label: 'Performance', icon: TrendingUp },
              { id: 'details', label: 'Problem Details', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">

            {activeTab === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Runtime Performance */}
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="text-cyan-400" size={20} />
                      <h3 className="font-bold text-white">Runtime</h3>
                    </div>
                    <div className="text-3xl font-black text-cyan-400 mb-2">
                      {stats.yourSolution.runtime}
                    </div>
                    <div className="text-sm text-slate-400 mb-3">
                      Your solution's runtime
                    </div>
                    <div className="text-xs text-slate-500">
                      Average: {stats.comparison.averageRuntime}
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="text-purple-400" size={20} />
                      <h3 className="font-bold text-white">Memory</h3>
                    </div>
                    <div className="text-3xl font-black text-purple-400 mb-2">
                      {stats.yourSolution.memory}
                    </div>
                    <div className="text-sm text-slate-400 mb-3">
                      Your solution's memory usage
                    </div>
                    <div className="text-xs text-slate-500">
                      Average: {stats.comparison.averageMemory}
                    </div>
                  </div>
                </div>

                {/* Performance Comparison */}
                <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/30">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="text-orange-400" size={18} />
                    Performance vs Other Users
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black text-orange-400">
                      {stats.comparison.betterThan}%
                    </div>
                    <div>
                      <div className="text-sm text-slate-300">
                        Better than {stats.comparison.betterThan}% of submissions
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Language: {stats.yourSolution.language}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem Tags */}
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <h3 className="font-bold text-white mb-4">Problem Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {stats.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Solution Info */}
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                    <h3 className="font-bold text-white mb-4">Solution Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Solved on:</span>
                        <span className="text-white">{new Date(stats.solvedOn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Attempts:</span>
                        <span className="text-white">{stats.attempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Language:</span>
                        <span className="text-white">{stats.yourSolution.language}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem Link */}
                <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/30">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <ExternalLink className="text-blue-400" size={18} />
                    Problem Statement
                  </h4>
                  <NavLink
                    to={stats.problemLink}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Problem
                    <ExternalLink size={16} />
                  </NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


export default ProblemStats;
