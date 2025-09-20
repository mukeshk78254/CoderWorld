import CodingActivity from './CodingActivity';

function Overview({ stats }) {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
          <p className="text-sm text-green-400 font-semibold">Problems Solved</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.solvedCount}</p>
          <p className="text-xs text-gray-500">{stats.totalSubmissions} submissions</p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
          <p className="text-sm text-orange-400 font-semibold">Current Streak</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.currentStreak} Days</p>
          <p className="text-xs text-gray-500">Keep the fire burning!</p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
          <p className="text-sm text-purple-400 font-semibold">Solution Posts</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.solutionPosts}</p>
          <p className="text-xs text-gray-500">Create a Post</p>
        </div>
      </div>

      {/* Coding Activity */}
      <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
        <h3 className="font-bold text-white mb-4">Coding Activity</h3>
        <CodingActivity submissionActivity={stats.submissionActivity} />
      </div>
    </div>
  );
}

export default Overview;