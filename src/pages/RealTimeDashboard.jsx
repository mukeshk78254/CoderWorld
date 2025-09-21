import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Activity,
  Zap,
  Award,
  Users,
  Code,
  Brain,
  Star,
  Flame,
  Timer,
  BookOpen,
  TrendingDown
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const RealTimeDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch real dashboard data from backend
  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const response = await axiosClient.get(`/user/${user.id}/dashboard-pro`);
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.id) {
        fetchDashboardData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.id]);

  // Calculate streak status
  const getStreakStatus = (currentStreak) => {
    if (currentStreak === 0) return { status: 'broken', color: 'text-red-400', bgColor: 'bg-red-500/10' };
    if (currentStreak >= 30) return { status: 'legendary', color: 'text-purple-400', bgColor: 'bg-purple-500/10' };
    if (currentStreak >= 14) return { status: 'epic', color: 'text-pink-400', bgColor: 'bg-pink-500/10' };
    if (currentStreak >= 7) return { status: 'fire', color: 'text-orange-400', bgColor: 'bg-orange-500/10' };
    if (currentStreak >= 3) return { status: 'good', color: 'text-green-400', bgColor: 'bg-green-500/10' };
    return { status: 'building', color: 'text-blue-400', bgColor: 'bg-blue-500/10' };
  };

  // Calculate performance grade
  const getPerformanceGrade = (solvedCount, totalSubmissions) => {
    const successRate = totalSubmissions > 0 ? (solvedCount / totalSubmissions) * 100 : 0;
    if (successRate >= 80) return { grade: 'A+', color: 'text-green-400', bgColor: 'bg-green-500/20' };
    if (successRate >= 70) return { grade: 'A', color: 'text-green-300', bgColor: 'bg-green-500/15' };
    if (successRate >= 60) return { grade: 'B+', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' };
    if (successRate >= 50) return { grade: 'B', color: 'text-yellow-300', bgColor: 'bg-yellow-500/15' };
    if (successRate >= 40) return { grade: 'C+', color: 'text-orange-400', bgColor: 'bg-orange-500/20' };
    if (successRate >= 30) return { grade: 'C', color: 'text-orange-300', bgColor: 'bg-orange-500/15' };
    return { grade: 'D', color: 'text-red-400', bgColor: 'bg-red-500/20' };
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const streakStatus = getStreakStatus(dashboardData.currentStreak);
  const performanceGrade = getPerformanceGrade(dashboardData.solvedCount, dashboardData.totalSubmissions);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/20"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-8 h-8"
                >
                  <img 
                    src="/src/pages/2896418.png" 
                    alt="CoderWorld Logo" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user?.firstname}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchDashboardData}
                disabled={refreshing}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <motion.div
                  animate={refreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                >
                  <Activity className="w-4 h-4" />
                </motion.div>
                Refresh
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Problems Solved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Problems Solved</p>
                <p className="text-3xl font-bold text-cyan-400">{dashboardData.solvedCount}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {dashboardData.totalStats ? 
                    `${dashboardData.solvedCount}/${Object.values(dashboardData.totalStats).reduce((a, b) => a + b, 0)} total` 
                    : '0 total'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 ${streakStatus.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>
                <p className={`text-3xl font-bold ${streakStatus.color}`}>{dashboardData.currentStreak}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {streakStatus.status === 'legendary' ? '🏆 Legendary!' : 
                   streakStatus.status === 'epic' ? '⚡ Epic streak!' : 
                   streakStatus.status === 'fire' ? '🔥 On fire!' : 
                   streakStatus.status === 'good' ? 'Keep it up!' : 
                   streakStatus.status === 'building' ? 'Building momentum' : 'Start coding!'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${streakStatus.bgColor}`}>
                {streakStatus.status === 'legendary' ? (
                  <Trophy className={`w-6 h-6 ${streakStatus.color}`} />
                ) : streakStatus.status === 'epic' ? (
                  <Star className={`w-6 h-6 ${streakStatus.color}`} />
                ) : streakStatus.status === 'fire' ? (
                  <Flame className={`w-6 h-6 ${streakStatus.color}`} />
                ) : (
                  <Zap className={`w-6 h-6 ${streakStatus.color}`} />
                )}
              </div>
            </div>
          </motion.div>

          {/* Total Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Submissions</p>
                <p className="text-3xl font-bold text-blue-400">{dashboardData.totalSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {dashboardData.totalSubmissions > 0 ? 
                    `${Math.round((dashboardData.successfulSubmissions / dashboardData.totalSubmissions) * 100)}% success rate` 
                    : 'No submissions yet'
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Performance Grade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 ${performanceGrade.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Performance</p>
                <p className={`text-3xl font-bold ${performanceGrade.color}`}>{performanceGrade.grade}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {dashboardData.totalSubmissions > 0 ? 
                    `${Math.round((dashboardData.successfulSubmissions / dashboardData.totalSubmissions) * 100)}% accuracy` 
                    : 'No data yet'
                  }
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${performanceGrade.bgColor}`}>
                <Award className={`w-6 h-6 ${performanceGrade.color}`} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {dashboardData.performanceData?.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-sm text-gray-400">{day.name}</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((day.submissions / 10) * 100, 100)}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-sm text-gray-300">{day.submissions}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Difficulty Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Difficulty Breakdown</h3>
              <div className="space-y-4">
                {['easy', 'medium', 'hard'].map((difficulty) => {
                  const solved = dashboardData.solvedStats?.[difficulty] || 0;
                  const total = dashboardData.totalStats?.[difficulty] || 0;
                  const percentage = total > 0 ? (solved / total) * 100 : 0;
                  
                  return (
                    <div key={difficulty} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`capitalize px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                          {difficulty}
                        </span>
                        <span className="text-sm text-gray-400">{solved}/{total}</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.7, duration: 1 }}
                          className={`h-2 rounded-full ${
                            difficulty === 'easy' ? 'bg-green-500' :
                            difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Language Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Language Usage</h3>
              <div className="space-y-3">
                {dashboardData.languageStats?.map((lang, index) => {
                  const percentage = dashboardData.totalSubmissions > 0 ? 
                    Math.round((lang.count / dashboardData.totalSubmissions) * 100) : 0;
                  return (
                    <div key={lang.language} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300 capitalize">
                          {lang.language}
                        </span>
                        <span className="text-sm text-gray-400">
                          {lang.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
                {(!dashboardData.languageStats || dashboardData.languageStats.length === 0) && (
                  <p className="text-gray-500 text-sm">No language data yet</p>
                )}
              </div>
            </motion.div>

            {/* Problem Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Solved Problem Tags</h3>
              <div className="flex flex-wrap gap-2">
                {dashboardData.solvedTags?.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                  >
                    {tag}
                  </motion.span>
                ))}
                {(!dashboardData.solvedTags || dashboardData.solvedTags.length === 0) && (
                  <p className="text-gray-500 text-sm">No problems solved yet</p>
                )}
              </div>
            </motion.div>

            {/* Solving Patterns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Solving Patterns</h3>
              <div className="grid grid-cols-2 gap-4">
                {dashboardData.solvingPatterns && Object.entries(dashboardData.solvingPatterns).map(([time, count], index) => (
                  <motion.div
                    key={time}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="text-center p-3 bg-gray-700/50 rounded-lg"
                  >
                    <p className="text-2xl font-bold text-cyan-400">{count}</p>
                    <p className="text-sm text-gray-400 capitalize">{time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-8">
            {/* Recent Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {dashboardData.recentActivity?.map((activity, index) => (
                    <motion.div
                      key={activity._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.status === 'Accepted' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {activity.problemTitle}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {(!dashboardData.recentActivity || dashboardData.recentActivity.length === 0) && (
                  <p className="text-gray-500 text-sm text-center py-8">No recent activity</p>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Today's Submissions</span>
                  <span className="text-white font-semibold">
                    {dashboardData.submissionsToday || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">This Week</span>
                  <span className="text-white font-semibold">
                    {dashboardData.submissionsThisWeek || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-white font-semibold">
                    {dashboardData.submissionsThisMonth || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Longest Streak</span>
                  <span className="text-white font-semibold">
                    {dashboardData.longestStreak || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-white font-semibold">
                    {dashboardData.totalSubmissions > 0 ? 
                      `${Math.round((dashboardData.successfulSubmissions / dashboardData.totalSubmissions) * 100)}%` 
                      : '0%'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avg Runtime</span>
                  <span className="text-white font-semibold">
                    {dashboardData.averageRuntime ? `${dashboardData.averageRuntime}ms` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Problems Attempted</span>
                  <span className="text-white font-semibold">
                    {dashboardData.totalProblemsAttempted || 0}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Streak History */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Recent Streaks</h3>
              <div className="space-y-3">
                {dashboardData.streakHistory?.slice(0, 5).map((streak, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{streak.length} days</p>
                      <p className="text-xs text-gray-400">
                        {new Date(streak.start).toLocaleDateString()} - {new Date(streak.end).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-cyan-400" />
                    </div>
                  </motion.div>
                ))}
                {(!dashboardData.streakHistory || dashboardData.streakHistory.length === 0) && (
                  <p className="text-gray-500 text-sm text-center py-4">No streak history yet</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDashboard;
