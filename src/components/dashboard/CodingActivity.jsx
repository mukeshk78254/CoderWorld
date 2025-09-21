import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodingActivity = ({ submissionActivity = [], totalSubmissions = 0, streak = 0 }) => {
  const [viewMode, setViewMode] = useState('year'); // 'year' or 'week'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // 1. Process submission data into a map of { 'YYYY-MM-DD': count }
  const submissionMap = submissionActivity.reduce((acc, timestamp) => {
    const date = new Date(timestamp).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // 2. Generate GitHub-style heatmap data
  const today = new Date();
  const dayData = [];
  
  // Generate data based on view mode
  const daysToShow = viewMode === 'week' ? 7 : 365;
  
  for (let i = daysToShow - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    const dayNumber = date.getDate();
    
    dayData.push({
      date: date,
      dateString: dateString,
      dayName: dayName,
      monthName: monthName,
      dayNumber: dayNumber,
      submissions: submissionMap[dateString] || 0,
      isToday: i === 0,
      isFuture: date > today
    });
  }

  // Generate GitHub-style calendar grid for year view
  const generateCalendarGrid = () => {
    const grid = [];
    const startDate = new Date(selectedYear, 0, 1); // Start from January 1st of selected year
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
    
    for (let week = 0; week < 53; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
      const dateString = currentDate.toISOString().split('T')[0];
        
        weekDays.push({
          date: currentDate,
          dateString: dateString,
          submissions: submissionMap[dateString] || 0,
          isFuture: currentDate > today,
          isSelectedYear: currentDate.getFullYear() === selectedYear
        });
      }
      grid.push(weekDays);
    }
    return grid;
  };

  const calendarGrid = generateCalendarGrid();

  // Helper function to determine the color intensity based on daily submissions (GitHub style)
  const getDayColor = (submissions) => {
    if (submissions === 0) return 'bg-gray-800 hover:bg-gray-700';
    if (submissions === 1) return 'bg-emerald-900 hover:bg-emerald-800';
    if (submissions === 2) return 'bg-emerald-700 hover:bg-emerald-600';
    if (submissions === 3) return 'bg-emerald-500 hover:bg-emerald-400';
    if (submissions >= 4) return 'bg-emerald-300 hover:bg-emerald-200';
    return 'bg-gray-800 hover:bg-gray-700';
  };

  // Enhanced tooltip component
  const EnhancedTooltip = ({ date, submissions, isToday }) => {
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return (
      <div className="bg-slate-900/95 p-3 rounded-lg border border-slate-700 backdrop-blur-md shadow-xl max-w-xs">
        <div className="text-sm font-semibold text-white mb-1">
          {dateStr}
          {isToday && <span className="ml-2 text-cyan-400 text-xs">(Today)</span>}
        </div>
        <div className="text-cyan-400 font-bold text-lg">
          {submissions} submission{submissions !== 1 ? 's' : ''}
        </div>
        {submissions > 0 && (
          <div className="text-xs text-slate-400 mt-1">
            {submissions >= 4 ? '🔥 High activity day!' :
             submissions >= 2 ? '💪 Good progress!' :
             '👍 Nice work!'}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-xl shadow-2xl relative overflow-visible"
      whileHover={{ y: -8, scale: 1.01 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10">                                                             
      <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-black text-white text-xl">
              {viewMode === 'week' ? '📊 7-Day Performance' : '📅 Year Activity'} - {totalSubmissions} submissions
            </h3>                                                       
            <div className="text-xs text-gray-400 mt-1 space-x-4">
              <span>Active days: {Object.keys(submissionMap).length}</span>                                                                               
              <span>Longest streak: {streak} days</span>
              <span>Success rate: {totalSubmissions > 0 ? Math.round((Object.keys(submissionMap).length / 365) * 100) : 0}%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-700/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  viewMode === 'week' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setViewMode('year')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  viewMode === 'year' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                1 Year
              </button>
          </div>
          <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="text-gray-500 hover:text-white transition-colors"
                disabled={selectedYear <= 2020}
              >
                ←
              </button>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-gray-700/50 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                {Array.from({ length: 6 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="text-gray-500 hover:text-white transition-colors"
                disabled={selectedYear >= new Date().getFullYear()}
              >
                →
              </button>
            </div>
          </div>
      </div>

      <div className="space-y-4">
        {/* Day-wise Activity Display */}
        {viewMode === 'week' ? (
          // 7-Day Performance View
          <div className="space-y-4">
            {/* Performance Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {dayData.reduce((sum, day) => sum + day.submissions, 0)}
                  </div>
                  <div className="text-xs text-gray-400">Total Submissions</div>
                </div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {dayData.filter(day => day.submissions > 0).length}
                  </div>
                  <div className="text-xs text-gray-400">Active Days</div>
                </div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {dayData.length > 0 ? Math.round((dayData.reduce((sum, day) => sum + day.submissions, 0) / dayData.length) * 10) / 10 : 0}
                  </div>
                  <div className="text-xs text-gray-400">Avg/Day</div>
                </div>
              </div>
            </div>

            {/* Daily Cards */}
            <div className="grid grid-cols-7 gap-2">
              {dayData.map((day, index) => {
                const tooltipText = `${day.dayName}, ${day.monthName} ${day.dayNumber}: ${day.submissions} submission${day.submissions !== 1 ? 's' : ''}`;
                return (
                  <motion.div
                    key={index}
                    className="tooltip tooltip-top"
                    data-tip={tooltipText}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`rounded-lg p-3 border transition-all duration-300 ${
                      day.isToday 
                        ? 'bg-cyan-500/20 border-cyan-500/50' 
                        : 'bg-gray-700/30 border-gray-600/50 hover:border-cyan-500/50'
                    }`}>
                      <div className="text-center">
                        <div className={`w-8 h-8 mx-auto rounded-lg mb-2 transition-all duration-200 hover:ring-2 hover:ring-cyan-400/50 ${getDayColor(day.submissions)}`}></div>
                        <div className={`text-xs font-semibold mb-1 ${
                          day.isToday ? 'text-cyan-400' : 'text-white'
                        }`}>
                          {day.dayName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {day.submissions}
                        </div>
                        <div className="text-xs text-gray-500">
                          {day.monthName} {day.dayNumber}
                        </div>
                        {day.isToday && (
                          <div className="text-xs text-cyan-400 font-semibold mt-1">
                            Today
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          // Year View - GitHub-style heatmap
          <div className="space-y-2">
            <div className="flex gap-1 overflow-x-auto p-2">
              <div className="flex flex-col text-xs text-gray-500 justify-between py-1 min-w-[20px]">                                                                              
          <span></span>
          <span>Mon</span>
          <span></span>
          <span>Wed</span>
          <span></span>
          <span>Fri</span>
          <span></span>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between text-xs text-gray-400 mb-2 px-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => 
                    <span key={i}>{month}</span>
                  )}       
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-visible">
            {calendarGrid.flat().map((day, index) => {
                    if (!day.isSelectedYear) return null;
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    
                    return (
                      <motion.div 
                        key={index} 
                        className="group relative"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-4 h-4 rounded-sm transition-all duration-200 cursor-pointer ${day.isFuture ? 'bg-transparent' : getDayColor(day.submissions)} ${isToday ? 'ring-2 ring-cyan-400/70' : ''}`} />
                        
                        {/* Enhanced tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[99999] pointer-events-none" style={{ position: 'absolute' }}>
                          <EnhancedTooltip 
                            date={day.date} 
                            submissions={day.submissions} 
                            isToday={isToday}
                          />
                        </div>
                      </motion.div>
                    );
            })}
          </div>
        </div>
      </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-xs text-gray-400">
          <span className="text-cyan-400 font-semibold">💡 Tip:</span> 
          {viewMode === 'week' 
            ? ' Each block shows daily submissions. Darker green = more submissions per day!' 
            : ' Each square represents a day. Darker green = more submissions on that day!'
          }
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>No Activity</span>
          <div className="w-4 h-4 rounded-sm bg-gray-800 mx-1"></div>
          <div className="w-4 h-4 rounded-sm bg-emerald-900 mx-1"></div>
          <div className="w-4 h-4 rounded-sm bg-emerald-700 mx-1"></div>
          <div className="w-4 h-4 rounded-sm bg-emerald-500 mx-1"></div>
          <div className="w-4 h-4 rounded-sm bg-emerald-400 mx-1"></div>
          <div className="w-4 h-4 rounded-sm bg-emerald-300 mx-1"></div>
          <span>High Activity</span>
      </div>
    </div>
      </div>
    </motion.div>
  );
};

export default CodingActivity;