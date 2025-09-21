import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  Zap, 
  Crown, 
  Award, 
  Medal,
  CheckCircle,
  Lock,
  Calendar,
  Code,
  Brain,
  Rocket,
  Diamond
} from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
};

// Badge definitions with requirements and rewards
const badgeDefinitions = [
  {
    id: 'first_problem',
    title: 'First Steps',
    description: 'Solve your first problem',
    icon: Target,
    color: 'text-green-400 bg-green-500/20 border-green-500/30',
    requirement: 1,
    type: 'problems_solved',
    rarity: 'common'
  },
  {
    id: 'streak_3',
    title: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: Flame,
    color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
    requirement: 3,
    type: 'streak',
    rarity: 'common'
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: Zap,
    color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    requirement: 7,
    type: 'streak',
    rarity: 'uncommon'
  },
  {
    id: 'streak_30',
    title: 'Streak Master',
    description: 'Maintain a 30-day streak',
    icon: Crown,
    color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    requirement: 30,
    type: 'streak',
    rarity: 'legendary'
  },
  {
    id: 'problems_10',
    title: 'Problem Solver',
    description: 'Solve 10 problems',
    icon: Code,
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    requirement: 10,
    type: 'problems_solved',
    rarity: 'common'
  },
  {
    id: 'problems_50',
    title: 'Code Warrior',
    description: 'Solve 50 problems',
    icon: Brain,
    color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    requirement: 50,
    type: 'problems_solved',
    rarity: 'uncommon'
  },
  {
    id: 'problems_100',
    title: 'Century Club',
    description: 'Solve 100 problems',
    icon: Trophy,
    color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
    requirement: 100,
    type: 'problems_solved',
    rarity: 'rare'
  },
  {
    id: 'easy_master',
    title: 'Easy Master',
    description: 'Solve 25 easy problems',
    icon: Star,
    color: 'text-green-400 bg-green-500/20 border-green-500/30',
    requirement: 25,
    type: 'easy_problems',
    rarity: 'uncommon'
  },
  {
    id: 'medium_master',
    title: 'Medium Master',
    description: 'Solve 15 medium problems',
    icon: Medal,
    color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    requirement: 15,
    type: 'medium_problems',
    rarity: 'rare'
  },
  {
    id: 'hard_master',
    title: 'Hard Master',
    description: 'Solve 5 hard problems',
    icon: Diamond,
    color: 'text-red-400 bg-red-500/20 border-red-500/30',
    requirement: 5,
    type: 'hard_problems',
    rarity: 'epic'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Solve 5 problems in one day',
    icon: Rocket,
    color: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
    requirement: 5,
    type: 'daily_problems',
    rarity: 'rare'
  },
  {
    id: 'consistency',
    title: 'Consistency King',
    description: 'Solve problems for 14 consecutive days',
    icon: Calendar,
    color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    requirement: 14,
    type: 'streak',
    rarity: 'uncommon'
  }
];

function Badges({ stats = {} }) {
  // Calculate earned badges based on stats
  const calculateEarnedBadges = () => {
    const badges = [];
    const { 
      solvedCount = 0, 
      currentStreak = 0, 
      longestStreak = 0,
      solvedStats = { easy: 0, medium: 0, hard: 0 }
    } = stats;

    badgeDefinitions.forEach(badge => {
      let isEarned = false;
      
      switch (badge.type) {
        case 'problems_solved':
          isEarned = solvedCount >= badge.requirement;
          break;
        case 'streak':
          isEarned = longestStreak >= badge.requirement;
          break;
        case 'easy_problems':
          isEarned = solvedStats.easy >= badge.requirement;
          break;
        case 'medium_problems':
          isEarned = solvedStats.medium >= badge.requirement;
          break;
        case 'hard_problems':
          isEarned = solvedStats.hard >= badge.requirement;
          break;
        case 'daily_problems':
          // Mock data - in real app, this would come from daily submission data
          isEarned = false; // Would check if user solved 5+ problems in a single day
          break;
        default:
          isEarned = false;
      }

      if (isEarned) {
        badges.push({
          ...badge,
          earned: true,
          earnedAt: new Date().toISOString(), // Mock date
          progress: 100
        });
      } else {
        // Calculate progress for unearned badges
        let progress = 0;
        switch (badge.type) {
          case 'problems_solved':
            progress = Math.min((solvedCount / badge.requirement) * 100, 100);
            break;
          case 'streak':
            progress = Math.min((longestStreak / badge.requirement) * 100, 100);
            break;
          case 'easy_problems':
            progress = Math.min((solvedStats.easy / badge.requirement) * 100, 100);
            break;
          case 'medium_problems':
            progress = Math.min((solvedStats.medium / badge.requirement) * 100, 100);
            break;
          case 'hard_problems':
            progress = Math.min((solvedStats.hard / badge.requirement) * 100, 100);
            break;
        }
        
        badges.push({
          ...badge,
          earned: false,
          progress: Math.round(progress)
        });
      }
    });

    return badges;
  };

  const badges = calculateEarnedBadges();
  const earnedBadges = badges.filter(b => b.earned !== false);
  const unearnedBadges = badges.filter(b => b.earned === false);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityGlow = (rarity) => {
    switch (rarity) {
      case 'common': return '';
      case 'uncommon': return 'shadow-green-500/25';
      case 'rare': return 'shadow-blue-500/25';
      case 'epic': return 'shadow-purple-500/25';
      case 'legendary': return 'shadow-yellow-500/25';
      default: return '';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl"
      whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400" size={24} />
          <h3 className="font-black text-white text-lg">🏆 Badges & Achievements</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">{earnedBadges.length}</div>
          <div className="text-xs text-gray-500">Earned</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Overall Progress</span>
          <span className="text-sm text-cyan-400 font-semibold">
            {Math.round((earnedBadges.length / badges.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-400" size={18} />
            Earned Badges ({earnedBadges.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${badge.color} ${getRarityGlow(badge.rarity)} shadow-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <badge.icon size={24} />
                  <div>
                    <h5 className="font-bold text-white text-sm">{badge.title}</h5>
                    <p className="text-xs opacity-75">{badge.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity.toUpperCase()}
                  </span>
                  <span className="text-xs opacity-75">
                    {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : 'Earned!'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Unearned Badges */}
      {unearnedBadges.length > 0 && (
        <div>
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="text-gray-400" size={18} />
            Upcoming Badges ({unearnedBadges.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unearnedBadges.slice(0, 6).map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (earnedBadges.length + index) * 0.1 }}
                className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 opacity-75"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Lock size={20} className="text-gray-500" />
                  <div>
                    <h5 className="font-bold text-gray-300 text-sm">{badge.title}</h5>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{badge.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      transition={{ duration: 0.8, delay: (earnedBadges.length + index) * 0.1 + 0.5 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-gray-500 to-gray-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {unearnedBadges.length > 6 && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                And {unearnedBadges.length - 6} more badges to unlock...
              </span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Badges;
