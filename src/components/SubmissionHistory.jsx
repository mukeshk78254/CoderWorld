// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../../Back/src/authSlice';
// import { useEffect, useState } from 'react';
// import axiosClient from '../../../Back/src/utils/axiosClient';

// function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (isAuthenticated) {
//         try {
//           const { data } = await axiosClient.get('/user/notifications');
//           setNotifications(data.notifications);
//           setUnreadCount(data.unreadCount);
//         } catch (error) {
//           console.error("Failed to fetch notifications:", error);
//         }
//       }
//     };
//     fetchNotifications();
//     // Optional: Poll for new notifications every minute
//     const interval = setInterval(fetchNotifications, 60000);
//     return () => clearInterval(interval);
//   }, [isAuthenticated]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/landing');
//   };

//   const markAsRead = async () => {
//     if (unreadCount > 0) {
//       try {
//         await axiosClient.post('/user/notifications/mark-read');
//         setUnreadCount(0);
//         setNotifications(notifications.map(n => ({ ...n, isRead: true })));
//       } catch (error) {
//         console.error("Failed to mark notifications as read:", error);
//       }
//     }
//   };
  
//   const linkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//       isActive ? 'bg-primary text-primary-content' : 'text-gray-300 hover:bg-neutral/70 hover:text-white'
//     }`;

//   return (
//     <nav className="navbar bg-base-100/80 backdrop-blur-lg shadow-md px-4 sm:px-6 sticky top-0 z-50 border-b border-white/10">
//       <div className="navbar-start">
//         <NavLink to={isAuthenticated ? "/" : "/landing"} className="flex items-center gap-2 btn btn-ghost text-xl">

//           <span className="font-bold tracking-wider text-white">CoderWorld</span>
//         </NavLink>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-2">
//           {isAuthenticated ? (
//             <>
//               <li><NavLink to="/" className={linkClass}>Problems</NavLink></li>
//               <li><NavLink to="/contest" className={linkClass}>Contest</NavLink></li>
//               <li><NavLink to="/discuss" className={linkClass}>Discuss</NavLink></li>
//             </>
//           ) : (
//             <>
//                <li><NavLink to="/landing#features" className={linkClass}>Features</NavLink></li>
//                <li><NavLink to="/landing#subjects" className={linkClass}>Subjects</NavLink></li>
//             </>
//           )}
//         </ul>
//       </div>

//       <div className="navbar-end gap-2">
//         {isAuthenticated ? (
//           <>
//             <div className="dropdown dropdown-end">
//               <button tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={markAsRead}>
//                 <div className="indicator">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
//                   {unreadCount > 0 && <span className="badge badge-sm badge-primary indicator-item">{unreadCount}</span>}
//                 </div>
//               </button>
//               <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-80 max-h-96 overflow-y-auto">
//                 <div className="p-2 font-bold border-b border-neutral-700">Notifications</div>
//                 {notifications.length > 0 ? notifications.map(notif => (
//                     <li key={notif._id} className={`${!notif.isRead ? 'bg-primary/10' : ''}`}>
//                         <a href={notif.link || '#'} target="_blank" rel="noopener noreferrer">
//                             <p className="font-semibold text-white">{notif.title}</p>
//                             <p className="text-xs text-neutral-content/70">{notif.message}</p>
//                         </a>
//                     </li>
//                 )) : <li className="p-4 text-center text-sm text-neutral-content/60">No new notifications.</li>}
//               </div>
//             </div>
//             <div className="dropdown dropdown-end">
//               <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                 <div className="w-10 rounded-full bg-base-300 ring ring-primary ring-offset-base-100 ring-offset-2">
//                   <span className="text-lg font-bold">{user?.firstname?.charAt(0).toUpperCase()}</span>
//                 </div>
//               </div>
//                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52">
//                   <li><NavLink to="/profile">Profile</NavLink></li>
//                   <li><NavLink to="/dashboard">Dashboard</NavLink></li>
//                   <li><NavLink to="/profile/edit">Settings</NavLink></li>
//                   <div className="divider my-1"></div>
//                   <li><button onClick={handleLogout}>Logout</button></li>
//                </ul>
//             </div>
//           </>
//         ) : (
//           <>
//             <NavLink to="/login" className="btn btn-ghost">Login</NavLink>
//             <NavLink to="/signup" className="btn btn-primary">Sign Up</NavLink>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

  import { useState, useEffect } from 'react';
  import axiosClient from '../utils/axiosClient';
  import Pagination from './Pagination';

  const SubmissionHistory = ({ problemid }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [submissionsPerPage] = useState(10); // Show 10 submissions per page

    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          setLoading(true);
          const response = await axiosClient.get(`/problem/submittedProblem/${problemid}`);
          setSubmissions(response.data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch submission history');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSubmissions();
      setCurrentPage(1); // Reset to first page when problem changes
    }, [problemid]);

    const getStatusColor = (status) => {
      switch (status) {
        case 'accepted': return 'badge-success';
        case 'wrong': return 'badge-error';
        case 'error': return 'badge-warning';
        case 'pending': return 'badge-info';
        default: return 'badge-neutral';
      }
    };

    const formatMemory = (memory) => {
      if (memory < 1024) return `${memory} kB`;
      return `${(memory / 1024).toFixed(2)} MB`;
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };

    // Pagination logic
    const indexOfLastSubmission = currentPage * submissionsPerPage;
    const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
    const currentSubmissions = submissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-error shadow-lg my-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>
        
        {submissions.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>No submissions found for this problem</span>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Language</th>
                    <th>Status</th>
                    <th>Runtime</th>
                    <th>Memory</th>
                    <th>Test Cases</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubmissions.map((sub, index) => (
                    <tr key={sub.id}>
                      <td>{indexOfFirstSubmission + index + 1}</td>
                      <td className="font-mono">{sub.language}</td>
                      <td>
                        <span className={`badge ${getStatusColor(sub.status)}`}>
                          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </span>
                      </td>
                      
                      <td className="font-mono">{sub.runtime}sec</td>
                      <td className="font-mono">{formatMemory(sub.memory)}</td>
                      <td className="font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</td>
                      <td>{formatDate(sub.createdAt)}</td>
                      <td>
                        <button 
                          className="btn btn-s btn-outline"
                          onClick={() => setSelectedSubmission(sub)}
                        >
                          Code
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-slate-400">
                Showing {indexOfFirstSubmission + 1} to {Math.min(indexOfLastSubmission, submissions.length)} of {submissions.length} submissions
              </p>
            </div>

            {/* Pagination Component */}
            <Pagination 
              itemsPerPage={submissionsPerPage}
              totalItems={submissions.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}

        {/* Code View Modal */}
        {selectedSubmission && (
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg mb-4">
                Submission Details: {selectedSubmission.language}
              </h3>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`badge ${getStatusColor(selectedSubmission.status)}`}>
                    {selectedSubmission.status}
                  </span>
                  <span className="badge badge-outline">
                    Runtime: {selectedSubmission.runtime}s
                  </span>
                  <span className="badge badge-outline">
                    Memory: {formatMemory(selectedSubmission.memory)}
                  </span>
                  <span className="badge badge-outline">
                    Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
                  </span>
                </div>
                
                {selectedSubmission.errorMessage && (
                  <div className="alert alert-error mt-2">
                    <div>
                      <span>{selectedSubmission.errorMessage}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto">
                <code>{selectedSubmission.code}</code>
              </pre>
              
              <div className="modal-action">
                <button 
                  className="btn"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default SubmissionHistory;