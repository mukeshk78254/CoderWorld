// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient'
// import { NavLink } from 'react-router';

// const AdminVideo = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get('/problem/getallproblem');
//       setProblems(data);
//     } catch (err) {
//       setError('Failed to fetch problems');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
//     try {
//       await axiosClient.delete(`/video/delete/${id}`);
//       setProblems(problems.filter(problem => problem._id !== id));
//     } catch (err) {
//       setError(err);
//       console.log(err);
//     }
//   };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{error.response.data.error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Video Upload and Delete</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="w-1/12">#</th>
//               <th className="w-4/12">Title</th>
//               <th className="w-2/12">Difficulty</th>
//               <th className="w-3/12">Tags</th>
//               <th className="w-2/12">Actions</th>
//               <th className="w-2/12">Remove</th>

//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr key={problem._id}>
//                 <th>{index + 1}</th>
//                 <td>{problem.title}</td>
//                 <td>
//                   <span className={`badge ${
//                     problem.difficulty === 'Easy' 
//                       ? 'badge-success' 
//                       : problem.difficulty === 'Medium' 
//                         ? 'badge-warning' 
//                         : 'badge-error'
//                   }`}>
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge badge-outline">
//                     {problem.tags}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex space-x-1">
//                      <NavLink 
//                         to={`/admin/upload/${problem._id}`}
//                         className={`btn bg-blue-600`}
//                         >
//                         Upload
//                     </NavLink>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => handleDelete(problem._id)}
//                       className="btn btn-sm btn-error"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminVideo;

// src/components/AdminVideo.jsx
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { NavLink } from 'react-router-dom'; 
import { Loader2, AlertCircle, CheckCircle, Video, Trash2, Upload, RefreshCw } from 'lucide-react';
//                                                                   

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const { data } = await axiosClient.get('/problem/getallproblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems. Please try again.');
      console.error("Fetch problems error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (problemid) => {
    if (!window.confirm('Are you sure you want to delete the video solution for this problem? This cannot be undone.')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await axiosClient.delete(`/video/delete/${problemid}`);
      setProblems(problems.map(p => 
        p._id === problemid ? { ...p, videoSolution: null } : p 
      ));
      setMessage('Video solution deleted successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(`Failed to delete video solution: ${err.response?.data?.message || err.message}.`);
      console.error("Delete video error:", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading && problems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] bg-base-200">
        <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
        <p className="text-lg text-base-content">Loading problems for video management...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen bg-base-200 text-base-content">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary-content mb-4 md:mb-0">
          <Video className="inline-block mr-3 w-8 h-8 text-accent" />
          Video Solutions Management
        </h1>
        <button onClick={fetchProblems} className="btn btn-outline btn-info transition-transform duration-200 hover:scale-105">
          <RefreshCw className="w-5 h-5 mr-2" /> Refresh List
        </button>
      </div>

      {error && (
        <div role="alert" className="alert alert-error shadow-lg animate-fade-in-down mb-6">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="btn btn-sm btn-ghost">Dismiss</button>
        </div>
      )}

      {message && (
        <div role="alert" className="alert alert-success shadow-lg animate-fade-in-down mb-6">
          <CheckCircle className="w-6 h-6" />
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="btn btn-sm btn-ghost">Dismiss</button>
        </div>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-box shadow-xl animate-fade-in-up">
        {problems.length === 0 && !loading && !error ? (
          <div className="p-8 text-center text-lg text-base-content/70">
            No problems found to manage video solutions.
          </div>
        ) : (
          <table className="table table-zebra w-full">
            {/* head */}
            <thead className="text-primary-content bg-base-300">
              <tr>
                <th className="w-[5%]">#</th>
                <th className="w-[30%]">Title</th>
                <th className="w-[10%]">Difficulty</th>
                <th className="w-[15%]">Tags</th>
                <th className="w-[20%] text-center">Video Status</th>
                <th className="w-[20%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr 
                  key={problem._id} 
                  className="hover:bg-base-300 transition-colors duration-200"
                >
                  <th>{index + 1}</th>
                  <td className="font-medium text-lg">{problem.title}</td>
                  <td>
                    <span className={`badge text-xs px-3 py-2 ${
                      problem.difficulty.toLowerCase() === 'easy' 
                        ? 'badge-success' 
                        : problem.difficulty.toLowerCase() === 'medium' 
                          ? 'badge-warning' 
                          : 'badge-error'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-primary text-xs px-3 py-2">
                      {problem.tags}
                    </span>
                  </td>
                  <td className="text-center">
                    {problem.videoSolution ? (
                      <span className="badge badge-lg badge-success font-semibold">Uploaded</span>
                    ) : (
                      <span className="badge badge-lg badge-warning font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center space-x-2">
                      <NavLink 
                        to={`/admin/upload/${problem._id}`}
                        className="btn btn-sm btn-info transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        disabled={loading}
                      >
                        <Upload className="w-4 h-4 mr-1" /> Upload
                      </NavLink>
                      <button 
                        onClick={() => handleDelete(problem._id)}
                        className="btn btn-sm btn-error transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        disabled={loading || !problem.videoSolution} 
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminVideo;