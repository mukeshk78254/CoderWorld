import React from 'react';
import { motion } from 'framer-motion';

const SolvedSkills = ({ solvedTags = [], solvedStats = {} }) => {
  // Helper function to get tag color
  const getTagColor = (tag, index) => {
    const colors = [
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'bg-green-500/20 text-green-400 border-green-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bg-red-500/20 text-red-400 border-red-500/30',
      'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'bg-teal-500/20 text-teal-400 border-teal-500/30'
    ];
    return colors[index % colors.length];
  };

  // Helper function to get bubble size based on count
  const getBubbleSize = (count) => {
    if (count <= 1) return 'w-8 h-8 text-xs';
    if (count <= 3) return 'w-12 h-12 text-sm';
    if (count <= 5) return 'w-16 h-16 text-base';
    if (count <= 10) return 'w-20 h-20 text-lg';
    return 'w-24 h-24 text-xl';
  };

  // Calculate total solved problems
  const totalSolved = Object.values(solvedStats).reduce((sum, count) => sum + count, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-black text-white text-lg">🎯 Solved Skills</h3>
          <p className="text-sm text-gray-400 mt-1">
            {totalSolved} problems solved across {solvedTags.length} different topics
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">{totalSolved}</div>
          <div className="text-xs text-gray-500">Total Solved</div>
        </div>
      </div>

      {solvedTags.length > 0 ? (
        <div className="space-y-6">
          {/* Bubble Visualization */}
          <div className="flex flex-wrap gap-4 justify-center items-center min-h-[200px] p-4">
            {solvedTags.map((tag, index) => {
              const count = solvedStats[tag.toLowerCase()] || 0;
              const colorClass = getTagColor(tag, index);
              const sizeClass = getBubbleSize(count);
              
              return (
                <motion.div
                  key={tag}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="tooltip tooltip-top"
                  data-tip={`${tag}: ${count} problems solved`}
                >
                  <div className={`
                    ${sizeClass} 
                    ${colorClass}
                    rounded-full 
                    border-2 
                    flex 
                    items-center 
                    justify-center 
                    font-semibold 
                    cursor-pointer 
                    hover:shadow-lg 
                    hover:shadow-cyan-500/25 
                    transition-all 
                    duration-300
                    relative
                    group
                  `}>
                    <span className="font-bold">{count}</span>
                    
                    {/* Tag name on hover */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {tag}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Tag List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {solvedTags.map((tag, index) => {
              const count = solvedStats[tag.toLowerCase()] || 0;
              const percentage = totalSolved > 0 ? Math.round((count / totalSolved) * 100) : 0;
              const colorClass = getTagColor(tag, index);
              
              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${colorClass} hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{tag}</div>
                      <div className="text-xs opacity-75">{percentage}% of total</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{count}</div>
                      <div className="text-xs opacity-75">solved</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2 w-full bg-gray-700/50 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No solved problems yet</div>
          <div className="text-gray-600 text-sm">Start solving problems to see your skills here!</div>
        </div>
      )}
    </motion.div>
  );
};

export default SolvedSkills;

