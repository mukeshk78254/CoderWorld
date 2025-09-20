// // src/pages/ContestPage.jsx
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// // import axiosClient from '../utils/axiosClient'; // Uncomment if fetching real data

// function ContestPage() {
//   const [contestData, setContestData] = useState({
//     title: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     problems: '', // Changed to string for simpler input example
//     isPublic: true,
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setContestData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
    
//     // Process problems string into an array if needed for backend
//     const problemsArray = contestData.problems.split(',').map(s => s.trim()).filter(s => s.length > 0);
//     const dataToSend = { ...contestData, problems: problemsArray };

//     console.log("Creating contest:", dataToSend);
//     try {
//       // await axiosClient.post('/contest/create', dataToSend); // Example API call
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
//       setMessage('Contest created successfully!');
//       setContestData({ title: '', description: '', startDate: '', endDate: '', problems: '', isPublic: true }); // Reset form
//     } catch (error) {
//       console.error('Failed to create contest:', error);
//       setMessage('Failed to create contest. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen text-slate-200 bg-slate-950 font-sans p-8 animate-fade-in"
//       style={{
//         backgroundImage: `
//           radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.05), transparent 60%),
//           radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.04), transparent 50%),
//           radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01), transparent 80%)
//         `,
//         backgroundAttachment: 'fixed',
//       }}
//     >
//       {/* Inline styles for custom animations and effects */}
//       <style>
//         {`
//         /* General fade-in for page loading */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-in forwards;
//         }

//         /* For elements fading in from bottom */
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }

//         /* Spinner animation (for loading states) */
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 0.8s linear infinite;
//         }
//         `}
//       </style>

//       {/* Floating CodeArena watermark */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
//         CODEARENA
//       </div>

//       <div className="container mx-auto max-w-3xl bg-gray-900/60 p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
//         <h1 className="text-4xl font-bold text-transparent bg-clip-text mb-6 text-center"
//             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 15px rgba(99,102,241,0.4)' }}>
//             Create New Contest
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-gray-300 font-semibold">Contest Title</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={contestData.title}
//               onChange={handleChange}
//               placeholder="e.g., Weekly Algorithm Challenge"
//               className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-gray-300 font-semibold">Description</span>
//             </label>
//             <textarea
//               name="description"
//               value={contestData.description}
//               onChange={handleChange}
//               placeholder="Provide a brief description of the contest..."
//               className="textarea textarea-bordered h-24 w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 custom-scrollbar"
//               required
//             ></textarea>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-gray-300 font-semibold">Start Date & Time</span>
//               </label>
//               <input
//                 type="datetime-local"
//                 name="startDate"
//                 value={contestData.startDate}
//                 onChange={handleChange}
//                 className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text text-gray-300 font-semibold">End Date & Time</span>
//               </label>
//               <input
//                 type="datetime-local"
//                 name="endDate"
//                 value={contestData.endDate}
//                 onChange={handleChange}
//                 className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label className="label cursor-pointer">
//               <span className="label-text text-gray-300 font-semibold">Public Contest</span>
//               <input
//                 type="checkbox"
//                 name="isPublic"
//                 checked={contestData.isPublic}
//                 onChange={handleChange}
//                 className="checkbox checkbox-primary bg-gray-700 border-gray-600 checked:bg-indigo-500"
//               />
//             </label>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-gray-300 font-semibold">Problems (IDs, comma-separated)</span>
//             </label>
//             <input
//               type="text"
//               name="problems"
//               value={contestData.problems}
//               onChange={handleChange}
//               placeholder="problemId1, problemId2, ..."
//               className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//             />
//             <p className="text-gray-500 text-xs mt-1">Enter problem IDs separated by commas (e.g., `654321abcd, 987654efgh`).</p>
//           </div>

//           <button
//             type="submit"
//             className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
//             disabled={loading}
//           >
//             {loading && <span className="loading loading-spinner loading-sm text-white animate-spin-slow"></span>}
//             {loading ? 'Creating...' : 'Create Contest'}
//           </button>
//         </form>

//         {message && (
//           <div className={`mt-6 p-4 rounded-lg text-center ${message.includes('successfully') ? 'bg-emerald-800/50 text-emerald-300' : 'bg-red-800/50 text-red-300'} border border-current`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ContestPage;
import { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../authSlice';
import axiosClient from '../utils/axiosClient'; // Import axiosClient for problems fetch

// Helper function for difficulty colors (using default Tailwind colors)
function getDifficultyColor(difficulty) {
  const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
  switch (normalizedDifficulty) {
    case 'easy': return 'text-emerald-400'; // Tailwind green
    case 'medium': return 'text-amber-400'; // Tailwind amber
    case 'hard': return 'text-red-400';     // Tailwind red
    default: return 'text-gray-400';
  }
}

function ContestPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [contestData, setContestData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    problems: '',
    isPublic: true,
  });
  const [loading, setLoading] = useState(true); // Initial loading for fetching contests
  const [formLoading, setFormLoading] = useState(false); // Loading for form submission
  const [message, setMessage] = useState('');
  const [allContests, setAllContests] = useState([]); // Store all contests fetched
  const [contestSearchTerm, setContestSearchTerm] = useState(''); // New state for contest search
  const [problems, setProblems] = useState([]); // New state for problems list (for dropdown)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch contests
        const mockContests = [
          { id: 'c1', title: 'Weekly Algorithm Battle', description: 'Solve 3 problems in 2 hours. High stakes, high rewards!', startDate: '2024-08-10T10:00:00Z', endDate: '2024-08-10T12:00:00Z', problems: 3, participants: 120, status: 'upcoming' },
          { id: 'c2', title: 'Data Structures Sprint', description: 'Master Arrays and Linked Lists in this intense 2-day sprint!', startDate: '2024-07-25T14:00:00Z', endDate: '2024-07-27T14:00:00Z', problems: 5, participants: 80, status: 'ended' },
          { id: 'c3', title: 'Beginner Friendly Contest', description: 'Easy problems tailored for new coders. A great start to your journey!', startDate: '2024-08-05T09:00:00Z', endDate: '2024-08-05T11:00:00Z', problems: 4, participants: 200, status: 'active' },
          { id: 'c4', title: 'Dynamic Programming Challenge', description: 'Test your DP skills with complex problems. Are you ready?', startDate: '2024-08-15T18:00:00Z', endDate: '2024-08-15T21:00:00Z', problems: 3, participants: 95, status: 'upcoming' },
          { id: 'c5', title: 'Graph Theory Marathon', description: 'Navigate through a series of graph problems. Only for the brave!', startDate: '2024-07-01T09:00:00Z', endDate: '2024-07-03T09:00:00Z', problems: 7, participants: 60, status: 'ended' },
        ];
        
        const now = new Date();
        const processedContests = mockContests.map(c => {
            const start = new Date(c.startDate);
            const end = new Date(c.endDate);
            let status = 'upcoming';
            if (now >= start && now <= end) {
                status = 'active';
            } else if (now > end) {
                status = 'ended';
            }
            return { ...c, status };
        });
        setAllContests(processedContests); 

        // Fetch problems for the dropdown
        const probRes = await axiosClient.get('/problem/getallproblem');
        setProblems(probRes.data || []);

        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setMessage('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredContests = useMemo(() => {
    let contestsToDisplay = user?.role === 'admin' ? allContests : allContests.filter(c => c.status !== 'ended');
    
    if (contestSearchTerm) {
      const lowerCaseSearchTerm = contestSearchTerm.toLowerCase();
      contestsToDisplay = contestsToDisplay.filter(contest => 
        contest.title.toLowerCase().includes(lowerCaseSearchTerm) || 
        contest.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return contestsToDisplay;
  }, [allContests, contestSearchTerm, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContestData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage('');
    
    const problemsArray = contestData.problems.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const dataToSend = { ...contestData, problems: problemsArray };

    console.log("Creating contest:", dataToSend);
    try {
      // await axiosClient.post('/contest/create', dataToSend); // Example API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setMessage('Contest created successfully!');
      setContestData({ title: '', description: '', startDate: '', endDate: '', problems: '', isPublic: true }); // Reset form
      // In a real app, you'd trigger a refetch of contests here:
      // fetchContests(); 
    } catch (error) {
      console.error('Failed to create contest:', error);
      setMessage('Failed to create contest. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // No setSolvedProblemIds here as it's Homepage specific, but dispatch is global
  };

  const getContestStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-600 text-white';
      case 'upcoming': return 'bg-blue-600 text-white';
      case 'ended': return 'bg-gray-600 text-gray-300';
      default: return 'bg-gray-500 text-gray-300';
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div
      className="min-h-screen text-slate-200 bg-slate-950 font-sans p-8 animate-fade-in"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.05), transparent 60%),
          radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.04), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01), transparent 80%)
        `,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Inline styles for custom animations and effects */}
      <style>
        {`
        /* General fade-in for page loading */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in forwards;
        }

        /* For elements fading in from bottom */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Spinner animation (for loading states) */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 0.8s linear infinite;
        }

        /* Custom scrollbar for textarea/long content */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b; /* slate-800 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569; /* slate-600 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b; /* slate-500 */
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        `}
      </style>

      {/* Floating CodeArena watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
        CoderWorld
      </div>

      {/* Navbar (Copied from Homepage for consistency) */}
      <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
        {/* Left section (Logo) */}
        <div className="flex-1">
          <NavLink to="/" className="flex items-center gap-3 group">
            {/* Enhanced Logo Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/20 group-hover:shadow-cyan-500/40 transition-all duration-300"
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
                className="w-9 h-9"
              >
                <img 
                  src="/src/pages/2896418.png" 
                  alt="CoderWorld Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                CoderWorld
              </span>
              <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: "'Source Code Pro', monospace" }}>
                Code • Learn • Solve
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center section (Nav links) */}
        <div className="flex-none hidden md:flex flex-grow justify-center">
          <ul className="menu menu-horizontal px-1 text-lg font-semibold">
            {/* Problems Dropdown - Added to ContestPage */}
            <li className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
                Problems
              </div>
              <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
                {problems.length > 0 ? (
                  problems.map(p => (
                    <li key={p._id}>
                      <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
                        {p.title}
                        <span className={`ml-auto badge badge-outline text-xs font-semibold`}
                              style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', ''), color: getDifficultyColor(p.difficulty).replace('text-', '')}}>
                            {String(p.difficulty).toUpperCase()}
                        </span>
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
                )}
              </ul>
            </li>
            <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
            <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
          </ul>
        </div>

        {/* Right section (User Avatar) */}
        <div className="flex-none">
          <div className="dropdown dropdown-end ml-4">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
                   style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}> {/* Subtle glow for avatar */}
                <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
              </div>
            </div>
          <div tabIndex={0} className="dropdown-content mt-4 z-[60] w-64 overflow-hidden rounded-2xl bg-gray-800/80 backdrop-blur-md border border-gray-700 shadow-2xl shadow-black/30 animate-scale-in">
              <div className="p-4 bg-white/5">
                <p className="font-bold text-white text-lg truncate">
                  {user?.firstname || 'Valued'} {user?.lastname}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {user?.email || 'Welcome!'}
                </p>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="p-2 space-y-1">
                <NavLink to="/profile" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  <span>Profile</span>
                </NavLink>
                {user?.role === 'admin' && (
                  <NavLink to="/admin" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 8a1 1 0 00-1 1v1h14V9a1 1 0 00-1-1H5z" /><path fillRule="evenodd" d="M3 11v5a2 2 0 002 2h10a2 2 0 002-2v-5H3zm3 2a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                    <span>Admin Panel</span>
                  </NavLink>
                )}
                                <NavLink to="/dashboard" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                  <span>Dashboard</span>
                                </NavLink>
                <div className="h-px bg-gray-700/50 my-1" />
                <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl bg-gray-900/60 p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text mb-8 text-center"
            style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 15px rgba(99,102,241,0.4)' }}>
            CodeArena Contests
        </h1>

        {user?.role === 'admin' && (
          <div className="mb-10 p-6 bg-gray-800/50 rounded-lg border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Create New Contest</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-semibold">Contest Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={contestData.title}
                  onChange={handleChange}
                  placeholder="e.g., Weekly Algorithm Challenge"
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-semibold">Description</span>
                </label>
                <textarea
                  name="description"
                  value={contestData.description}
                  onChange={handleChange}
                  placeholder="Provide a brief description of the contest..."
                  className="textarea textarea-bordered h-24 w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 custom-scrollbar"
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-semibold">Start Date & Time</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={contestData.startDate}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-semibold">End Date & Time</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={contestData.endDate}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-gray-300 font-semibold">Public Contest</span>
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={contestData.isPublic}
                    onChange={handleChange}
                    className="checkbox checkbox-primary bg-gray-700 border-gray-600 checked:bg-indigo-500"
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-semibold">Problems (IDs, comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="problems"
                  value={contestData.problems}
                  onChange={handleChange}
                  placeholder="problemId1, problemId2, ..."
                  className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <p className="text-gray-500 text-xs mt-1">Enter problem IDs separated by commas (e.g., `654321abcd, 987654efgh`).</p>
              </div>

              <button
                type="submit"
                className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                disabled={formLoading}
              >
                {formLoading && <span className="loading loading-spinner loading-sm text-white animate-spin-slow"></span>}
                {formLoading ? 'Creating...' : 'Create Contest'}
              </button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-lg text-center ${message.includes('successfully') ? 'bg-emerald-800/50 text-emerald-300' : 'bg-red-800/50 text-red-300'} border border-current`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* Search for contests */}
        <div className="form-control mb-8">
          <label className="label">
            <span className="label-text text-gray-300 font-semibold">Search Contests</span>
          </label>
          <input
            type="text"
            placeholder="Search by title or description..."
            className="input input-bordered w-full bg-gray-800 border-gray-700 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            value={contestSearchTerm}
            onChange={(e) => setContestSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
            <p className="mt-4 text-gray-400 text-lg">Loading contests...</p>
          </div>
        ) : filteredContests.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl">
            <p className="text-3xl font-bold text-gray-300 mb-4">No Contests Found!</p>
            <p className="text-lg text-gray-400">
              {contestSearchTerm ? `No contests match "${contestSearchTerm}".` : `Looks like there are no active or upcoming contests right now.`}
            </p>
            <p className="text-xl font-semibold text-indigo-400 mt-4">Stay Tuned for Exciting Challenges!</p>
            <p className="text-sm text-gray-500 mt-2">New contests are announced regularly. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map(contest => (
              <div key={contest.id} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold uppercase rounded-bl-lg ${getContestStatusColor(contest.status)}`}>
                  {contest.status}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{contest.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{contest.description}</p>
                
                <div className="text-gray-400 text-sm mb-2">
                  <p><strong className="text-gray-300">Starts:</strong> <span className="font-mono">{formatDateTime(contest.startDate)}</span></p>
                  <p><strong className="text-gray-300">Ends:</strong> <span className="font-mono">{formatDateTime(contest.endDate)}</span></p>
                </div>

                <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
                  <p><strong className="text-gray-300">Problems:</strong> <span className="font-mono">{contest.problems}</span></p>
                  <p><strong className="text-gray-300">Participants:</strong> <span className="font-mono">{contest.participants}</span></p>
                </div>

                {contest.status === 'active' ? (
                  <NavLink to={`/contest/${contest.id}/start`}
                    className="btn btn-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg mt-6 text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span> {/* Live indicator */}
                    Join Contest
                  </NavLink>
                ) : contest.status === 'upcoming' ? (
                  <button disabled
                    className="btn btn-block bg-blue-800 text-blue-300 font-semibold py-2 px-4 rounded-lg mt-6 text-sm cursor-not-allowed">
                    Upcoming
                  </button>
                ) : ( // Ended
                  <NavLink to={`/contest/${contest.id}/results`}
                    className="btn btn-block bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg mt-6 text-sm transition-all duration-300 transform hover:scale-105 active:scale-95">
                    View Results
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestPage;