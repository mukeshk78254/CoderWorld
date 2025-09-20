// // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // import { NavLink } from 'react-router'; // Fixed import
// // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // // // // // function Homepage() {
// // // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // // //   const { user } = useSelector((state) => state.auth);
// // // // // // // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // // // // // // //   const [solvedProblems, setSolvedProblems] = useState([]);
// // // // // // // // // // // // //   const [filters, setFilters] = useState({
// // // // // // // // // // // // //     difficulty: 'all',
// // // // // // // // // // // // //     tag: 'all',
// // // // // // // // // // // // //     status: 'all' 
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchProblems = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         const { data } = await axiosClient.get('/problem/getAllProblem');
// // // // // // // // // // // // //         setProblems(data);
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         console.error('Error fetching problems:', error);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     const fetchSolvedProblems = async () => {
// // // // // // // // // // // // //       try {
// // // // // // // // // // // // //         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
// // // // // // // // // // // // //         setSolvedProblems(data);
// // // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // // //         console.error('Error fetching solved problems:', error);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     fetchProblems();
// // // // // // // // // // // // //     if (user) fetchSolvedProblems();
// // // // // // // // // // // // //   }, [user]);

// // // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // // //     dispatch(logoutUser());
// // // // // // // // // // // // //     setSolvedProblems([]); // Clear solved problems on logout
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const filteredProblems = problems.filter(problem => {
// // // // // // // // // // // // //     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// // // // // // // // // // // // //     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
// // // // // // // // // // // // //     const statusMatch = filters.status === 'all' || 
// // // // // // // // // // // // //                       solvedProblems.some(sp => sp._id === problem._id);
// // // // // // // // // // // // //     return difficultyMatch && tagMatch && statusMatch;
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="min-h-screen bg-base-200">
// // // // // // // // // // // // //       {/* Navigation Bar */}
// // // // // // // // // // // // //       <nav className="navbar bg-base-100 shadow-lg px-4">
// // // // // // // // // // // // //         <div className="flex-1">
// // // // // // // // // // // // //           <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <div className="flex-none gap-4">
// // // // // // // // // // // // //           <div className="dropdown dropdown-end">
// // // // // // // // // // // // //             <div tabIndex={0} className="btn btn-ghost">
// // // // // // // // // // // // //               {user?.firstName}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
// // // // // // // // // // // // //               <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // // // // // // //               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
// // // // // // // // // // // // //             </ul>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </nav>

// // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // //       <div className="container mx-auto p-4">
// // // // // // // // // // // // //         {/* Filters */}
// // // // // // // // // // // // //         <div className="flex flex-wrap gap-4 mb-6">
// // // // // // // // // // // // //           {/* New Status Filter */}
// // // // // // // // // // // // //           <select 
// // // // // // // // // // // // //             className="select select-bordered"
// // // // // // // // // // // // //             value={filters.status}
// // // // // // // // // // // // //             onChange={(e) => setFilters({...filters, status: e.target.value})}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <option value="all">All Problems</option>
// // // // // // // // // // // // //             <option value="solved">Solved Problems</option>
// // // // // // // // // // // // //           </select>

// // // // // // // // // // // // //           <select 
// // // // // // // // // // // // //             className="select select-bordered"
// // // // // // // // // // // // //             value={filters.difficulty}
// // // // // // // // // // // // //             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <option value="all">All Difficulties</option>
// // // // // // // // // // // // //             <option value="easy">Easy</option>
// // // // // // // // // // // // //             <option value="medium">Medium</option>
// // // // // // // // // // // // //             <option value="hard">Hard</option>
// // // // // // // // // // // // //           </select>

// // // // // // // // // // // // //           <select 
// // // // // // // // // // // // //             className="select select-bordered"
// // // // // // // // // // // // //             value={filters.tag}
// // // // // // // // // // // // //             onChange={(e) => setFilters({...filters, tag: e.target.value})}
// // // // // // // // // // // // //           >
// // // // // // // // // // // // //             <option value="all">All Tags</option>
// // // // // // // // // // // // //             <option value="array">Array</option>
// // // // // // // // // // // // //             <option value="linkedList">Linked List</option>
// // // // // // // // // // // // //             <option value="graph">Graph</option>
// // // // // // // // // // // // //             <option value="dp">DP</option>
// // // // // // // // // // // // //           </select>
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* Problems List */}
// // // // // // // // // // // // //         <div className="grid gap-4">
// // // // // // // // // // // // //           {filteredProblems.map(problem => (
// // // // // // // // // // // // //             <div key={problem._id} className="card bg-base-100 shadow-xl">
// // // // // // // // // // // // //               <div className="card-body">
// // // // // // // // // // // // //                 <div className="flex items-center justify-between">
// // // // // // // // // // // // //                   <h2 className="card-title">
// // // // // // // // // // // // //                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
// // // // // // // // // // // // //                       {problem.title}
// // // // // // // // // // // // //                     </NavLink>
// // // // // // // // // // // // //                   </h2>
// // // // // // // // // // // // //                   {solvedProblems.some(sp => sp._id === problem._id) && (
// // // // // // // // // // // // //                     <div className="badge badge-success gap-2">
// // // // // // // // // // // // //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// // // // // // // // // // // // //                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// // // // // // // // // // // // //                       </svg>
// // // // // // // // // // // // //                       Solved
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </div>
                
// // // // // // // // // // // // //                 <div className="flex gap-2">
// // // // // // // // // // // // //                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
// // // // // // // // // // // // //                     {problem.difficulty}
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                   <div className="badge badge-info">
// // // // // // // // // // // // //                     {problem.tags}
// // // // // // // // // // // // //                   </div>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //     
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }

// // // // // // // // // // // // // const getDifficultyBadgeColor = (difficulty) => {
// // // // // // // // // // // // //   switch (difficulty.toLowerCase()) {
// // // // // // // // // // // // //     case 'easy': return 'badge-success';
// // // // // // // // // // // // //     case 'medium': return 'badge-warning';
// // // // // // // // // // // // //     case 'hard': return 'badge-error';
// // // // // // // // // // // // //     default: return 'badge-neutral';
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Homepage;




// // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // import { NavLink } from 'react-router-dom'; // Corrected import for best practice
// // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // // // // function Homepage() {
// // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // //   const { user } = useSelector((state) => state.auth);
// // // // // // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // // // // // //   const [solvedProblems, setSolvedProblems] = useState([]);
// // // // // // // // // // // //   const [filters, setFilters] = useState({
// // // // // // // // // // // //     difficulty: 'all',
// // // // // // // // // // // //     tag: 'all',
// // // // // // // // // // // //     status: 'all'
// // // // // // // // // // // //   });

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const fetchProblems = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const { data } = await axiosClient.get('/problem/getallproblem');
// // // // // // // // // // // //         setProblems(data);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error('Error fetching problems:', error);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     const fetchSolvedProblems = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         const { data } = await axiosClient.get('/problem/problemsolvedbyuser');
// // // // // // // // // // // //         // The data is an array of problem IDs solved by the user
// // // // // // // // // // // //         setSolvedProblems(data.problemSolved || []);
// // // // // // // // // // // //       } catch (error) {
// // // // // // // // // // // //         console.error('Error fetching solved problems:', error);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     fetchProblems();
// // // // // // // // // // // //     if (user) fetchSolvedProblems();
// // // // // // // // // // // //   }, [user]);

// // // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // // //     dispatch(logoutUser());
// // // // // // // // // // // //     setSolvedProblems([]);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const filteredProblems = problems.filter(problem => {
// // // // // // // // // // // //     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// // // // // // // // // // // //     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    
// // // // // // // // // // // //     // Corrected logic for status filter
// // // // // // // // // // // //     const hasSolved = solvedProblems.includes(problem._id);
// // // // // // // // // // // //     const statusMatch = filters.status === 'all' || (filters.status === 'solved' && hasSolved) || (filters.status === 'unsolved' && !hasSolved);

// // // // // // // // // // // //     return difficultyMatch && tagMatch && statusMatch;
// // // // // // // // // // // //   });

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="min-h-screen bg-base-200">
// // // // // // // // // // // //       <nav className="navbar bg-base-100 shadow-lg px-4">
// // // // // // // // // // // //         <div className="flex-1">
// // // // // // // // // // // //           <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //         <div className="flex-none gap-4">
// // // // // // // // // // // //           <div className="dropdown dropdown-end">
// // // // // // // // // // // //             <div tabIndex={0} role="button" className="btn btn-ghost">
// // // // // // // // // // // //               {user?.firstname}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
// // // // // // // // // // // //               <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // // // // // //                {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
// // // // // // // // // // // //             </ul>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </nav>

// // // // // // // // // // // //       <div className="container mx-auto p-4">
// // // // // // // // // // // //         <div className="flex flex-wrap gap-4 mb-6">
// // // // // // // // // // // //           <select className="select select-bordered" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
// // // // // // // // // // // //             <option value="all">All Status</option>
// // // // // // // // // // // //             <option value="solved">Solved</option>
// // // // // // // // // // // //             <option value="unsolved">Unsolved</option>
// // // // // // // // // // // //           </select>
// // // // // // // // // // // //           <select className="select select-bordered" value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})}>
// // // // // // // // // // // //             <option value="all">All Difficulties</option>
// // // // // // // // // // // //             <option value="easy">Easy</option>
// // // // // // // // // // // //             <option value="medium">Medium</option>
// // // // // // // // // // // //             <option value="hard">Hard</option>
// // // // // // // // // // // //           </select>
// // // // // // // // // // // //           <select className="select select-bordered" value={filters.tag} onChange={(e) => setFilters({...filters, tag: e.target.value})}>
// // // // // // // // // // // //             <option value="all">All Tags</option>
// // // // // // // // // // // //             <option value="array">Array</option>
// // // // // // // // // // // //             <option value="linked list">Linked List</option>
// // // // // // // // // // // //             <option value="dp">DP</option>
// // // // // // // // // // // //             <option value="string">String</option>
// // // // // // // // // // // //           </select>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         <div className="grid gap-4">
// // // // // // // // // // // //           {filteredProblems.map(problem => (
// // // // // // // // // // // //             // FIX #1: Use `problem._id` for the key
// // // // // // // // // // // //             problem && problem._id && ( // Safety check to prevent rendering if _id is missing
// // // // // // // // // // // //               <div key={problem._id} className="card bg-base-100 shadow-xl">
// // // // // // // // // // // //                 <div className="card-body">
// // // // // // // // // // // //                   <div className="flex items-center justify-between">
// // // // // // // // // // // //                     <h2 className="card-title">
// // // // // // // // // // // //                       {/* FIX #2: Use `problem._id` to construct the link */}
// // // // // // // // // // // //                       <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
// // // // // // // // // // // //                         {problem.title}
// // // // // // // // // // // //                       </NavLink>
// // // // // // // // // // // //                     </h2>
// // // // // // // // // // // //                     {/* FIX #3: Use `problem._id` to check if solved */}
// // // // // // // // // // // //                     {solvedProblems.includes(problem._id) && (
// // // // // // // // // // // //                       <div className="badge badge-success gap-2">
// // // // // // // // // // // //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// // // // // // // // // // // //                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// // // // // // // // // // // //                         </svg>
// // // // // // // // // // // //                         Solved
// // // // // // // // // // // //                       </div>
// // // // // // // // // // // //                     )}
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                   <div className="flex gap-2">
// // // // // // // // // // // //                     <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>{problem.difficulty}</div>
// // // // // // // // // // // //                     <div className="badge badge-info">{problem.tags}</div>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             )
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // const getDifficultyBadgeColor = (difficulty) => {
// // // // // // // // // // // //   if (!difficulty) return 'badge-neutral';
// // // // // // // // // // // //   switch (difficulty.toLowerCase()) {
// // // // // // // // // // // //     case 'easy': return 'badge-success';
// // // // // // // // // // // //     case 'medium': return 'badge-warning';
// // // // // // // // // // // //     case 'hard': return 'badge-error';
// // // // // // // // // // // //     default: return 'badge-neutral';
// // // // // // // // // // // //   }
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Homepage;


// // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // // // function Homepage() {
// // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // //   const { user } = useSelector((state) => state.auth);
// // // // // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // // // // //   const [solvedProblems, setSolvedProblems] = useState([]);
// // // // // // // // // // //   const [loading, setLoading] = useState(true); // Added loading state for better UX
// // // // // // // // // // //   const [filters, setFilters] = useState({
// // // // // // // // // // //     difficulty: 'all',
// // // // // // // // // // //     tag: 'all',
// // // // // // // // // // //     status: 'all'
// // // // // // // // // // //   });

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchAllData = async () => {
// // // // // // // // // // //       setLoading(true);
// // // // // // // // // // //       try {
// // // // // // // // // // //         // Fetch all problems and user's solved problems in parallel
// // // // // // // // // // //         const problemPromise = axiosClient.get('/problem/getallproblem');
// // // // // // // // // // //         const solvedPromise = user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] });

// // // // // // // // // // //         const [problemResponse, solvedResponse] = await Promise.all([problemPromise, solvedPromise]);
        
// // // // // // // // // // //         setProblems(problemResponse.data || []);
        
// // // // // // // // // // //         // --- FIX: Correctly process the response for solved problems ---
// // // // // // // // // // //         // The API returns an array of problem objects. We need to map it to an array of just the IDs.
// // // // // // // // // // //         if (solvedResponse.data) {
// // // // // // // // // // //             const solvedIds = solvedResponse.data.map(problem => problem._id);
// // // // // // // // // // //             setSolvedProblems(solvedIds);
// // // // // // // // // // //         }

// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error('Error fetching data:', error);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchAllData();
// // // // // // // // // // //   }, [user]);

// // // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // // //     dispatch(logoutUser());
// // // // // // // // // // //     setSolvedProblems([]); // Clear local state on logout
// // // // // // // // // // //   };

// // // // // // // // // // //   const filteredProblems = problems.filter(problem => {
// // // // // // // // // // //     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// // // // // // // // // // //     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    
// // // // // // // // // // //     // This logic now works correctly because solvedProblems is an array of IDs.
// // // // // // // // // // //     const hasSolved = solvedProblems.includes(problem._id);
// // // // // // // // // // //     const statusMatch = filters.status === 'all' || (filters.status === 'solved' && hasSolved) || (filters.status === 'unsolved' && !hasSolved);

// // // // // // // // // // //     return difficultyMatch && tagMatch && statusMatch;
// // // // // // // // // // //   });

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="min-h-screen bg-base-200">
// // // // // // // // // // //       <nav className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-30">
// // // // // // // // // // //         <div className="flex-1">
// // // // // // // // // // //           <NavLink to="/" className="btn btn-ghost text-xl">Coder World</NavLink>
// // // // // // // // // // //         </div>
// // // // // // // // // // //         <div className="flex-none gap-4">
// // // // // // // // // // //           <div className="dropdown dropdown-end">
// // // // // // // // // // //             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
// // // // // // // // // // //                 <div className="w-10 rounded-full bg-primary text-primary-content">
// // // // // // // // // // //                     <span>{user?.firstname?.charAt(0).toUpperCase()}</span>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
// // // // // // // // // // //     <li><NavLink to="/profile">Profile</NavLink></li> {/* <-- CHANGE THIS LINK */}
// // // // // // // // // // //     {user?.role === 'admin' && <li><NavLink to="/admin">Admin Panel</NavLink></li>}
// // // // // // // // // // //     <div className="divider my-1"></div>
// // // // // // // // // // //     <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // // // // // </ul>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </nav>

// // // // // // // // // // //       <main className="container mx-auto p-4">
// // // // // // // // // // //         <div className="card bg-base-100 shadow-xl p-4 mb-6">
// // // // // // // // // // //             <div className="flex flex-wrap items-center gap-4">
// // // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
// // // // // // // // // // //                 <option value="all">Status</option>
// // // // // // // // // // //                 <option value="solved">Solved</option>
// // // // // // // // // // //                 <option value="unsolved">Unsolved</option>
// // // // // // // // // // //               </select>
// // // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})}>
// // // // // // // // // // //                 <option value="all">Difficulty</option>
// // // // // // // // // // //                 <option value="easy">Easy</option>
// // // // // // // // // // //                 <option value="medium">Medium</option>
// // // // // // // // // // //                 <option value="hard">Hard</option>
// // // // // // // // // // //               </select>
// // // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.tag} onChange={(e) => setFilters({...filters, tag: e.target.value})}>
// // // // // // // // // // //                 <option value="all">Tags</option>
// // // // // // // // // // //                 <option value="array">Array</option>
// // // // // // // // // // //                 <option value="linked list">Linked List</option>
// // // // // // // // // // //                 <option value="dp">DP</option>
// // // // // // // // // // //                 <option value="string">String</option>
// // // // // // // // // // //               </select>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {loading ? (
// // // // // // // // // // //             <div className="text-center py-20">
// // // // // // // // // // //                 <span className="loading loading-spinner loading-lg"></span>
// // // // // // // // // // //             </div>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //             <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl">
// // // // // // // // // // //                 <table className="table">
// // // // // // // // // // //                     <thead>
// // // // // // // // // // //                         <tr>
// // // // // // // // // // //                             <th className="w-1/12">Status</th>
// // // // // // // // // // //                             <th className="w-6/12">Title</th>
// // // // // // // // // // //                             <th className="w-2/12">Difficulty</th>
// // // // // // // // // // //                             <th className="w-3/12">Category</th>
// // // // // // // // // // //                         </tr>
// // // // // // // // // // //                     </thead>
// // // // // // // // // // //                     <tbody>
// // // // // // // // // // //                         {filteredProblems.map(problem => (
// // // // // // // // // // //                             <tr key={problem._id} className="hover">
// // // // // // // // // // //                                 <td>
// // // // // // // // // // //                                     {solvedProblems.includes(problem._id) && (
// // // // // // // // // // //                                         <div className="text-success tooltip" data-tip="Solved">
// // // // // // // // // // //                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
// // // // // // // // // // //                                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// // // // // // // // // // //                                             </svg>
// // // // // // // // // // //                                         </div>
// // // // // // // // // // //                                     )}
// // // // // // // // // // //                                 </td>
// // // // // // // // // // //                                 <td>
// // // // // // // // // // //                                     <NavLink to={`/problem/${problem._id}`} className="link link-hover">
// // // // // // // // // // //                                         {problem.title}
// // // // // // // // // // //                                     </NavLink>
// // // // // // // // // // //                                 </td>
// // // // // // // // // // //                                 <td>
// // // // // // // // // // //                                     <span className={`text-sm font-semibold ${getDifficultyColorText(problem.difficulty)}`}>
// // // // // // // // // // //                                         {problem.difficulty}
// // // // // // // // // // //                                     </span>
// // // // // // // // // // //                                 </td>
// // // // // // // // // // //                                 <td>
// // // // // // // // // // //                                     <div className="badge badge-info badge-outline">{problem.tags}</div>
// // // // // // // // // // //                                 </td>
// // // // // // // // // // //                             </tr>
// // // // // // // // // // //                         ))}
// // // // // // // // // // //                     </tbody>
// // // // // // // // // // //                 </table>
// // // // // // // // // // //                  {filteredProblems.length === 0 && (
// // // // // // // // // // //                     <div className="text-center p-8 text-neutral-content">No problems match the selected filters.</div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </main>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // // Separate function for badge text color
// // // // // // // // // // // const getDifficultyColorText = (difficulty) => {
// // // // // // // // // // //   if (!difficulty) return 'text-neutral-content';
// // // // // // // // // // //   switch (difficulty.toLowerCase()) {
// // // // // // // // // // //     case 'easy': return 'text-success';
// // // // // // // // // // //     case 'medium': return 'text-warning';
// // // // // // // // // // //     case 'hard': return 'text-error';
// // // // // // // // // // //     default: return 'text-neutral-content';
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // export default Homepage;



// // // // // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // // // --- Helper Components for a cleaner main component ---

// // // // // // // // // // // Renders the stats bar for solved problems by difficulty
// // // // // // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // // // // // //     const solvedStats = useMemo(() => {
// // // // // // // // // //         const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // // // //         solvedProblems.forEach(solvedId => {
// // // // // // // // // //             const problem = allProblems.find(p => p._id === solvedId);
// // // // // // // // // //             if (problem && stats[problem.difficulty] !== undefined) {
// // // // // // // // // //                 stats[problem.difficulty]++;
// // // // // // // // // //             }
// // // // // // // // // //         });
// // // // // // // // // //         return stats;
// // // // // // // // // //     }, [solvedProblems, allProblems]);

// // // // // // // // // //     const totalStats = useMemo(() => {
// // // // // // // // // //         const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // // // //          allProblems.forEach(problem => {
// // // // // // // // // //             if (stats[problem.difficulty] !== undefined) {
// // // // // // // // // //                 stats[problem.difficulty]++;
// // // // // // // // // //             }
// // // // // // // // // //         });
// // // // // // // // // //         return stats;
// // // // // // // // // //     }, [allProblems]);

// // // // // // // // // //     return (
// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// // // // // // // // // //             <StatCard title="Easy" solved={solvedStats.easy} total={totalStats.easy} color="text-success" />
// // // // // // // // // //             <StatCard title="Medium" solved={solvedStats.medium} total={totalStats.medium} color="text-warning" />
// // // // // // // // // //             <StatCard title="Hard" solved={solvedStats.hard} total={totalStats.hard} color="text-error" />
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // };

// // // // // // // // // // // A single card used in the StatsBar
// // // // // // // // // // const StatCard = ({ title, solved, total, color }) => (
// // // // // // // // // //     <div className="bg-base-100/50 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
// // // // // // // // // //         <div className={`text-sm ${color}`}>{title}</div>
// // // // // // // // // //         <div className="flex items-baseline gap-2 mt-1">
// // // // // // // // // //             <div className="text-2xl font-bold text-white">{solved}</div>
// // // // // // // // // //             <div className="text-base-content/60">/ {total}</div>
// // // // // // // // // //         </div>
// // // // // // // // // //         <progress className={`progress ${color.replace('text-', 'progress-')} w-full mt-2`} value={solved} max={total}></progress>
// // // // // // // // // //     </div>
// // // // // // // // // // );

// // // // // // // // // // // Renders the "Problem of the Day" card
// // // // // // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // // // // // //     if (!problem) return null;
// // // // // // // // // //     return (
// // // // // // // // // //         <div className="mb-8 p-6 rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg">
// // // // // // // // // //             <h2 className="text-sm font-bold opacity-70 mb-2">PROBLEM OF THE DAY</h2>
// // // // // // // // // //             <h3 className="text-2xl font-semibold">{problem.title}</h3>
// // // // // // // // // //             <p className="text-sm opacity-80 mt-1">Challenge yourself with today's featured problem!</p>
// // // // // // // // // //             <NavLink to={`/problem/${problem._id}`} className="btn btn-sm btn-outline btn-ghost mt-4">
// // // // // // // // // //                 Solve Now
// // // // // // // // // //             </NavLink>
// // // // // // // // // //         </div>
// // // // // // // // // //     );
// // // // // // // // // // };


// // // // // // // // // // function Homepage() {
// // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // //   const { user } = useSelector((state) => state.auth);
// // // // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [filters, setFilters] = useState({
// // // // // // // // // //     difficulty: 'all',
// // // // // // // // // //     tag: 'all',
// // // // // // // // // //     status: 'all'
// // // // // // // // // //   });

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const fetchAllData = async () => {
// // // // // // // // // //       setLoading(true);
// // // // // // // // // //       try {
// // // // // // // // // //         const problemPromise = axiosClient.get('/problem/getallproblem');
// // // // // // // // // //         const solvedPromise = user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] });

// // // // // // // // // //         const [problemResponse, solvedResponse] = await Promise.all([problemPromise, solvedPromise]);
        
// // // // // // // // // //         setProblems(problemResponse.data || []);
        
// // // // // // // // // //         if (solvedResponse.data) {
// // // // // // // // // //             setSolvedProblemIds(solvedResponse.data.map(problem => problem._id));
// // // // // // // // // //         }

// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error('Error fetching data:', error);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };

// // // // // // // // // //     fetchAllData();
// // // // // // // // // //   }, [user]);

// // // // // // // // // //   const handleLogout = () => {
// // // // // // // // // //     dispatch(logoutUser());
// // // // // // // // // //     setSolvedProblemIds([]);
// // // // // // // // // //   };

// // // // // // // // // //   const filteredProblems = problems.filter(problem => {
// // // // // // // // // //     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// // // // // // // // // //     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
// // // // // // // // // //     const hasSolved = solvedProblemIds.includes(problem._id);
// // // // // // // // // //     const statusMatch = filters.status === 'all' || (filters.status === 'solved' && hasSolved) || (filters.status === 'unsolved' && !hasSolved);
// // // // // // // // // //     return difficultyMatch && tagMatch && statusMatch;
// // // // // // // // // //   });
  

// // // // // // // // // //   // Pick a random problem for the "Featured" section
// // // // // // // // // //   const featuredProblem = useMemo(() => {
// // // // // // // // // //       if (problems.length === 0) return null;
// // // // // // // // // //       const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // // // // // //       return unsolved.length > 0 ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[0];
// // // // // // // // // //   }, [problems, solvedProblemIds]);
  
// // // // // // // // // //   const pageStyle = {
// // // // // // // // // //     backgroundColor: '#0d1117',
// // // // // // // // // //     backgroundImage: `radial-gradient(at 0% 100%, hsla(253, 16%, 7%, 1) 0, transparent 50%), 
// // // // // // // // // //                       radial-gradient(at 80% 0%, hsla(28, 100%, 74%, 0.1) 0, transparent 50%),
// // // // // // // // // //                       radial-gradient(at 80% 100%, hsla(340, 100%, 76%, 0.1) 0, transparent 50%)`,
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div style={pageStyle} className="min-h-screen text-base-content">
// // // // // // // // // //       <nav className="navbar bg-base-100/80 backdrop-blur-lg shadow-lg px-4 sticky top-0 z-30 border-b border-white/10">
// // // // // // // // // //         <div className="flex-1">
// // // // // // // // // //           <NavLink to="/" className="btn btn-ghost text-xl">Coder World</NavLink>
// // // // // // // // // //         </div>
// // // // // // // // // //         <div className="flex-none gap-4">
// // // // // // // // // //           <div className="dropdown dropdown-end">
// // // // // // // // // //             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
// // // // // // // // // //                 <div className="w-10 rounded-full bg-primary text-primary-content ring ring-primary ring-offset-base-100 ring-offset-2">
// // // // // // // // // //                     <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase()}</span>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>
// // // // // // // // // //             <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
// // // // // // // // // //               <li><NavLink to="/profile">Profile</NavLink></li>
// // // // // // // // // //               {user?.role === 'admin' && <li><NavLink to="/admin">Admin Panel</NavLink></li>}
// // // // // // // // // //               <div className="divider my-1"></div>
// // // // // // // // // //               <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // // // //             </ul>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </nav>

// // // // // // // // // //       <main className="container mx-auto p-4 sm:p-6">
// // // // // // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />
        
// // // // // // // // // //         <div className="card bg-base-100/50 backdrop-blur-sm shadow-xl p-4 mb-6 border border-white/10">
// // // // // // // // // //             <div className="flex flex-wrap items-center gap-4">
// // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
// // // // // // // // // //                 <option value="all">Status</option>
// // // // // // // // // //                 <option value="solved">Solved</option>
// // // // // // // // // //                 <option value="unsolved">Unsolved</option>
// // // // // // // // // //               </select>
// // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})}>
// // // // // // // // // //                 <option value="all">Difficulty</option>
// // // // // // // // // //                 <option value="easy">Easy</option>
// // // // // // // // // //                 <option value="medium">Medium</option>
// // // // // // // // // //                 <option value="hard">Hard</option>
// // // // // // // // // //               </select>
// // // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.tag} onChange={(e) => setFilters({...filters, tag: e.target.value})}>
// // // // // // // // // //                 <option value="all">Tags</option>
// // // // // // // // // //                 <option value="array">Array</option>
// // // // // // // // // //                 <option value="linked list">Linked List</option>
// // // // // // // // // //                 <option value="dp">DP</option>
// // // // // // // // // //                 <option value="string">String</option>
// // // // // // // // // //               </select>
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {loading ? (
// // // // // // // // // //             <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
// // // // // // // // // //         ) : (
// // // // // // // // // //             <div className="overflow-x-auto bg-base-100/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/10">
// // // // // // // // // //                 <table className="table">
// // // // // // // // // //                     <thead>
// // // // // // // // // //                         <tr className="border-b border-white/10">
// // // // // // // // // //                             <th className="w-[5%]">Status</th>
// // // // // // // // // //                             <th className="w-[50%]">Title</th>
// // // // // // // // // //                             <th className="w-[15%] text-center">Acceptance</th>
// // // // // // // // // //                             <th className="w-[15%]">Difficulty</th>
// // // // // // // // // //                             <th className="w-[15%]">Category</th>
// // // // // // // // // //                         </tr>
// // // // // // // // // //                     </thead>
// // // // // // // // // //                     <tbody>
// // // // // // // // // //                         {filteredProblems.map(problem => (
// // // // // // // // // //                             <tr key={problem._id} className="hover:bg-base-100/50 border-b border-white/10">
// // // // // // // // // //                                 <td className="text-center">
// // // // // // // // // //                                     {solvedProblemIds.includes(problem._id) && (
// // // // // // // // // //                                         <div className="text-success tooltip" data-tip="Solved">
// // // // // // // // // //                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
// // // // // // // // // //                                         </div>
// // // // // // // // // //                                     )}
// // // // // // // // // //                                 </td>
// // // // // // // // // //                                 <td>
// // // // // // // // // //                                     <NavLink to={`/problem/${problem._id}`} className="link link-hover font-medium">
// // // // // // // // // //                                         {problem.title}
// // // // // // // // // //                                     </NavLink>
// // // // // // // // // //                                 </td>
// // // // // // // // // //                                 <td className="text-center text-sm text-base-content/70">{(problem.acceptanceRate || 45.2).toFixed(1)}%</td>
// // // // // // // // // //                                 <td>
// // // // // // // // // //                                     <span className={`font-semibold ${getDifficultyColorText(problem.difficulty)}`}>{problem.difficulty}</span>
// // // // // // // // // //                                 </td>
// // // // // // // // // //                                 <td>
// // // // // // // // // //                                     <div className="badge badge-info badge-outline">{problem.tags}</div>
// // // // // // // // // //                                 </td>
// // // // // // // // // //                             </tr>
// // // // // // // // // //                         ))}
// // // // // // // // // //                     </tbody>
// // // // // // // // // //                 </table>
// // // // // // // // // //                  {filteredProblems.length === 0 && !loading && (
// // // // // // // // // //                     <div className="text-center p-8 text-base-content/60">No problems match the selected filters.</div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </main>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // const getDifficultyColorText = (difficulty) => {
// // // // // // // // // //   if (!difficulty) return 'text-neutral-content';
// // // // // // // // // //   switch (difficulty.toLowerCase()) {
// // // // // // // // // //     case 'easy': return 'text-success';
// // // // // // // // // //     case 'medium': return 'text-warning';
// // // // // // // // // //     case 'hard': return 'text-error';
// // // // // // // // // //     default: return 'text-neutral-content';
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export default Homepage;




// // // // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // // --- Helper Components for a cleaner main component ---

// // // // // // // // // // Renders the stats bar for solved problems by difficulty
// // // // // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // // // // //         const solvedStats = useMemo(() => {
// // // // // // // // //         const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // // //         solvedProblems.forEach(solvedId => {
// // // // // // // // //             const problem = allProblems.find(p => p._id === solvedId);
// // // // // // // // //             if (problem && stats[problem.difficulty] !== undefined) {
// // // // // // // // //                 stats[problem.difficulty]++;
// // // // // // // // //             }
// // // // // // // // //         });
// // // // // // // // //         return stats;
// // // // // // // // //     }, [solvedProblems, allProblems]);

// // // // // // // // //     const totalStats = useMemo(() => {
// // // // // // // // //         const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // // //          allProblems.forEach(problem => {
// // // // // // // // //             if (stats[problem.difficulty] !== undefined) {
// // // // // // // // //                 stats[problem.difficulty]++;
                

// // // // // // // // //             }
// // // // // // // // //         });
// // // // // // // // //         return stats;
// // // // // // // // //     }, [allProblems]);

// // // // // // // // //     return (
// // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// // // // // // // // //             <StatCard title="Easy" solved={solvedStats.easy} total={totalStats.easy} color="text-success" />
// // // // // // // // //             <StatCard title="Medium" solved={solvedStats.medium} total={totalStats.medium} color="text-warning" />
// // // // // // // // //             <StatCard title="Hard" solved={solvedStats.hard} total={totalStats.hard} color="text-error" />
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // // A single card used in the StatsBar
// // // // // // // // // const StatCard = ({ title, solved, total, color }) => (
// // // // // // // // //     <div className="bg-base-100/50 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
// // // // // // // // //         <div className={`text-sm ${color}`}>{title}</div>
// // // // // // // // //         <div className="flex items-baseline gap-2 mt-1">
// // // // // // // // //             <div className="text-2xl font-bold text-white">{solved}</div>
// // // // // // // // //             <div className="text-base-content/60">/ {total}</div>
// // // // // // // // //         </div>
// // // // // // // // //         <progress className={`progress ${color.replace('text-', 'progress-')} w-full mt-2`} value={solved} max={total}></progress>
// // // // // // // // //     </div>
// // // // // // // // // );

// // // // // // // // // // Renders the "Problem of the Day" card
// // // // // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // // // // //     if (!problem) return null;
// // // // // // // // //     return (
// // // // // // // // //         <div className="mb-8 p-6 rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg">
// // // // // // // // //             <h2 className="text-sm font-bold opacity-70 mb-2">PROBLEM OF THE DAY</h2>
// // // // // // // // //             <h3 className="text-2xl font-semibold">{problem.title}</h3>
// // // // // // // // //             <p className="text-sm opacity-80 mt-1">Challenge yourself with today's featured problem!</p>
// // // // // // // // //             <NavLink to={`/problem/${problem._id}`} className="btn btn-sm btn-outline btn-ghost mt-4">
// // // // // // // // //                 Solve Now
// // // // // // // // //             </NavLink>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };


// // // // // // // // // function Homepage() {
// // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // //   const { user } = useSelector((state) => state.auth);
// // // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [filters, setFilters] = useState({
// // // // // // // // //     difficulty: 'all',
// // // // // // // // //     tag: 'all',
// // // // // // // // //     status: 'all'
// // // // // // // // //   });

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchAllData = async () => {
// // // // // // // // //       setLoading(true);
// // // // // // // // //       try {
// // // // // // // // //         const problemPromise = axiosClient.get('/problem/getallproblem');
// // // // // // // // //         const solvedPromise = user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] });

// // // // // // // // //         const [problemResponse, solvedResponse] = await Promise.all([problemPromise, solvedPromise]);
        
// // // // // // // // //         setProblems(problemResponse.data || []);
        
// // // // // // // // //         if (solvedResponse.data) {
// // // // // // // // //             setSolvedProblemIds(solvedResponse.data.map(problem => problem._id));
// // // // // // // // //         }

// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error('Error fetching data:', error);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchAllData();
// // // // // // // // //   }, [user]);

// // // // // // // // //   const handleLogout = () => {
// // // // // // // // //     dispatch(logoutUser());
// // // // // // // // //     setSolvedProblemIds([]);
// // // // // // // // //   };

// // // // // // // // //   const filteredProblems = problems.filter(problem => {
// // // // // // // // //     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// // // // // // // // //     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
// // // // // // // // //     const hasSolved = solvedProblemIds.includes(problem._id);
// // // // // // // // //     const statusMatch = filters.status === 'all' || (filters.status === 'solved' && hasSolved) || (filters.status === 'unsolved' && !hasSolved);
// // // // // // // // //     return difficultyMatch && tagMatch && statusMatch;
// // // // // // // // //   });

// // // // // // // // //   const featuredProblem = useMemo(() => {
// // // // // // // // //       if (problems.length === 0) return null;
// // // // // // // // //       const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // // // // //       return unsolved.length > 0 ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[0];
// // // // // // // // //   }, [problems, solvedProblemIds]);
  
// // // // // // // // //   const pageStyle = {
// // // // // // // // //     backgroundColor: '#0d1117',
// // // // // // // // //     backgroundImage: `radial-gradient(at 0% 100%, hsla(253, 16%, 7%, 1) 0, transparent 50%), 
// // // // // // // // //                       radial-gradient(at 80% 0%, hsla(28, 100%, 74%, 0.1) 0, transparent 50%),
// // // // // // // // //                       radial-gradient(at 80% 100%, hsla(340, 100%, 76%, 0.1) 0, transparent 50%)`,
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div style={pageStyle} className="min-h-screen text-base-content">
// // // // // // // // //       <nav className="navbar bg-base-100/80 backdrop-blur-lg shadow-lg px-4 sticky top-0 z-30 border-b border-white/10">
// // // // // // // // //         <div className="flex-1">
// // // // // // // // //           <NavLink to="/" className="btn btn-ghost text-xl">Coder World</NavLink>
// // // // // // // // //         </div>
// // // // // // // // //         <div className="flex-none gap-4">
// // // // // // // // //           <div className="dropdown dropdown-end">
// // // // // // // // //             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
// // // // // // // // //                 <div className="w-10 rounded-full bg-primary text-primary-content ring ring-primary ring-offset-base-100 ring-offset-2">
// // // // // // // // //                     <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase()}</span>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>
// // // // // // // // //             <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
// // // // // // // // //               <li><NavLink to="/profile">Profile</NavLink></li>
// // // // // // // // //               {user?.role === 'admin' && <li><NavLink to="/admin">Admin Panel</NavLink></li>}
// // // // // // // // //               <div className="divider my-1"></div>
// // // // // // // // //               <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // // //             </ul>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </nav>

// // // // // // // // //       <main className="container mx-auto p-4 sm:p-6">
// // // // // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />
        
// // // // // // // // //         <div className="card bg-base-100/50 backdrop-blur-sm shadow-xl p-4 mb-6 border border-white/10">
// // // // // // // // //             <div className="flex flex-wrap items-center gap-4">
// // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
// // // // // // // // //                 <option value="all">Status</option>
// // // // // // // // //                 <option value="solved">Solved</option>
// // // // // // // // //                 <option value="unsolved">Unsolved</option>
// // // // // // // // //               </select>
// // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})}>
// // // // // // // // //                 <option value="all">Difficulty</option>
// // // // // // // // //                 <option value="easy">Easy</option>
// // // // // // // // //                 <option value="medium">Medium</option>
// // // // // // // // //                 <option value="hard">Hard</option>
// // // // // // // // //               </select>
// // // // // // // // //               <select className="select select-bordered w-full sm:w-auto" value={filters.tag} onChange={(e) => setFilters({...filters, tag: e.target.value})}>
// // // // // // // // //                 <option value="all">Tags</option>
// // // // // // // // //                 <option value="array">Array</option>
// // // // // // // // //                 <option value="linked list">Linked List</option>
// // // // // // // // //                 <option value="dp">DP</option>
// // // // // // // // //                 <option value="string">String</option>
// // // // // // // // //               </select>
// // // // // // // // //             </div>
// // // // // // // // //         </div>

// // // // // // // // //         {loading ? (
// // // // // // // // //             <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
// // // // // // // // //         ) : (
// // // // // // // // //             <div className="overflow-x-auto bg-base-100/50 backdrop-blur-sm rounded-lg shadow-xl border border-white/10">
// // // // // // // // //                 <table className="table">
// // // // // // // // //                     <thead>
// // // // // // // // //                         <tr className="border-b border-white/10">
// // // // // // // // //                             <th className="w-[5%]">Status</th>
// // // // // // // // //                             <th className="w-[50%]">Title</th>
// // // // // // // // //                             <th className="w-[15%] text-center">Acceptance</th>
// // // // // // // // //                             <th className="w-[15%]">Difficulty</th>
// // // // // // // // //                             <th className="w-[15%]">Category</th>
// // // // // // // // //                         </tr>
// // // // // // // // //                     </thead>
// // // // // // // // //                     <tbody>
// // // // // // // // //                         {filteredProblems.map(problem => (
// // // // // // // // //                             <tr key={problem._id} className="hover:bg-base-100/50 border-b border-white/10 last:border-b-0">
// // // // // // // // //                                 <td className="text-center">
// // // // // // // // //                                     {solvedProblemIds.includes(problem._id) && (
// // // // // // // // //                                         <div className="text-success tooltip" data-tip="Solved">
// // // // // // // // //                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
// // // // // // // // //                                         </div>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </td>
// // // // // // // // //                                 <td>
// // // // // // // // //                                     <NavLink to={`/problem/${problem._id}`} className="link link-hover font-medium text-base-content">
// // // // // // // // //                                         {problem.title}
// // // // // // // // //                                     </NavLink>
// // // // // // // // //                                 </td>
// // // // // // // // //                                 <td className="text-center text-sm text-base-content/70">{(problem.acceptanceRate || 45.2).toFixed(1)}%</td>
// // // // // // // // //                                 <td>
// // // // // // // // //                                     <span className={`font-semibold ${getDifficultyColorText(problem.difficulty)}`}>{problem.difficulty}</span>
// // // // // // // // //                                 </td>
// // // // // // // // //                                 <td>
// // // // // // // // //                                     <div className="badge badge-info badge-outline">{problem.tags}</div>
// // // // // // // // //                                 </td>
// // // // // // // // //                             </tr>
// // // // // // // // //                         ))}
// // // // // // // // //                     </tbody>
// // // // // // // // //                 </table>
// // // // // // // // //                  {filteredProblems.length === 0 && !loading && (
// // // // // // // // //                     <div className="text-center p-8 text-base-content/60">No problems match the selected filters.</div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         )}
// // // // // // // // //       </main>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // const getDifficultyColorText = (difficulty) => {
// // // // // // // // //   if (!difficulty) return 'text-neutral-content';
// // // // // // // // //   switch (difficulty.toLowerCase()) {
// // // // // // // // //     case 'easy': return 'text-success';
// // // // // // // // //     case 'medium': return 'text-warning';
// // // // // // // // //     case 'hard': return 'text-error';
// // // // // // // // //     default: return 'text-neutral-content';
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export default Homepage;
// // // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // // StatsBar Component
// // // // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // // // //   const solvedStats = useMemo(() => {
// // // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // //     solvedProblems.forEach(id => {
// // // // // // // //       const p = allProblems.find(pr => pr._id === id);
// // // // // // // //       if (p && stats[p.difficulty] !== undefined) stats[p.difficulty]++;
// // // // // // // //     });
// // // // // // // //     return stats;
// // // // // // // //   }, [solvedProblems, allProblems]);

// // // // // // // //   const totalStats = useMemo(() => {
// // // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // // //     allProblems.forEach(p => {
// // // // // // // //       if (stats[p.difficulty] !== undefined) stats[p.difficulty]++;
// // // // // // // //     });
// // // // // // // //     return stats;
// // // // // // // //   }, [allProblems]);

// // // // // // // //   return (
// // // // // // // //     <div className="grid md:grid-cols-3 gap-4 mb-10 animate__animated animate__fadeInUp">
// // // // // // // //       {['easy', 'medium', 'hard'].map(level => (
// // // // // // // //         <div key={level} className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/10 transition-all hover:scale-[1.02]">
// // // // // // // //           <h3 className={`uppercase text-sm font-bold ${getDifficultyColor(level)}`}>{level}</h3>
// // // // // // // //           <div className="text-3xl font-bold text-white mt-1">{solvedStats[level]} / {totalStats[level]}</div>
// // // // // // // //           <progress className={`progress ${getDifficultyColor(level).replace('text-', 'progress-')} w-full mt-2`} value={solvedStats[level]} max={totalStats[level]}></progress>
// // // // // // // //         </div>
// // // // // // // //       ))}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // // // //   if (!problem) return null;
// // // // // // // //   return (
// // // // // // // //     <div className="bg-gradient-to-tr from-primary to-secondary text-white p-6 rounded-xl shadow-xl mb-10 animate__animated animate__fadeInDown">
// // // // // // // //       <h2 className="text-sm uppercase font-bold opacity-70">Problem of the Day</h2>
// // // // // // // //       <h3 className="text-2xl font-bold mt-1">{problem.title}</h3>
// // // // // // // //       <p className="opacity-80 mt-1">Challenge yourself with today's featured problem!</p>
// // // // // // // //       <NavLink to={`/problem/${problem._id}`} className="btn btn-sm btn-outline mt-4">Solve Now</NavLink>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // function Homepage() {
// // // // // // // //   const dispatch = useDispatch();
// // // // // // // //   const { user } = useSelector(state => state.auth);
// // // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchData = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
// // // // // // // //         const [probRes, solvedRes] = await Promise.all([
// // // // // // // //           axiosClient.get('/problem/getallproblem'),
// // // // // // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // // // // // //         ]);
// // // // // // // //         setProblems(probRes.data || []);
// // // // // // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // // // // // //       } catch (e) {
// // // // // // // //         console.error('Homepage fetch failed:', e);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchData();
// // // // // // // //   }, [user]);

// // // // // // // //   const handleLogout = () => {
// // // // // // // //     dispatch(logoutUser());
// // // // // // // //     setSolvedProblemIds([]);
// // // // // // // //   };

// // // // // // // //   const filteredProblems = problems.filter(p => {
// // // // // // // //     const matchDifficulty = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
// // // // // // // //     const matchTag = filters.tag === 'all' || p.tags === filters.tag;
// // // // // // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // // // // // //     const matchStatus = filters.status === 'all' ||
// // // // // // // //       (filters.status === 'solved' && isSolved) ||
// // // // // // // //       (filters.status === 'unsolved' && !isSolved);
// // // // // // // //     return matchDifficulty && matchTag && matchStatus;
// // // // // // // //   });

// // // // // // // //   const featuredProblem = useMemo(() => {
// // // // // // // //     if (problems.length === 0) return null;
// // // // // // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[0];
// // // // // // // //   }, [problems, solvedProblemIds]);

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       className="min-h-screen text-base-content"
// // // // // // // //       style={{
// // // // // // // //         backgroundColor: '#0f172a',
// // // // // // // //         backgroundImage: `radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.03), transparent 40%),
// // // // // // // //                           radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.02), transparent 30%)`
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       {/* Navbar */}
// // // // // // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur bg-base-100/80 px-6 border-b border-white/10 shadow-md">
// // // // // // // //         <div className="flex-1">
// // // // // // // //           <NavLink to="/" className="btn btn-ghost normal-case text-xl">CodeArena</NavLink>
// // // // // // // //         </div>
// // // // // // // //         <div className="dropdown dropdown-end">
// // // // // // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
// // // // // // // //             <div className="w-10 rounded-full bg-primary text-white ring ring-primary">
// // // // // // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase()}</span>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow menu bg-base-300 rounded-box w-52 z-50">
// // // // // // // //             <li><NavLink to="/profile">Profile</NavLink></li>
// // // // // // // //             {user?.role === 'admin' && <li><NavLink to="/admin">Admin Panel</NavLink></li>}
// // // // // // // //             <div className="divider m-0" />
// // // // // // // //             <li><button onClick={handleLogout}>Logout</button></li>
// // // // // // // //           </ul>
// // // // // // // //         </div>
// // // // // // // //       </nav>

// // // // // // // //       {/* Main Content */}
// // // // // // // //       <main className="container mx-auto px-4 sm:px-6 py-6">
// // // // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // // // // // //         {/* Filter */}
// // // // // // // //         <div className="card bg-base-100/50 p-4 mb-8 border border-white/10 backdrop-blur-md animate__animated animate__fadeInUp">
// // // // // // // //           <div className="flex flex-wrap gap-4 items-center">
// // // // // // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // // // // // //               <select
// // // // // // // //                 key={filter}
// // // // // // // //                 className="select select-bordered w-full sm:w-auto"
// // // // // // // //                 value={filters[filter]}
// // // // // // // //                 onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // // // // // //               >
// // // // // // // //                 <option value="all">{filter.charAt(0).toUpperCase() + filter.slice(1)}</option>
// // // // // // // //                 {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v}</option>)}
// // // // // // // //                 {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v}</option>)}
// // // // // // // //                 {filter === 'tag' && ['array', 'linked list', 'dp', 'string'].map(v => <option key={v} value={v}>{v}</option>)}
// // // // // // // //               </select>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* Problem Table */}
// // // // // // // //         {loading ? (
// // // // // // // //           <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
// // // // // // // //         ) : (
// // // // // // // //           <div className="overflow-x-auto bg-base-100/40 rounded-xl border border-white/10 shadow-xl animate__animated animate__fadeIn">
// // // // // // // //             <table className="table text-white">
// // // // // // // //               <thead>
// // // // // // // //                 <tr className="border-b border-white/10">
// // // // // // // //                   <th>Status</th>
// // // // // // // //                   <th>Title</th>
// // // // // // // //                   <th className="text-center">Acceptance</th>
// // // // // // // //                   <th>Difficulty</th>
// // // // // // // //                   <th>Category</th>
// // // // // // // //                 </tr>
// // // // // // // //               </thead>
// // // // // // // //               <tbody>
// // // // // // // //                 {filteredProblems.map(p => (
// // // // // // // //                   <tr key={p._id} className="hover:bg-base-100/40 transition-colors border-b border-white/5 last:border-none">
// // // // // // // //                     <td className="text-center">
// // // // // // // //                       {solvedProblemIds.includes(p._id) && (
// // // // // // // //                         <span className="text-success tooltip" data-tip="Solved">✔</span>
// // // // // // // //                       )}
// // // // // // // //                     </td>
// // // // // // // //                     <td>
// // // // // // // //                       <NavLink to={`/problem/${p._id}`} className="link link-hover">{p.title}</NavLink>
// // // // // // // //                     </td>
// // // // // // // //                     <td className="text-center text-sm text-base-content/70">{(p.acceptanceRate || 45.2).toFixed(1)}%</td>
// // // // // // // //                     <td><span className={`font-bold ${getDifficultyColor(p.difficulty)}`}>{p.difficulty}</span></td>
// // // // // // // //                     <td><div className="badge badge-outline badge-info">{p.tags}</div></td>
// // // // // // // //                   </tr>
// // // // // // // //                 ))}
// // // // // // // //               </tbody>
// // // // // // // //             </table>
// // // // // // // //             {filteredProblems.length === 0 && <div className="text-center py-10 opacity-60">No problems match the selected filters.</div>}
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </main>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // function getDifficultyColor(difficulty) {
// // // // // // // //   switch (difficulty) {
// // // // // // // //     case 'easy': return 'text-success';
// // // // // // // //     case 'medium': return 'text-warning';
// // // // // // // //     case 'hard': return 'text-error';
// // // // // // // //     default: return 'text-white/60';
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // export default Homepage;
// // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // Helper function for difficulty colors (using default Tailwind colors)
// // // // // // // function getDifficultyColor(difficulty) {
// // // // // // //   switch (difficulty) {
// // // // // // //     case 'easy': return 'text-emerald-400'; // Tailwind green
// // // // // // //     case 'medium': return 'text-amber-400'; // Tailwind amber
// // // // // // //     case 'hard': return 'text-red-400';     // Tailwind red
// // // // // // //     default: return 'text-gray-400';
// // // // // // //   }
// // // // // // // }

// // // // // // // // StatsBar Component - Adapted for inline CSS
// // // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // // //   const solvedStats = useMemo(() => {
// // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // //     solvedProblems.forEach(id => {
// // // // // // //       const p = allProblems.find(pr => pr._id === id);
// // // // // // //       if (p && stats[p.difficulty] !== undefined) stats[p.difficulty]++;
// // // // // // //     });
// // // // // // //     return stats;
// // // // // // //   }, [solvedProblems, allProblems]);

// // // // // // //   const totalStats = useMemo(() => {
// // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // //     allProblems.forEach(p => {
// // // // // // //       if (stats[p.difficulty] !== undefined) stats[p.difficulty]++;
// // // // // // //     });
// // // // // // //     return stats;
// // // // // // //   }, [allProblems]);

// // // // // // //   return (
// // // // // // //     <div className="grid md:grid-cols-3 gap-6 mb-12"> {/* animate__ classes removed */}
// // // // // // //       {['easy', 'medium', 'hard'].map(level => (
// // // // // // //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// // // // // // //           {/* Subtle background glow effect - simplified with inline gradient */}
// // // // // // //           <div
// // // // // // //             className="absolute inset-0 opacity-10 blur-xl"
// // // // // // //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // // // //           ></div>
// // // // // // //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// // // // // // //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// // // // // // //             {solvedStats[level]} / {totalStats[level]}
// // // // // // //           </div>
// // // // // // //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// // // // // // //           <progress
// // // // // // //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// // // // // // //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }} // Custom property for DaisyUI progress color
// // // // // // //             value={solvedStats[level]}
// // // // // // //             max={totalStats[level]}
// // // // // // //           ></progress>
// // // // // // //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// // // // // // //         </div>
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // FeaturedProblem Component - Adapted for inline CSS
// // // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // // //   if (!problem) return null;
// // // // // // //   return (
// // // // // // //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 relative overflow-hidden"> {/* animate__ classes removed */}
// // // // // // //       {/* Abstract background elements - very simplified, just basic shapes */}
// // // // // // //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// // // // // // //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// // // // // // //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// // // // // // //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// // // // // // //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// // // // // // //       <NavLink
// // // // // // //         to={`/problem/${problem._id}`}
// // // // // // //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg" // shadow-glow-sm removed
// // // // // // //       >
// // // // // // //         Solve Now
// // // // // // //       </NavLink>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // function Homepage() {
// // // // // // //   const dispatch = useDispatch();
// // // // // // //   const { user } = useSelector(state => state.auth);
// // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         const [probRes, solvedRes] = await Promise.all([
// // // // // // //           axiosClient.get('/problem/getallproblem'),
// // // // // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // // // // //         ]);
// // // // // // //         setProblems(probRes.data || []);
// // // // // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // // // // //       } catch (e) {
// // // // // // //         console.error('Homepage fetch failed:', e);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchData();
// // // // // // //   }, [user]);

// // // // // // //   const handleLogout = () => {
// // // // // // //     dispatch(logoutUser());
// // // // // // //     setSolvedProblemIds([]);
// // // // // // //   };

// // // // // // //   const filteredProblems = problems.filter(p => {
// // // // // // //     const matchDifficulty = filters.difficulty === 'all' || p.difficulty === filters.difficulty;
// // // // // // //     const matchTag = filters.tag === 'all' || p.tags.includes(filters.tag);
// // // // // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // // // // //     const matchStatus = filters.status === 'all' ||
// // // // // // //       (filters.status === 'solved' && isSolved) ||
// // // // // // //       (filters.status === 'unsolved' && !isSolved);
// // // // // // //     return matchDifficulty && matchTag && matchStatus;
// // // // // // //   });

// // // // // // //   const featuredProblem = useMemo(() => {
// // // // // // //     if (problems.length === 0) return null;
// // // // // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// // // // // // //   }, [problems, solvedProblemIds]);

// // // // // // //   const uniqueTags = useMemo(() => {
// // // // // // //     const tags = new Set();
// // // // // // //     problems.forEach(p => {
// // // // // // //       if (Array.isArray(p.tags)) {
// // // // // // //         p.tags.forEach(tag => tags.add(tag));
// // // // // // //       } else if (typeof p.tags === 'string' && p.tags) {
// // // // // // //         p.tags.split(',').forEach(tag => tags.add(tag.trim()));
// // // // // // //       }
// // // // // // //     });
// // // // // // //     return Array.from(tags).sort();
// // // // // // //   }, [problems]);

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="min-h-screen text-slate-200 bg-slate-950" // Directly using Tailwind colors
// // // // // // //       // No data-theme="darkPro" as DaisyUI theming via tailwind.config.js is not allowed
// // // // // // //       style={{
// // // // // // //         // Simplified background pattern using style attribute
// // // // // // //         backgroundImage: `
// // // // // // //           radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.05), transparent 60%),
// // // // // // //           radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.04), transparent 50%)
// // // // // // //         `,
// // // // // // //         backgroundAttachment: 'fixed',
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       {/* Navbar */}
// // // // // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // // // //         <div className="flex-1">
// // // // // // //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // // //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)' }}> {/* Manual gradient for text */}
// // // // // // //             CodeArena<span className="text-xl opacity-70">.dev</span>
// // // // // // //           </NavLink>
// // // // // // //         </div>
// // // // // // //         <div className="flex-none">
// // // // // // //           <ul className="menu menu-horizontal px-1 hidden md:flex">
// // // // // // //             <li><NavLink to="/problems" className="hover:text-indigo-500 transition-colors">Problems</NavLink></li>
// // // // // // //             <li><NavLink to="/contests" className="hover:text-indigo-500 transition-colors">Contests</NavLink></li>
// // // // // // //             <li><NavLink to="/leaderboard" className="hover:text-indigo-500 transition-colors">Leaderboard</NavLink></li>
// // // // // // //           </ul>
// // // // // // //         </div>
// // // // // // //         <div className="dropdown dropdown-end ml-4">
// // // // // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200">
// // // // // // //             <div className="w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
// // // // // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700">
// // // // // // //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20">Profile</NavLink></li>
// // // // // // //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20">Admin Panel</NavLink></li>}
// // // // // // //             <div className="divider my-1 h-px bg-gray-700" />
// // // // // // //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20">Logout</button></li>
// // // // // // //           </ul>
// // // // // // //         </div>
// // // // // // //       </nav>

// // // // // // //       {/* Main Content */}
// // // // // // //       <main className="container mx-auto px-4 sm:px-6 py-8">
// // // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // // // // //         {/* Filter */}
// // // // // // //         <div className="card bg-gray-800 p-6 mb-8 border border-gray-700 shadow-lg"> {/* animate__ classes removed */}
// // // // // // //           <div className="flex flex-wrap gap-4 items-center">
// // // // // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // // // // //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// // // // // // //                 <div className="label">
// // // // // // //                   <span className="label-text text-gray-400">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// // // // // // //                 </div>
// // // // // // //                 <select
// // // // // // //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// // // // // // //                   value={filters[filter]}
// // // // // // //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // // // // //                 >
// // // // // // //                   <option value="all">All {filter}</option>
// // // // // // //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                 </select>
// // // // // // //               </label>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Problem Table */}
// // // // // // //         {loading ? (
// // // // // // //           <div className="text-center py-20"> {/* animate__ classes removed */}
// // // // // // //             <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // // // //             <p className="mt-4 text-gray-400">Loading challenges...</p>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="overflow-x-auto bg-gray-800 rounded-2xl border border-gray-700 shadow-xl"> {/* animate__ classes removed */}
// // // // // // //             <table className="table w-full text-slate-200">
// // // // // // //               <thead>
// // // // // // //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// // // // // // //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// // // // // // //                 </tr>
// // // // // // //               </thead>
// // // // // // //               <tbody>
// // // // // // //                 {filteredProblems.length > 0 ? (
// // // // // // //                   filteredProblems.map(p => (
// // // // // // //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// // // // // // //                       <td className="px-6 py-4 text-center">
// // // // // // //                         {solvedProblemIds.includes(p._id) ? (
// // // // // // //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs" data-tip="Solved">Solved</span> // Manual badge styling
// // // // // // //                         ) : (
// // // // // // //                           <span className="text-gray-500 text-xs">Unsolved</span>
// // // // // // //                         )}
// // // // // // //                       </td>
// // // // // // //                       <td className="px-6 py-4">
// // // // // // //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// // // // // // //                       </td>
// // // // // // //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// // // // // // //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{p.difficulty}</span></td>
// // // // // // //                       <td className="px-6 py-4">
// // // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // // //                           {Array.isArray(p.tags) ?
// // // // // // //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) : // Manual badge styling
// // // // // // //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// // // // // // //                           }
// // // // // // //                         </div>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   ))
// // // // // // //                 ) : (
// // // // // // //                   <tr>
// // // // // // //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// // // // // // //                   </tr>
// // // // // // //                 )}
// // // // // // //               </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // // export default Homepage;
// // // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // // import { NavLink } from 'react-router-dom';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // // import { logoutUser } from '../authSlice';

// // // // // // // // Helper function for difficulty colors (using default Tailwind colors)
// // // // // // // function getDifficultyColor(difficulty) {
// // // // // // //   // Ensure the input difficulty is normalized before comparison
// // // // // // //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// // // // // // //   switch (normalizedDifficulty) {
// // // // // // //     case 'easy': return 'text-emerald-400'; // Tailwind green
// // // // // // //     case 'medium': return 'text-amber-400'; // Tailwind amber
// // // // // // //     case 'hard': return 'text-red-400';     // Tailwind red
// // // // // // //     default: return 'text-gray-400';
// // // // // // //   }
// // // // // // // }

// // // // // // // // StatsBar Component - Adapted for inline CSS
// // // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // // //   const solvedStats = useMemo(() => {
// // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // //     solvedProblems.forEach(id => {
// // // // // // //       const p = allProblems.find(pr => pr._id === id);
// // // // // // //       if (p) {
// // // // // // //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // // // //         if (stats[normalizedDifficulty] !== undefined) {
// // // // // // //           stats[normalizedDifficulty]++;
// // // // // // //         }
// // // // // // //       }
// // // // // // //     });
// // // // // // //     return stats;
// // // // // // //   }, [solvedProblems, allProblems]);

// // // // // // //   const totalStats = useMemo(() => {
// // // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // // //     allProblems.forEach(p => {
// // // // // // //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // // // //       if (stats[normalizedDifficulty] !== undefined) {
// // // // // // //         stats[normalizedDifficulty]++;
// // // // // // //       }
// // // // // // //     });
// // // // // // //     return stats;
// // // // // // //   }, [allProblems]);

// // // // // // //   return (
// // // // // // //     <div className="grid md:grid-cols-3 gap-6 mb-12">
// // // // // // //       {['easy', 'medium', 'hard'].map(level => (
// // // // // // //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// // // // // // //           {/* Subtle background glow effect - simplified with inline gradient */}
// // // // // // //           <div
// // // // // // //             className="absolute inset-0 opacity-10 blur-xl"
// // // // // // //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // // // //           ></div>
// // // // // // //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// // // // // // //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// // // // // // //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// // // // // // //           </div>
// // // // // // //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// // // // // // //           <progress
// // // // // // //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// // // // // // //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }} // Custom property for DaisyUI progress color
// // // // // // //             value={solvedStats[level]}
// // // // // // //             max={totalStats[level] || 1} // Ensure max is at least 1 to prevent division by zero for progress bar
// // // // // // //           ></progress>
// // // // // // //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// // // // // // //         </div>
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // // FeaturedProblem Component - Adapted for inline CSS
// // // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // // //   if (!problem) return null;
// // // // // // //   return (
// // // // // // //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 relative overflow-hidden">
// // // // // // //       {/* Abstract background elements - very simplified, just basic shapes */}
// // // // // // //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// // // // // // //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// // // // // // //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// // // // // // //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// // // // // // //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// // // // // // //       <NavLink
// // // // // // //         to={`/problem/${problem._id}`}
// // // // // // //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// // // // // // //       >
// // // // // // //         Solve Now
// // // // // // //       </NavLink>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // function Homepage() {
// // // // // // //   const dispatch = useDispatch();
// // // // // // //   const { user } = useSelector(state => state.auth);
// // // // // // //   const [problems, setProblems] = useState([]);
// // // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         const [probRes, solvedRes] = await Promise.all([
// // // // // // //           axiosClient.get('/problem/getallproblem'),
// // // // // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // // // // //         ]);
// // // // // // //         setProblems(probRes.data || []);
// // // // // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // // // // //         // console.log('Fetched All Problems:', probRes.data); // Debug: Inspect your raw problem data here
// // // // // // //       } catch (e) {
// // // // // // //         console.error('Homepage fetch failed:', e);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchData();
// // // // // // //   }, [user]);

// // // // // // //   const handleLogout = () => {
// // // // // // //     dispatch(logoutUser());
// // // // // // //     setSolvedProblemIds([]);
// // // // // // //   };

// // // // // // //   const filteredProblems = problems.filter(p => {
// // // // // // //     // Normalize problem difficulty for comparison
// // // // // // //     const normalizedProblemDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';

// // // // // // //     const matchDifficulty = filters.difficulty === 'all' || normalizedProblemDifficulty === filters.difficulty;
    
// // // // // // //     // Normalize filter tag
// // // // // // //     const filterTagNormalized = filters.tag.toLowerCase().trim();
// // // // // // //     let matchTag = filters.tag === 'all';
// // // // // // //     if (!matchTag && p.tags) {
// // // // // // //       if (Array.isArray(p.tags)) {
// // // // // // //         // If p.tags is an array, normalize each tag in the array and check for inclusion
// // // // // // //         matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// // // // // // //       } else if (typeof p.tags === 'string') {
// // // // // // //         // If p.tags is a comma-separated string, split it, normalize each part, and check for inclusion
// // // // // // //         const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// // // // // // //         matchTag = problemTagsNormalized.includes(filterTagNormalized);
// // // // // // //       }
// // // // // // //     }
    
// // // // // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // // // // //     const matchStatus = filters.status === 'all' ||
// // // // // // //       (filters.status === 'solved' && isSolved) ||
// // // // // // //       (filters.status === 'unsolved' && !isSolved);
// // // // // // //     return matchDifficulty && matchTag && matchStatus;
// // // // // // //   });

// // // // // // //   const featuredProblem = useMemo(() => {
// // // // // // //     if (problems.length === 0) return null;
// // // // // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// // // // // // //   }, [problems, solvedProblemIds]);

// // // // // // //   const uniqueTags = useMemo(() => {
// // // // // // //     const tags = new Set();
// // // // // // //     problems.forEach(p => {
// // // // // // //       if (p.tags) {
// // // // // // //         if (Array.isArray(p.tags)) {
// // // // // // //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim())); // Normalize tags for consistency
// // // // // // //         } else if (typeof p.tags === 'string') {
// // // // // // //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // // // // //         }
// // // // // // //       }
// // // // // // //     });
// // // // // // //     return Array.from(tags).filter(tag => tag !== '').sort(); // Filter out any empty strings from malformed tags
// // // // // // //   }, [problems]);

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       className="min-h-screen text-slate-200 bg-slate-950"
// // // // // // //       style={{
// // // // // // //         backgroundImage: `
// // // // // // //           radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.05), transparent 60%),
// // // // // // //           radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.04), transparent 50%)
// // // // // // //         `,
// // // // // // //         backgroundAttachment: 'fixed',
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       {/* Navbar */}
// // // // // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md">
// // // // // // //         <div className="flex-1">
// // // // // // //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // // //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)' }}>
// // // // // // //             CodeArena<span className="text-xl opacity-70">.dev</span>
// // // // // // //           </NavLink>
// // // // // // //         </div>
// // // // // // //         <div className="flex-none">
// // // // // // //           <ul className="menu menu-horizontal px-1 hidden md:flex">
// // // // // // //             <li><NavLink to="/problems" className="hover:text-indigo-500 transition-colors">Problems</NavLink></li>
// // // // // // //             <li><NavLink to="/contests" className="hover:text-indigo-500 transition-colors">Contests</NavLink></li>
// // // // // // //             <li><NavLink to="/leaderboard" className="hover:text-indigo-500 transition-colors">Leaderboard</NavLink></li>
// // // // // // //           </ul>
// // // // // // //         </div>
// // // // // // //         <div className="dropdown dropdown-end ml-4">
// // // // // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200">
// // // // // // //             <div className="w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
// // // // // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700">
// // // // // // //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20">Profile</NavLink></li>
// // // // // // //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20">Admin Panel</NavLink></li>}
// // // // // // //             <div className="divider my-1 h-px bg-gray-700" />
// // // // // // //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20">Logout</button></li>
// // // // // // //           </ul>
// // // // // // //         </div>
// // // // // // //       </nav>

// // // // // // //       {/* Main Content */}
// // // // // // //       <main className="container mx-auto px-4 sm:px-6 py-8">
// // // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // // // // //         {/* Filter */}
// // // // // // //         <div className="card bg-gray-800 p-6 mb-8 border border-gray-700 shadow-lg">
// // // // // // //           <div className="flex flex-wrap gap-4 items-center">
// // // // // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // // // // //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// // // // // // //                 <div className="label">
// // // // // // //                   <span className="label-text text-gray-400">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// // // // // // //                 </div>
// // // // // // //                 <select
// // // // // // //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// // // // // // //                   value={filters[filter]}
// // // // // // //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // // // // //                 >
// // // // // // //                   <option value="all">All {filter}</option>
// // // // // // //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // // //                 </select>
// // // // // // //               </label>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Problem Table */}
// // // // // // //         {loading ? (
// // // // // // //           <div className="text-center py-20">
// // // // // // //             <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // // // // // //             <p className="mt-4 text-gray-400">Loading challenges...</p>
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div className="overflow-x-auto bg-gray-800 rounded-2xl border border-gray-700 shadow-xl">
// // // // // // //             <table className="table w-full text-slate-200">
// // // // // // //               <thead>
// // // // // // //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// // // // // // //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// // // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// // // // // // //                 </tr>
// // // // // // //               </thead>
// // // // // // //               <tbody>
// // // // // // //                 {filteredProblems.length > 0 ? (
// // // // // // //                   filteredProblems.map(p => (
// // // // // // //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// // // // // // //                       <td className="px-6 py-4 text-center">
// // // // // // //                         {solvedProblemIds.includes(p._id) ? (
// // // // // // //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs" data-tip="Solved">Solved</span>
// // // // // // //                         ) : (
// // // // // // //                           <span className="text-gray-500 text-xs">Unsolved</span>
// // // // // // //                         )}
// // // // // // //                       </td>
// // // // // // //                       <td className="px-6 py-4">
// // // // // // //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// // // // // // //                       </td>
// // // // // // //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// // // // // // //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{p.difficulty}</span></td>
// // // // // // //                       <td className="px-6 py-4">
// // // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // // //                           {/* Display original tags here, filtering is done on normalized values */}
// // // // // // //                           {Array.isArray(p.tags) ?
// // // // // // //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// // // // // // //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// // // // // // //                           }
// // // // // // //                         </div>
// // // // // // //                       </td>
// // // // // // //                     </tr>
// // // // // // //                   ))
// // // // // // //                 ) : (
// // // // // // //                   <tr>
// // // // // // //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// // // // // // //                   </tr>
// // // // // // //                 )}
// // // // // // //               </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </main>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default Homepage;


// // // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // // import { NavLink } from 'react-router-dom';
// // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // import axiosClient from '../utils/axiosClient';
// // // // // // import { logoutUser } from '../authSlice';

// // // // // // // Helper function for difficulty colors (using default Tailwind colors)
// // // // // // function getDifficultyColor(difficulty) {
// // // // // //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// // // // // //   switch (normalizedDifficulty) {
// // // // // //     case 'easy': return 'text-emerald-400'; // Tailwind green
// // // // // //     case 'medium': return 'text-amber-400'; // Tailwind amber
// // // // // //     case 'hard': return 'text-red-400';     // Tailwind red
// // // // // //     default: return 'text-gray-400';
// // // // // //   }
// // // // // // }

// // // // // // // StatsBar Component - Enhanced UI with inline CSS
// // // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // // //   const solvedStats = useMemo(() => {
// // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // //     solvedProblems.forEach(id => {
// // // // // //       const p = allProblems.find(pr => pr._id === id);
// // // // // //       if (p) {
// // // // // //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // // //         if (stats[normalizedDifficulty] !== undefined) {
// // // // // //           stats[normalizedDifficulty]++;
// // // // // //         }
// // // // // //       }
// // // // // //     });
// // // // // //     return stats;
// // // // // //   }, [solvedProblems, allProblems]);

// // // // // //   const totalStats = useMemo(() => {
// // // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // // //     allProblems.forEach(p => {
// // // // // //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // // //       if (stats[normalizedDifficulty] !== undefined) {
// // // // // //         stats[normalizedDifficulty]++;
// // // // // //       }
// // // // // //     });
// // // // // //     return stats;
// // // // // //   }, [allProblems]);

// // // // // //   return (
// // // // // //     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // // //       {['easy', 'medium', 'hard'].map(level => (
// // // // // //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// // // // // //           {/* Subtle background glow effect */}
// // // // // //           <div
// // // // // //             className="absolute inset-0 opacity-10 blur-xl"
// // // // // //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // // //           ></div>
// // // // // //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// // // // // //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// // // // // //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// // // // // //           </div>
// // // // // //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// // // // // //           <progress
// // // // // //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// // // // // //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // // //             value={solvedStats[level]}
// // // // // //             max={totalStats[level] || 1}
// // // // // //           ></progress>
// // // // // //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// // // // // //         </div>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // // FeaturedProblem Component - Enhanced UI with inline CSS
// // // // // // const FeaturedProblem = ({ problem }) => {
// // // // // //   if (!problem) return null;
// // // // // //   return (
// // // // // //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // // //       {/* Abstract background elements */}
// // // // // //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// // // // // //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// // // // // //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// // // // // //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// // // // // //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// // // // // //       <NavLink
// // // // // //         to={`/problem/${problem._id}`}
// // // // // //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// // // // // //       >
// // // // // //         Solve Now
// // // // // //       </NavLink>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // function Homepage() {
// // // // // //   const dispatch = useDispatch();
// // // // // //   const { user } = useSelector(state => state.auth);
// // // // // //   const [problems, setProblems] = useState([]);
// // // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
// // // // // //         const [probRes, solvedRes] = await Promise.all([
// // // // // //           axiosClient.get('/problem/getallproblem'),
// // // // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // // // //         ]);
// // // // // //         setProblems(probRes.data || []);
// // // // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // // // //       } catch (e) {
// // // // // //         console.error('Homepage fetch failed:', e);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchData();
// // // // // //   }, [user]);

// // // // // //   const handleLogout = () => {
// // // // // //     dispatch(logoutUser());
// // // // // //     setSolvedProblemIds([]);
// // // // // //   };

// // // // // //   const filteredProblems = problems.filter(p => {
// // // // // //     const normalizedProblemDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // // //     const matchDifficulty = filters.difficulty === 'all' || normalizedProblemDifficulty === filters.difficulty;
    
// // // // // //     const filterTagNormalized = filters.tag.toLowerCase().trim();
// // // // // //     let matchTag = filters.tag === 'all';
// // // // // //     if (!matchTag && p.tags) {
// // // // // //       if (Array.isArray(p.tags)) {
// // // // // //         matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// // // // // //       } else if (typeof p.tags === 'string') {
// // // // // //         const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// // // // // //         matchTag = problemTagsNormalized.includes(filterTagNormalized);
// // // // // //       }
// // // // // //     }
    
// // // // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // // // //     const matchStatus = filters.status === 'all' ||
// // // // // //       (filters.status === 'solved' && isSolved) ||
// // // // // //       (filters.status === 'unsolved' && !isSolved);
// // // // // //     return matchDifficulty && matchTag && matchStatus;
// // // // // //   });

// // // // // //   const featuredProblem = useMemo(() => {
// // // // // //     if (problems.length === 0) return null;
// // // // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// // // // // //   }, [problems, solvedProblemIds]);

// // // // // //   const uniqueTags = useMemo(() => {
// // // // // //     const tags = new Set();
// // // // // //     problems.forEach(p => {
// // // // // //       if (p.tags) {
// // // // // //         if (Array.isArray(p.tags)) {
// // // // // //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // // // //         } else if (typeof p.tags === 'string') {
// // // // // //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // // // //         }
// // // // // //       }
// // // // // //     });
// // // // // //     return Array.from(tags).filter(tag => tag !== '').sort();
// // // // // //   }, [problems]);

// // // // // //   return (
// // // // // //     <div
// // // // // //       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
// // // // // //       style={{
// // // // // //         // Deeper, more complex background gradients
// // // // // //         backgroundImage: `
// // // // // //           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // // //           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // // //           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // // //           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // // //         `,
// // // // // //         backgroundAttachment: 'fixed',
// // // // // //       }}
// // // // // //     >
// // // // // //       {/* Inline styles for custom animations and effects */}
// // // // // //       <style>
// // // // // //         {`
// // // // // //         /* General fade-in for page loading */
// // // // // //         @keyframes fadeIn {
// // // // // //           from { opacity: 0; }
// // // // // //           to { opacity: 1; }
// // // // // //         }
// // // // // //         .animate-fade-in {
// // // // // //           animation: fadeIn 0.5s ease-in forwards;
// // // // // //         }

// // // // // //         /* For elements fading in from bottom */
// // // // // //         @keyframes fadeInUp {
// // // // // //           from { opacity: 0; transform: translateY(20px); }
// // // // // //           to { opacity: 1; transform: translateY(0); }
// // // // // //         }
// // // // // //         .animate-fade-in-up {
// // // // // //           animation: fadeInUp 0.6s ease-out forwards;
// // // // // //         }

// // // // // //         /* For elements fading in from top (like Navbar) */
// // // // // //         @keyframes fadeInDown {
// // // // // //           from { opacity: 0; transform: translateY(-20px); }
// // // // // //           to { opacity: 1; transform: translateY(0); }
// // // // // //         }
// // // // // //         .animate-fade-in-down {
// // // // // //           animation: fadeInDown 0.6s ease-out forwards;
// // // // // //         }

// // // // // //         /* Spinner animation (for loading states) */
// // // // // //         @keyframes spin-slow {
// // // // // //           from { transform: rotate(0deg); }
// // // // // //           to { transform: rotate(360deg); }
// // // // // //         }
// // // // // //         .animate-spin-slow {
// // // // // //           animation: spin-slow 0.8s linear infinite;
// // // // // //         }
// // // // // //         `}
// // // // // //       </style>

// // // // // //       {/* Floating CodeArena watermark */}
// // // // // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
// // // // // //         CODEARENA
// // // // // //       </div>

// // // // // //       {/* Navbar */}
// // // // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
// // // // // //         <div className="flex-1">
// // // // // //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // // //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // // //             CodeArena<span className="text-xl opacity-70">.dev</span>
// // // // // //           </NavLink>
// // // // // //         </div>
// // // // // //         <div className="flex-none">
// // // // // //           <ul className="menu menu-horizontal px-1 hidden md:flex text-lg font-semibold">
// // // // // //             <li><NavLink to="/problems" className="hover:text-indigo-400 transition-colors">Problems</NavLink></li>
// // // // // //             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
// // // // // //             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
// // // // // //           </ul>
// // // // // //         </div>
// // // // // //         <div className="dropdown dropdown-end ml-4">
// // // // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // // //             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
// // // // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // // //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // // // //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // // // //             <div className="divider my-1 h-px bg-gray-700" />
// // // // // //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // // // //           </ul>
// // // // // //         </div>
// // // // // //       </nav>

// // // // // //       {/* Main Content */}
// // // // // //       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
// // // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // // // //         {/* Filter */}
// // // // // //         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
// // // // // //           <div className="flex flex-wrap gap-4 items-center">
// // // // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // // // //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// // // // // //                 <div className="label">
// // // // // //                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// // // // // //                 </div>
// // // // // //                 <select
// // // // // //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// // // // // //                   value={filters[filter]}
// // // // // //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // // // //                 >
// // // // // //                   <option value="all">All {filter}</option>
// // // // // //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // // //                 </select>
// // // // // //               </label>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Problem Table */}
// // // // // //         {loading ? (
// // // // // //           <div className="text-center py-20 animate-fade-in">
// // // // // //             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
// // // // // //             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
// // // // // //             <table className="table w-full text-slate-200">
// // // // // //               <thead>
// // // // // //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// // // // // //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// // // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody>
// // // // // //                 {filteredProblems.length > 0 ? (
// // // // // //                   filteredProblems.map(p => (
// // // // // //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// // // // // //                       <td className="px-6 py-4 text-center">
// // // // // //                         {solvedProblemIds.includes(p._id) ? (
// // // // // //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
// // // // // //                         ) : (
// // // // // //                           <span className="text-gray-500 text-xs">Unsolved</span>
// // // // // //                         )}
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4">
// // // // // //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// // // // // //                       </td>
// // // // // //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// // // // // //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
// // // // // //                       <td className="px-6 py-4">
// // // // // //                         <div className="flex flex-wrap gap-2">
// // // // // //                           {Array.isArray(p.tags) ?
// // // // // //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// // // // // //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// // // // // //                           }
// // // // // //                         </div>
// // // // // //                       </td>
// // // // // //                     </tr>
// // // // // //                   ))
// // // // // //                 ) : (
// // // // // //                   <tr>
// // // // // //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// // // // // //                   </tr>
// // // // // //                 )}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </main>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default Homepage;
// // // // // import { useEffect, useState, useMemo } from 'react';
// // // // // import { NavLink } from 'react-router-dom';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import axiosClient from '../utils/axiosClient';
// // // // // import { logoutUser } from '../authSlice';

// // // // // // Helper function for difficulty colors (using default Tailwind colors)
// // // // // function getDifficultyColor(difficulty) {
// // // // //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// // // // //   switch (normalizedDifficulty) {
// // // // //     case 'easy': return 'text-emerald-400'; // Tailwind green
// // // // //     case 'medium': return 'text-amber-400'; // Tailwind amber
// // // // //     case 'hard': return 'text-red-400';     // Tailwind red
// // // // //     default: return 'text-gray-400';
// // // // //   }
// // // // // }

// // // // // // StatsBar Component - Enhanced UI with inline CSS
// // // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // // //   const solvedStats = useMemo(() => {
// // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // //     solvedProblems.forEach(id => {
// // // // //       const p = allProblems.find(pr => pr._id === id);
// // // // //       if (p) {
// // // // //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // //         if (stats[normalizedDifficulty] !== undefined) {
// // // // //           stats[normalizedDifficulty]++;
// // // // //         }
// // // // //       }
// // // // //     });
// // // // //     return stats;
// // // // //   }, [solvedProblems, allProblems]);

// // // // //   const totalStats = useMemo(() => {
// // // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // // //     allProblems.forEach(p => {
// // // // //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // //       if (stats[normalizedDifficulty] !== undefined) {
// // // // //         stats[normalizedDifficulty]++;
// // // // //       }
// // // // //     });
// // // // //     return stats;
// // // // //   }, [allProblems]);

// // // // //   return (
// // // // //     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // // //       {['easy', 'medium', 'hard'].map(level => (
// // // // //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// // // // //           {/* Subtle background glow effect */}
// // // // //           <div
// // // // //             className="absolute inset-0 opacity-10 blur-xl"
// // // // //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // //           ></div>
// // // // //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// // // // //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// // // // //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// // // // //           </div>
// // // // //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// // // // //           <progress
// // // // //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// // // // //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // // //             value={solvedStats[level]}
// // // // //             max={totalStats[level] || 1}
// // // // //           ></progress>
// // // // //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // FeaturedProblem Component - Enhanced UI with inline CSS
// // // // // const FeaturedProblem = ({ problem }) => {
// // // // //   if (!problem) return null;
// // // // //   return (
// // // // //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // // //       {/* Abstract background elements */}
// // // // //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// // // // //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// // // // //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// // // // //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// // // // //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// // // // //       <NavLink
// // // // //         to={`/problem/${problem._id}`}
// // // // //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// // // // //       >
// // // // //         Solve Now
// // // // //       </NavLink>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // function Homepage() {
// // // // //   const dispatch = useDispatch();
// // // // //   const { user } = useSelector(state => state.auth);
// // // // //   const [problems, setProblems] = useState([]);
// // // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         setLoading(true);
// // // // //         const [probRes, solvedRes] = await Promise.all([
// // // // //           axiosClient.get('/problem/getallproblem'),
// // // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // // //         ]);
// // // // //         setProblems(probRes.data || []);
// // // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // // //       } catch (e) {
// // // // //         console.error('Homepage fetch failed:', e);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, [user]);

// // // // //   const handleLogout = () => {
// // // // //     dispatch(logoutUser());
// // // // //     setSolvedProblemIds([]);
// // // // //   };

// // // // //   const filteredProblems = problems.filter(p => {
// // // // //     const normalizedProblemDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // // //     const matchDifficulty = filters.difficulty === 'all' || normalizedProblemDifficulty === filters.difficulty;
    
// // // // //     const filterTagNormalized = filters.tag.toLowerCase().trim();
// // // // //     let matchTag = filters.tag === 'all';
// // // // //     if (!matchTag && p.tags) {
// // // // //       if (Array.isArray(p.tags)) {
// // // // //         matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// // // // //       } else if (typeof p.tags === 'string') {
// // // // //         const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// // // // //         matchTag = problemTagsNormalized.includes(filterTagNormalized);
// // // // //       }
// // // // //     }
    
// // // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // // //     const matchStatus = filters.status === 'all' ||
// // // // //       (filters.status === 'solved' && isSolved) ||
// // // // //       (filters.status === 'unsolved' && !isSolved);
// // // // //     return matchDifficulty && matchTag && matchStatus;
// // // // //   });

// // // // //   const featuredProblem = useMemo(() => {
// // // // //     if (problems.length === 0) return null;
// // // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// // // // //   }, [problems, solvedProblemIds]);

// // // // //   const uniqueTags = useMemo(() => {
// // // // //     const tags = new Set();
// // // // //     problems.forEach(p => {
// // // // //       if (p.tags) {
// // // // //         if (Array.isArray(p.tags)) {
// // // // //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // // //         } else if (typeof p.tags === 'string') {
// // // // //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // // //         }
// // // // //       }
// // // // //     });
// // // // //     return Array.from(tags).filter(tag => tag !== '').sort();
// // // // //   }, [problems]);

// // // // //   return (
// // // // //     <div
// // // // //       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
// // // // //       style={{
// // // // //         // Deeper, more complex background gradients
// // // // //         backgroundImage: `
// // // // //           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // // //           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // // //           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // // //           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // // //         `,
// // // // //         backgroundAttachment: 'fixed',
// // // // //       }}
// // // // //     >
// // // // //       {/* Inline styles for custom animations and effects */}
// // // // //       <style>
// // // // //         {`
// // // // //         /* General fade-in for page loading */
// // // // //         @keyframes fadeIn {
// // // // //           from { opacity: 0; }
// // // // //           to { opacity: 1; }
// // // // //         }
// // // // //         .animate-fade-in {
// // // // //           animation: fadeIn 0.5s ease-in forwards;
// // // // //         }

// // // // //         /* For elements fading in from bottom */
// // // // //         @keyframes fadeInUp {
// // // // //           from { opacity: 0; transform: translateY(20px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }
// // // // //         .animate-fade-in-up {
// // // // //           animation: fadeInUp 0.6s ease-out forwards;
// // // // //         }

// // // // //         /* For elements fading in from top (like Navbar) */
// // // // //         @keyframes fadeInDown {
// // // // //           from { opacity: 0; transform: translateY(-20px); }
// // // // //           to { opacity: 1; transform: translateY(0); }
// // // // //         }
// // // // //         .animate-fade-in-down {
// // // // //           animation: fadeInDown 0.6s ease-out forwards;
// // // // //         }

// // // // //         /* Spinner animation (for loading states) */
// // // // //         @keyframes spin-slow {
// // // // //           from { transform: rotate(0deg); }
// // // // //           to { transform: rotate(360deg); }
// // // // //         }
// // // // //         .animate-spin-slow {
// // // // //           animation: spin-slow 0.8s linear infinite;
// // // // //         }

// // // // //         /* Custom scrollbar for dropdown (re-using from ProblemPage) */
// // // // //         .custom-scrollbar::-webkit-scrollbar {
// // // // //           width: 8px;
// // // // //         }
// // // // //         .custom-scrollbar::-webkit-scrollbar-track {
// // // // //           background: #1e293b; /* slate-800 */
// // // // //           border-radius: 10px;
// // // // //         }
// // // // //         .custom-scrollbar::-webkit-scrollbar-thumb {
// // // // //           background: #475569; /* slate-600 */
// // // // //           border-radius: 10px;
// // // // //         }
// // // // //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// // // // //           background: #64748b; /* slate-500 */
// // // // //         }
// // // // //         `}
// // // // //       </style>

// // // // //       {/* Floating CodeArena watermark */}
// // // // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
// // // // //         CODEARENA
// // // // //       </div>

// // // // //       {/* Navbar */}
// // // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
// // // // //         <div className="flex-1">
// // // // //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // // //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // // //             CodeArena<span className="text-xl opacity-70">.dev</span>
// // // // //           </NavLink>
// // // // //         </div>
// // // // //         <div className="flex-none">
// // // // //           <ul className="menu menu-horizontal px-1 hidden md:flex text-lg font-semibold">
// // // // //             {/* Problems Dropdown */}
// // // // //             <li className="dropdown dropdown-hover">
// // // // //               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
// // // // //                 Problems
// // // // //               </div>
// // // // //               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
// // // // //                 {problems.length > 0 ? (
// // // // //                   problems.map(p => ( // Display all problems if desired, or slice for a shorter list
// // // // //                     <li key={p._id}>
// // // // //                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
// // // // //                         {p.title}
// // // // //                         <span className={`ml-auto badge badge-outline text-xs font-semibold ${getDifficultyColor(p.difficulty).replace('text-', 'text-')}`}
// // // // //                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', '')}}>
// // // // //                             {String(p.difficulty).toUpperCase()}
// // // // //                         </span>
// // // // //                       </NavLink>
// // // // //                     </li>
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
// // // // //                 )}
// // // // //               </ul>
// // // // //             </li>
// // // // //             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
// // // // //             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
// // // // //           </ul>
// // // // //         </div>
// // // // //         <div className="dropdown dropdown-end ml-4">
// // // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // // //             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
// // // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // // //             </div>
// // // // //           </div>
// // // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // // //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // // //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // // //             <div className="divider my-1 h-px bg-gray-700" />
// // // // //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // // //           </ul>
// // // // //         </div>
// // // // //       </nav>

// // // // //       {/* Main Content */}
// // // // //       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
// // // // //         <FeaturedProblem problem={featuredProblem} />
// // // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // // //         {/* Filter */}
// // // // //         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
// // // // //           <div className="flex flex-wrap gap-4 items-center">
// // // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // // //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// // // // //                 <div className="label">
// // // // //                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// // // // //                 </div>
// // // // //                 <select
// // // // //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// // // // //                   value={filters[filter]}
// // // // //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // // //                 >
// // // // //                   <option value="all">All {filter}</option>
// // // // //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // // //                 </select>
// // // // //               </label>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Problem Table */}
// // // // //         {loading ? (
// // // // //           <div className="text-center py-20 animate-fade-in">
// // // // //             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
// // // // //             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
// // // // //             <table className="table w-full text-slate-200">
// // // // //               <thead>
// // // // //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// // // // //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// // // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {filteredProblems.length > 0 ? (
// // // // //                   filteredProblems.map(p => (
// // // // //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// // // // //                       <td className="px-6 py-4 text-center">
// // // // //                         {solvedProblemIds.includes(p._id) ? (
// // // // //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
// // // // //                         ) : (
// // // // //                           <span className="text-gray-500 text-xs">Unsolved</span>
// // // // //                         )}
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4">
// // // // //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// // // // //                       </td>
// // // // //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// // // // //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
// // // // //                       <td className="px-6 py-4">
// // // // //                         <div className="flex flex-wrap gap-2">
// // // // //                           {Array.isArray(p.tags) ?
// // // // //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// // // // //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// // // // //                           }
// // // // //                         </div>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <tr>
// // // // //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// // // // //                   </tr>
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}
// // // // //       </main>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Homepage;

// // // // import { useEffect, useState, useMemo } from 'react';
// // // // import { NavLink } from 'react-router-dom';
// // // // import { useDispatch, useSelector } from 'react-redux';
// // // // import axiosClient from '../utils/axiosClient';
// // // // import { logoutUser } from '../authSlice';

// // // // // Helper function for difficulty colors (using default Tailwind colors)
// // // // function getDifficultyColor(difficulty) {
// // // //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// // // //   switch (normalizedDifficulty) {
// // // //     case 'easy': return 'text-emerald-400'; // Tailwind green
// // // //     case 'medium': return 'text-amber-400'; // Tailwind amber
// // // //     case 'hard': return 'text-red-400';     // Tailwind red
// // // //     default: return 'text-gray-400';
// // // //   }
// // // // }

// // // // // StatsBar Component - Enhanced UI with inline CSS
// // // // const StatsBar = ({ solvedProblems, allProblems }) => {
// // // //   const solvedStats = useMemo(() => {
// // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // //     solvedProblems.forEach(id => {
// // // //       const p = allProblems.find(pr => pr._id === id);
// // // //       if (p) {
// // // //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // //         if (stats[normalizedDifficulty] !== undefined) {
// // // //           stats[normalizedDifficulty]++;
// // // //         }
// // // //       }
// // // //     });
// // // //     return stats;
// // // //   }, [solvedProblems, allProblems]);

// // // //   const totalStats = useMemo(() => {
// // // //     const stats = { easy: 0, medium: 0, hard: 0 };
// // // //     allProblems.forEach(p => {
// // // //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // //       if (stats[normalizedDifficulty] !== undefined) {
// // // //         stats[normalizedDifficulty]++;
// // // //       }
// // // //     });
// // // //     return stats;
// // // //   }, [allProblems]);

// // // //   return (
// // // //     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// // // //       {['easy', 'medium', 'hard'].map(level => (
// // // //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// // // //           {/* Subtle background glow effect */}
// // // //           <div
// // // //             className="absolute inset-0 opacity-10 blur-xl"
// // // //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // //           ></div>
// // // //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// // // //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// // // //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// // // //           </div>
// // // //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// // // //           <progress
// // // //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// // // //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// // // //             value={solvedStats[level]}
// // // //             max={totalStats[level] || 1}
// // // //           ></progress>
// // // //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // // FeaturedProblem Component - Enhanced UI with inline CSS
// // // // const FeaturedProblem = ({ problem }) => {
// // // //   if (!problem) return null;
// // // //   return (
// // // //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// // // //       {/* Abstract background elements */}
// // // //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// // // //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// // // //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// // // //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// // // //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// // // //       <NavLink
// // // //         to={`/problem/${problem._id}`}
// // // //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// // // //       >
// // // //         Solve Now
// // // //       </NavLink>
// // // //     </div>
// // // //   );
// // // // };

// // // // function Homepage() {
// // // //   const dispatch = useDispatch();
// // // //   // Simulate user and role. In a real app, 'user' comes from useSelector(state => state.auth.user)
// // // //   const { user } = useSelector(state => state.auth); 
// // // //   // Example for local testing if Redux state is not fully set up:
// // // //   // const user = { firstname: 'John', role: 'user' }; // or 'admin' for testing admin view

// // // //   const [problems, setProblems] = useState([]);
// // // //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         const [probRes, solvedRes] = await Promise.all([
// // // //           axiosClient.get('/problem/getallproblem'),
// // // //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// // // //         ]);
// // // //         setProblems(probRes.data || []);
// // // //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// // // //       } catch (e) {
// // // //         console.error('Homepage fetch failed:', e);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, [user]);

// // // //   const handleLogout = () => {
// // // //     dispatch(logoutUser());
// // // //     setSolvedProblemIds([]);
// // // //   };

// // // //   const filteredProblems = problems.filter(p => {
// // // //     const normalizedProblemDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// // // //     const matchDifficulty = filters.difficulty === 'all' || normalizedProblemDifficulty === filters.difficulty;
    
// // // //     const filterTagNormalized = filters.tag.toLowerCase().trim();
// // // //     let matchTag = filters.tag === 'all';
// // // //     if (!matchTag && p.tags) {
// // // //       if (Array.isArray(p.tags)) {
// // // //         matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// // // //       } else if (typeof p.tags === 'string') {
// // // //         const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// // // //         matchTag = problemTagsNormalized.includes(filterTagNormalized);
// // // //       }
// // // //     }
    
// // // //     const isSolved = solvedProblemIds.includes(p._id);
// // // //     const matchStatus = filters.status === 'all' ||
// // // //       (filters.status === 'solved' && isSolved) ||
// // // //       (filters.status === 'unsolved' && !isSolved);
// // // //     return matchDifficulty && matchTag && matchStatus;
// // // //   });

// // // //   const featuredProblem = useMemo(() => {
// // // //     if (problems.length === 0) return null;
// // // //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// // // //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// // // //   }, [problems, solvedProblemIds]);

// // // //   const uniqueTags = useMemo(() => {
// // // //     const tags = new Set();
// // // //     problems.forEach(p => {
// // // //       if (p.tags) {
// // // //         if (Array.isArray(p.tags)) {
// // // //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // //         } else if (typeof p.tags === 'string') {
// // // //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// // // //         }
// // // //       }
// // // //     });
// // // //     return Array.from(tags).filter(tag => tag !== '').sort();
// // // //   }, [problems]);

// // // //   return (
// // // //     <div
// // // //       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
// // // //       style={{
// // // //         // Deeper, more complex background gradients
// // // //         backgroundImage: `
// // // //           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// // // //           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// // // //           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// // // //           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// // // //         `,
// // // //         backgroundAttachment: 'fixed',
// // // //       }}
// // // //     >
// // // //       {/* Inline styles for custom animations and effects */}
// // // //       <style>
// // // //         {`
// // // //         /* General fade-in for page loading */
// // // //         @keyframes fadeIn {
// // // //           from { opacity: 0; }
// // // //           to { opacity: 1; }
// // // //         }
// // // //         .animate-fade-in {
// // // //           animation: fadeIn 0.5s ease-in forwards;
// // // //         }

// // // //         /* For elements fading in from bottom */
// // // //         @keyframes fadeInUp {
// // // //           from { opacity: 0; transform: translateY(20px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         .animate-fade-in-up {
// // // //           animation: fadeInUp 0.6s ease-out forwards;
// // // //         }

// // // //         /* For elements fading in from top (like Navbar) */
// // // //         @keyframes fadeInDown {
// // // //           from { opacity: 0; transform: translateY(-20px); }
// // // //           to { opacity: 1; transform: translateY(0); }
// // // //         }
// // // //         .animate-fade-in-down {
// // // //           animation: fadeInDown 0.6s ease-out forwards;
// // // //         }

// // // //         /* Spinner animation (for loading states) */
// // // //         @keyframes spin-slow {
// // // //           from { transform: rotate(0deg); }
// // // //           to { transform: rotate(360deg); }
// // // //         }
// // // //         .animate-spin-slow {
// // // //           animation: spin-slow 0.8s linear infinite;
// // // //         }

// // // //         /* Custom scrollbar for dropdown (re-using from ProblemPage) */
// // // //         .custom-scrollbar::-webkit-scrollbar {
// // // //           width: 8px;
// // // //         }
// // // //         .custom-scrollbar::-webkit-scrollbar-track {
// // // //           background: #1e293b; /* slate-800 */
// // // //           border-radius: 10px;
// // // //         }
// // // //         .custom-scrollbar::-webkit-scrollbar-thumb {
// // // //           background: #475569; /* slate-600 */
// // // //           border-radius: 10px;
// // // //         }
// // // //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// // // //           background: #64748b; /* slate-500 */
// // // //         }
// // // //         `}
// // // //       </style>

// // // //       {/* Floating CodeArena watermark */}
// // // //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
// // // //         CODEARENA
// // // //       </div>

// // // //       {/* Navbar */}
// // // //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
// // // //         <div className="flex-1">
// // // //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// // // //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// // // //             CodeArena<span className="text-xl opacity-70">.dev</span>
// // // //           </NavLink>
// // // //         </div>
// // // //         <div className="flex-none">
// // // //           <ul className="menu menu-horizontal px-1 hidden md:flex text-lg font-semibold">
// // // //             {/* Problems Dropdown */}
// // // //             <li className="dropdown dropdown-hover">
// // // //               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
// // // //                 Problems
// // // //               </div>
// // // //               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
// // // //                 {problems.length > 0 ? (
// // // //                   problems.map(p => (
// // // //                     <li key={p._id}>
// // // //                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
// // // //                         {p.title}
// // // //                         <span className={`ml-auto badge badge-outline text-xs font-semibold ${getDifficultyColor(p.difficulty).replace('text-', '')}`}
// // // //                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', '')}}> {/* Inline border color */}
// // // //                             {String(p.difficulty).toUpperCase()}
// // // //                         </span>
// // // //                       </NavLink>
// // // //                     </li>
// // // //                   ))
// // // //                 ) : (
// // // //                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
// // // //                 )}
// // // //               </ul>
// // // //             </li>
// // // //             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
// // // //             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
// // // //           </ul>
// // // //         </div>
// // // //         <div className="dropdown dropdown-end ml-4">
// // // //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// // // //             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
// // // //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// // // //             </div>
// // // //           </div>
// // // //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// // // //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// // // //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// // // //             <div className="divider my-1 h-px bg-gray-700" />
// // // //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// // // //           </ul>
// // // //         </div>
// // // //       </nav>

// // // //       {/* Main Content */}
// // // //       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
// // // //         <FeaturedProblem problem={featuredProblem} />
// // // //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// // // //         {/* Filter */}
// // // //         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
// // // //           <div className="flex flex-wrap gap-4 items-center">
// // // //             {['status', 'difficulty', 'tag'].map(filter => (
// // // //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// // // //                 <div className="label">
// // // //                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// // // //                 </div>
// // // //                 <select
// // // //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// // // //                   value={filters[filter]}
// // // //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// // // //                 >
// // // //                   <option value="all">All {filter}</option>
// // // //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// // // //                 </select>
// // // //               </label>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Problem Table */}
// // // //         {loading ? (
// // // //           <div className="text-center py-20 animate-fade-in">
// // // //             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
// // // //             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
// // // //             <table className="table w-full text-slate-200">
// // // //               <thead>
// // // //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// // // //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// // // //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {filteredProblems.length > 0 ? (
// // // //                   filteredProblems.map(p => (
// // // //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// // // //                       <td className="px-6 py-4 text-center">
// // // //                         {solvedProblemIds.includes(p._id) ? (
// // // //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
// // // //                         ) : (
// // // //                           <span className="text-gray-500 text-xs">Unsolved</span>
// // // //                         )}
// // // //                       </td>
// // // //                       <td className="px-6 py-4">
// // // //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// // // //                       </td>
// // // //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// // // //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
// // // //                       <td className="px-6 py-4">
// // // //                         <div className="flex flex-wrap gap-2">
// // // //                           {Array.isArray(p.tags) ?
// // // //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// // // //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// // // //                           }
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   ))
// // // //                 ) : (
// // // //                   <tr>
// // // //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// // // //                   </tr>
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         )}
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Homepage;

// // import { useEffect, useState, useMemo } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axiosClient from '../utils/axiosClient';
// // import { logoutUser } from '../authSlice';

// // // Helper function for difficulty colors (using default Tailwind colors)
// // function getDifficultyColor(difficulty) {
// //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// //   switch (normalizedDifficulty) {
// //     case 'easy': return 'text-emerald-400'; // Tailwind green
// //     case 'medium': return 'text-amber-400'; // Tailwind amber
// //     case 'hard': return 'text-red-400';     // Tailwind red
// //     default: return 'text-gray-400';
// //   }
// // }

// // // StatsBar Component - Enhanced UI with inline CSS
// // const StatsBar = ({ solvedProblems, allProblems }) => {
// //   const solvedStats = useMemo(() => {
// //     const stats = { easy: 0, medium: 0, hard: 0 };
// //     solvedProblems.forEach(id => {
// //       const p = allProblems.find(pr => pr._id === id);
// //       if (p) {
// //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// //         if (stats[normalizedDifficulty] !== undefined) {
// //           stats[normalizedDifficulty]++;
// //         }
// //       }
// //     });
// //     return stats;
// //   }, [solvedProblems, allProblems]);

// //   const totalStats = useMemo(() => {
// //     const stats = { easy: 0, medium: 0, hard: 0 };
// //     allProblems.forEach(p => {
// //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// //       if (stats[normalizedDifficulty] !== undefined) {
// //         stats[normalizedDifficulty]++;
// //       }
// //     });
// //     return stats;
// //   }, [allProblems]);

// //   return (
// //     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// //       {['easy', 'medium', 'hard'].map(level => (
// //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// //           {/* Subtle background glow effect */}
// //           <div
// //             className="absolute inset-0 opacity-10 blur-xl"
// //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// //           ></div>
// //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// //           </div>
// //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// //           <progress
// //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// //             value={solvedStats[level]}
// //             max={totalStats[level] || 1}
// //           ></progress>
// //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // FeaturedProblem Component - Enhanced UI with inline CSS
// // const FeaturedProblem = ({ problem }) => {
// //   if (!problem) return null;
// //   return (
// //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// //       {/* Abstract background elements */}
// //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem and level up your coding skills!</p>
// //       <NavLink
// //         to={`/problem/${problem._id}`}
// //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// //       >
// //         Solve Now
// //       </NavLink>
// //     </div>
// //   );
// // };

// // function Homepage() {
// //   const dispatch = useDispatch();
// //   const { user } = useSelector(state => state.auth); 

// //   const [problems, setProblems] = useState([]);
// //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const [probRes, solvedRes] = await Promise.all([
// //           axiosClient.get('/problem/getallproblem'),
// //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// //         ]);
// //         setProblems(probRes.data || []);
// //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// //       } catch (e) {
// //         console.error('Homepage fetch failed:', e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [user]);

// //   const handleLogout = () => {
// //     dispatch(logoutUser());
// //     setSolvedProblemIds([]);
// //   };

// //   const filteredProblems = problems.filter(p => {
// //     const normalizedProblemDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// //     const matchDifficulty = filters.difficulty === 'all' || normalizedProblemDifficulty === filters.difficulty;
    
// //     const filterTagNormalized = filters.tag.toLowerCase().trim();
// //     let matchTag = filters.tag === 'all';
// //     if (!matchTag && p.tags) {
// //       if (Array.isArray(p.tags)) {
// //         matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// //       } else if (typeof p.tags === 'string') {
// //         const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// //         matchTag = problemTagsNormalized.includes(filterTagNormalized);
// //       }
// //     }
    
// //     const isSolved = solvedProblemIds.includes(p._id);
// //     const matchStatus = filters.status === 'all' ||
// //       (filters.status === 'solved' && isSolved) ||
// //       (filters.status === 'unsolved' && !isSolved);
// //     return matchDifficulty && matchTag && matchStatus;
// //   });

// //   const featuredProblem = useMemo(() => {
// //     if (problems.length === 0) return null;
// //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// //   }, [problems, solvedProblemIds]);

// //   const uniqueTags = useMemo(() => {
// //     const tags = new Set();
// //     problems.forEach(p => {
// //       if (p.tags) {
// //         if (Array.isArray(p.tags)) {
// //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// //         } else if (typeof p.tags === 'string') {
// //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// //         }
// //       }
// //     });
// //     return Array.from(tags).filter(tag => tag !== '').sort();
// //   }, [problems]);

// //   return (
// //     <div
// //       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
// //       style={{
// //         // Deeper, more complex background gradients
// //         backgroundImage: `
// //           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// //           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// //           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// //           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// //         `,
// //         backgroundAttachment: 'fixed',
// //       }}
// //     >
// //       {/* Inline styles for custom animations and effects */}
// //       <style>
// //         {`
// //         /* General fade-in for page loading */
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         .animate-fade-in {
// //           animation: fadeIn 0.5s ease-in forwards;
// //         }

// //         /* For elements fading in from bottom */
// //         @keyframes fadeInUp {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-up {
// //           animation: fadeInUp 0.6s ease-out forwards;
// //         }

// //         /* For elements fading in from top (like Navbar) */
// //         @keyframes fadeInDown {
// //           from { opacity: 0; transform: translateY(-20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-down {
// //           animation: fadeInDown 0.6s ease-out forwards;
// //         }

// //         /* Spinner animation (for loading states) */
// //         @keyframes spin-slow {
// //           from { transform: rotate(0deg); }
// //           to { transform: rotate(360deg); }
// //         }
// //         .animate-spin-slow {
// //           animation: spin-slow 0.8s linear infinite;
// //         }

// //         /* Custom scrollbar for dropdown (re-using from ProblemPage) */
// //         .custom-scrollbar::-webkit-scrollbar {
// //           width: 8px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-track {
// //           background: #1e293b; /* slate-800 */
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //           background: #475569; /* slate-600 */
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //           background: #64748b; /* slate-500 */
// //         }
// //         `}
// //       </style>

// //       {/* Floating CodeArena watermark */}
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
// //         CODEARENA
// //       </div>

// //       {/* Navbar */}
// //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
// //         <div className="flex-1">
// //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// //             CodeArena<span className="text-xl opacity-70">.dev</span>
// //           </NavLink>
// //         </div>
// //         <div className="flex-none">
// //           <ul className="menu menu-horizontal px-1 hidden md:flex text-lg font-semibold">
// //             {/* Problems Dropdown */}
// //             <li className="dropdown dropdown-hover">
// //               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
// //                 Problems
// //               </div>
// //               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
// //                 {problems.length > 0 ? (
// //                   problems.map(p => (
// //                     <li key={p._id}>
// //                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
// //                         {p.title}
// //                         <span className={`ml-auto badge badge-outline text-xs font-semibold`}
// //                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', ''), color: getDifficultyColor(p.difficulty).replace('text-', '')}}>
// //                             {String(p.difficulty).toUpperCase()}
// //                         </span>
// //                       </NavLink>
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
// //                 )}
// //               </ul>
// //             </li>
// //             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
// //             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
// //           </ul>
// //         </div>
// //         <div className="dropdown dropdown-end ml-4">
// //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// //             <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
// //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// //             </div>
// //           </div>
// //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// //             <div className="divider my-1 h-px bg-gray-700" />
// //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// //           </ul>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
// //         <FeaturedProblem problem={featuredProblem} />
// //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// //         {/* Filter */}
// //         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
// //           <div className="flex flex-wrap gap-4 items-center">
// //             {['status', 'difficulty', 'tag'].map(filter => (
// //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// //                 <div className="label">
// //                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// //                 </div>
// //                 <select
// //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// //                   value={filters[filter]}
// //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// //                 >
// //                   <option value="all">All {filter}</option>
// //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                 </select>
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Problem Table */}
// //         {loading ? (
// //           <div className="text-center py-20 animate-fade-in">
// //             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
// //             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
// //             <table className="table w-full text-slate-200">
// //               <thead>
// //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredProblems.length > 0 ? (
// //                   filteredProblems.map(p => (
// //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// //                       <td className="px-6 py-4 text-center">
// //                         {solvedProblemIds.includes(p._id) ? (
// //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
// //                         ) : (
// //                           <span className="text-gray-500 text-xs">Unsolved</span>
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// //                       </td>
// //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex flex-wrap gap-2">
// //                           {Array.isArray(p.tags) ?
// //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// //                           }
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default Homepage;


// // import { useEffect, useState, useMemo } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axiosClient from '../utils/axiosClient';
// // import { logoutUser } from '../authSlice';

// // // Helper function for difficulty colors (using default Tailwind colors)
// // function getDifficultyColor(difficulty) {
// //   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
// //   switch (normalizedDifficulty) {
// //     case 'easy': return 'text-emerald-400'; // Tailwind green
// //     case 'medium': return 'text-amber-400'; // Tailwind amber
// //     case 'hard': return 'text-red-400';     // Tailwind red
// //     default: return 'text-gray-400';
// //   }
// // }

// // // StatsBar Component - Enhanced UI with inline CSS
// // const StatsBar = ({ solvedProblems, allProblems }) => {
// //   const solvedStats = useMemo(() => {
// //     const stats = { easy: 0, medium: 0, hard: 0 };
// //     solvedProblems.forEach(id => {
// //       const p = allProblems.find(pr => pr._id === id);
// //       if (p) {
// //         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// //         if (stats[normalizedDifficulty] !== undefined) {
// //           stats[normalizedDifficulty]++;
// //         }
// //       }
// //     });
// //     return stats;
// //   }, [solvedProblems, allProblems]);

// //   const totalStats = useMemo(() => {
// //     const stats = { easy: 0, medium: 0, hard: 0 };
// //     allProblems.forEach(p => {
// //       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
// //       if (stats[normalizedDifficulty] !== undefined) {
// //         stats[normalizedDifficulty]++;
// //       }
// //     });
// //     return stats;
// //   }, [allProblems]);

// //   return (
// //     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
// //       {['easy', 'medium', 'hard'].map(level => (
// //         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
// //           {/* Subtle background glow effect */}
// //           <div
// //             className="absolute inset-0 opacity-10 blur-xl"
// //             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// //           ></div>
// //           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
// //           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
// //             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
// //           </div>
// //           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
// //           <progress
// //             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
// //             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
// //             value={solvedStats[level]}
// //             max={totalStats[level] || 1}
// //           ></progress>
// //           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // FeaturedProblem Component - Enhanced UI with inline CSS
// // const FeaturedProblem = ({ problem }) => {
// //   if (!problem) return null;
// //   return (
// //     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
// //       {/* Abstract background elements */}
// //       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
// //       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

// //       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
// //       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
// //       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem!</p>
// //       <NavLink
// //         to={`/problem/${problem._id}`}
// //         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
// //       >
// //         Solve Now
// //       </NavLink>
// //     </div>
// //   );
// // };

// // function Homepage() {
// //   const dispatch = useDispatch();
// //   const { user } = useSelector(state => state.auth); 

// //   const [problems, setProblems] = useState([]);
// //   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });
// //   const [searchTerm, setSearchTerm] = useState(''); // New state for search term

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const [probRes, solvedRes] = await Promise.all([
// //           axiosClient.get('/problem/getallproblem'),
// //           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
// //         ]);
// //         setProblems(probRes.data || []);
// //         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
// //       } catch (e) {
// //         console.error('Homepage fetch failed:', e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [user]);

// //   const handleLogout = () => {
// //     dispatch(logoutUser());
// //     setSolvedProblemIds([]);
// //   };

// //   const filteredProblems = useMemo(() => {
// //     let filtered = problems.filter(p => {
// //       const matchDifficulty = filters.difficulty === 'all' || (p.difficulty && String(p.difficulty).toLowerCase().trim() === filters.difficulty);
      
// //       const filterTagNormalized = filters.tag.toLowerCase().trim();
// //       let matchTag = filters.tag === 'all';
// //       if (!matchTag && p.tags) {
// //         if (Array.isArray(p.tags)) {
// //           matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().trim() === filterTagNormalized);
// //         } else if (typeof p.tags === 'string') {
// //           const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
// //           matchTag = problemTagsNormalized.includes(filterTagNormalized);
// //         }
// //       }
      
// //       const isSolved = solvedProblemIds.includes(p._id);
// //       const matchStatus = filters.status === 'all' ||
// //         (filters.status === 'solved' && isSolved) ||
// //         (filters.status === 'unsolved' && !isSolved);
      
// //       return matchDifficulty && matchTag && matchStatus;
// //     });

// //     // Apply search term filter
// //     if (searchTerm) {
// //       const lowerCaseSearchTerm = searchTerm.toLowerCase();
// //       filtered = filtered.filter(p => 
// //         (p.title && p.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
// //         (p.tags && (Array.isArray(p.tags) ? p.tags.some(tag => String(tag).toLowerCase().includes(lowerCaseSearchTerm)) : String(p.tags).toLowerCase().includes(lowerCaseSearchTerm)))
// //       );
// //     }
// //     return filtered;
// //   }, [problems, filters, searchTerm, solvedProblemIds]);

// //   const featuredProblem = useMemo(() => {
// //     if (problems.length === 0) return null;
// //     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
// //     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
// //   }, [problems, solvedProblemIds]);

// //   const uniqueTags = useMemo(() => {
// //     const tags = new Set();
// //     problems.forEach(p => {
// //       if (p.tags) {
// //         if (Array.isArray(p.tags)) {
// //           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// //         } else if (typeof p.tags === 'string') {
// //           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
// //         }
// //       }
// //     });
// //     return Array.from(tags).filter(tag => tag !== '').sort();
// //   }, [problems]);

// //   return (
// //     <div
// //       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
// //       style={{
// //         // Deeper, more complex background gradients
// //         backgroundImage: `
// //           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
// //           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
// //           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
// //           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
// //         `,
// //         backgroundAttachment: 'fixed',
// //       }}
// //     >
// //       {/* Inline styles for custom animations and effects */}
// //       <style>
// //         {`
// //         /* General fade-in for page loading */
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }
// //         .animate-fade-in {
// //           animation: fadeIn 0.5s ease-in forwards;
// //         }

// //         /* For elements fading in from bottom */
// //         @keyframes fadeInUp {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-up {
// //           animation: fadeInUp 0.6s ease-out forwards;
// //         }

// //         /* For elements fading in from top (like Navbar) */
// //         @keyframes fadeInDown {
// //           from { opacity: 0; transform: translateY(-20px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in-down {
// //           animation: fadeInDown 0.6s ease-out forwards;
// //         }

// //         /* Spinner animation (for loading states) */
// //         @keyframes spin-slow {
// //           from { transform: rotate(0deg); }
// //           to { transform: rotate(360deg); }
// //         }
// //         .animate-spin-slow {
// //           animation: spin-slow 0.8s linear infinite;
// //         }

// //         /* Custom scrollbar for dropdown (re-using from ProblemPage) */
// //         .custom-scrollbar::-webkit-scrollbar {
// //           width: 8px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-track {
// //           background: #1e293b; /* slate-800 */
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //           background: #475569; /* slate-600 */
// //           border-radius: 10px;
// //         }
// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //           background: #64748b; /* slate-500 */
// //         }
// //         `}
// //       </style>

// //       {/* Floating CodeArena watermark */}
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
// //         CODEARENA
// //       </div>

// //       {/* Navbar */}
// //       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
// //         <div className="flex-1">
// //           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
// //             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
// //             CodeArena<span className="text-xl opacity-70">.dev</span>
// //           </NavLink>
// //         </div>
// //         <div className="flex-none">
// //           <ul className="menu menu-horizontal px-1 hidden md:flex text-lg font-semibold">
// //             {/* Problems Dropdown */}
// //             <li className="dropdown dropdown-hover">
// //               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
// //                 Problems
// //               </div>
// //               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
// //                 {problems.length > 0 ? (
// //                   problems.map(p => (
// //                     <li key={p._id}>
// //                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
// //                         {p.title}
// //                         <span className={`ml-auto badge badge-outline text-xs font-semibold`}
// //                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', ''), color: getDifficultyColor(p.difficulty).replace('text-', '')}}>
// //                             {String(p.difficulty).toUpperCase()}
// //                         </span>
// //                       </NavLink>
// //                     </li>
// //                   ))
// //                 ) : (
// //                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
// //                 )}
// //               </ul>
// //             </li>
// //             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
// //             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
// //           </ul>
// //         </div>
// //         <div className="dropdown dropdown-end ml-4">
// //           <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
// //             <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center text-lg font-bold"
// //                  style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}> {/* Subtle glow for avatar */}
// //               <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
// //             </div>
// //           </div>
// //           <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
// //             <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
// //             {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
// //             <div className="divider my-1 h-px bg-gray-700" />
// //             <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
// //           </ul>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
// //         <FeaturedProblem problem={featuredProblem} />
// //         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

// //         {/* Filters and Search Bar */}
// //         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
// //           <div className="flex flex-wrap gap-4 items-center mb-6">
// //             <div className="form-control flex-grow">
// //               <label className="label">
// //                 <span className="label-text text-gray-400 font-semibold">Search Problems</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 placeholder="Search by title or tags..."
// //                 className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>
// //           <div className="flex flex-wrap gap-4 items-center">
// //             {['status', 'difficulty', 'tag'].map(filter => (
// //               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
// //                 <div className="label">
// //                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
// //                 </div>
// //                 <select
// //                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
// //                   value={filters[filter]}
// //                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
// //                 >
// //                   <option value="all">All {filter}</option>
// //                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
// //                 </select>
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Problem Table */}
// //         {loading ? (
// //           <div className="text-center py-20 animate-fade-in">
// //             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
// //             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
// //             <table className="table w-full text-slate-200">
// //               <thead>
// //                 <tr className="border-b border-gray-700 bg-gray-700/50">
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
// //                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredProblems.length > 0 ? (
// //                   filteredProblems.map(p => (
// //                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
// //                       <td className="px-6 py-4 text-center">
// //                         {solvedProblemIds.includes(p._id) ? (
// //                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
// //                         ) : (
// //                           <span className="text-gray-500 text-xs">Unsolved</span>
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
// //                       </td>
// //                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
// //                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex flex-wrap gap-2">
// //                           {Array.isArray(p.tags) ?
// //                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
// //                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
// //                           }
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 ) : (
// //                   <tr>
// //                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // export default Homepage;

// import { useEffect, useState, useMemo } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// // Helper function for difficulty colors (using default Tailwind colors)
// function getDifficultyColor(difficulty) {
//   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
//   switch (normalizedDifficulty) {
//     case 'easy': return 'text-emerald-400'; // Tailwind green
//     case 'medium': return 'text-amber-400'; // Tailwind amber
//     case 'hard': return 'text-red-400';     // Tailwind red
//     default: return 'text-gray-400';
//   }
// }

// // StatsBar Component - Enhanced UI with inline CSS
// const StatsBar = ({ solvedProblems, allProblems }) => {
//   const solvedStats = useMemo(() => {
//     const stats = { easy: 0, medium: 0, hard: 0 };
//     solvedProblems.forEach(id => {
//       const p = allProblems.find(pr => pr._id === id);
//       if (p) {
//         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
//         if (stats[normalizedDifficulty] !== undefined) {
//           stats[normalizedDifficulty]++;
//         }
//       }
//     });
//     return stats;
//   }, [solvedProblems, allProblems]);

//   const totalStats = useMemo(() => {
//     const stats = { easy: 0, medium: 0, hard: 0 };
//     allProblems.forEach(p => {
//       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
//       if (stats[normalizedDifficulty] !== undefined) {
//         stats[normalizedDifficulty]++;
//       }
//     });
//     return stats;
//   }, [allProblems]);

//   return (
//     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
//       {['easy', 'medium', 'hard'].map(level => (
//         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
//           {/* Subtle background glow effect */}
//           <div
//             className="absolute inset-0 opacity-10 blur-xl"
//             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
//           ></div>
//           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
//           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
//             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
//           </div>
//           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
//           <progress
//             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
//             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
//             value={solvedStats[level]}
//             max={totalStats[level] || 1}
//           ></progress>
//           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// // FeaturedProblem Component - Enhanced UI with inline CSS
// const FeaturedProblem = ({ problem }) => {
//   if (!problem) return null;
//   return (
//     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
//       {/* Abstract background elements */}
//       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
//       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

//       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
//       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
//       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem!</p>
//       <NavLink
//         to={`/problem/${problem._id}`}
//         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
//       >
//         Solve Now
//       </NavLink>
//     </div>
//   );
// };

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth); 

//   const [problems, setProblems] = useState([]);
//   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });
//   const [searchTerm, setSearchTerm] = useState(''); // New state for search term

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [probRes, solvedRes] = await Promise.all([
//           axiosClient.get('/problem/getallproblem'),
//           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
//         ]);
//         setProblems(probRes.data || []);
//         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
//       } catch (e) {
//         console.error('Homepage fetch failed:', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblemIds([]);
//   };

//   const filteredProblems = useMemo(() => {
//     let filtered = problems.filter(p => {
//       const matchDifficulty = filters.difficulty === 'all' || (p.difficulty && String(p.difficulty).toLowerCase().trim() === filters.difficulty);
      
//       const filterTagNormalized = filters.tag.toLowerCase().trim();
//       let matchTag = filters.tag === 'all';
//       if (!matchTag && p.tags) {
//         if (Array.isArray(p.tags)) {
//           matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().includes(filterTagNormalized));
//         } else if (typeof p.tags === 'string') {
//           const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
//           matchTag = problemTagsNormalized.includes(filterTagNormalized);
//         }
//       }
      
//       const isSolved = solvedProblemIds.includes(p._id);
//       const matchStatus = filters.status === 'all' ||
//         (filters.status === 'solved' && isSolved) ||
//         (filters.status === 'unsolved' && !isSolved);
      
//       return matchDifficulty && matchTag && matchStatus;
//     });

//     // Apply search term filter
//     if (searchTerm) {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       filtered = filtered.filter(p => 
//         (p.title && p.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
//         (p.tags && (Array.isArray(p.tags) ? p.tags.some(tag => String(tag).toLowerCase().includes(lowerCaseSearchTerm)) : String(p.tags).toLowerCase().includes(lowerCaseSearchTerm)))
//       );
//     }
//     return filtered;
//   }, [problems, filters, searchTerm, solvedProblemIds]);

//   const featuredProblem = useMemo(() => {
//     if (problems.length === 0) return null;
//     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
//     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
//   }, [problems, solvedProblemIds]);

//   const uniqueTags = useMemo(() => {
//     const tags = new Set();
//     problems.forEach(p => {
//       if (p.tags) {
//         if (Array.isArray(p.tags)) {
//           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
//         } else if (typeof p.tags === 'string') {
//           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
//         }
//       }
//     });
//     return Array.from(tags).filter(tag => tag !== '').sort();
//   }, [problems]);

//   return (
//     <div
//       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
//       style={{
//         // Deeper, more complex background gradients
//         backgroundImage: `
//           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
//           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
//           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
//           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
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

//         /* For elements fading in from top (like Navbar) */
//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-down {
//           animation: fadeInDown 0.6s ease-out forwards;
//         }

//         /* Spinner animation (for loading states) */
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 0.8s linear infinite;
//         }

//         /* Custom scrollbar for dropdown (re-using from ProblemPage) */
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #1e293b; /* slate-800 */
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #475569; /* slate-600 */
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #64748b; /* slate-500 */
//         }
//         `}
//       </style>

//       {/* Floating CodeArena watermark */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
//         CoderWorld
//       </div>

//       {/* Navbar */}
//       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
//         {/* Left section (Logo) */}
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
//             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
//             CoderWorld<span className="text-xl opacity-70">.dev</span>
//           </NavLink>
//         </div>

//         {/* Center section (Nav links) */}
//         <div className="flex-none hidden md:flex flex-grow justify-center">
//           <ul className="menu menu-horizontal px-1 text-lg font-semibold">
//             {/* Problems Dropdown */}
//             <li className="dropdown dropdown-hover">
//               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
//                 Problems
//               </div>
//               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
//                 {problems.length > 0 ? (
//                   problems.map(p => (
//                     <li key={p._id}>
//                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
//                         {p.title}
//                         <span className={`ml-auto badge badge-outline text-xs font-semibold`}
//                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', ''), color: getDifficultyColor(p.difficulty).replace('text-', '')}}>
//                             {String(p.difficulty).toUpperCase()}
//                         </span>
//                       </NavLink>
//                     </li>
//                   ))
//                 ) : (
//                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
//                 )}
//               </ul>
//             </li>
//             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
//             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
//           </ul>
//         </div>

//         {/* Right section (User Avatar) */}
//         <div className="flex-none">
//           <div className="dropdown dropdown-end ml-4">
//             <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
//               <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
//                    style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}> {/* Subtle glow for avatar */}
//                 <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
//               </div>
//             </div>
//             <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-52 z-[60] border border-gray-700 backdrop-blur-md">
//               <li><NavLink to="/profile" className="hover:bg-indigo-500/20 py-2">Profile</NavLink></li>
//               {user?.role === 'admin' && <li><NavLink to="/admin" className="hover:bg-indigo-500/20 py-2">Admin Panel</NavLink></li>}
//               <div className="divider my-1 h-px bg-gray-700" />
//               <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-400/20 py-2">Logout</button></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
//         <FeaturedProblem problem={featuredProblem} />
//         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

//         {/* Filters and Search Bar */}
//         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
//           <div className="flex flex-wrap gap-4 items-center mb-6">
//             <div className="form-control flex-grow">
//               <label className="label">
//                 <span className="label-text text-gray-400 font-semibold">Search Problems</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Search by title or tags..."
//                 className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-4 items-center">
//             {['status', 'difficulty', 'tag'].map(filter => (
//               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
//                 <div className="label">
//                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
//                 </div>
//                 <select
//                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
//                   value={filters[filter]}
//                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
//                 >
//                   <option value="all">All {filter}</option>
//                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                 </select>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Problem Table */}
//         {loading ? (
//           <div className="text-center py-20 animate-fade-in">
//             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
//             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
//             <table className="table w-full text-slate-200">
//               <thead>
//                 <tr className="border-b border-gray-700 bg-gray-700/50">
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProblems.length > 0 ? (
//                   filteredProblems.map(p => (
//                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
//                       <td className="px-6 py-4 text-center">
//                         {solvedProblemIds.includes(p._id) ? (
//                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
//                         ) : (
//                           <span className="text-gray-500 text-xs">Unsolved</span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
//                       </td>
//                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
//                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
//                       <td className="px-6 py-4">
//                         <div className="flex flex-wrap gap-2">
//                           {Array.isArray(p.tags) ?
//                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
//                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
//                           }
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Homepage;

// import { useEffect, useState, useMemo } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// // Helper function for difficulty colors (using default Tailwind colors)
// function getDifficultyColor(difficulty) {
//   const normalizedDifficulty = difficulty ? String(difficulty).toLowerCase().trim() : '';
//   switch (normalizedDifficulty) {
//     case 'easy': return 'text-emerald-400'; // Tailwind green
//     case 'medium': return 'text-amber-400'; // Tailwind amber
//     case 'hard': return 'text-red-400';     // Tailwind red
//     default: return 'text-gray-400';
//   }
// }

// // StatsBar Component - Enhanced UI with inline CSS
// const StatsBar = ({ solvedProblems, allProblems }) => {
//   const solvedStats = useMemo(() => {
//     const stats = { easy: 0, medium: 0, hard: 0 };
//     solvedProblems.forEach(id => {
//       const p = allProblems.find(pr => pr._id === id);
//       if (p) {
//         const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
//         if (stats[normalizedDifficulty] !== undefined) {
//           stats[normalizedDifficulty]++;
//         }
//       }
//     });
//     return stats;
//   }, [solvedProblems, allProblems]);

//   const totalStats = useMemo(() => {
//     const stats = { easy: 0, medium: 0, hard: 0 };
//     allProblems.forEach(p => {
//       const normalizedDifficulty = p.difficulty ? String(p.difficulty).toLowerCase().trim() : '';
//       if (stats[normalizedDifficulty] !== undefined) {
//         stats[normalizedDifficulty]++;
//       }
//     });
//     return stats;
//   }, [allProblems]);

//   return (
//     <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
//       {['easy', 'medium', 'hard'].map(level => (
//         <div key={level} className="bg-gray-800 p-7 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-indigo-500 relative overflow-hidden">
//           {/* Subtle background glow effect */}
//           <div
//             className="absolute inset-0 opacity-10 blur-xl"
//             style={{ backgroundColor: level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
//           ></div>
//           <h3 className={`uppercase text-xs font-bold ${getDifficultyColor(level)} tracking-wider relative z-10`}>{level}</h3>
//           <div className="text-4xl font-mono font-bold text-white mt-2 relative z-10">
//             {totalStats[level] !== undefined ? `${solvedStats[level]} / ${totalStats[level]}` : '0 / 0'}
//           </div>
//           {/* Progress bar styling (DaisyUI progress class with direct color override via style) */}
//           <progress
//             className={`progress w-full mt-3 h-2 rounded-full relative z-10`}
//             style={{ '--progress-color': level === 'easy' ? '#34D399' : level === 'medium' ? '#FBBF24' : '#F87171' }}
//             value={solvedStats[level]}
//             max={totalStats[level] || 1}
//           ></progress>
//           <p className="text-sm text-gray-400 mt-2 relative z-10">Problems Solved</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// // FeaturedProblem Component - Enhanced UI with inline CSS
// const FeaturedProblem = ({ problem }) => {
//   if (!problem) return null;
//   return (
//     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl shadow-indigo-600/30 mb-12 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
//       {/* Abstract background elements */}
//       <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-50"></div>
//       <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-50"></div>

//       <h2 className="text-sm uppercase font-bold opacity-80 tracking-wide">Problem of the Day</h2>
//       <h3 className="text-3xl font-bold mt-2 leading-tight">{problem.title}</h3>
//       <p className="opacity-90 mt-2 max-w-lg">Challenge yourself with today's featured problem!</p>
//       <NavLink
//         to={`/problem/${problem._id}`}
//         className="btn btn-outline border-fuchsia-500 text-fuchsia-500 mt-6 px-8 py-3 rounded-full text-base font-semibold border-2 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
//       >
//         Solve Now
//       </NavLink>
//     </div>
//   );
// };

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);

//   const [problems, setProblems] = useState([]);
//   const [solvedProblemIds, setSolvedProblemIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ difficulty: 'all', tag: 'all', status: 'all' });
//   const [searchTerm, setSearchTerm] = useState(''); // New state for search term

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [probRes, solvedRes] = await Promise.all([
//           axiosClient.get('/problem/getallproblem'),
//           user ? axiosClient.get('/problem/problemsolvedbyuser') : Promise.resolve({ data: [] }),
//         ]);
//         setProblems(probRes.data || []);
//         setSolvedProblemIds((solvedRes.data || []).map(p => p._id));
//       } catch (e) {
//         console.error('Homepage fetch failed:', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblemIds([]);
//   };

//   const filteredProblems = useMemo(() => {
//     let filtered = problems.filter(p => {
//       const matchDifficulty = filters.difficulty === 'all' || (p.difficulty && String(p.difficulty).toLowerCase().trim() === filters.difficulty);

//       const filterTagNormalized = filters.tag.toLowerCase().trim();
//       let matchTag = filters.tag === 'all';
//       if (!matchTag && p.tags) {
//         if (Array.isArray(p.tags)) {
//           matchTag = p.tags.some(tag => tag && String(tag).toLowerCase().includes(filterTagNormalized));
//         } else if (typeof p.tags === 'string') {
//           const problemTagsNormalized = String(p.tags).split(',').map(tag => String(tag).toLowerCase().trim());
//           matchTag = problemTagsNormalized.includes(filterTagNormalized);
//         }
//       }

//       const isSolved = solvedProblemIds.includes(p._id);
//       const matchStatus = filters.status === 'all' ||
//         (filters.status === 'solved' && isSolved) ||
//         (filters.status === 'unsolved' && !isSolved);

//       return matchDifficulty && matchTag && matchStatus;
//     });

//     // Apply search term filter
//     if (searchTerm) {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       filtered = filtered.filter(p =>
//         (p.title && p.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
//         (p.tags && (Array.isArray(p.tags) ? p.tags.some(tag => String(tag).toLowerCase().includes(lowerCaseSearchTerm)) : String(p.tags).toLowerCase().includes(lowerCaseSearchTerm)))
//       );
//     }
//     return filtered;
//   }, [problems, filters, searchTerm, solvedProblemIds]);

//   const featuredProblem = useMemo(() => {
//     if (problems.length === 0) return null;
//     const unsolved = problems.filter(p => !solvedProblemIds.includes(p._id));
//     return unsolved.length ? unsolved[Math.floor(Math.random() * unsolved.length)] : problems[Math.floor(Math.random() * problems.length)];
//   }, [problems, solvedProblemIds]);

//   const uniqueTags = useMemo(() => {
//     const tags = new Set();
//     problems.forEach(p => {
//       if (p.tags) {
//         if (Array.isArray(p.tags)) {
//           p.tags.forEach(tag => tags.add(String(tag).toLowerCase().trim()));
//         } else if (typeof p.tags === 'string') {
//           String(p.tags).split(',').forEach(tag => tags.add(String(tag).toLowerCase().trim()));
//         }
//       }
//     });
//     return Array.from(tags).filter(tag => tag !== '').sort();
//   }, [problems]);

//   return (
//     <div
//       className="min-h-screen text-slate-200 bg-slate-950 font-sans"
//       style={{
//         // Deeper, more complex background gradients
//         backgroundImage: `
//           radial-gradient(circle at 1% 90%, rgba(99, 102, 241, 0.08), transparent 50%),
//           radial-gradient(circle at 99% 10%, rgba(139, 92, 246, 0.07), transparent 45%),
//           radial-gradient(circle at 40% 100%, rgba(236, 72, 153, 0.04), transparent 60%),
//           radial-gradient(circle at 60% 0%, rgba(59, 130, 246, 0.03), transparent 70%)
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

//         /* For elements fading in from top (like Navbar) */
//         @keyframes fadeInDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-down {
//           animation: fadeInDown 0.6s ease-out forwards;
//         }

//         /* Spinner animation (for loading states) */
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 0.8s linear infinite;
//         }
        
//         /* ✨ New animation for the user profile card ✨ */
//         @keyframes scaleInTopRight {
//           from {
//             opacity: 0;
//             transform: scale(0.95) translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }
//         .animate-scale-in {
//           transform-origin: top right;
//           animation: scaleInTopRight 0.15s ease-out forwards;
//         }

//         /* Custom scrollbar for dropdown */
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #1e293b; /* slate-800 */
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #475569; /* slate-600 */
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #64748b; /* slate-500 */
//         }
//         `}
//       </style>

//       {/* Floating CodeArena watermark */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-[0.015] select-none pointer-events-none font-extrabold tracking-widest text-gray-700 z-0">
//         CoderWorld
//       </div>

//       {/* Navbar */}
//       <nav className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gray-900/70 px-6 border-b border-gray-700 shadow-md animate-fade-in-down">
//         {/* Left section (Logo) */}
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost normal-case text-3xl font-bold text-transparent bg-clip-text"
//             style={{ backgroundImage: 'linear-gradient(to right, #6366F1, #EC4899)', textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
//             CoderWorld<span className="text-xl opacity-70">.dev</span>
//           </NavLink>
//         </div>

//         {/* Center section (Nav links) */}
//         <div className="flex-none hidden md:flex flex-grow justify-center">
//           <ul className="menu menu-horizontal px-1 text-lg font-semibold">
//             {/* Problems Dropdown */}
//             <li className="dropdown dropdown-hover">
//               <div tabIndex={0} role="button" className="hover:text-indigo-400 transition-colors cursor-pointer py-2 px-3">
//                 Problems
//               </div>
//               <ul tabIndex={0} className="dropdown-content mt-3 p-2 shadow-xl menu bg-gray-800 rounded-box w-64 z-[60] border border-gray-700 backdrop-blur-md max-h-80 overflow-y-auto custom-scrollbar">
//                 {problems.length > 0 ? (
//                   problems.map(p => (
//                     <li key={p._id}>
//                       <NavLink to={`/problem/${p._id}`} className="hover:bg-indigo-500/20 py-2 text-base text-gray-300">
//                         {p.title}
//                         <span className={`ml-auto badge badge-outline text-xs font-semibold`}
//                               style={{borderColor: getDifficultyColor(p.difficulty).replace('text-', ''), color: getDifficultyColor(p.difficulty).replace('text-', '')}}>
//                             {String(p.difficulty).toUpperCase()}
//                         </span>
//                       </NavLink>
//                     </li>
//                   ))
//                 ) : (
//                   <li><span className="text-gray-500 italic py-2 px-4">No problems available</span></li>
//                 )}
//               </ul>
//             </li>
//             <li><NavLink to="/contests" className="hover:text-indigo-400 transition-colors">Contests</NavLink></li>
//             <li><NavLink to="/leaderboard" className="hover:text-indigo-400 transition-colors">Leaderboard</NavLink></li>
//           </ul>
//         </div>

//         {/* Right section (User Avatar) - ✨ UPDATED SECTION ✨ */}
//         <div className="flex-none">
//           <div className="dropdown dropdown-end ml-4">
//             <div tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-indigo-500 ring-offset-gray-900 ring-offset-2 hover:scale-105 transition-transform duration-200 shadow-lg">
//               <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold"
//                    style={{ boxShadow: '0 0 10px rgba(99,102,241,0.4)' }}> {/* Subtle glow for avatar */}
//                 <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase() || '?'}</span>
//               </div>
//             </div>
//             {/* 👇 This is the new, beautiful user card 👇 */}
//             <div tabIndex={0} className="dropdown-content mt-4 z-[60] w-64 overflow-hidden rounded-2xl bg-gray-800/80 backdrop-blur-md border border-gray-700 shadow-2xl shadow-black/30 animate-scale-in">
//               <div className="p-4 bg-white/5">
//                 <p className="font-bold text-white text-lg truncate">
//                   {user?.firstname || 'Valued'} {user?.lastname}
//                 </p>
//                 <p className="text-sm text-gray-400 truncate">
//                   {user?.email || 'Welcome!'}
//                 </p>
//               </div>
//               <div className="h-px bg-gray-700" />
//               <div className="p-2 space-y-1">
//                 <NavLink to="/profile" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
//                   <span>Profile</span>
//                 </NavLink>
//                 {user?.role === 'admin' && (
//                   <NavLink to="/admin" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 8a1 1 0 00-1 1v1h14V9a1 1 0 00-1-1H5z" /><path fillRule="evenodd" d="M3 11v5a2 2 0 002 2h10a2 2 0 002-2v-5H3zm3 2a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
//                     <span>Admin Panel</span>
//                   </NavLink>
//                 )}
//                 <NavLink to="/dashboard" className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-white transition-colors duration-200">
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
//                                   <span>Dashboard</span>
//                                 </NavLink>
//                 <div className="h-px bg-gray-700/50 my-1" />
//                 <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
//         <FeaturedProblem problem={featuredProblem} />
//         <StatsBar solvedProblems={solvedProblemIds} allProblems={problems} />

//         {/* Filters and Search Bar */}
//         <div className="card bg-gray-800/50 p-6 mb-8 border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1s' }}>
//           <div className="flex flex-wrap gap-4 items-center mb-6">
//             <div className="form-control flex-grow">
//               <label className="label">
//                 <span className="label-text text-gray-400 font-semibold">Search Problems</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Search by title or tags..."
//                 className="input input-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-4 items-center">
//             {['status', 'difficulty', 'tag'].map(filter => (
//               <label key={filter} className="form-control w-full sm:w-auto flex-1 min-w-[150px]">
//                 <div className="label">
//                   <span className="label-text text-gray-400 font-semibold">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
//                 </div>
//                 <select
//                   className="select select-bordered w-full bg-gray-700 border-gray-600 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500/50 transition-colors"
//                   value={filters[filter]}
//                   onChange={e => setFilters({ ...filters, [filter]: e.target.value })}
//                 >
//                   <option value="all">All {filter}</option>
//                   {filter === 'status' && ['solved', 'unsolved'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                   {filter === 'difficulty' && ['easy', 'medium', 'hard'].map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                   {filter === 'tag' && uniqueTags.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
//                 </select>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Problem Table */}
//         {loading ? (
//           <div className="text-center py-20 animate-fade-in">
//             <span className="loading loading-spinner loading-lg text-indigo-500 animate-spin-slow"></span>
//             <p className="mt-4 text-gray-400 text-lg">Loading challenges...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-gray-800/40 rounded-2xl border border-gray-700 shadow-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
//             <table className="table w-full text-slate-200">
//               <thead>
//                 <tr className="border-b border-gray-700 bg-gray-700/50">
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tl-2xl">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Title</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-gray-300">Acceptance</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Difficulty</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-tr-2xl">Category</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProblems.length > 0 ? (
//                   filteredProblems.map(p => (
//                     <tr key={p._id} className="hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-none">
//                       <td className="px-6 py-4 text-center">
//                         {solvedProblemIds.includes(p._id) ? (
//                           <span className="badge bg-emerald-500 text-white border-transparent badge-sm font-bold text-xs">Solved</span>
//                         ) : (
//                           <span className="text-gray-500 text-xs">Unsolved</span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <NavLink to={`/problem/${p._id}`} className="link link-hover text-lg font-medium text-white hover:text-indigo-500 transition-colors">{p.title}</NavLink>
//                       </td>
//                       <td className="px-6 py-4 text-center text-sm text-gray-400 font-mono">{(p.acceptanceRate || (Math.random() * (70 - 30) + 30)).toFixed(1)}%</td>
//                       <td className="px-6 py-4"><span className={`font-semibold ${getDifficultyColor(p.difficulty)}`}>{String(p.difficulty).charAt(0).toUpperCase() + String(p.difficulty).slice(1)}</span></td>
//                       <td className="px-6 py-4">
//                         <div className="flex flex-wrap gap-2">
//                           {Array.isArray(p.tags) ?
//                             p.tags.map(tag => <div key={tag} className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{tag}</div>) :
//                             (p.tags && <div className="badge badge-outline border-cyan-400 text-cyan-400 text-xs capitalize">{p.tags}</div>)
//                           }
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-10 opacity-70 text-lg">No problems match the selected filters. Try broadening your search!</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Homepage;

// import { useEffect, useState, useMemo, useRef } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// // ✨ --- THIS IS THE FIX --- ✨
// // AnimatePresence must be imported from framer-motion to be used.
// import { motion, AnimatePresence } from 'framer-motion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { BrainCircuit, Code, Search, Trophy, Users, Filter } from 'lucide-react';
// import axiosClient from '../utils/axiosClient';
// import Header from '../components/dashboard/Header';

// gsap.registerPlugin(ScrollTrigger);

// // --- Reusable Animated Stat Card Component ---
// const StatCard = ({ icon, label, value }) => (
//     <motion.div 
//         className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-center gap-4"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
//         viewport={{ once: true, amount: 0.5 }}
//     >
//         <div className="bg-slate-800 p-3 rounded-full">{icon}</div>
//         <div>
//             <p className="text-2xl font-bold text-white">{value}</p>
//             <p className="text-sm text-slate-400">{label}</p>
//         </div>
//     </motion.div>
// );

// // --- Main Homepage Component ---
// function Homepage() {
//     const { user } = useSelector(state => state.auth); 
//     const location = useLocation();
//     const navigate = useNavigate();
//     const heroRef = useRef(null);

//     const [problems, setProblems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filters, setFilters] = useState({ 
//         difficulty: 'all', 
//         tag: location.state?.filterTag || 'all',
//     });
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isFilterOpen, setIsFilterOpen] = useState(false);

//     // Effect to handle incoming filters from other pages (like Dashboard)
//     useEffect(() => {
//         if (location.state?.filterTag) {
//             setFilters(prev => ({ ...prev, tag: location.state.filterTag }));
//             document.getElementById('problem-list')?.scrollIntoView({ behavior: 'smooth' });
//             window.history.replaceState({}, document.title);
//         }
//     }, [location.state]);

//     // Effect to fetch problem data
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const probRes = await axiosClient.get('/problem/getallproblem');
//                 setProblems(probRes.data || []);
//             } catch (e) {
//                 console.error('Homepage fetch failed:', e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);
    
//     // Effect for GSAP hero animation
//     useEffect(() => {
//         const ctx = gsap.context(() => {
//             if (heroRef.current) {
//                 gsap.fromTo(heroRef.current.children, 
//                     { y: 50, opacity: 0, filter: 'blur(10px)' },
//                     { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power3.out' }
//                 );
//             }
//         }, heroRef);
//         return () => ctx.revert();
//     }, []);

//     // Memoized calculations for performance
//     const filteredProblems = useMemo(() => {
//         return problems.filter(p => {
//             const matchSearch = searchTerm === '' || p.title.toLowerCase().includes(searchTerm.toLowerCase());
//             const matchDifficulty = filters.difficulty === 'all' || p.difficulty.toLowerCase() === filters.difficulty;

//             // Robust logic to handle tags as either a string or an array
//             let problemTags = [];
//             if (Array.isArray(p.tags)) {
//                 problemTags = p.tags.map(t => t.toLowerCase());
//             } else if (typeof p.tags === 'string') {
//                 problemTags = p.tags.split(',').map(t => t.trim().toLowerCase());
//             }
//             const matchTag = filters.tag === 'all' || problemTags.includes(filters.tag);
            
//             return matchSearch && matchDifficulty && matchTag;
//         });
//     }, [problems, searchTerm, filters]);

//     const uniqueTags = useMemo(() => {
//         const tags = new Set();
//         problems.forEach(p => {
//             if (Array.isArray(p.tags)) {
//                 p.tags.forEach(tag => tags.add(tag.toLowerCase()));
//             } else if (typeof p.tags === 'string') {
//                 p.tags.split(',').forEach(tag => tags.add(tag.trim().toLowerCase()));
//             }
//         });
//         return Array.from(tags).sort();
//     }, [problems]);

//     const getDifficultyColor = (difficulty) => {
//         switch (difficulty?.toLowerCase()) {
//             case 'easy': return 'text-emerald-400';
//             case 'medium': return 'text-amber-400';
//             case 'hard': return 'text-red-400';
//             default: return 'text-slate-400';
//         }
//     };
    
//     return (
//         <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
//             <Header />
            
//             <main className="container mx-auto px-4 sm:px-6 py-8">
//                 {/* --- Hero Section --- */}
//                 <section ref={heroRef} className="text-center py-20 lg:py-32">
//                     <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
//                         Welcome to CoderWorld
//                     </h1>
//                     <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
//                         Sharpen your skills, solve challenging problems, and compete with a global community of developers.
//                     </p>
//                     <div className="mt-8 flex justify-center gap-4">
//                         <button onClick={() => document.getElementById('problem-list').scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
//                             Explore Problems
//                         </button>
//                         <button onClick={() => navigate('/dashboard')} className="btn btn-ghost">
//                             View Dashboard
//                         </button>
//                     </div>
//                 </section>

//                 {/* --- Stats Section --- */}
//                 <section className="py-16">
//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         <StatCard icon={<BrainCircuit size={24} className="text-cyan-400" />} label="Total Problems" value={problems.length} />
//                         <StatCard icon={<Trophy size={24} className="text-amber-400" />} label="Contests Held" value="120+" />
//                         <StatCard icon={<Users size={24} className="text-purple-400" />} label="Active Users" value="10,000+" />
//                         <StatCard icon={<Code size={24} className="text-emerald-400" />} label="Submissions" value="1M+" />
//                     </div>
//                 </section>

//                 {/* --- Problem List Section --- */}
//                 <section id="problem-list" className="py-16">
//                     <motion.h2 className="text-3xl font-bold text-white mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
//                         Problem Set
//                     </motion.h2>

//                     <motion.div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl backdrop-blur-md mb-8 space-y-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="relative flex-grow">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//                                 <input type="text" placeholder="Search by title..." className="input input-bordered w-full bg-slate-800 pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                             </div>
//                             <button className="btn btn-outline btn-info md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}><Filter size={18} /> Filters</button>
//                         </div>

//                         <div className={`grid sm:grid-cols-2 lg:grid-cols-2 gap-4 ${isFilterOpen ? 'grid' : 'hidden'} md:grid`}>
//                             <select className="select select-bordered w-full bg-slate-800" value={filters.difficulty} onChange={e => setFilters({...filters, difficulty: e.target.value})}>
//                                 <option value="all">All Difficulties</option>
//                                 <option value="easy">Easy</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="hard">Hard</option>
//                             </select>
//                             <select className="select select-bordered w-full bg-slate-800" value={filters.tag} onChange={e => setFilters({...filters, tag: e.target.value})}>
//                                 <option value="all">All Tags</option>
//                                 {uniqueTags.map(tag => <option key={tag} value={tag} className="capitalize">{tag}</option>)}
//                             </select>
//                         </div>
//                     </motion.div>

//                     <div className="overflow-x-auto">
//                         {loading ? <div className="text-center p-8"><span className="loading loading-dots loading-md"></span></div> :
//                         <table className="table w-full">
//                             <thead>
//                                 <tr className="border-b border-slate-800">
//                                     <th className="bg-transparent p-4">Title</th>
//                                     <th className="bg-transparent p-4 text-center">Difficulty</th>
//                                     <th className="bg-transparent p-4">Tags</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <AnimatePresence>
//                                     {filteredProblems.map(p => {
//                                         let tagsArray = [];
//                                         if (Array.isArray(p.tags)) {
//                                             tagsArray = p.tags;
//                                         } else if (typeof p.tags === 'string') {
//                                             tagsArray = p.tags.split(',').map(t => t.trim());
//                                         }
                                        
//                                         return (
//                                             <motion.tr 
//                                                 key={p._id} 
//                                                 className="border-b border-slate-800 hover:bg-slate-800/50"
//                                                 layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
//                                             >        []
//                                                 <td className="p-4"><NavLink to={`/problem/${p._id}`} className="link link-hover text-white font-semibold">{p.title}</NavLink></td>
//                                                 <td className="p-4 text-center"><span className={`${getDifficultyColor(p.difficulty)} font-semibold capitalize`}>{p.difficulty}</span></td>
//                                                 <td className="p-4">
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {tagsArray.map(tag => <span key={tag} className="badge badge-outline badge-info capitalize">{tag}</span>)}
//                                                     </div>
//                                                 </td>
//                                             </motion.tr>
//                                         );
//                                     })}
//                                 </AnimatePresence>
//                             </tbody>
//                         </table>
//                         }
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// }

// export default Homepage;
import { useEffect, useState, useMemo, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { BrainCircuit, Code, Search, Trophy, Users, Filter } from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header';

// ✨ NEW: Component to inject styles directly into the page
const BackgroundStyles = () => (
    <style>
        {`
        .homepage-background {
            background: linear-gradient(-45deg, #020617, #0f172a, #1e293b, #334155);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            position: relative;
            overflow-x: hidden;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        `}
    </style>
);

// --- Reusable Animated Stat Card Component ---
const StatCard = ({ icon, label, value }) => (
    <motion.div 
        className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-center gap-4 backdrop-blur-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        viewport={{ once: true, amount: 0.5 }}
    >
        <div className="bg-slate-800 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </div>
    </motion.div>
);

// --- Reusable Problem Card Component ---
const ProblemCard = ({ problem }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'border-emerald-500/50 text-emerald-400';
            case 'medium': return 'border-amber-500/50 text-amber-400';
            case 'hard': return 'border-red-500/50 text-red-400';
            default: return 'border-slate-700/50 text-slate-400';
        }
    };

    const tagsArray = useMemo(() => {
        if (Array.isArray(problem.tags)) return problem.tags;
        if (typeof problem.tags === 'string') return problem.tags.split(',').map(t => t.trim());
        return [];
    }, [problem.tags]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-400/50 transition-colors duration-300"
        >
            <NavLink 
                to={`/problem/${problem._id}`} 
                className="block"
                onClick={() => console.log('Problem clicked:', problem._id)}
            >
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400">{problem.title}</h3>
                    <span className={`text-xs font-semibold capitalize px-3 py-1 rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tagsArray.slice(0, 3).map(tag => (
                        <span key={tag} className="badge badge-outline badge-info capitalize">{tag}</span>
                    ))}
                </div>
            </NavLink>
        </motion.div>
    );
};


// --- Main Homepage Component ---
function Homepage() {
    const { user } = useSelector(state => state.auth); 
    const location = useLocation();
    const navigate = useNavigate();
    const heroRef = useRef(null);

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ 
        difficulty: 'all', 
        tag: location.state?.filterTag || 'all',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Effect to handle incoming filters from other pages
    useEffect(() => {
        if (location.state?.filterTag) {
            setFilters(prev => ({ ...prev, tag: location.state.filterTag }));
            document.getElementById('problem-list')?.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    // Effect to fetch problem data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const probRes = await axiosClient.get('/problem/getallproblem');
                setProblems(probRes.data || []);
            } catch (e) {
                console.error('Homepage fetch failed:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    // Effect for GSAP hero animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.fromTo(heroRef.current.children, 
                    { y: 50, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power3.out' }
                );
            }
        }, heroRef);
        return () => ctx.revert();
    }, []);

    // Memoized calculations for filtering and tags
    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchSearch = searchTerm === '' || p.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchDifficulty = filters.difficulty === 'all' || p.difficulty.toLowerCase() === filters.difficulty;
            let problemTags = [];
            if (Array.isArray(p.tags)) {
                problemTags = p.tags.map(t => t.toLowerCase());
            } else if (typeof p.tags === 'string') {
                problemTags = p.tags.split(',').map(t => t.trim().toLowerCase());
            }
            const matchTag = filters.tag === 'all' || problemTags.includes(filters.tag);
            return matchSearch && matchDifficulty && matchTag;
        });
    }, [problems, searchTerm, filters]);

    const uniqueTags = useMemo(() => {
        const tags = new Set();
        problems.forEach(p => {
            if (Array.isArray(p.tags)) {
                p.tags.forEach(tag => tags.add(tag.toLowerCase()));
            } else if (typeof p.tags === 'string') {
                p.tags.split(',').forEach(tag => tags.add(tag.trim().toLowerCase()));
            }
        });
        return Array.from(tags).sort();
    }, [problems]);
    
    return (
        <div className="min-h-screen homepage-background text-slate-200 font-sans">
            <BackgroundStyles /> {/* ✨ Self-contained styles are added here */}
            <Header />
            
            <main className="container mx-auto px-4 sm:px-6 py-8">
                {/* --- Hero Section --- */}
                <section ref={heroRef} className="text-center py-20 lg:py-32 min-h-[70vh] flex flex-col justify-center">
                    {/* Enhanced CoderWorld Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center mb-8"
                    >
                        {/* Logo Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 border border-cyan-400/20 mb-4"
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
                                className="w-12 h-12 lg:w-14 lg:h-14"
                            >
                                <img 
                                    src="/src/pages/2896418.png" 
                                    alt="CoderWorld Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </motion.div>
                        
                        {/* Logo Text */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            CoderWorld
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-lg text-slate-400"
                            style={{ fontFamily: "'Source Code Pro', monospace" }}
                        >
                            Code • Learn • Solve
                        </motion.p>
                    </motion.div>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        Sharpen your skills, solve challenging problems, and compete with a global community of developers.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('problem-list').scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
                            Explore Problems
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/dashboard')} className="btn btn-ghost">
                            View Dashboard
                        </motion.button>
                    </div>
                </section>

                {/* --- Stats Section --- */}
                <section className="py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<BrainCircuit size={24} className="text-cyan-400" />} label="Total Problems" value={problems.length} />
                        <StatCard icon={<Trophy size={24} className="text-amber-400" />} label="Contests Held" value="120+" />
                        <StatCard icon={<Users size={24} className="text-purple-400" />} label="Active Users" value="10,000+" />
                        <StatCard icon={<Code size={24} className="text-emerald-400" />} label="Submissions" value="1M+" />
                    </div>
                </section>

                {/* --- Problem List Section --- */}
                <section id="problem-list" className="py-16">
                    <motion.h2 className="text-3xl font-bold text-white mb-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                        Problem Set
                    </motion.h2>

                    {/* --- Filters UI --- */}
                    <motion.div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl backdrop-blur-md mb-8 space-y-4 max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input type="text" placeholder="Search by title..." className="input input-bordered w-full bg-slate-800 pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <button className="btn btn-outline btn-info md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}><Filter size={18} /> Filters</button>
                        </div>
                        <div className={`grid sm:grid-cols-2 gap-4 ${isFilterOpen ? 'grid' : 'hidden'} md:grid`}>
                            <select className="select select-bordered w-full bg-slate-800" value={filters.difficulty} onChange={e => setFilters({...filters, difficulty: e.target.value})}>
                                <option value="all">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            <select className="select select-bordered w-full bg-slate-800" value={filters.tag} onChange={e => setFilters({...filters, tag: e.target.value})}>
                                <option value="all">All Tags</option>
                                {uniqueTags.map(tag => <option key={tag} value={tag} className="capitalize">{tag}</option>)}
                            </select>
                        </div>
                    </motion.div>

                    {/* --- Problems Grid --- */}
                    {loading ? (
                        <div className="text-center p-8"><span className="loading loading-dots loading-lg text-primary"></span></div>
                    ) : (
                        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredProblems.map(p => (
                                    <ProblemCard key={p._id} problem={p} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                    
                    {!loading && filteredProblems.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-slate-400">
                            <h3 className="text-2xl font-bold text-white mb-2">No Problems Found</h3>
                            <p>Try adjusting your search or filter criteria.</p>
                        </motion.div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Homepage;