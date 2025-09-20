import React from 'react';

const CodingActivity = ({ submissionActivity = [], totalSubmissions = 0, streak = 0 }) => {
  // 1. Process submission data into a map of { 'YYYY-MM-DD': count }
  const submissionMap = submissionActivity.reduce((acc, timestamp) => {
    const date = new Date(timestamp).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // 2. Generate the calendar grid for the past year
  const today = new Date();
  const calendarGrid = []; // This will be an array of weeks
  let currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 1);
  // Start the calendar from the first Sunday before the start date
  currentDate.setDate(currentDate.getDate() - currentDate.getDay()); 

  for (let i = 0; i < 53; i++) { // Render 53 weeks to show a full year
    const week = [];
    for (let j = 0; j < 7; j++) {
      const dateString = currentDate.toISOString().split('T')[0];
      week.push({
        date: new Date(currentDate),
        count: submissionMap[dateString] || 0,
        isFuture: currentDate > today
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendarGrid.push(week);
  }

  // Helper function to determine the color intensity of a cell
  const getColor = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count <= 2) return 'bg-emerald-900';
    if (count <= 5) return 'bg-emerald-700';
    if (count <= 9) return 'bg-emerald-500';
    return 'bg-emerald-300';
  };

  const monthLabels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50 backdrop-blur-sm mt-6">
      <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-white">{totalSubmissions} submissions in the past one year</h3>
            <div className="text-xs text-gray-400 mt-1 space-x-4">
              <span>Total active days: {Object.keys(submissionMap).length}</span>
              <span>Max streak: {streak}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>2024</span>
            <span className="text-gray-500">←</span>
            <span className="font-bold text-white">2025</span>
            <span className="text-gray-500">→</span>
          </div>
      </div>

      <div className="flex gap-3 overflow-x-auto p-2">
        <div className="flex flex-col text-xs text-gray-500 justify-between py-1">
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
            {monthLabels.map((month, i) => <span key={i}>{month}</span>)}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {calendarGrid.flat().map((day, index) => {
              const tooltipText = day.isFuture ? 'Future date' : `${day.count} submission${day.count !== 1 ? 's' : ''} on ${day.date.toDateString()}`;
              return (
                <div key={index} className="tooltip tooltip-top" data-tip={tooltipText}>
                  <div className={`w-3 h-3 rounded-sm ${day.isFuture ? 'bg-transparent' : getColor(day.count)}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-800 mx-1"></div>
        <div className="w-3 h-3 rounded-sm bg-emerald-900 mx-1"></div>
        <div className="w-3 h-3 rounded-sm bg-emerald-700 mx-1"></div>
        <div className="w-3 h-3 rounded-sm bg-emerald-500 mx-1"></div>
        <div className="w-3 h-3 rounded-sm bg-emerald-300 mx-1"></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CodingActivity;